import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { initializeEmailService, sendContactNotification } from "./services/emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the email service when the server starts
  await initializeEmailService();

  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      const savedContact = await storage.createContact(contactData);
      
      // Send email notification
      const emailPreviewUrl = await sendContactNotification(savedContact);
      
      // Log whether email was sent successfully
      if (emailPreviewUrl) {
        console.log(`Contact form notification sent. Preview: ${emailPreviewUrl}`);
      } else {
        console.warn('Contact form submitted but email notification failed');
      }
      
      res.status(201).json({
        message: "Message sent successfully",
        contact: savedContact,
        emailSent: !!emailPreviewUrl
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error saving contact:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Get all contacts (admin feature)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error retrieving contacts:", error);
      res.status(500).json({ message: "Failed to retrieve contacts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
