import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/CodeBlock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectDetail = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  
  const project = projects.find((p) => p.id === id);
  
  useEffect(() => {
    if (!project) {
      navigate("/");
    }
    
    window.scrollTo(0, 0);
  }, [project, navigate]);
  
  if (!project) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <Button 
          variant="ghost" 
          className="mb-8 gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              
              <div className="flex items-center gap-2 mt-4 mb-8">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-500">{project.date}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="prose max-w-none mb-12">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {project.codeSnippet && (
                <>
                  <h2 className="text-2xl font-bold mt-12 mb-4">Code Snippet</h2>
                  <CodeBlock 
                    code={project.codeSnippet.code}
                    language={project.codeSnippet.language}
                    filename={project.codeSnippet.filename}
                  />
                </>
              )}
            </motion.div>
          </div>
          
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-32">
              <h3 className="text-xl font-bold mb-6">Project Details</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Project Links</h4>
                  <div className="space-y-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      GitHub Repository
                    </a>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Date</h4>
                  <div className="text-gray-900">{project.date}</div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="w-full"
                  onClick={() => {
                    if (project.githubLink) {
                      window.open(project.githubLink, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
