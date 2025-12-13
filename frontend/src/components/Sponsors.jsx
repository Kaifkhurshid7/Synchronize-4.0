import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SponsorsBg from '../assets/backgrounds/sponsors-bg.png';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" }
];

const Sponsors = () => {
  const sectionRef = useRef(null);
  const duplicatedSponsors = [...sponsors, ...sponsors];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)", // More "pop" effect
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} className="py-20 relative overflow-hidden bg-black">
      {/* Halftone Pattern BackgroundOverlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <img src={SponsorsBg} alt="Sponsors Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 halftone-pattern opacity-20 pointer-events-none"></div>
      
      {/* Diagonal Speed Lines */}
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Comic Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white italic tracking-tighter transform -skew-x-6 text-shadow-comic">
              OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-red-600">ALLIES</span>
            </h2>
            {/* Speech Bubble Decoration */}
            <div className="absolute -top-12 -right-12 hidden md:block">
              <div className="speech-bubble p-3 transform rotate-12 animate-bounce-slow">
                <span className="font-bold text-black text-sm uppercase">Powered By!</span>
              </div>
            </div>
          </div>
          <div className="h-2 w-32 bg-yellow-400 mx-auto mt-4 transform -skew-x-12 border-2 border-black shadow-[4px_4px_0px_black]"></div>
        </div>
        
        {/* Infinite Scroll Marquee Container - Comic Strip Style */}
        <div className="relative w-full overflow-hidden border-y-4 border-black bg-white/5 backdrop-blur-sm py-8 comic-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 z-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 z-20"></div>
          
          <div className="flex animate-infinite-scroll">
            {duplicatedSponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="shrink-0 mx-6 md:mx-10 comic-panel p-6 bg-white rotate-1 hover:rotate-0 transition-all duration-300 w-48 h-32 flex items-center justify-center group cursor-pointer"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                />
                
                {/* Comic Corner Fold/Detail */}
                <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full opacity-20"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-black rounded-full opacity-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Comic Elements */}
      <div className="absolute top-20 left-10 text-6xl text-white/5 font-black hidden lg:block -rotate-12">BOOM!</div>
      <div className="absolute bottom-20 right-10 text-6xl text-white/5 font-black hidden lg:block rotate-12">ZAP!</div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }

        .text-shadow-comic {
          text-shadow: 4px 4px 0px #000;
          -webkit-text-stroke: 2px #000;
        }
        
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default Sponsors;
