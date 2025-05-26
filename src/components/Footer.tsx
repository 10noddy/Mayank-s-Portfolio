import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/70 backdrop-blur-sm border-t border-purple-900/30 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <span className="text-2xl font-bold neon-text">MAYANK</span>
            <p className="text-gray-400 mt-2 max-w-md">
              Creating innovative digital experiences with modern technologies and a focus on performance.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/10noddy" target="_blank" rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mayank-raj-180845252/" target="_blank" rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://www.instagram.com/btwitsmayank6321/" target="_blank" rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              Made with <Heart size={16} className="text-purple-500" fill="#9333ea" /> using React
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © {currentYear} Mayank Raj. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;