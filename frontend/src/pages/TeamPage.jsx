import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Linkedin,
  Twitter,
  Github,
  ArrowLeft,
  Zap,
  Shield,
  Star,
  Hammer,
  Crown,
  Heart,
  Flame,
  Globe,
  Ghost,
  Eye,
  Target,
  Rocket,
  Sun,
  Aperture,
} from "lucide-react";

// Import Generated Assets
import bgAvengers from "../assets/comic_theme/bg_avengers_main.png"; 
import bgIronMan from "../assets/comic_theme/bg_ironman.png";
import bgCap from "../assets/comic_theme/bg_cap.png";
import bgHulk from "../assets/comic_theme/bg_hulk.png";
import bgThor from "../assets/comic_theme/bg_thor.png";
import bgPanther from "../assets/comic_theme/bg_panther.png";
import bgWidow from "../assets/comic_theme/bg_widow.png";
import bgSpiderman from "../assets/comic_theme/bg_spiderman.png";
import bgStrange from "../assets/comic_theme/bg_strange.png";
import bgCaptainMarvel from "../assets/comic_theme/bg_captainmarvel.png";
import bgWolverine from "../assets/comic_theme/bg_wolverine.png";
import bgDeadpool from "../assets/comic_theme/bg_deadpool.png";
import bgScarletWitch from "../assets/comic_theme/bg_scarletwitch.png";
import bgVision from "../assets/comic_theme/bg_vision.png";
// Note: Ant-Man, Hawkeye, Star-Lord failed generation, using placeholders for now if assigned
// import bgAntMan from "../assets/comic_theme/bg_antman.png";
// import bgHawkeye from "../assets/comic_theme/bg_hawkeye.png";
// import bgStarlord from "../assets/comic_theme/bg_starlord.png";

import portraitIron from "../assets/comic_theme/portrait_ironman.png";
import portraitCap from "../assets/comic_theme/portrait_cap.png";
import portraitHulk from "../assets/comic_theme/portrait_hulk.png";
import portraitThor from "../assets/comic_theme/portrait_thor.png";
import portraitPanther from "../assets/comic_theme/portrait_panther.png";
import portraitWidow from "../assets/comic_theme/portrait_widow.png";

gsap.registerPlugin(ScrollTrigger);

const MARVEL_THEMES = [
  {
    name: "iron-man",
    primary: "#D2161E",
    secondary: "#D2161E",
    accent: "#FFFFFF",
    gradient: "from-[#D2161E] to-[#800000]",
    icon: Zap,
    alias: "The Armored Avid",
    bg: bgIronMan,
  },
  {
    name: "captain-america",
    primary: "#1976D2",
    secondary: "#1976D2",
    accent: "#FFFFFF",
    gradient: "from-[#1976D2] to-[#0D47A1]",
    icon: Shield,
    alias: "The First Developer",
    bg: bgCap,
  },
  {
    name: "hulk",
    primary: "#4CAF50",
    secondary: "#81C784",
    accent: "#1B5E20",
    gradient: "from-[#4CAF50] to-[#1B5E20]",
    icon: Star,
    alias: "The Incredible Coder",
    bg: bgHulk,
  },
  {
    name: "thor",
    primary: "#00BCD4",
    secondary: "#B0BEC5",
    accent: "#FFD700",
    gradient: "from-[#00BCD4] to-[#006064]",
    icon: Hammer,
    alias: "God of Backend",
    bg: bgThor,
  },
  {
    name: "black-panther",
    primary: "#9C27B0",
    secondary: "#9C27B0",
    accent: "#212121",
    gradient: "from-[#9C27B0] to-[#4A148C]",
    icon: Crown,
    alias: "King of Design",
    bg: bgPanther,
  },
  {
    name: "black-widow",
    primary: "#E62429",
    secondary: "#111111",
    accent: "#FFFFFF",
    gradient: "from-[#E62429] to-[#111111]",
    icon: Heart,
    alias: "The Silent Fixer",
    bg: bgWidow,
  },
  // New Themes
  {
    name: "spiderman",
    primary: "#F44336",
    secondary: "#2196F3",
    icon: Globe,
    alias: "The Web Head",
    bg: bgSpiderman,
  },
  {
    name: "doctor-strange",
    primary: "#673AB7",
    secondary: "#FF9800",
    icon: Eye,
    alias: "Sorcerer Supreme",
    bg: bgStrange,
  },
  {
    name: "captain-marvel",
    primary: "#FFC107",
    secondary: "#D32F2F",
    icon: Sun, // best fit for Star/Sun
    alias: "Binary Power",
    bg: bgCaptainMarvel,
  },
  {
    name: "wolverine",
    primary: "#FFEB3B",
    secondary: "#212121",
    icon: Flame, // Claws/Rage
    alias: "The Best There Is",
    bg: bgWolverine,
  },
  {
    name: "deadpool",
    primary: "#D32F2F",
    secondary: "#212121",
    icon: Target,
    alias: "Merc With a Mouth",
    bg: bgDeadpool,
  },
  {
    name: "scarlet-witch",
    primary: "#C2185B",
    secondary: "#000000",
    icon: Ghost, // Magic/Mystic
    alias: "Chaos Magic",
    bg: bgScarletWitch,
  },
  {
    name: "vision",
    primary: "#4CAF50",
    secondary: "#E91E63",
    icon:  Aperture,
    alias: "The Synthezoid",
    bg: bgVision,
  },
  // Fallbacks for missing generated assets
  {
    name: "ant-man",
    primary: "#E53935",
    secondary: "#BDBDBD",
    icon: Rocket,
    alias: "Small But Mighty",
    bg: bgAvengers, // Fallback
  },
  {
    name: "hawkeye",
    primary: "#7B1FA2",
    secondary: "#212121",
    icon: Target,
    alias: "The Sharpshooter",
    bg: bgAvengers, // Fallback
  },
  {
    name: "starlord",
    primary: "#5C6BC0",
    secondary: "#FBC02D",
    icon: Rocket,
    alias: "Star-Lord",
    bg: bgAvengers, // Fallback
  }
];

const TeamMemberCard = ({ member, index, setActiveBg }) => {
  const cardRef = useRef(null);
  const theme = MARVEL_THEMES[index % MARVEL_THEMES.length];
  const Icon = theme.icon;

  const [isHovered, setIsHovered] = useState(false);

  const DARK_THEME_NAMES = ["black-widow", "wolverine", "hawkeye", "scarlet-witch", "captain-america", "iron-man", "black-panther", "deadpool"];
  const isDarkTheme = DARK_THEME_NAMES.includes(theme.name);

  const handleInteractionStart = () => {
    setIsHovered(true);
    setActiveBg(theme.bg);
    gsap.to(cardRef.current, {
      y: -15,
      scale: 1.05,
      rotation: Math.random() * 4 - 2, // More erratic comic rotation
      boxShadow: `16px 16px 0px 0px ${theme.primary}`,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleInteractionEnd = () => {
    setIsHovered(false);
    setActiveBg(null); // Reset to default
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotation: 0,
      borderColor: "black",
      boxShadow: "8px 8px 0px 0px #000000",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setActiveBg(null); // Reset to default
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotation: 0,
      borderColor: "black",
      boxShadow: "8px 8px 0px 0px #000000",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onClick={() => isHovered ? handleInteractionEnd() : handleInteractionStart()} // Toggle for touch
      className="relative bg-white border-4 border-black p-4 group cursor-pointer h-full transition-colors duration-300"
      style={{
        boxShadow: "8px 8px 0px 0px #000000",
      }}
    >
      {/* Comic Corner Accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-black z-10 transition-colors duration-300"
        style={{ 
          backgroundColor: theme.secondary,
          boxShadow: "inset 0 0 0 2px white"
         }}
      >
        <div
          className="absolute top-2 right-2 font-black text-xs"
          style={{
            color: isDarkTheme ? "white" : "black",
          }}
        >
          #{index + 1}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square mb-4 border-4 border-black overflow-hidden bg-gray-900 transition-colors duration-300">
        <div
          className="absolute inset-0 halftone-pattern opacity-40 mix-blend-overlay pointer-events-none"
          style={{ "--color-marvel-red": theme.primary }}
        />
        {/* Comic Portrait (Default) */}
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        
        {/* Real Person Photo (Reveal on Hover) */}
        <img 
            src={member.realImage} 
            alt={`Real photo of ${member.name}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Comic Speed Lines Overlay on Hover - only over comic image essentially, or maybe both? user said "dont change anything for the background" implying effects might stay? 
           If I put speed lines *over* the real photo it might look cool/comic-integrated. Let's keep it consistent.
           Actually, the speed lines are `group-hover:opacity-60`. If `isHovered` is true, we see the real photo.
           Having speed lines over a real photo might look weird if not styled.
           I'll keep them as is. They will be on top of the generic real photo.
        */}
        {/* Comic Speed Lines Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-60 speed-lines transition-opacity duration-300 pointer-events-none" />

        {/* Alias Badge */}
        <div
          className="absolute bottom-0 left-0 right-0 py-2 px-2 border-t-4 border-black text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{ backgroundColor: theme.secondary }}
        >
          <span 
            className="text-xs sm:text-sm font-black uppercase tracking-widest drop-shadow-md"
            style={{
                color: isDarkTheme ? "white" : "black",
            }}
          >
            {theme.alias}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-2xl sm:text-3xl font-black italic uppercase leading-none wrap-break-word w-full"
            style={{
              color: "black",
              textShadow: `1px 1px 0px ${theme.secondary}`,
            }}
          >
            {member.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
             <Icon className="w-6 h-6 border-2 border-black rounded-full p-1 bg-white" style={{ color: theme.primary }} />
             <div
            className="inline-block px-3 py-1 border-2 border-black transform -skew-x-12"
            style={{ backgroundColor: theme.secondary }}
            >
            <span 
              className="block transform skew-x-12 font-bold text-xs uppercase tracking-wider"
              style={{
                color: isDarkTheme ? "white" : "black",
              }}
            >
                {member.role}
            </span>
            </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mt-4 pt-4 border-t-4 border-dotted border-black">
          {[
            { Icon: Linkedin, href: "#" },
            { Icon: Twitter, href: "#" },
            { Icon: Github, href: "#" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-all duration-200 group-social text-black"
              style={{
                "--hover-bg": theme.secondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.secondary;
                if (isDarkTheme) e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              }}
            >
              <social.Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeBg, setActiveBg] = useState(null);
  const containerRef = useRef(null);

  const teamMembers = [
    { name: "Kaif Khurshid", role: "Lead Organizer", image: portraitIron, realImage: "https://placehold.co/400x400/png" },
    { name: "Ishan Roy", role: "Tech Lead", image: portraitCap, realImage: "https://placehold.co/400x400/png" },
    { name: "Manish Nanda", role: "Design Head", image: portraitHulk, realImage: "https://placehold.co/400x400/png" },
    { name: "Simran Osta", role: "Marketing Lead", image: portraitThor, realImage: "https://placehold.co/400x400/png" },
    { name: "Suraj Maharana", role: "Logistics", image: portraitPanther, realImage: "https://placehold.co/400x400/png" },
    { name: "Rhea Bachheti", role: "Sponsorships", image: portraitWidow, realImage: "https://placehold.co/400x400/png" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulating load for animation sync
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".team-title-char", {
          y: 150,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        });

        gsap.from(".team-card", {
          y: 200,
          opacity: 0,
          scale: 0.5,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.2)",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative pt-32 pb-20 lg:pt-36 overflow-x-hidden bg-black"
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
         {/* Base Layer (Avengers) - Fixed Positioning */}
        <div
            className={`absolute inset-0 bg-cover bg-top transition-opacity duration-500 ease-in-out ${activeBg ? "opacity-0" : "opacity-100"}`}
            style={{ 
                backgroundImage: `url(${bgAvengers})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center'
            }}
        />
        {/* Active Layer (Individual) */}
        <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out ${activeBg ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${activeBg})` }}
        />
        
        {/* Comic Overlays */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-black/60 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="inline-block px-6 py-2 border-4 border-black bg-yellow-400 shadow-[6px_6px_0px_#000] mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
              <span className="text-black font-black uppercase tracking-widest text-sm sm:text-base">
                Synchronize 4.0 // Tech Fest
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black italic uppercase leading-none flex flex-wrap gap-x-4 mix-blend-hard-light text-white drop-shadow-[4px_4px_0px_#000]">
              {"MEET THE SQUAD".split(" ").map((word, i) => (
                <span key={i} className="flex">
                  {word.split("").map((char, j) => (
                    <span
                      key={j}
                      className="team-title-char inline-block hover:text-yellow-400 transition-colors duration-200"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="mt-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#ED1D24] max-w-2xl transform skew-x-6 hover:skew-x-0 transition-transform">
               <p className="text-xl sm:text-2xl font-bold text-black uppercase italic">
              "Heroes aren't born. They're built,<br/>one commit at a time."
                </p>
            </div>
            
          </div>

          <Link
            to="/"
            className="group relative px-8 py-5 bg-red-600 text-white font-black text-xl uppercase tracking-wider hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all duration-200 border-4 border-black self-start md:self-auto"
          >
            <span className="flex items-center gap-2 relative z-10 whitespace-nowrap">
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              HQ Return
            </span>
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card h-full">
              <TeamMemberCard member={member} index={index} setActiveBg={setActiveBg} />
            </div>
          ))}
        </div>

        {/* Comic Footer Decoration */}
        <div className="mt-20 text-center relative">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-black -z-10 transform -translate-y-1/2"></div>
          <div className="inline-block px-12 py-6 bg-blue-600 border-4 border-black shadow-[10px_10px_0px_#000] transform rotate-2 hover:scale-110 transition-transform cursor-help">
            <span className="text-2xl font-black uppercase italic tracking-wider text-white">
              MORE HEROES INCOMING...
            </span>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default TeamPage;
