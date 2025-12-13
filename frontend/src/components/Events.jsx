import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventDetailsCard from './EventDetailsCard';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  { 
    title: "Hackathon", 
    category: "Coding", 
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Join us for an intense 24-hour coding marathon where innovation meets creativity. Build groundbreaking solutions to real-world problems.",
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
    category: "Coding", 
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    description: "A team-based coding competition where speed and accuracy matter. Pass the baton and solve challenges together.",
    date: "March 18, 2024",
    day: 3,
    venue: "Computer Lab A",
    prize: "₹30,000",
    registrationLink: "https://forms.google.com/placeholder",
    poc: { name: "Mike Johnson", email: "mike@xim.edu.in" }
  },
  { 
    title: "Gaming", 
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
    title: "Design Derby", 
    category: "Creative", 
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
    description: "Showcase your creative design skills in UI/UX, graphic design, and digital art competitions.",
    date: "March 21, 2024",
    day: 2,
    venue: "Design Studio",
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
    <section id="events" ref={sectionRef} className="relative py-20 z-20 bg-gradient-to-b from-black to-[#1a0000] overflow-hidden">
      
      {/* Background Decor - Mech Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[repeating-linear-gradient(-45deg,#AA0505,#AA0505_2px,transparent_2px,transparent_40px)]"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_center,#FFD700_0%,transparent_70%)] opacity-10 mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 sticky top-20 z-30 pb-8 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4 pointer-events-auto">
          <div className="text-center relative">
            {/* HUD Element Graphic */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#AA0505] shadow-[0_0_10px_#FFD700]"></div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-3 sm:mb-4 italic tracking-tighter" style={{ WebkitTextStroke: '2px #AA0505' }}>
              STARK <span className="text-[#FFD700] drop-shadow-[4px_4px_0px_#AA0505]" style={{ WebkitTextStroke: '2px black' }}>EXPO</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6">
              <button 
                onClick={() => window.location.href = '/events'}
                className="cursor-pointer group relative px-8 py-3 bg-[#AA0505] text-[#FFD700] font-black text-lg skew-x-[-10deg] border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-[#AA0505] hover:border-[#AA0505] transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
              >
                <span className="skew-x-[10deg] inline-block">View All Events →</span>
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
            className="w-full max-w-5xl mx-auto h-[70vh] sm:h-[75vh] relative group overflow-hidden rounded-xl border-4 border-[#AA0505] cursor-pointer bg-black"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              boxShadow: '0 0 0 2px #000, 8px 8px 0px #FFD700'
            }}
            onClick={(e) => handleCardClick(e, event)}
          >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-[#FFD700] z-20"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-[#FFD700] z-20"></div>

            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-150"
            />
            {/* JARVIS Overlay Tint */}
            <div className="absolute inset-0 bg-[#AA0505] mix-blend-multiply opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            
            {/* Scanned Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
            
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 z-20">
              <div className="transform transition-all duration-500 group-hover:translate-y-[-10px]">
                
                {/* Category Chip */}
                <div className="inline-block px-3 py-1 bg-[#FFD700] text-black font-black text-xs uppercase tracking-widest mb-3 skew-x-[-10deg] border-2 border-black">
                  <span className="skew-x-[10deg] inline-block">{event.category}</span>
                </div>

                <h3 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white mb-3 sm:mb-4 transition-all duration-300 italic" style={{ WebkitTextStroke: '1px black', textShadow: '4px 4px 0px #AA0505' }}>
                  {event.title}
                </h3>
                
                <p className="text-[#FFD700] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl font-mono opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 bg-black/50 p-2 border-l-4 border-[#FFD700]">
                  {`>> ${event.description}`}
                </p>
                
                <div className="flex items-center gap-3 text-white transition-all duration-300 group-hover:gap-5">
                  <span className="text-lg font-bold uppercase tracking-widest text-[#FFD700]">View Specs</span>
                  <div className="w-8 h-8 rounded-full border-2 border-[#FFD700] flex items-center justify-center bg-[#AA0505]">
                    <svg className="w-4 h-4 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Arc Reactor / Card Number Indicator */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
              <div className="relative flex items-center justify-center w-24 h-24">
                 <div className="absolute inset-0 rounded-full border-4 border-[#00BCD4] opacity-50 blur-[2px] animate-pulse"></div>
                 <div className="absolute inset-0 rounded-full border-2 border-white opacity-80"></div>
                 <span className="text-4xl font-display font-black text-[#00BCD4] drop-shadow-[0_0_10px_#00BCD4]">
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
