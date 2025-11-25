import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedNumber = ({ finalValue, label, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const numberRef = useRef(null);
  const hasAnimated = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const element = numberRef.current;
    
    const animateNumber = () => {
      // Extract numeric value and suffix/prefix
      const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
      const prefix = finalValue.match(/^[^0-9]+/) ? finalValue.match(/^[^0-9]+/)[0] : '';
      const suffix = finalValue.match(/[^0-9]+$/) ? finalValue.match(/[^0-9]+$/)[0] : '';
      
      // Create an object to animate
      const counter = { value: 0 };
      
      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }
      
      // Animate using GSAP for smooth easing
      animationRef.current = gsap.to(counter, {
        value: numericValue,
        duration: 2.5,
        delay: delay,
        ease: "power2.out",
        onUpdate: function() {
          // Format the number with smooth interpolation
          const currentValue = Math.floor(counter.value);
          setDisplayValue(prefix + currentValue + suffix);
        },
        onComplete: function() {
          // Ensure final value is exact
          setDisplayValue(finalValue);
        }
      });
    };
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => animateNumber(), delay * 1000);
        }
      }
    });

    return () => {
      scrollTrigger.kill();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [finalValue, delay]);

  return (
    <div ref={numberRef} className="relative group">
      <div className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]">
        {/* Subtle hover effect */}
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Top line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"></div>
        
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-3 font-display group-hover:text-cyan-400 transition-colors duration-500">
          {displayValue}
        </h3>
        <p className="text-gray-400 uppercase tracking-widest text-xs sm:text-sm font-semibold">
          {label}
        </p>
        
        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate description card
    gsap.fromTo(descriptionRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-32 relative">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-4 sm:right-10 w-32 h-32 sm:w-40 sm:h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="max-w-5xl mx-auto">
          {/* Title */}
          <div ref={titleRef} className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 text-white">
              About <span className="text-cyan-400">The Fest</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-cyan-400/80 mx-auto rounded-full shadow-[0_0_15px_rgba(0,242,255,0.6)]"></div>
          </div>
          
          {/* Description Card */}
          <div ref={descriptionRef} className="glass-card p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden mb-12 sm:mb-16 border border-white/10 shadow-[0_0_80px_rgba(0,242,255,0.15)]">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-cyan-500/5"></div>
            
            {/* Top line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/30"></div>
            
            <div className="relative z-10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-4 sm:mb-6 font-light">
                Synchronize 4.0 is not just a tech fest; it's a <span className="text-cyan-400 font-semibold">convergence of ideas</span>, innovation, and futuristic vision. 
                We bring together the brightest minds to compete, collaborate, and create.
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light">
                From <span className="text-cyan-400 font-semibold">coding marathons</span> to <span className="text-cyan-400 font-semibold">robotics showdowns</span>, immerse yourself in an ecosystem where technology meets creativity. 
                Join us as we redefine the boundaries of what's possible.
              </p>
            </div>
            
            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400/30"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <AnimatedNumber finalValue="20+" label="Events" delay={0} />
            <AnimatedNumber finalValue="1000+" label="Participants" delay={0.2} />
            <AnimatedNumber finalValue="₹50k+" label="Prizes" delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
