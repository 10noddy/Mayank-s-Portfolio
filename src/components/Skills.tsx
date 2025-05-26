import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';

interface TechSkill {
  name: string;
  icon: string;
}

interface SoftSkill {
  name: string;
  description: string;
}

interface SkillCardProps {
  skill: TechSkill;
}

interface SoftSkillCardProps {
  skill: SoftSkill;
}

interface SkillSectionProps {
  title: string;
  skills: TechSkill[];
}

interface SoftSkillSectionProps {
  title: string;
  skills: SoftSkill[];
}

const tiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
  glare: true,
  "max-glare": 0.2,
};

// Programming Languages
const programmingLanguages = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
];

// Frontend Skills
const frontendSkills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
];

// Backend Skills
const backendSkills = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

// Developer Tools
const devTools = [
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "JIRA", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Cursor AI", icon: "https://cursor.sh/favicon.ico" },
];

// Soft Skills
const softSkills = [
  {
    name: "Problem Solving",
    description: "Ability to analyze complex problems and develop effective solutions"
  },
  {
    name: "Teamwork",
    description: "Strong collaboration skills and ability to work effectively in cross-functional teams"
  },
  {
    name: "Communication",
    description: "Clear and effective communication in both technical and non-technical contexts"
  },
  {
    name: "Adaptability",
    description: "Quick to adapt to new technologies and changing project requirements"
  },
  {
    name: "Analytical Thinking",
    description: "Strong analytical skills with attention to detail and logical problem-solving"
  },
  {
    name: "Planning",
    description: "Excellent organizational and project planning capabilities"
  }
];

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <Tilt options={tiltOptions}>
      <div className="cyberpunk-card p-6">
        <div className="flex flex-col items-center">
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-12 h-12 mb-4 filter drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"
          />
          <h3 className="text-lg font-semibold text-purple-300">{skill.name}</h3>
        </div>
      </div>
    </Tilt>
  );
};

const SkillSection: React.FC<SkillSectionProps> = ({ title, skills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center gradient-text">{title}</h3>
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const SoftSkillCard: React.FC<SoftSkillCardProps> = ({ skill }) => {
  return (
    <Tilt options={tiltOptions}>
      <div className="cyberpunk-card p-6 h-full bg-black/50 backdrop-blur-lg border border-purple-500/20">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-bold mb-3 gradient-text">{skill.name}</h3>
          <p className="text-gray-400 text-sm flex-grow">{skill.description}</p>
        </div>
      </div>
    </Tilt>
  );
};

const SoftSkillSection: React.FC<SoftSkillSectionProps> = ({ title, skills }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center gradient-text">{title}</h3>
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skills.map((skill: SoftSkill, index: number) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="h-full"
          >
            <SoftSkillCard skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-24 relative">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
      
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          My Skills
        </motion.h2>
        
        <div className="space-y-16">
          <SkillSection title="Programming Languages" skills={programmingLanguages} />
          <SkillSection title="Frontend Development" skills={frontendSkills} />
          <SkillSection title="Backend Development" skills={backendSkills} />
          <SkillSection title="Developer Tools" skills={devTools} />
          <SoftSkillSection title="Soft Skills" skills={softSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;