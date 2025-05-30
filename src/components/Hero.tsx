import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Send, Download } from 'lucide-react';
import profileImage from '../assets/new.jpg';

const defaultTiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
  glare: true,
  "max-glare": 0.5,
};

const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "AI Enthusiast"
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  },
  tap: { scale: 0.95 }
};

const TypewriterText = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    const type = () => {
      const fullText = roles[currentRole];
      
      if (!isDeleting) {
        if (text.length < fullText.length) {
          const timeout = setTimeout(() => {
            setText(fullText.substring(0, text.length + 1));
          }, typeSpeed);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
          return () => clearTimeout(timeout);
        }
      } else {
        if (text.length > 0) {
          const timeout = setTimeout(() => {
            setText(text.substring(0, text.length - 1));
          }, deleteSpeed);
          return () => clearTimeout(timeout);
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timeout = setTimeout(type, 100);
    return () => clearTimeout(timeout);
  }, [text, currentRole, isDeleting]);

  return (
    <motion.div className="h-8 md:h-10">
      <motion.h3 className="text-xl md:text-2xl font-semibold text-purple-400">
        <span>{text}</span>
        <span className="inline-block w-0.5 h-6 md:h-8 bg-purple-400 ml-1 animate-pulse"></span>
      </motion.h3>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-16" id="home">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="section-container">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content */}
          <motion.div className="md:w-1/2">
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-medium text-gray-200"
            >
              Hi, I'm
            </motion.h2>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold gradient-text mt-2 mb-4"
            >
              Mayank Raj
            </motion.h1>
            <motion.div variants={itemVariants} className="mb-6">
              <TypewriterText />
            </motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed"
            >
              I create stunning digital experiences with modern technologies. Specializing in 
              React, JavaScript, and full-stack web development, I build responsive, 
              accessible, and performant applications that solve real-world problems.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                href="#contact" 
                className="cyberpunk-button flex items-center gap-2"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Send size={16} />
                Hire Me
              </motion.a>
              <motion.a 
                href="https://drive.google.com/file/d/1oUvQMp813DU6bez49jdL2fXaQBU9kiQf/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Mayank_Raj_Resume.pdf"
                className="cyberpunk-button bg-transparent border border-purple-500 flex items-center gap-2 hover:bg-purple-900/30"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Profile image with tilt effect */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={itemVariants}
          >
            <Tilt options={defaultTiltOptions} className="w-full max-w-md">
              <motion.div 
                className="relative rounded-full p-2 bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-xl shadow-purple-900/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full blur-md opacity-70"></div>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-full"></div>
                <motion.div 
                  className="relative rounded-full overflow-hidden border-2 border-purple-400/50 aspect-square"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={profileImage}
                    alt="Mayank Raj" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;