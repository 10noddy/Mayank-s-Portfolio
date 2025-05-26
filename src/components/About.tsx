import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Code, Globe, Users } from 'lucide-react';

const aboutItems = [
  {
    icon: <Code size={24} className="text-purple-400" />,
    title: "Full Stack Development",
    description: "I develop both client and server software, mastering frontend and backend technologies."
  },
  {
    icon: <Globe size={24} className="text-purple-400" />,
    title: "Web Applications",
    description: "I create responsive, performant web applications with modern frameworks and techniques."
  },
  {
    icon: <Zap size={24} className="text-purple-400" />,
    title: "Performance Optimization",
    description: "I optimize applications for speed, efficiency, and exceptional user experience."
  },
  {
    icon: <Users size={24} className="text-purple-400" />,
    title: "Team Collaboration",
    description: "I thrive in collaborative environments, working effectively with cross-functional teams."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Purple glow in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="section-container relative z-10">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* About text */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="cyberpunk-card p-8"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">My Journey</h3>
           
            <p className="text-gray-300 mb-4">
              My approach to development is holistic - I believe in creating applications that not only look great but also perform flawlessly. I constantly stay updated with the latest technologies and best practices to deliver cutting-edge solutions.
            </p>
            <p className="text-gray-300">
              Whether working on complex enterprise applications or creative personal projects, I bring the same level of dedication, attention to detail, and technical expertise to everything I build.
            </p>
          </motion.div>
          
          {/* About items */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {aboutItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="cyberpunk-card p-6"
              >
                <motion.div 
                  className="bg-purple-900/30 p-3 rounded-lg inline-block mb-3"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-purple-300">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;