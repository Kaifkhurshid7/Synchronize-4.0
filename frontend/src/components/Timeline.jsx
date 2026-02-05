import { useEffect, useRef, useState, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineBg from '../assets/backgrounds/timeline-bg.png';

gsap.registerPlugin(ScrollTrigger);

const MagicCircle = forwardRef(({ className, style }, ref) => (
  <svg ref={ref} viewBox="0 0 200 200" className={className} style={style}>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g stroke="currentColor" strokeWidth="2" fill="none" filter="url(#glow)">
      {/* Outer Rings */}
      <circle cx="100" cy="100" r="95" strokeDasharray="10 5" />
      <circle cx="100" cy="100" r="85" />
      <path d="M100 15 A85 85 0 0 1 185 100" strokeDasharray="4 4" />
      
      {/* Inner Square/Diamonds */}
      <rect x="55" y="55" width="90" height="90" transform="rotate(45 100 100)" strokeOpacity="0.8" />
      <rect x="55" y="55" width="90" height="90" transform="rotate(22.5 100 100)" strokeOpacity="0.6" />
      
      {/* Runes (simplified lines) */}
      <path d="M100 25 L100 175 M25 100 L175 100" strokeOpacity="0.5" />
      <path d="M45 45 L155 155 M155 45 L45 155" strokeOpacity="0.5" />
      
      {/* Inner Circles */}
      <circle cx="100" cy="100" r="40" strokeWidth="3" />
      <circle cx="100" cy="100" r="30" strokeDasharray="2 3" />
    </g>
  </svg>
));

const scheduleData = {
  day1: [
    { time: "09:00 AM", title: "The Awakening", description: "Inauguration and Keynote Speech" },
    { time: "10:30 AM", title: "Multiverse Hack", description: "24-hour technical marathon starts" },
    { time: "01:00 PM", title: "Sanctum Feast", description: "Networking and Refreshments" },
    { time: "02:30 PM", title: "Ancient Wisdom", description: "Guest lecture by Industry Expert" },
    { time: "05:00 PM", title: "Astral Esports", description: "Valorant and FIFA showdown" },
    { time: "07:00 PM", title: "Sorcerer's Sup", description: "Meet sponsors and mentors" },
  ],
  day2: [
    { time: "08:00 AM", title: "Morning Mana", description: "Morning refreshments" },
    { time: "09:30 AM", title: "Mystic Arts: AI/ML", description: "Hands-on machine learning workshop" },
    { time: "12:00 PM", title: "Construct Wars", description: "Robot combat competition begins" },
    { time: "02:00 PM", title: "Dimension Break", description: "Food and relaxation" },
    { time: "03:30 PM", title: "Stark Expo Pitch", description: "Shark Tank style business pitch" },
    { time: "06:00 PM", title: "Kamar-Taj Night", description: "Music, dance, and entertainment" },
  ],
  day3: [
    { time: "09:00 AM", title: "Final Reckoning", description: "Hackathon project demos" },
    { time: "11:00 AM", title: "Construct Finals", description: "Championship battle" },
    { time: "01:00 PM", title: "Last Meal", description: "Last meal together" },
    { time: "02:30 PM", title: "Time Stone Awards", description: "Awards and recognition ceremony" },
    { time: "04:00 PM", title: "Portal Close", description: "Thank you and farewell" },
  ],
};

const Timeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const runeRef = useRef(null);
  const magicCirclesRef = useRef([]);
  const [activeDay, setActiveDay] = useState('day1');

  useEffect(() => {
    // Fade in the entire section
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Rotate the background Rune (Main Center)
    gsap.to(runeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

    // Animate Magic Circles on Scroll
    magicCirclesRef.current.forEach((circle, i) => {
        if (!circle) return; // Basic safety check
        
        // Initial set
        gsap.set(circle, { 
            rotation: i * 45 // Offset start rotation
        });

        gsap.to(circle, {
            rotation: i % 2 === 0 ? 360 : -360, // Alternate rotation direction
            scale: 1.5, // Pulse larger
            y: i % 2 === 0 ? 150 : -150, // Parallax movement
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1 // Smooth scrubbing
            }
        });
    });

    // Draw the line (Time Stream)
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: "#timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );
  }, []);

  const handleDayChange = (day) => {
    if (day === activeDay) return;

    // Animate out current timeline
    gsap.to(timelineContainerRef.current.children, {
      opacity: 0,
      x: activeDay < day ? -50 : 50,
      filter: "blur(10px)",
      stagger: 0.03,
      duration: 0.3,
      onComplete: () => {
        setActiveDay(day);
        // Animate in new timeline
        gsap.fromTo(timelineContainerRef.current.children,
          { opacity: 0, x: activeDay < day ? 50 : -50, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.4, ease: "power2.out" }
        );
      }
    });

    // Reset and redraw the line with a "Time Reversal" effect
    gsap.to(lineRef.current, {
      height: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to(lineRef.current, {
          height: '100%',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  };

  const currentSchedule = scheduleData[activeDay];

  return (
    <section id="schedule" ref={sectionRef} className="py-24 sm:py-32 relative min-h-screen z-10 overflow-hidden bg-black">
      
      {/* Background Magic Runes (Decorative Center) */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img src={TimelineBg} alt="Timeline Background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none z-0">
         <div ref={runeRef} className="w-full h-full border-2 border-emerald-500 rounded-full flex items-center justify-center p-20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="w-full h-full border border-green-400/50 rounded-full flex items-center justify-center p-10 rotate-45">
                <div className="w-full h-full border-2 border-emerald-600/30 rounded-full flex items-center justify-center">
                    <div className="w-2/3 h-2/3 border border-green-500/20 -rotate-45"></div>
                </div>
            </div>
         </div>
      </div>

      {/* Floating Magic Circles (Scroll Activated) */}
      <div className="absolute top-20 -left-20 w-64 h-64 z-0 opacity-30 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-emerald-500 w-full h-full" style={{}} ref={el => magicCirclesRef.current[0] = el} />
      </div>
      <div className="absolute bottom-40 -right-32 w-96 h-96 z-0 opacity-30 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-green-400 w-full h-full" style={{}} ref={el => magicCirclesRef.current[1] = el} />
      </div>
       <div className="absolute top-1/3 right-10 w-32 h-32 z-0 opacity-20 pointer-events-none mix-blend-screen">
         <MagicCircle className="text-teal-400 w-full h-full" style={{}} ref={el => magicCirclesRef.current[2] = el} />
      </div>


      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16 relative">
             <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black italic text-transparent bg-clip-text bg-linear-to-b from-green-400 to-emerald-700 drop-shadow-[4px_4px_0px_#064E3B] mb-4 tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>
               SCHEDULE
             </h2>
             <div className="inline-block bg-white border-4 border-black px-4 py-2 transform -rotate-2 shadow-[6px_6px_0px_#10B981] mb-6 relative">
                 <p className="text-black font-bold tracking-widest text-sm sm:text-base uppercase flex items-center gap-2">
                    <span className="text-emerald-600 font-extrabold">DOCTOR STRANGE:</span>
                    DORMAMMU! I'VE COME TO BARGAIN
                 </p>
                 {/* Speech Bubble Arrow */}
                 <div className="absolute -bottom-3 left-1/2 w-4 h-4 bg-white border-b-4 border-r-4 border-black transform rotate-45"></div>
             </div>
        </div>

        {/* Day Selector - Agamotto Style with Comic Twist */}
        <div className="flex justify-center gap-3 sm:gap-6 mb-12 sm:mb-20 flex-wrap px-2 sm:px-4">
          {['day1', 'day2', 'day3'].map((day, idx) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`cursor-pointer group relative px-4 sm:px-8 py-2 sm:py-3 font-display font-black italic text-base sm:text-xl tracking-wider transition-all duration-300 border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] ${
                activeDay === day
                  ? 'bg-[#10B981] text-white hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] sm:hover:shadow-[8px_8px_0px_#000]'
                  : 'bg-white text-black hover:bg-emerald-100 hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#10B981] sm:hover:shadow-[8px_8px_0px_#10B981]'
              }`}
            >
              <span className="relative z-10 uppercase">
                Day 0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        <div id="timeline-container" ref={timelineContainerRef} className="relative max-w-4xl mx-auto pl-2 sm:pl-0">
          {/* Central Line - The Time Stream */}
          <div className="absolute left-[27px] sm:left-[19px] md:left-1/2 top-0 bottom-0 w-1 sm:w-2 bg-emerald-900/30 md:-translate-x-1/2 border-l-2 border-r-2 border-emerald-900/10"></div>
          <div ref={lineRef} className="absolute left-[27px] sm:left-[19px] md:left-1/2 top-0 w-1 sm:w-2 bg-linear-to-b from-green-400 via-emerald-500 to-green-600 md:-translate-x-1/2 origin-top shadow-[0_0_15px_#10B981]"></div>

          {currentSchedule.map((item, index) => (
            <div key={`${activeDay}-${index}`} className={`relative flex items-center mb-12 sm:mb-16 md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Eye of Agamotto Node */}
              <div className="absolute left-[27px] sm:left-[19px] md:left-1/2 -translate-x-1/2 z-20 group">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black border-2 sm:border-4 border-[#10B981] rotate-45 group-hover:rotate-135 transition-transform duration-700 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-900/50"></div>
                      <div className="w-2 h-2 sm:w-4 sm:h-4 bg-white rounded-full border sm:border-2 border-black relative z-10 animate-pulse"></div>
                  </div>
              </div>
              
              {/* Content Card with Halftone and Comic Styles */}
              <div className="ml-16 sm:ml-16 md:ml-0 md:w-1/2 md:px-12 w-full pr-4 sm:pr-0">
                <div 
                  className={`relative bg-white border-2 sm:border-4 border-black p-4 sm:p-8 hover:translate-y-[-4px] transition-all duration-300 group ${index % 2 === 0 ? 'md:text-left shadow-[6px_6px_0px_#10B981] sm:shadow-[8px_8px_0px_#10B981]' : 'md:text-right shadow-[6px_6px_0px_#10B981] sm:shadow-[-8px_8px_0px_#10B981]'} hover:shadow-[10px_10px_0px_#000] sm:hover:shadow-[12px_12px_0px_#000]`}
                  style={{ transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})` }} 
                >
                  
                  {/* Halftone Pattern Overlay */}
                  <div className="absolute inset-0 halftone-pattern opacity-5 pointer-events-none z-0"></div>

                  {/* Decorative Corner Lines */}
                  <div className="absolute -top-2 -left-2 w-0 h-0 border-t-8 sm:border-t-10 border-l-8 sm:border-l-10 border-[#10B981] z-20"></div>
                  <div className="absolute -bottom-2 -right-2 w-0 h-0 border-b-8 sm:border-b-10 border-r-8 sm:border-r-10 border-[#10B981] z-20"></div>

                  <div className={`flex flex-col items-start ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                      <div className="bg-black text-white px-2 py-0.5 sm:py-1 font-mono font-bold text-[10px] sm:text-xs inline-block mb-2 transform -rotate-2 border border-white">
                          TIMESTAMPS // {item.time}
                      </div>
                      <h3 className="relative z-10 text-xl sm:text-3xl font-display font-black text-black mb-1 sm:mb-2 uppercase tracking-wide italic leading-none">
                          {item.title}
                      </h3>
                      <p className="relative z-10 text-black font-bold font-sans text-xs sm:text-base leading-relaxed max-w-sm">
                          {item.description}
                      </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
