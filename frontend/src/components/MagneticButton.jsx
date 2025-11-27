import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const button = buttonRef.current;
    const text = textRef.current;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(text, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, text], {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const initMagneticEffect = () => {
      if (mediaQuery.matches) {
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
      } else {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
        // Reset position if disabled while active
        handleMouseLeave();
      }
    };

    initMagneticEffect();
    mediaQuery.addEventListener("change", initMagneticEffect);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      mediaQuery.removeEventListener("change", initMagneticEffect);
    };
  }, []);

  return (
    <button 
      ref={buttonRef} 
      className={`relative overflow-hidden group ${className}`}
      onClick={onClick}
    >
      <span ref={textRef} className="relative z-10 block">
        {children}
      </span>
      <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 ease-out origin-center pointer-events-none"></div>
    </button>
  );
};

export default MagneticButton;
