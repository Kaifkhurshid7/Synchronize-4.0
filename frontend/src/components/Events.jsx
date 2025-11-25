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
    const cards = cardsRef.current;
    
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      
      ScrollTrigger.create({
        trigger: card,
        start: "top 15%",
        end: isLast ? "bottom top" : "bottom 15%",
        pin: !isLast,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          if (!isLast) {
            const progress = self.progress;
            const scale = 1 - (progress * 0.1);
            const yOffset = progress * 40;
            const rotateX = progress * -8;
            const brightness = 1 - (progress * 0.3);
            
            gsap.to(card, {
              scale: scale,
              y: yOffset,
              rotateX: rotateX,
              filter: `brightness(${brightness})`,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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
    <section id="events" ref={sectionRef} className="relative py-20 z-20">
      <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 sticky top-20 z-30 pb-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-3 sm:mb-4">
              Featured <span className="text-cyan-400">Events</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button 
                onClick={() => window.location.href = '/events'}
                className="cursor-pointer px-4 py-2 sm:px-6 sm:py-3 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400 text-cyan-400 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                View All Events →
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
            className="w-full max-w-5xl mx-auto h-[70vh] sm:h-[75vh] relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 cursor-pointer"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            onClick={(e) => handleCardClick(e, event)}
          >
            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20"></div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-linear-to-t from-cyan-500/30 via-transparent to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,242,255,0.2)]"></div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
              <div className="transform transition-all duration-500 group-hover:translate-y-[-10px]">
                <span className="text-cyan-400/80 text-xs sm:text-sm uppercase tracking-[0.2em] mb-2 sm:mb-3 block transition-all duration-300 group-hover:text-cyan-400 group-hover:tracking-[0.3em]">
                  {event.category}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 sm:mb-4 transition-all duration-300 group-hover:text-cyan-50">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {event.description}
                </p>
                <div className="flex items-center gap-3 text-cyan-400 transition-all duration-300 group-hover:gap-5">
                  <span className="text-sm sm:text-base font-medium">View Details</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card number indicator */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/20 text-6xl sm:text-7xl md:text-8xl font-display font-bold leading-none">
              0{index + 1}
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
