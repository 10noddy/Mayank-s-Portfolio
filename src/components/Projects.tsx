import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ExternalLink, Github } from 'lucide-react';
import wanderlustImg from '../assets/wanderlust.png';
import simonSaysImg from '../assets/simonSays.png';
import portfolioImg from '../assets/portfolio.png';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  technologies: string[];
  links: {
    live?: string;
    github: string;
  };
}

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (project: Project | null) => void;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Fullstack Development",
    image: portfolioImg,
    description: "Modern portfolio website with stunning animations, built using React, TypeScript, and Tailwind CSS.",
    longDescription: "A modern, responsive portfolio website showcasing my projects and skills. Built with React and TypeScript for robust type safety, styled with Tailwind CSS for a clean, modern design. Features include smooth animations using Framer Motion, interactive project cards with modal views, a dynamic skill showcase, and a contact form integrated with EmailJS. The site demonstrates modern web development practices with a focus on user experience and performance.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "EmailJS"],
    links: {
      github: "https://github.com/10noddy/portfolio"
    }
  },
  {
    id: 2,
    title: "WanderLust",
    category: "Full Stack",
    image: wanderlustImg,
    description: "An Airbnb-inspired full-stack web application with complete CRUD functionality.",
    longDescription: "Wanderlust is a comprehensive full-stack web-based rental platform inspired by Airbnb. Built using MongoDB, Express.js, EJS, and JavaScript, it supports full CRUD operations on property listings, including image uploads, ratings, and detailed descriptions. Features include user authentication, authorization, session management, flash messaging, and RESTful APIs for scalable routing. The application boasts an intuitive and responsive UI for seamless navigation.",
    technologies: ["JavaScript", "EJS", "MongoDB", "Express.js"],
    links: {
      live: "https://wanderlust-us3r.onrender.com/listings",
      github: "https://github.com/10noddy/wanderlust"
    }
  },
  {
    id: 3,
    title: "Amazon Clone",
    category: "Web Development",
    image: "https://images.pexels.com/photos/2882634/pexels-photo-2882634.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "A basic clone of Amazon with similar basic functions, built using HTML and CSS.",
    longDescription: "Created during high school, this project is a basic clone of Amazon that implements core functionalities. Used HTML as the base language for developing the webpage and creating a user-friendly interface. CSS was utilized for styling and creating a visually appealing, user-presentable interface.",
    technologies: ["HTML", "CSS"],
    links: {
      github: "https://github.com/10noddy/amazon-clone"
    }
  },
  
  {
    id: 4,
    title: "Simon Says Game",
    category: "Web Game",
    image: simonSaysImg,
    description: "A classic memory-based game with dynamic UI and interactive animations.",
    longDescription: "A classic memory-based game built using JavaScript, CSS, and HTML. The game features dynamic UI, event-driven gameplay, and progressively increasing difficulty levels. Implemented interactive animations and sound effects for an engaging user experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "https://github.com/10noddy/simon-says"
    }
  }
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, setSelectedProject }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="cyberpunk-card group cursor-pointer overflow-hidden"
      onClick={() => setSelectedProject(project)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="inline-block bg-purple-600/80 text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm mb-2">
            {project.category}
          </div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.slice(0, 3).map((tech: string, index: number) => (
            <span 
              key={index} 
              className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <motion.button 
          className="w-full text-center py-2 border border-purple-500 text-purple-400 rounded-md text-sm font-medium hover:bg-purple-900/30 transition-colors duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-black/90 border border-purple-500/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-purple-800/80 transition-colors duration-300"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <div className="inline-block bg-purple-600/80 text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm mb-2">
              {project.category}
            </div>
            <h2 className="text-2xl font-bold gradient-text">{project.title}</h2>
          </div>
          
          <p className="text-gray-300 mb-6">{project.longDescription}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <span 
                  key={index} 
                  className="text-sm bg-purple-900/50 text-purple-300 px-3 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cyberpunk-button flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cyberpunk-button bg-transparent border border-purple-500 flex items-center gap-2 hover:bg-purple-900/30"
            >
              <Github size={16} />
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-24 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>
      
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              setSelectedProject={setSelectedProject} 
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;