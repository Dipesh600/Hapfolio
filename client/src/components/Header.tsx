import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Github, Linkedin } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links (#)
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close mobile menu first
        setMobileMenuOpen(false);
        
        // Then scroll to the element
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Small delay to allow menu to close
      }
    } else if (href === '/') {
      // If it's the home link, just close the menu
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Happy<span className="text-blue-600">Swaraj</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-x-4">
          <a href="https://linkedin.com/in/happyswaraj/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
          <a href="https://github.com/happy0002" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a href="/Happy_Swaraj_CV.pdf" download>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Resume</span>
            </Button>
          </a>
        </div>
        
        <div className="flex md:hidden">
          <Button variant="ghost" onClick={toggleMobileMenu} className="p-2" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden shadow-md"
          >
            <div className="space-y-1 px-6 py-4 border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 flex items-center gap-4 pt-4 border-t border-gray-200">
                <a href="https://linkedin.com/in/happyswaraj/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://github.com/happy0002" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a href="/Happy_Swaraj_CV.pdf" download className="flex-1">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Resume</span>
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
