import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="fixed inset-0 bg-[url('./assets/grid.svg')] bg-repeat opacity-10 z-0 pointer-events-none"></div>
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0 pointer-events-none"></div>
      
      {/* Content container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;