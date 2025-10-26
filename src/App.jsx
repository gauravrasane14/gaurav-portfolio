import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code, Plane, Mail, Phone, MapPin, Github, Linkedin, Instagram, Calendar, Award, Briefcase, GraduationCap, Lightbulb, ExternalLink, ChevronRight, Trophy, Users, BookOpen, FileText, Brain, Terminal, Cpu, Zap, Rocket, Camera } from 'lucide-react';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

// Real Resume Data
const techieData = {
  about: "I'm Gaurav Y. Rasane, a passionate Computer Engineering student with a stellar SGPA of 9.57 from Savitribai Phule Pune University. Ranked Top 5 at IIT Bombay's National Entrepreneurship Challenge and consistently a top-performing student across all academic years.",
  education: {
    degree: "Bachelor of Engineering in Computer Engineering",
    university: "Savitribai Phule Pune University",
    sgpa: "9.57",
    period: "Nov 2022 - Ongoing",
    location: "Pune, Maharashtra, India",
    hsc: { score: "84.00%", year: "2022" },
    ssc: { score: "94.80%", year: "2020" }
  },
  skills: {
    technical: [
      { name: "Python", level: 90, icon: "🐍" },
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "HTML & CSS", level: 90, icon: "🎨" },
      { name: "C++", level: 80, icon: "⚙️" },
      { name: "Java", level: 75, icon: "☕" },
      { name: "MySQL", level: 80, icon: "🗄️" },
      { name: "MongoDB", level: 75, icon: "🍃" },
      { name: "GitHub", level: 85, icon: "🔧" }
    ],
    research: ["Academic Research", "Technical Documentation", "Surveys", "MS Office"],
    nonTechnical: ["Problem Solving", "Communication", "Adaptability", "Time Management", "Leadership"]
  },
  projects: [
    {
      title: "Pune House Price Predictor",
      description: "ML web application with Flask backend for real estate price prediction",
      tech: ["Python", "Scikit-Learn", "Flask", "JavaScript"],
      github: "#"
    },
    {
      title: "Computer Department Website",
      description: "Professional departmental website with optimized performance",
      tech: ["HTML", "CSS", "JavaScript", "GitHub"],
      link: "#"
    },
    {
      title: "Zeal Startups Platform",
      description: "Centralized project showcase platform with responsive design",
      tech: ["HTML", "CSS", "JavaScript", "Canva"],
      link: "#"
    }
  ],
  achievements: [
    { title: "Top 5 at IIT Bombay", desc: "National Entrepreneurship Challenge among 1000+ teams", color: "yellow" },
    { title: "IIT Madras Selection", desc: "Global Hyperloop Competition", color: "blue" },
    { title: "SGPA 9.57", desc: "Consistent Top Performer", color: "purple" },
    { title: "Subject Ranker", desc: "Engineering Physics & Chemistry", color: "green" }
  ],
  leadership: [
    { role: "Documentation Head", org: "E-Cell ZCOER" },
    { role: "Campus Ambassador", org: "E-Cell IIT Bombay" },
    { role: "NSS Coordinator", org: "ZCOER" }
  ]
};

const travelerData = {
  bio: "When I'm not coding, you'll find me exploring new destinations, immersing myself in different cultures. Travel fuels my creativity and broadens my perspective.",
  places: 15,
  states: 8,
  gallery: [
    { 
      id: 1, 
      location: "Baralacha La Pass 16040ft", 
      color: "from-orange-400 via-red-400 to-pink-500",
      photos: [
        { id: 1, title: "Gateway of India", image: "/images/travel/demo.webp", color: "from-orange-500 to-red-500" },
        { id: 2, title: "Marine Drive", image: "/images/travel/mumbai/marine-drive.jpg", color: "from-blue-500 to-cyan-500" },
        { id: 3, title: "Taj Hotel", image: "/images/travel/mumbai/taj-hotel.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 4, title: "Colaba Market", image: "/images/travel/mumbai/colaba.jpg", color: "from-pink-500 to-purple-500" }
      ]
    },
    { 
      id: 2, 
      location: "Goa", 
      color: "from-blue-400 via-cyan-400 to-teal-500",
      photos: [
        { id: 1, title: "Baga Beach", image: "/images/travel/goa/baga-beach.jpg", color: "from-cyan-500 to-blue-500" },
        { id: 2, title: "Fort Aguada", image: "/images/travel/goa/fort-aguada.jpg", color: "from-orange-500 to-red-500" },
        { id: 3, title: "Anjuna Flea Market", image: "/images/travel/goa/anjuna.jpg", color: "from-purple-500 to-pink-500" },
        { id: 4, title: "Dudhsagar Falls", image: "/images/travel/goa/dudhsagar.jpg", color: "from-green-500 to-teal-500" }
      ]
    },
    { 
      id: 3, 
      location: "Rajasthan", 
      color: "from-yellow-400 via-orange-400 to-red-500",
      photos: [
        { id: 1, title: "Amber Fort", image: "/images/travel/rajasthan/amber-fort.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 2, title: "Hawa Mahal", image: "/images/travel/rajasthan/hawa-mahal.jpg", color: "from-pink-500 to-red-500" },
        { id: 3, title: "Jal Mahal", image: "/images/travel/rajasthan/jal-mahal.jpg", color: "from-blue-500 to-purple-500" },
        { id: 4, title: "City Palace", image: "/images/travel/rajasthan/city-palace.jpg", color: "from-orange-500 to-pink-500" }
      ]
    },
    { 
      id: 4, 
      location: "Pune Hills", 
      color: "from-green-400 via-emerald-400 to-teal-500",
      photos: [
        { id: 1, title: "Sinhagad Fort", image: "/images/travel/pune/sinhagad.jpg", color: "from-green-500 to-emerald-500" },
        { id: 2, title: "Lonavala", image: "/images/travel/pune/lonavala.jpg", color: "from-teal-500 to-cyan-500" },
        { id: 3, title: "Khandala Ghats", image: "/images/travel/pune/khandala.jpg", color: "from-blue-500 to-green-500" },
        { id: 4, title: "Pawna Lake", image: "/images/travel/pune/pawna-lake.jpg", color: "from-cyan-500 to-blue-500" }
      ]
    },
    { 
      id: 5, 
      location: "Delhi", 
      color: "from-red-400 via-pink-400 to-purple-500",
      photos: [
        { id: 1, title: "India Gate", image: "/images/travel/delhi/india-gate.jpg", color: "from-orange-500 to-red-500" },
        { id: 2, title: "Red Fort", image: "/images/travel/delhi/red-fort.jpg", color: "from-red-500 to-pink-500" },
        { id: 3, title: "Qutub Minar", image: "/images/travel/delhi/qutub-minar.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 4, title: "Lotus Temple", image: "/images/travel/delhi/lotus-temple.jpg", color: "from-pink-500 to-purple-500" }
      ]
    },
    { 
      id: 6, 
      location: "Bangalore", 
      color: "from-purple-400 via-indigo-400 to-blue-500",
      photos: [
        { id: 1, title: "Lalbagh Garden", image: "../images/travel/bangalore/lalbagh.jpg", color: "from-green-500 to-emerald-500" },
        { id: 2, title: "Cubbon Park", image: "/images/travel/bangalore/cubbon-park.jpg", color: "from-teal-500 to-cyan-500" },
        { id: 3, title: "Vidhana Soudha", image: "/images/travel/bangalore/vidhana-soudha.jpg", color: "from-purple-500 to-indigo-500" },
        { id: 4, title: "Tech Parks", image: "/images/travel/bangalore/tech-parks.jpg", color: "from-blue-500 to-purple-500" }
      ]
    }
  ],
  posts: [
    
    { title: "IIT Madras Journey", date: "Apr 2024", excerpt: "Hyperloop research and presentation..." },
    { title: "Maharashtra's Gems", date: "Dec 2024", excerpt: "Exploring diverse landscapes..." },
    { title: "IIT Bombay Experience", date: "FEB 2025", excerpt: "I went to IIT Bombay for E-Summit 2k25, and those three days felt like stepping into another world. I stayed in Hostel 17, where every corridor buzzed with stories and laughter from people chasing big dreams. The H17 mess became our mini-hangout — simple food, but somehow it tasted better when shared with new friends. Days were packed with energy. The Lecture Hall Complex turned into a hub of inspiration — speakers, startup founders, and innovators filled the air with ideas that made me want to build something of my own. Evenings brought calm; we sat under the stars at the Open Air Theater, cheering, clapping, and soaking in the vibe that only IIT Bombay can offer. Between sessions, I explored the campus — climbed the small hill, watched the sunset over Powai Lake, and realized how beautiful this place truly is. By the end of those three days, I didn’t just attend an event — I carried back a spark, the IITB spirit that whispers, Dream bold, and make it happen." }
    
  ]
};

// Animated Grid Background
const GridBackground = ({ mode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px), linear-gradient(90deg, ${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
};

// Floating Particles
const FloatingParticles = ({ mode }) => {
  const particles = Array.from({ length: 20 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${mode === 'techie' ? 'bg-blue-500' : 'bg-orange-500'}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Welcome Screen
const WelcomeScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            GaRa
          </div>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.p
          className="text-2xl text-white/90 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Gaurav Y. Rasane
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-2 text-blue-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Terminal size={20} />
          <span>Initializing...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Header with Toggle
const Header = () => {
  const { mode, setMode, theme, setTheme, menuOpen, setMenuOpen } = useAppContext();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? mode === 'techie' 
            ? 'bg-black/80 border-blue-500/30' 
            : 'bg-black/80 border-orange-500/30'
          : mode === 'techie'
            ? 'bg-white/80 border-blue-500/30'
            : 'bg-white/80 border-orange-500/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              GaRa
            </div>
            <motion.div
              className={`absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity ${
                mode === 'techie' ? 'bg-blue-500/30' : 'bg-orange-500/30'
              }`}
            />
          </motion.div>

          {/* Main Toggle Switch */}
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border ${
            theme === 'dark'
              ? mode === 'techie'
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-orange-500/10 border-orange-500/30'
              : mode === 'techie'
                ? 'bg-blue-50 border-blue-300'
                : 'bg-orange-50 border-orange-300'
          }`}>
            <motion.button
              onClick={() => setMode('techie')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                mode === 'techie'
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={18} />
              <span className="hidden sm:inline">Techie Gaurav</span>
            </motion.button>

            <div className={`w-px h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />

            <motion.button
              onClick={() => setMode('traveler')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                mode === 'traveler'
                  ? theme === 'dark'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-orange-500 text-white'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plane size={18} />
              <span className="hidden sm:inline">Traveler Gaurav</span>
            </motion.button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-3 rounded-full backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-yellow-400'
                  : 'bg-black/5 border-black/10 text-gray-700'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-3 rounded-full backdrop-blur-xl border ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Sidebar with Neon Effect
const Sidebar = () => {
  const { mode, theme, menuOpen, setMenuOpen } = useAppContext();

  const techieItems = [
    { id: 'hero', label: 'Home', icon: <Rocket size={20} /> },
    { id: 'about', label: 'About', icon: <Lightbulb size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const travelerItems = [
    { id: 'hero', label: 'Home', icon: <Rocket size={20} /> },
    { id: 'about', label: 'About', icon: <Lightbulb size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <Plane size={20} /> },
    { id: 'stories', label: 'Stories', icon: <Calendar size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const items = mode === 'techie' ? techieItems : travelerItems;

  return (
    <motion.aside
      className={`fixed left-0 top-20 bottom-0 w-64 backdrop-blur-xl border-r z-30 ${
        menuOpen ? 'block' : 'hidden'
      } lg:block ${
        theme === 'dark'
          ? mode === 'techie'
            ? 'bg-black/80 border-blue-500/20'
            : 'bg-black/80 border-orange-500/20'
          : mode === 'techie'
            ? 'bg-white/80 border-blue-300'
            : 'bg-white/80 border-orange-300'
      } overflow-y-auto`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="p-4 space-y-2">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => {
              setMenuOpen(false);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 10 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                mode === 'techie'
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  : 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
              }`}
            />
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10">{item.label}</span>
            <motion.div
              className={`absolute right-4 w-1 h-1 rounded-full ${
                mode === 'techie' ? 'bg-blue-500' : 'bg-orange-500'
              } opacity-0 group-hover:opacity-100`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

// Hero Section
const HeroSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r ${
              mode === 'techie'
                ? 'from-blue-500 via-purple-500 to-pink-500'
                : 'from-orange-500 via-pink-500 to-purple-500'
            } bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            GAURAV
          </motion.div>

          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {mode === 'techie' ? (
              <>Computer Engineer <Cpu className="inline" size={32} /> Tech Enthusiast</>
            ) : (
              <>Travel Enthusiast <Plane className="inline" size={32} /> Nature Explorer</>
            )}
          </motion.h2>

          <motion.p
            className={`text-lg md:text-xl mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {mode === 'techie'
              ? 'Top 5 @ IIT Bombay • Full Stack Developer • ML Enthusiast'
              : '15+ Places Explored • 8 States • Infinite Memories'}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 rounded-full font-bold text-white backdrop-blur-xl relative overflow-hidden group ${
                mode === 'techie'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-orange-500 to-pink-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            <motion.a
              href="#projects"
              className={`px-8 py-4 rounded-full font-bold backdrop-blur-xl border-2 ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10'
                    : 'border-orange-500 text-orange-400 hover:bg-orange-500/10'
                  : mode === 'techie'
                    ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
                    : 'border-orange-500 text-orange-600 hover:bg-orange-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode === 'techie' ? 'View Projects' : 'Explore Gallery'}
            </motion.a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {mode === 'techie' ? (
              <>
                <StatCard icon={<Trophy />} value="9.57" label="SGPA" color={mode} theme={theme} />
                <StatCard icon={<Code />} value="8+" label="Projects" color={mode} theme={theme} />
                <StatCard icon={<Award />} value="Top 5" label="IIT Bombay" color={mode} theme={theme} />
              </>
            ) : (
              <>
                <StatCard icon={<MapPin />} value="15+" label="Places" color={mode} theme={theme} />
                <StatCard icon={<Plane />} value="8" label="States" color={mode} theme={theme} />
                <StatCard icon={<Calendar />} value="32" label="Stories" color={mode} theme={theme} />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label, color, theme }) => (
  <motion.div
    className={`p-6 rounded-2xl backdrop-blur-xl border ${
      theme === 'dark'
        ? color === 'techie'
          ? 'bg-blue-500/10 border-blue-500/30'
          : 'bg-orange-500/10 border-orange-500/30'
        : color === 'techie'
          ? 'bg-blue-50 border-blue-300'
          : 'bg-orange-50 border-orange-300'
    }`}
    whileHover={{ y: -5, scale: 1.05 }}
  >
    <div className={`${color === 'techie' ? 'text-blue-500' : 'text-orange-500'} mb-2`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {value}
    </div>
    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      {label}
    </div>
  </motion.div>
);

// About Section with Glassmorphism
const AboutSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="about" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-5xl md:text-6xl font-black mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className={`bg-gradient-to-r ${
              mode === 'techie'
                ? 'from-blue-500 to-purple-500'
                : 'from-orange-500 to-pink-500'
            } bg-clip-text text-transparent`}>
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'bg-blue-500/5 border-blue-500/20'
                    : 'bg-orange-500/5 border-orange-500/20'
                  : mode === 'techie'
                    ? 'bg-blue-50/50 border-blue-200'
                    : 'bg-orange-50/50 border-orange-200'
              }`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'techie' ? '👨‍💻 Engineering Excellence' : '🌍 Travel Philosophy'}
              </h3>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {mode === 'techie'
                  ? techieData.about
                  : travelerData.bio}
              </p>
            </motion.div>

            <div className="space-y-4">
              {mode === 'techie' ? (
                <>
                  <InfoCard
                    icon={<GraduationCap />}
                    title="Education"
                    value={techieData.education.degree}
                    subtitle={`SGPA: ${techieData.education.sgpa}`}
                    theme={theme}
                    mode={mode}
                  />
                  <InfoCard
                    icon={<Trophy />}
                    title="Top Achievement"
                    value="Top 5 @ IIT Bombay"
                    subtitle="Among 1000+ teams"
                    theme={theme}
                    mode={mode}
                  />
                </>
              ) : (
                <>
                  <InfoCard
                    icon={<MapPin />}
                    title="Destinations"
                    value={`${travelerData.places}+ Places`}
                    subtitle={`Across ${travelerData.states} States`}
                    theme={theme}
                    mode={mode}
                  />
                  <InfoCard
                    icon={<Camera />}
                    title="Memories"
                    value="Countless"
                    subtitle="Photos & Stories"
                    theme={theme}
                    mode={mode}
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, value, subtitle, theme, mode }) => (
  <motion.div
    className={`p-6 rounded-2xl backdrop-blur-xl border ${
      theme === 'dark'
        ? mode === 'techie'
          ? 'bg-purple-500/10 border-purple-500/30'
          : 'bg-pink-500/10 border-pink-500/30'
        : mode === 'techie'
          ? 'bg-purple-50 border-purple-200'
          : 'bg-pink-50 border-pink-200'
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="flex items-start gap-4">
      <div className={`${mode === 'techie' ? 'text-purple-500' : 'text-pink-500'}`}>
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <div>
        <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </div>
        <div className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          {subtitle}
        </div>
      </div>
    </div>
  </motion.div>
);

// Skills Section with Hexagonal Grid
const SkillsSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="skills" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Tech Arsenal
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techieData.skills.technical.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`relative p-6 rounded-2xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
              } overflow-hidden group`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <div className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {skill.name}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {skill.level}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects with 3D Card Effect
const ProjectsSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {techieData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Code className="text-purple-500" size={32} />
                  <a href={project.github} className="text-gray-400 hover:text-purple-500 transition-colors">
                    <Github size={24} />
                  </a>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>

                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === 'dark'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements with Trophy Cards
const AchievementsSection = () => {
  const { theme } = useAppContext();

  const getColorClasses = (color) => {
    const colors = {
      yellow: theme === 'dark' 
        ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20' 
        : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      blue: theme === 'dark'
        ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
        : 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      purple: theme === 'dark'
        ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
        : 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      green: theme === 'dark'
        ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
        : 'bg-green-50 border-green-200 hover:bg-green-100'
    };
    return colors[color] || colors.yellow;
  };

  const getIconColor = (color) => {
    const colors = {
      yellow: 'text-yellow-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500'
    };
    return colors[color] || colors.yellow;
  };

  return (
    <section id="achievements" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Hall of Fame
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {techieData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className={`relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden group transition-all ${getColorClasses(achievement.color)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className="absolute -top-10 -right-10 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className={getIconColor(achievement.color)} size={120} />
              </motion.div>

              <div className="relative z-10">
                <Trophy className={`${getIconColor(achievement.color)} mb-4`} size={40} />
                <h3 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {achievement.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Travel Gallery
const GallerySection = () => {
  const { theme } = useAppContext();
  const [selected, setSelected] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleNext = () => {
    if (selected && currentPhotoIndex < selected.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const openGallery = (item) => {
    setSelected(item);
    setCurrentPhotoIndex(0);
  };

  const closeGallery = () => {
    setSelected(null);
    setCurrentPhotoIndex(0);
  };

  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Travel Gallery
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {travelerData.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${item.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openGallery(item)}
            >
              {item.photos[0].image ? (
                <img 
                  src={item.photos[0].image} 
                  alt={item.location}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm ${item.photos[0].image ? 'hover:bg-black/60 transition-all' : ''}`}>
                <MapPin size={40} className="text-white mb-3" />
                <div className="font-bold text-xl text-white">{item.location}</div>
                <div className="text-sm text-white/80 mt-2">{item.photos.length} Photos</div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
            >
              <motion.div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {/* Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors z-10"
                >
                  <X size={32} />
                </button>

                {/* Photo Counter */}
                <div className="absolute -top-12 left-0 text-white text-lg z-10">
                  {currentPhotoIndex + 1} / {selected.photos.length}
                </div>

                {/* Main Photo Display */}
                <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-black">
                  {selected.photos[currentPhotoIndex].image ? (
                    <img 
                      src={selected.photos[currentPhotoIndex].image}
                      alt={selected.photos[currentPhotoIndex].title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selected.photos[currentPhotoIndex].color} flex items-center justify-center ${selected.photos[currentPhotoIndex].image ? 'hidden' : 'flex'}`}>
                    <div className="text-center text-white">
                      <MapPin size={80} className="mx-auto mb-4" />
                      <div className="font-bold text-5xl mb-2">{selected.location}</div>
                      <div className="text-2xl opacity-80">{selected.photos[currentPhotoIndex].title}</div>
                      <div className="text-sm mt-4 opacity-60">Image placeholder - Add your photo!</div>
                    </div>
                  </div>
                  
                  {/* Photo Title Overlay */}
                  {selected.photos[currentPhotoIndex].image && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="text-white text-2xl font-bold">{selected.photos[currentPhotoIndex].title}</div>
                      <div className="text-white/80">{selected.location}</div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentPhotoIndex === 0}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${
                      currentPhotoIndex === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentPhotoIndex === selected.photos.length - 1}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${
                      currentPhotoIndex === selected.photos.length - 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    Next →
                  </button>
                </div> */

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 justify-center mt-6 overflow-x-auto pb-2">
                  {selected.photos.map((photo, index) => (
                    <motion.button
                      key={photo.id}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentPhotoIndex ? 'ring-4 ring-orange-500' : 'opacity-50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {photo.image ? (
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br ${photo.color} ${photo.image ? 'hidden' : 'block'}`} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Stories Section
const StoriesSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="stories" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Travel Stories
          </span>
        </motion.h2>

        <div className="space-y-6">
          {travelerData.posts.map((post, index) => (
            <motion.div
              key={post.title}
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-pink-500/10 border-pink-500/30'
                  : 'bg-pink-50 border-pink-300'
              }`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-start gap-4">
                <Calendar className="text-pink-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {post.title}
                  </h3>
                  <p className="text-pink-500 text-sm mb-3">{post.date}</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact with Neon Effect
const ContactSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="contact" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className={`bg-gradient-to-r ${
            mode === 'techie'
              ? 'from-blue-500 to-purple-500'
              : 'from-orange-500 to-pink-500'
          } bg-clip-text text-transparent`}>
            Let's Connect
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.a
            href="mailto:gauravrasane14@gmail.com"
            className={`p-8 rounded-3xl backdrop-blur-xl border ${
              theme === 'dark'
                ? mode === 'techie'
                  ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
                  : 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
            } transition-all group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Mail className={mode === 'techie' ? 'text-blue-500' : 'text-orange-500'} size={40} />
            <h3 className={`text-xl font-bold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Email
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              gauravrasane14@gmail.com
            </p>
          </motion.a>

          <motion.a
            href="tel:+917620984926"
            className={`p-8 rounded-3xl backdrop-blur-xl border ${
              theme === 'dark'
                ? mode === 'techie'
                  ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
                  : 'bg-pink-500/10 border-pink-500/30 hover:bg-pink-500/20'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
            } transition-all group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Phone className={mode === 'techie' ? 'text-purple-500' : 'text-pink-500'} size={40} />
            <h3 className={`text-xl font-bold mt-4 mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Phone
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              +91 76209 84926
            </p>
          </motion.a>
        </div>

        <motion.div
          className={`p-8 rounded-3xl backdrop-blur-xl border ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700'
              : 'bg-white border-gray-300'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center gap-6 mb-6">
            <motion.a
              href="https://github.com/gauravrasane14"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full ${
                mode === 'techie' ? 'bg-blue-500' : 'bg-orange-500'
              } text-white`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/gauravrasane14"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full ${
                mode === 'techie' ? 'bg-purple-500' : 'bg-pink-500'
              } text-white`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="https://instagram.com/gauravrasane14"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full ${
                mode === 'techie' ? 'bg-pink-500' : 'bg-purple-500'
              } text-white`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Instagram size={24} />
            </motion.a>
          </div>
          <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Pune, Maharashtra, India - 411041
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Main App
const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mode, setMode] = useState('techie');
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ mode, setMode, theme, setTheme, menuOpen, setMenuOpen }}>
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <AnimatePresence>
          {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
        </AnimatePresence>

        {!showWelcome && (
          <>
            <GridBackground mode={mode} />
            <FloatingParticles mode={mode} />
            <Header />
            <Sidebar />

            <main className="lg:ml-64 transition-all duration-300">
              <AnimatePresence mode="wait">
                {mode === 'techie' ? (
                  <motion.div
                    key="techie"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroSection />
                    <AboutSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <AchievementsSection />
                    <ContactSection />
                  </motion.div>
                ) : (
                  <motion.div
                    key="traveler"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroSection />
                    <AboutSection />
                    <GallerySection />
                    <StoriesSection />
                    <ContactSection />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <footer className={`lg:ml-64 py-8 text-center border-t ${
              theme === 'dark'
                ? 'bg-black/50 border-gray-800 text-gray-500'
                : 'bg-white/50 border-gray-200 text-gray-600'
            } backdrop-blur-xl`}>
              <p className="mb-2">© 2025 Gaurav Y. Rasane</p>
              <p className="text-sm">Crafted with React + Framer Motion</p>
            </footer>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;