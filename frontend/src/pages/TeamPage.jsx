import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

// Import Generated Assets
import avengersBg from "../assets/avengers_bg.png";
import heroIron from "../assets/hero_iron.png";
import heroCap from "../assets/hero_cap.png";
import heroHulk from "../assets/hero_hulk.png";
import heroThor from "../assets/hero_thor.png";
import heroPanther from "../assets/hero_panther.png";

gsap.registerPlugin(ScrollTrigger);

const MARVEL_THEMES = [
  {
    name: "iron-man",
    primary: "#D2161E",
    secondary: "#FFD700",
    accent: "#FFFFFF",
    gradient: "from-[#D2161E] to-[#800000]",
    icon: Zap,
    alias: "The Armored Avid",
  },
  {
    name: "captain-america",
    primary: "#1976D2",
    secondary: "#FFFFFF",
    accent: "#D2161E",
    gradient: "from-[#1976D2] to-[#0D47A1]",
    icon: Shield,
    alias: "The First Developer",
  },
  {
    name: "hulk",
    primary: "#4CAF50",
    secondary: "#81C784",
    accent: "#1B5E20",
    gradient: "from-[#4CAF50] to-[#1B5E20]",
    icon: Star,
    alias: "The Incredible Coder",
  },
  {
    name: "thor",
    primary: "#00BCD4",
    secondary: "#B0BEC5",
    accent: "#FFD700",
    gradient: "from-[#00BCD4] to-[#006064]",
    icon: Hammer,
    alias: "God of Backend",
  },
  {
    name: "black-panther",
    primary: "#9C27B0",
    secondary: "#FFD700",
    accent: "#212121",
    gradient: "from-[#9C27B0] to-[#4A148C]",
    icon: Crown,
    alias: "King of Design",
  },
  {
    name: "black-widow",
    primary: "#212121",
    secondary: "#D2161E",
    accent: "#FFFFFF",
    gradient: "from-[#424242] to-[#212121]",
    icon: Heart,
    alias: "The Silent Fixer",
  },
];

const TeamMemberCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const theme = MARVEL_THEMES[index % MARVEL_THEMES.length];
  const Icon = theme.icon;

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      rotation: Math.random() * 2 - 1,
      boxShadow: `12px 12px 0px 0px ${theme.primary}`,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotation: 0,
      boxShadow: "6px 6px 0px 0px #000000",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white border-4 border-black p-4 group cursor-pointer h-full"
      style={{
        boxShadow: "6px 6px 0px 0px #000000",
        clipPath: "polygon(2% 0, 100% 0, 100% 98%, 98% 100%, 0 100%, 0 2%)",
      }}
    >
      {/* Comic Corner Accent */}
      <div
        className="absolute top-0 right-0 w-12 h-12 border-l-4 border-b-4 border-black z-10"
        style={{ backgroundColor: theme.secondary }}
      />

      {/* Image Container */}
      <div className="relative aspect-square mb-4 border-4 border-black overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 halftone-pattern opacity-30"
          style={{ "--color-marvel-red": theme.primary }}
        />
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Comic Speed Lines Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 speed-lines transition-opacity duration-300 pointer-events-none" />

        {/* Alias Badge */}
        <div
          className="absolute bottom-0 left-0 right-0 py-1 px-2 border-t-4 border-black text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{ backgroundColor: theme.secondary }}
        >
          <span className="text-xs font-black uppercase tracking-widest text-black">
            {theme.alias}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-2xl font-black italic uppercase leading-none"
            style={{
              color: "black",
              textShadow: `2px 2px 0px ${theme.secondary}`,
            }}
          >
            {member.name}
          </h3>
          <Icon className="w-6 h-6" style={{ color: theme.primary }} />
        </div>

        <div
          className="inline-block px-3 py-1 mb-4 border-2 border-black transform -skew-x-12"
          style={{ backgroundColor: theme.primary }}
        >
          <span className="block transform skew-x-12 text-white font-bold text-xs uppercase tracking-wider">
            {member.role}
          </span>
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mt-4 pt-4 border-t-2 border-dashed border-gray-300">
          {[
            { Icon: Linkedin, href: "#" },
            { Icon: Twitter, href: "#" },
            { Icon: Github, href: "#" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all duration-200"
            >
              <social.Icon className="w-4 h-4 text-black" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const teamMembers = [
    { name: "Kaif Khurshid", role: "Lead Organizer", image: heroIron },
    { name: "Ishan Roy", role: "Tech Lead", image: heroCap },
    { name: "Manish Nanda", role: "Design Head", image: heroHulk },
    { name: "Simran Osta", role: "Marketing Lead", image: heroThor },
    { name: "Suraj Maharana", role: "Logistics", image: heroPanther },
    { name: "Rhea Bachheti", role: "Sponsorships", image: heroPanther }, // Using Panther as substitute
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulating load for animation sync
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".team-title-char", {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        gsap.from(".team-card", {
          y: 100,
          opacity: 0,
          scale: 0.8,
          stagger: 0.1,
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
      className="min-h-screen relative overflow-hidden pt-40 pb-20 bg-gray-100"
    >
      {/* Comic Background Patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-15"
          style={{ backgroundImage: `url(${avengersBg})` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
        {/* Extra Comic Overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400 opacity-5 clip-path-notch" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-500 opacity-5 rounded-full blur-3xl" />
        <div className="absolute inset-0 halftone-pattern opacity-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border-2 sm:border-3 border-black bg-red-600 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] mb-3 sm:mb-4 transform -rotate-2">
              <span className="text-white font-black uppercase tracking-widest text-xs sm:text-sm">
                Synchronize 4.0
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic uppercase leading-none flex flex-wrap gap-x-2 sm:gap-x-4">
              {"MEET THE SQUAD".split(" ").map((word, i) => (
                <span key={i} className="flex">
                  {word.split("").map((char, j) => (
                    <span
                      key={j}
                      className="team-title-char inline-block text-transparent bg-clip-text bg-linear-to-b from-black to-gray-800 drop-shadow-[2px_2px_0px_rgba(200,200,200,1)] sm:drop-shadow-[4px_4px_0px_rgba(200,200,200,1)]"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-bold text-gray-800 max-w-2xl bg-white/90 shadow-[4px_4px_0px_#000] p-4 border-2 border-black -skew-x-6">
              "Heroes aren't born. They're built, one commit at a time."
            </p>
          </div>

          <Link
            to="/"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-black text-lg sm:text-xl uppercase tracking-wider hover:-translate-y-1 hover:shadow-[6px_6px_0px_#ED1D24] transition-all duration-200 border-2 border-transparent hover:border-black self-start md:self-auto"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              HQ Return
            </span>
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card h-full">
              <TeamMemberCard member={member} index={index} />
            </div>
          ))}
        </div>

        {/* Comic Footer Decoration */}
        <div className="mt-12 text-center">
          <div className="inline-block px-12 py-6 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_#000] transform rotate-1 hover:scale-105 transition-transform">
            <span className="text-2xl font-black uppercase italic tracking-wider">
              MORE HEROES INCOMING...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
