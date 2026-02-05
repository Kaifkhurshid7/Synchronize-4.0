import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventDetailsCard from './EventDetailsCard';
import EventsBg from '../assets/backgrounds/events-bg.png';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  { 
    title: "Hackathon", 
    category: "Technical", 
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Join us for an intense 24-hour technical marathon where innovation meets creativity. Build groundbreaking solutions to real-world problems.",
    date: "March 15-16, 2024",
    day: [1, 2],
    venue: "Tech Hub, Main Campus",
    prize: "₹50,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "John Doe", email: "john@xim.edu.in" }
  },
  { 
    title: "RoboWars", 
    category: "Robotics", 
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    description: "Battle it out with your custom-built robots in an epic arena showdown. May the best bot win!",
    date: "March 17, 2024",
    day: 3,
    venue: "Arena Ground",
    prize: "₹40,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "Jane Smith", email: "jane@xim.edu.in" }
  },
  { 
    title: "Code Relay", 
    category: "Technical", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    description: "A team-based technical competition where speed and accuracy matter. Pass the baton and solve challenges together.",
    date: "March 18, 2024",
    day: 3,
    venue: "Computer Lab A",
    prize: "₹30,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "Mike Johnson", email: "mike@xim.edu.in" }
  },
  { 
    title: "Esports Arena", 
    category: "Esports", 
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    description: "Compete in popular esports titles and prove your gaming prowess. Multiple tournaments across different games.",
    date: "March 19-20, 2024",
    day: [1, 2, 3],
    venue: "Gaming Arena",
    prize: "₹60,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "Sarah Williams", email: "sarah@xim.edu.in" }
  },
  { 
    title: "Battle of Bands", 
    category: "Cultural", 
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=600",
    description: "Electrifying musical showdown where college bands compete for supremacy. Rock the stage!",
    date: "March 21, 2024",
    day: 2,
    venue: "Main Stage",
    prize: "₹35,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "Alex Brown", email: "alex@xim.edu.in" }
  },
];

const Events = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState('all');

  const getFilteredEvents = () => {
    if (selectedDay === 'all') {
      return eventsData;
    }
    
    const dayNumber = parseInt(selectedDay);
    return eventsData.filter(event => {
      if (Array.isArray(event.day)) {
        return event.day.includes(dayNumber);
      }
      return event.day === dayNumber;
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      cards.forEach((card, index) => {
        if (!card) return;
        const isLast = index === cards.length - 1;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 15%",
          end: isLast ? "bottom top" : "bottom 15%",
          pin: !isLast,
          pinSpacing: false,
          scrub: true, 
          onUpdate: (self) => {
            if (!isLast) {
              const progress = self.progress;
              const scale = 1 - (progress * 0.1);
              const yOffset = progress * 40;
              const rotateX = progress * -8;
              const brightness = 1 - (progress * 0.3);
              
              gsap.set(card, {
                scale: scale,
                y: yOffset,
                rotateX: rotateX,
                filter: `brightness(${brightness})`,
                transformPerspective: 1000
              });
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert(); 
  }, [selectedDay]);

  const handleCardClick = (e, event) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedEvent(event);
  };

  return (
    <>
    {/* Iron Man Theme Section */}
    <section id="events" ref={sectionRef} className="relative py-20 z-20 bg-linear-to-b from-black to-[#1a0000] overflow-hidden">
      
      {/* Background Decor - Mech Lines */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img 
            src={EventsBg} 
            alt="Events Background" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
        />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[repeating-linear-gradient(-45deg,#AA0505,#AA0505_2px,transparent_2px,transparent_40px)] opacity-50"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_center,#FFD700_0%,transparent_70%)] opacity-10 mix-blend-screen"></div>
        <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 sticky top-20 z-30 pb-8 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4 pointer-events-auto">
          <div className="text-center relative">
            {/* HUD Element Graphic */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#AA0505] shadow-[0_0_10px_#FFD700]"></div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-3 sm:mb-4 italic tracking-tighter" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #AA0505' }}>
              STARK <span className="text-iron-gold" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #AA0505' }}>EXPO</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
              <button 
                onClick={() => window.location.href = '/events'}
                className="cursor-pointer group relative px-8 py-3 bg-[#AA0505] text-white font-black text-lg border-4 border-black hover:bg-white hover:text-[#AA0505] transition-all duration-300 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#fff] uppercase tracking-wider"
              >
                <span className="inline-block">View All Events →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 space-y-8">
        {getFilteredEvents().map((event, index) => (
          <div 
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-full max-w-5xl mx-auto min-h-[60vh] sm:min-h-[70vh] relative group overflow-hidden border-2 sm:border-4 border-black cursor-pointer bg-black"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              boxShadow: '8px 8px 0px #AA0505'
            }}
            onClick={(e) => handleCardClick(e, event)}
          >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-16 sm:h-16 border-t-4 sm:border-t-8 border-l-4 sm:border-l-8 border-iron-gold z-20"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-16 sm:h-16 border-b-4 sm:border-b-8 border-r-4 sm:border-r-8 border-iron-gold z-20"></div>

            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-150"
            />
            {/* JARVIS Overlay Tint */}
            <div className="absolute inset-0 bg-[#AA0505] mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
            {/* Halftone on Image */}
             <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none z-10"></div>
            
            {/* Scanned Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] opacity-10 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 md:p-12 z-20">
              <div className="transform transition-all duration-500 group-hover:translate-y-[-5px] sm:group-hover:translate-y-[-10px]">
                
                {/* Category Chip */}
                <div className="inline-block px-2 sm:px-3 py-1 bg-iron-gold text-black font-black text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3 border-2 border-black transform -skew-x-12 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
                  <span className="skew-x-12 inline-block">{event.category}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl md:text-7xl font-display font-black text-white mb-2 sm:mb-4 transition-all duration-300 italic" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0px #AA0505' }}>
                  {event.title}
                </h3>
                
                {/* Comic Description Box */}
                <div className="bg-white border-2 border-black p-2 sm:p-3 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] relative max-w-xl transform rotate-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    <p className="text-black text-xs sm:text-sm font-bold font-comic">
                       <span className="text-[#AA0505] font-black uppercase mr-2">JARVIS:</span>
                       {event.description}
                    </p>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 text-white transition-all duration-300 group-hover:gap-4 sm:group-hover:gap-5 mt-4 sm:mt-6">
                  <span className="text-sm sm:text-lg font-bold uppercase tracking-widest text-iron-gold drop-shadow-[2px_2px_0px_#000]">View Specs</span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black flex items-center justify-center bg-[#AA0505] shadow-[2px_2px_0px_#000]">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Arc Reactor / Card Number Indicator */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20">
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24">
                 <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-[#AA0505] shadow-[0_0_10px_#AA0505] sm:shadow-[0_0_15px_#AA0505] bg-black/50"></div>
                 <span className="text-2xl sm:text-4xl font-display font-black text-white italic drop-shadow-[2px_2px_0px_#AA0505]" style={{ WebkitTextStroke: '1px black' }}>
                   0{index + 1}
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    
    {selectedEvent && (
      <EventDetailsCard 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    )}
    </>
  );
};

export default Events;
