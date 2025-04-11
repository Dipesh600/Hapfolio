import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";

type ProjectCategory = "All" | "React Native" | "FastAPI" | "React" | "TypeScript" | "Python";

const ProjectItem = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border border-gray-200">
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <span>{project.title}</span>
            <span className="text-sm text-gray-500">{project.date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="secondary" className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-none">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600">{project.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            View Details <ArrowUpRight className="h-4 w-4" />
          </Button>
          <a 
            href={project.githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Github className="h-4 w-4" /> Repository
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  const filterProjects = () => {
    if (activeFilter === "All") return projects;
    return projects.filter(project => project.technologies.includes(activeFilter));
  };

  const filteredProjects = filterProjects();

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Projects
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Here are some projects I've worked on to showcase my skills and expertise.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(["All", "React Native", "FastAPI", "React", "TypeScript", "Python"] as ProjectCategory[]).map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
