import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Calendar, MapPin, Trophy } from 'lucide-react';
import EventDetailsCard from '../components/EventDetailsCard';
import ComicSticker from '../components/ComicSticker';

// Asset Imports
import ironManImg from '../assets/iron_man.png';
import spiderManImg from '../assets/spidey_swinging.png';
import thorImg from '../assets/thor.png';
import hulkImg from '../assets/hulk.png';
import blackPantherImg from '../assets/black_panther.png';
import capAmericaImg from '../assets/captain_america.png';

gsap.registerPlugin(ScrollTrigger);

const eventsData = {
  flagship: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Flagship",
      description: "The biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Main Auditorium",
      prize: "₹1,00,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Rahul Sharma", email: "rahul.sharma@techfest.com" }
    },
    {
      id: 2,
      title: "Innovation Challenge",
      category: "Flagship",
      description: "Present your innovative ideas and prototypes to a panel of judges. Best innovation wins funding and mentorship.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Innovation Hub",
      prize: "₹75,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Priya Patel", email: "priya.patel@techfest.com" }
    }
  ],
  coding: [
    {
      id: 3,
      title: "Hackathon 2025",
      category: "Coding",
      description: "24-hour coding marathon where teams build innovative solutions to real-world problems. Mentorship and resources provided.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "March 15-16, 2025",
      day: [1, 2],
      venue: "Computer Lab A",
      prize: "₹50,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Arjun Mehta", email: "arjun.mehta@techfest.com" }
    },
    {
      id: 4,
      title: "Code Relay",
      category: "Coding",
      description: "Team-based competitive programming event. Solve algorithmic challenges in a relay format against the clock.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      day: 3,
      venue: "Computer Lab B",
      prize: "₹30,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Sneha Reddy", email: "sneha.reddy@techfest.com" }
    },
    {
      id: 5,
      title: "Web Dev Workshop",
      category: "Coding",
      description: "Learn modern web development techniques from industry experts. Build a full-stack application from scratch.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Workshop Hall",
      prize: "Certificates",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Vikram Singh", email: "vikram.singh@techfest.com" }
    }
  ],
  robotics: [
    {
      id: 6,
      title: "RoboWars",
      category: "Robotics",
      description: "Build combat robots and compete in an arena battle. Last robot standing wins the championship.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      day: 3,
      venue: "Arena Ground",
      prize: "₹60,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Aditya Kumar", email: "aditya.kumar@techfest.com" }
    },
    {
      id: 7,
      title: "Line Follower Challenge",
      category: "Robotics",
      description: "Design autonomous robots that can navigate complex paths. Fastest and most accurate robot wins.",
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Robotics Lab",
      prize: "₹25,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Ananya Desai", email: "ananya.desai@techfest.com" }
    },
    {
      id: 8,
      title: "Drone Racing",
      category: "Robotics",
      description: "Race your custom-built drones through obstacle courses. Speed and precision are key to victory.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800",
      date: "March 15, 2025",
      day: 1,
      venue: "Open Ground",
      prize: "₹40,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Rohan Gupta", email: "rohan.gupta@techfest.com" }
    }
  ],
  gaming: [
    {
      id: 9,
      title: "Esports Tournament",
      category: "Gaming",
      description: "Compete in popular esports titles including Valorant, CS:GO, and more. Solo and team events available.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Gaming Arena",
      prize: "₹45,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Karan Malhotra", email: "karan.malhotra@techfest.com" }
    },
    {
      id: 10,
      title: "Mobile Gaming Championship",
      category: "Gaming",
      description: "Battle it out in mobile gaming tournaments featuring BGMI, COD Mobile, and Clash Royale.",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Gaming Zone",
      prize: "₹20,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Ishita Joshi", email: "ishita.joshi@techfest.com" }
    }
  ],
  creative: [
    {
      id: 11,
      title: "Design Derby",
      category: "Creative",
      description: "Showcase your design skills in UI/UX, graphic design, and digital art competitions.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Design Studio",
      prize: "₹35,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Meera Kapoor", email: "meera.kapoor@techfest.com" }
    },
    {
      id: 12,
      title: "Photography Contest",
      category: "Creative",
      description: "Capture the essence of technology and innovation through your lens. Multiple categories available.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Campus Wide",
      prize: "₹15,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Siddharth Rao", email: "siddharth.rao@techfest.com" }
    }
  ]
};

const categories = [
  { 
    id: 'all', 
    name: 'All Events',
    character: "Avengers",
    bgImage: capAmericaImg, // Default hero
    theme: {
      bg: 'bg-gradient-to-br from-blue-700 via-red-600 to-white',
      border: 'border-blue-900',
      accent: 'text-blue-500',
      shadow: 'shadow-blue-900/50',
      icon: '🛡️',
      gradient: "from-blue-600 to-red-600"
    }
  },
  { 
    id: 'flagship', 
    name: 'Flagship',
    character: "Iron Man",
    bgImage: ironManImg,
    theme: {
      bg: 'bg-gradient-to-br from-red-600 via-yellow-500 to-yellow-200',
      border: 'border-red-900',
      accent: 'text-yellow-400',
      shadow: 'shadow-red-900/50',
      icon: '⚡',
      gradient: "from-red-600 to-yellow-500"
    }
  },
  { 
    id: 'coding', 
    name: 'Coding',
    character: "Spider-Man",
    bgImage: spiderManImg,
    theme: {
      bg: 'bg-gradient-to-br from-red-600 via-blue-600 to-blue-800',
      border: 'border-blue-900',
      accent: 'text-red-500',
      shadow: 'shadow-red-900/50',
      icon: '🕸️',
      gradient: "from-red-500 to-blue-600"
    }
  },
  { 
    id: 'robotics', 
    name: 'Robotics',
    character: "Thor",
    bgImage: thorImg,
    theme: {
      bg: 'bg-gradient-to-br from-slate-700 via-cyan-500 to-yellow-200',
      border: 'border-slate-800',
      accent: 'text-cyan-400',
      shadow: 'shadow-cyan-500/50',
      icon: '🔨',
      gradient: "from-slate-600 to-cyan-400"
    }
  },
  { 
    id: 'gaming', 
    name: 'Gaming',
    character: "Hulk",
    bgImage: hulkImg,
    theme: {
      bg: 'bg-gradient-to-br from-green-700 via-green-500 to-purple-700', 
      border: 'border-green-900',
      accent: 'text-green-400',
      shadow: 'shadow-green-900/50',
      icon: '🎮',
      gradient: "from-green-700 to-purple-700"
    }
  },
  { 
    id: 'creative', 
    name: 'Creative',
    character: "Black Panther",
    bgImage: blackPantherImg,
    theme: {
      bg: 'bg-gradient-to-br from-purple-900 via-purple-700 to-black',
      border: 'border-purple-900',
      accent: 'text-purple-400',
      shadow: 'shadow-purple-900/50',
      icon: '🎨',
      gradient: "from-purple-900 to-black"
    }
  }
];

const HeroBadge = () => {
    // Generate a random-looking comic badge using SVGs
    const badges = [
        // Spider
        <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current" key="spider">
             <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v4h-2zm-3 3h8v2h-8z"/>
             <circle cx="12" cy="12" r="3" className="text-red-600 fill-red-600"/>
        </svg>,
        // Star
        <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 fill-current" key="star">
             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="black" strokeWidth="2"/>
        </svg>,
        // Bolt
        <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 fill-current" key="bolt">
             <path d="M11 21v-6H7v-4h3V7h4v4h4v6h-3v4h-4z" stroke="black" strokeWidth="2"/>
             <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>,
        // Shield
        <svg viewBox="0 0 24 24" className="w-full h-full text-blue-600 fill-current" key="shield">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v10h-2z" />
             <path d="M12 4l-8 4v6c0 5.5 4.5 10 10 10s10-4.5 10-10V8l-8-4z" className="text-white fill-white"/>
             <path d="M12 6l-6 3v5c0 4 3 7 7 7s7-3 7-7V9l-6-3z" className="text-blue-600 fill-blue-600"/>
             <path d="M12 8l-4 2v3c0 2.5 2 4.5 4 4.5s4-2 4-4.5V10l-4-2z" className="text-white fill-white"/>
             <path d="M12 10.5l-1.5 0.8V12.5c0 1 0.7 2 1.5 2s1.5-1 1.5-2v-1.2l-1.5-0.8z" className="text-blue-600 fill-blue-600"/>
        </svg>
    ];

    const randomBadge = useMemo(() => badges[Math.floor(Math.random() * badges.length)], []);

    return (
        <div className="w-10 h-10 drop-shadow-[2px_2px_0px_#000]">
            {randomBadge}
        </div>
    );
};

const EventCard = ({ event, onClick }) => {
  const cardRef = useRef(null);
  const categoryTheme = categories.find(c => c.name === event.category)?.theme || categories[0].theme;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.1, // Snappier response
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative cursor-pointer h-full transition-all duration-300 z-10`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* NEW: Generated Comic Sticker Overlay (Top Left) */}
      <div className="absolute -top-7 -left-8 z-50 w-16 h-16 filter drop-shadow-[5px_5px_0px_rgba(0,0,0,0.5)] transform -rotate-12 hover:scale-110 hover:-rotate-6 transition-all duration-300 pointer-events-none">
         <ComicSticker />
      </div>

      {/* Dynamic Sizing for "Comic Book" feel */}
      <div className={`relative h-full bg-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col group-hover:shadow-[16px_16px_0px_#000] transition-shadow duration-300 overflow-hidden`}>
        
        {/* Comic Header Strip */}
        <div className="bg-red-600 border-b-4 border-black p-1 flex justify-between items-center relative z-20">
           <div className="flex items-center gap-2 pl-4"> 
              {/* OLD LOGO REMOVED from here */}
              <div className="flex flex-col leading-none">
                 <span className="text-[10px] font-black uppercase text-white tracking-widest">Marvelous</span>
                 <span className="text-xs font-black uppercase text-yellow-400 tracking-tighter">Events #00{Array.isArray(event.day) ? event.day[0] : event.day}</span>
              </div>
           </div>
           <div className="bg-white px-2 border-2 border-black transform -rotate-2">
              <span className="text-xs font-black uppercase text-black">Dec 2024</span>
           </div>
        </div>

        {/* Main Image Area with Cover Art Style */}
        <div className="relative h-64 border-b-4 border-black overflow-hidden bg-black">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:contrast-125"
          />
          
          {/* Cover Overlay Gradients */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80"></div>
          
          {/* Halftone / Comic Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_120%)] opacity-50 mix-blend-multiply"></div>
          <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>

          {/* Action Burst Badge (Top Right Image) */}
          <div className="absolute top-4 right-4 z-20 transform rotate-12 group-hover:rotate-20 transition-transform duration-300">
             <HeroBadge />
          </div>

          {/* Title on Structure */}
          <div className="absolute bottom-4 left-2 right-2 z-20">
             <h3 className="text-3xl font-display font-black text-white uppercase italic leading-[0.85] tracking-tighter" 
                 style={{ 
                    WebkitTextStroke: '1.5px black', 
                    textShadow: `3px 3px 0px ${categoryTheme.accent.replace('text-', '').replace('-500', '') === 'yellow-400' ? '#D2161E' : '#000'}`
                 }}>
               {event.title}
             </h3>
          </div>
        </div>

        {/* Content Box - "The Story" */}
        <div className="flex-1 bg-white p-4 relative">
             <div className="absolute top-0 right-0 p-1 bg-black text-white text-[10px] font-bold border-l-2 border-b-2 border-black">
                VOL. {event.id}
             </div>
             
             {/* Description Bubble */}
             <div className="mb-4 bg-[#f0f0f0] border-2 border-black p-3 relative rounded-xl rounded-tl-none">
                 <p className="text-sm font-bold font-comic text-black leading-tight line-clamp-3">
                    {event.description}
                 </p>
                 <div className="absolute top-0 -left-[2px] w-4 h-4 bg-[#f0f0f0] border-l-2 border-t-2 border-black transform -skew-x-12 origin-bottom-right"></div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-2 gap-2 mt-auto">
                 <div className="flex items-center gap-1 border-2 border-black p-1 bg-yellow-200 shadow-[2px_2px_0px_#000]">
                    <Calendar className="w-4 h-4 text-black" />
                    <span className="text-xs font-black uppercase text-black">{event.date}</span>
                 </div>
                 <div className="flex items-center gap-1 border-2 border-black p-1 bg-blue-200 shadow-[2px_2px_0px_#000]">
                    <MapPin className="w-4 h-4 text-black" />
                    <span className="text-xs font-black uppercase text-black truncate">{event.venue}</span>
                 </div>
             </div>

             <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-400 flex justify-between items-center group/btn">
                  <span className="font-black italic text-lg text-black group-hover:text-red-600 transition-colors">
                     {event.prize}
                  </span>
                  <button className="px-4 py-1 bg-black text-white font-black uppercase text-sm border-2 border-transparent hover:bg-red-600 hover:border-black transition-all transform hover:-rotate-2 hover:scale-110 shadow-[2px_2px_0px_#ccc]">
                      Details
                  </button>
             </div>
        </div>

        {/* Corner Art */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-black clip-path-notch z-30 opacity-20"></div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getFilteredEvents = () => {
    let events = [];
    if (selectedCategory === 'all') {
      events = Object.values(eventsData).flat();
    } else {
      events = eventsData[selectedCategory] || [];
    }
    
    if (selectedDay !== 'all') {
      const dayNumber = parseInt(selectedDay);
      events = events.filter(event => {
        if (Array.isArray(event.day)) {
          return event.day.includes(dayNumber);
        }
        return event.day === dayNumber;
      });
    }
    
    return events;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simple mock loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Animation for entering cards
  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.event-card',
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [selectedCategory, selectedDay, loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Background transition logic
  const currentBg = useMemo(() => {
    return categories.find(c => c.id === selectedCategory)?.bgImage || capAmericaImg;
  }, [selectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-[#111] pt-24 pb-20 relative overflow-hidden transition-all duration-700">
        
        {/* Dynamic Character Background */}
        <div className="fixed inset-0 z-0">
             {/* Base Dimmer */}
             <div className="absolute inset-0 bg-black z-0"></div>
             
             {/* Character Image Layer */}
             <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-40">
                <img 
                    src={currentBg} 
                    alt="Background" 
                    className="w-full h-full object-cover object-center filter grayscale contrast-125"
                />
             </div>
             
             {/* Comic Effects Overlay */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)]"></div>
             <div className="absolute inset-0 halftone-pattern opacity-10"></div>
             
             {/* Tint Overlay based on Category */}
             <div className={`
                 absolute inset-0 mix-blend-color opacity-60 transition-all duration-700
                 ${categories.find(c => c.id === selectedCategory)?.theme.bg || 'bg-linear-to-br from-blue-700 via-red-600 to-white'}
             `}></div>
             
             {/* Extra Gradient Wash for vibrancy */}
             <div className={`
                 absolute inset-0 mix-blend-overlay opacity-40 transition-all duration-700
                 ${categories.find(c => c.id === selectedCategory)?.theme.bg || 'bg-linear-to-br from-blue-700 via-red-600 to-white'}
             `}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Header Section - Comic Title */}
            <div className="text-center mb-16 relative">
                {/* "Stan Lee" Style Intro Box */}
                <div className="inline-block bg-white border-4 border-black p-2 mb-6 transform -rotate-2 shadow-[4px_4px_0px_#000]">
                   <span className="text-black font-black uppercase tracking-widest text-sm sm:text-base">
                      Synchronize Presents
                   </span>
                </div>

                <div className="relative inline-block">
                    <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-black text-marvel-red mb-2 tracking-tighter relative z-10 italic" 
                        style={{ 
                            WebkitTextStroke: '3px black', 
                            textShadow: '10px 10px 0px #000' 
                        }}>
                        EVENTS
                    </h1>
                </div>
                
                <div className="max-w-2xl mx-auto mt-6 bg-yellow-400 border-4 border-black p-4 shadow-[8px_8px_0px_#000] transform rotate-1">
                    <p className="text-black text-lg sm:text-xl font-bold font-comic uppercase tracking-tight leading-tight">
                        "CHOOSE YOUR ALLIANCE. MASTER YOUR ABILITIES. CONQUER THE CHALLENGE!"
                    </p>
                </div>
            </div>

            {/* Filter Roster - New "Character Card" Style */}
            {/* Filter Roster - Comic Buttons */}
            <div className="mb-16">
                <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                    <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                        px-8 py-3 font-black uppercase tracking-wider text-lg sm:text-xl
                        border-4 border-black shadow-[5px_5px_0px_#000]
                        transition-all duration-200 transform clip-path-slant
                        ${selectedCategory === category.id 
                            ? `${category.theme.bg} text-white -rotate-2 scale-110 z-10 shadow-[8px_8px_0px_#000]` 
                            : 'bg-white text-black hover:bg-black hover:text-white hover:rotate-1 hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1'}
                    `}
                    style={{
                        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                        textShadow: selectedCategory === category.id ? '2px 2px 0px #000' : 'none'
                    }}
                    >
                        {category.name}
                    </button>
                ))}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-black/40 border-y-4 border-black p-4 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-mono font-bold uppercase tracking-widest text-sm">
                        Threat Level: <span className="text-red-500">MIDNIGHT</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-white font-display font-black italic text-xl">
                        <span className="text-yellow-400 text-3xl mr-2">{getFilteredEvents().length}</span>
                        MISSIONS ACTIVE
                    </div>
                    
                    <div className="h-8 w-0.5 bg-gray-600 mx-2"></div>
                    
                    <div className="relative" ref={dropdownRef}>
                        <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 border-2 border-black font-black uppercase text-black hover:bg-white transition-colors shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-y-0 active:shadow-[2px_2px_0px_#000]"
                        >
                            <Calendar className="w-4 h-4 text-black" />
                            <span>{selectedDay === 'all' ? 'All Days' : `Day ${selectedDay}`}</span>
                            <ChevronDown className={`w-4 h-4 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] z-50">
                            {[
                            { value: 'all', label: 'All Days' },
                            { value: '1', label: 'Day 1' },
                            { value: '2', label: 'Day 2' },
                            { value: '3', label: 'Day 3' }
                            ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                setSelectedDay(option.value);
                                setIsDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 text-black font-black hover:bg-yellow-400 transition-colors uppercase border-b-2 border-gray-100 last:border-0"
                            >
                                {option.label}
                            </button>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Events Grid - Comic Page Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 pb-20">
            {getFilteredEvents().map((event) => (
                <div key={event.id} className="event-card h-full">
                <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                </div>
            ))}
            </div>

            {getFilteredEvents().length === 0 && (
                <div className="text-center py-20 bg-black/50 border-4 border-dashed border-gray-700 rounded-3xl">
                    <h3 className="text-4xl font-black text-gray-500 italic mb-4">NO MISSIONS DETECTED</h3>
                    <p className="text-gray-400 font-mono">Try adjusting your filters, Agent.</p>
                </div>
            )}
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
};

export default EventsPage;
