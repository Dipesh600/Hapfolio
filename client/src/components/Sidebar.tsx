import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Code, User, Award, Briefcase, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Projects", icon: Code, href: "#projects" },
  { name: "Skills", icon: Briefcase, href: "#skills" },
  { name: "Education", icon: User, href: "#education" },
  { name: "Certificates", icon: Award, href: "#certificates" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

const Sidebar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-6">
            <div className="text-xl font-bold mb-6">Happy Swaraj</div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                    location === item.href
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 z-30 w-20 bg-white shadow-sm border-r border-gray-200">
        <div className="flex flex-col items-center h-full py-8">
          <Link href="/">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-8">
              HS
            </div>
          </Link>
          
          <nav className="flex-1 flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-full",
                  location === item.href
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
