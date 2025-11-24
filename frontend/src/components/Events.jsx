import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const eventsData = [
  { title: "Hackathon", category: "Coding", image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=600", link: "/events/hackathon" },
  { title: "RoboWars", category: "Robotics", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600", link: "/events/robowars" },
  { title: "Code Relay", category: "Coding", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600", link: "/events/code-relay" },
  { title: "Gaming", category: "Esports", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600", link: "/events/gaming" },
  { title: "Design Derby", category: "Creative", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600", link: "/events/design-derby" },
];

const Events = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    
    // Calculate the total scrollable width
    const getScrollAmount = () => {
      return -(scrollContainer.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      pinSpacing: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
         if (progressRef.current) {
           progressRef.current.style.width = `${self.progress * 100}%`;
         }
      }
    });

    return () => {
      // Kill ScrollTrigger instance
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleCardClick = () => {
    window.location.href = '/events';
  };

  return (
    <section id="events" ref={sectionRef} className="h-screen overflow-hidden relative flex flex-col justify-center z-20">
      <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Events</span>
          </h2>
          <button 
            onClick={() => window.location.href = '/events'}
            className="px-6 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400 text-cyan-400 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            View All Events →
          </button>
        </div>
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden hidden md:block">
          <div ref={progressRef} className="h-full bg-cyan-400 w-0 shadow-[0_0_15px_rgba(0,242,255,0.6)]"></div>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-10 px-6 w-fit">
        {eventsData.map((event, index) => (
          <div 
            key={index} 
            className="w-[80vw] md:w-[40vw] lg:w-[30vw] h-[60vh] relative group overflow-hidden rounded-2xl border border-white/10 cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
          >
            <img 
              src={event.image} 
              alt={event.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-500"></div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-linear-to-t from-cyan-500/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,242,255,0.15)]"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="text-cyan-400/70 text-sm uppercase tracking-widest mb-2 block transition-all duration-300 group-hover:text-cyan-400 group-hover:tracking-[0.2em]">{event.category}</span>
              <h3 className="text-3xl font-display font-bold text-white mb-4 transition-all duration-300 group-hover:text-cyan-50 group-hover:scale-105 origin-left">{event.title}</h3>
              <div className="flex items-center gap-2 text-cyan-400 transition-all duration-300 group-hover:gap-4">
                <span className="text-sm font-medium">View Details</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
