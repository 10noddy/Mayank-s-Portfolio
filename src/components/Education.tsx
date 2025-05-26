import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';

const educationData = [
  {
    degree: "BTech in Computer Science",
    institution: "Kalinga Institute of Industrial Technology",
    location: "Bhubaneswar, India",
    period: "2022 - Present",
    description: "Currently pursuing Bachelor's in Computer Science with a CGPA of 8.13. Studying core computer science subjects including Data Structures and Algorithms, Operating Systems, Object Oriented Programming, and Database Management Systems.",
  },
  {
    degree: "12th in Mathematics, CBSE",
    institution: "DAV BSEB",
    location: "Patna, India",
    period: "2021 - 2022",
    description: "Completed senior secondary education with 79.3% marks.",
  },
  {
    degree: "High School Education, CBSE ",
    institution: "Gyan Niketan",
    location: "Patna, India",
    period: "2019 - 2020",
    description: "Completed high school education with 92% marks.",
  }
];

const certificationData = [
  {
    name: "Strategy and Game Theory for Management",
    issuer: "Coursera",
    date: "Jan 2025",
    link: "https://www.coursera.org/account/accomplishments/verify/QDSZH7SIPBKU"
  },
  {
    name: "Business Analytics for Decision Making",
    issuer: "Coursera",
    date: "Dec 2024",
    link: "https://www.coursera.org/account/accomplishments/verify/V0S38JGGUTU3"
  },
  {
    name: "Foundations: Data, Data, Everywhere by Google",
    issuer: "Coursera",
    date: "June 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/83JQR9ZENJQB"
  },
  {
    name: "AICTE Virtual Internship: AI-ML Virtual Internship",
    issuer: "AWS",
    date: "Mar 2025",
    link: "https://aictecert.eduskillsfoundation.org/pages/home/verify.php?cert=f4f788c62e64dc3215cc3d4dd1693f70"
  }
];

const EducationItem = ({ item }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6 }}
      className="cyberpunk-card relative pl-8 p-6 ml-6 mb-8 last:mb-0 before:content-[''] before:absolute before:left-[-8px] before:top-8 before:w-4 before:h-4 before:bg-purple-600 before:rounded-full before:z-10 before:border-2 before:border-purple-300"
    >
      <div className="absolute left-[-40px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/80 to-purple-600/20"></div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold gradient-text">{item.degree}</h3>
          <p className="text-purple-300 flex items-center gap-2 mt-1">
            <GraduationCap size={16} />
            {item.institution}, {item.location}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <p className="text-gray-400 flex items-center gap-2 text-sm bg-purple-900/30 px-3 py-1 rounded-full inline-flex">
            <Calendar size={14} />
            {item.period}
          </p>
        </div>
      </div>
      
      <p className="text-gray-300">{item.description}</p>
    </motion.div>
  );
};

const CertificationItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cyberpunk-card p-5 hover:translate-y-[-5px] transition-transform duration-300"
    >
      <h3 className="text-lg font-bold text-purple-300 mb-1">{item.name}</h3>
      <div className="flex justify-between items-center mb-3">
        <p className="text-gray-400 text-sm">{item.issuer}</p>
        <p className="text-gray-500 text-xs bg-purple-900/30 px-2 py-1 rounded-full">{item.date}</p>
      </div>
      <a 
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
      >
        <ExternalLink size={14} />
        View Certificate
      </a>
    </motion.div>
  );
};

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-24 relative">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Education & Certifications
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left gradient-text">Academic Background</h3>
            <div className="relative">
              {educationData.map((item, index) => (
                <EducationItem key={index} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left gradient-text">Certifications</h3>
            <div className="grid gap-6">
              {certificationData.map((item, index) => (
                <CertificationItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;