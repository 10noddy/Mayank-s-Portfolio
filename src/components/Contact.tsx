import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MapPin, Mail, Phone, Linkedin, Github, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const formFieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const socialLinkVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { 
    scale: 1.1, 
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  },
  tap: { scale: 0.95 }
};

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message?: string} | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map form field names to state field names
    const fieldMapping: { [key: string]: string } = {
      'user_name': 'name',
      'user_email': 'email'
    };
    
    const stateField = fieldMapping[name] || name;
    setFormData(prev => ({ ...prev, [stateField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      if (!form.current) return;

      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setSubmitStatus({ 
          success: true, 
          message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <MapPin size={20} />, text: "Patna, Bihar, India" },
    { icon: <Mail size={20} />, text: "mayank.raj17404@gmail.com" },
    { icon: <Phone size={20} />, text: "+91-8102549284" },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/mayank-raj-180845252/", label: "LinkedIn" },
    { icon: <Github size={20} />, url: "https://github.com/10noddy", label: "GitHub" },
    { icon: <Instagram size={20} />, url: "https://www.instagram.com/btwitsmayank6321/", label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-purple-900/20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      
      <div className="section-container relative z-10">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div 
              className="cyberpunk-card p-8"
              variants={cardVariants}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 gradient-text"
                variants={itemVariants}
              >
                Send Me a Message
              </motion.h3>
              
              <form ref={form} onSubmit={handleSubmit}>
                <motion.div 
                  className="mb-4"
                  variants={formFieldVariants}
                >
                  <label htmlFor="name" className="block text-purple-300 mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-purple-900/50 focus:border-purple-500 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  variants={formFieldVariants}
                >
                  <label htmlFor="email" className="block text-purple-300 mb-2 text-sm">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-purple-900/50 focus:border-purple-500 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  variants={formFieldVariants}
                >
                  <label htmlFor="subject" className="block text-purple-300 mb-2 text-sm">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-purple-900/50 focus:border-purple-500 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  variants={formFieldVariants}
                >
                  <label htmlFor="message" className="block text-purple-300 mb-2 text-sm">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full bg-black/50 border border-purple-900/50 focus:border-purple-500 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all duration-300"
                  ></textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyberpunk-button w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 p-3 rounded-md ${
                        submitStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div 
              className="cyberpunk-card p-8"
              variants={cardVariants}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 gradient-text"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-4"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="bg-purple-900/30 p-3 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.4)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="cyberpunk-card p-8"
              variants={cardVariants}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 gradient-text"
                variants={itemVariants}
              >
                Follow Me
              </motion.h3>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 py-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/40 transition-colors duration-300"
                    variants={socialLinkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div 
                      className="text-purple-400"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;