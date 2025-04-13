import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http"; // Import http directly

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true, // Allow any origin in development
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });
  
  next();
});

// Function to find an available port - updated for ESM
async function findAvailablePort(startPort: number): Promise<number> {
  return new Promise((resolve) => {
    const server = createServer(); // Use imported createServer
    server.listen(startPort, () => {
      const addressInfo = server.address();
      // Make sure we have a valid port number
      const port = typeof addressInfo === 'object' && addressInfo 
        ? addressInfo.port 
        : startPort;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      // Port is in use, try the next one
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

(async () => {
  try {
    const server = await registerRoutes(app);
    
    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error(`Error: ${err.message || err}`);
      res.status(status).json({ message });
    });
    
    // Set up Vite in development mode or serve static files in production
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
    
    // Try port 5000 first, but fall back to others if needed
    const port = await findAvailablePort(5000);
    
    // Listen on all network interfaces (0.0.0.0) to ensure accessibility
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running at: http://localhost:${port}`);
      
      if (port !== 5000) {
        console.log(`Note: Port 5000 was in use, using port ${port} instead.`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();