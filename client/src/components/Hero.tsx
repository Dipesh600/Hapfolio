import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-gray-100" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hi, I'm <span className="text-blue-600">Happy Swaraj</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl leading-8 text-gray-600 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Computer Science Engineering student passionate about software development, problem-solving, and building innovative applications.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button onClick={scrollToProjects} className="px-8 py-6 text-base">
              View My Projects
            </Button>
            <a href="#contact" className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
              Get in Touch <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-md">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">Saran, Bihar 841424</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Contact</div>
                <div className="font-medium">9128730395</div>
                <div className="font-medium">happyswaraj7667@gmail.com</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Profiles</div>
                <div className="flex flex-col gap-1">
                  <a 
                    href="https://linkedin.com/in/happyswaraj/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    linkedin.com/in/happyswaraj/
                  </a>
                  <a 
                    href="https://github.com/happy0002" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    github.com/happy0002
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scrollToProjects} 
          className="animate-bounce"
          aria-label="Scroll Down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
