import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Timeline from '../components/Timeline';
import Contact from '../components/Contact';
import Sponsors from '../components/Sponsors';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const timelineRef = useRef(null);
  const sponsorsRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();

  // Handle Hash Scrolling
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1); // remove '#'
      
      // We use a slight delay specifically to allow GSAP pinning calculations to settle if needed,
      // or simply rely on the fact that we are in a useEffect after render.
      // Retrying a few times is robust for heavy pages.
      const scrollToHash = () => {
        const element = document.getElementById(hash);
        if (element) {
          // Check if we need to offset for pinned header?
          // Using scrollIntoView usually handles it, but verify.
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // Immediate attempt
      scrollToHash();
      
      // Delayed attempt for ensuring layout stability
      setTimeout(scrollToHash, 500);
      setTimeout(scrollToHash, 1000);
    }
  }, [location.hash]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Pinning Effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      // Helper function for creating section transitions
      const createSectionTransition = (currentRef, nextRef) => {
        if (!currentRef.current || !nextRef.current) return;

        // Pin the current section when it's fully scrolled
        ScrollTrigger.create({
          trigger: currentRef.current,
          start: "bottom bottom",
          end: "+=100%", // Pin for the duration of the viewport height (while next section comes up)
          pin: true,
          pinSpacing: false,
          scrub: true,
        });

        // Scale/Blur out the current section as the next section enters
        // REMOVED Opacity fade to prevent "invisible section" issues. Z-index covering handles the rest.
        gsap.to(currentRef.current, {
          scale: 0.95,
          filter: "blur(5px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextRef.current,
            start: "top 80%", 
            end: "top top",
            scrub: true,
          }
        });
      };

      // Apply effects to section pairs
      // Hero -> About
      gsap.to(heroRef.current, {
        scale: 0.95,
        filter: "blur(5px)",
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top top",
          scrub: true,
        }
      });

      // About -> Events
      createSectionTransition(aboutRef, eventsRef);

      if (eventsRef.current && timelineRef.current) {
         gsap.to(eventsRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top bottom",
              end: "top center", // Fade out faster
              scrub: true,
            }
         });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      <div ref={mainRef} className="relative w-full bg-black">
        {/* Sections stacked with increasing z-index */}
        
        {/* Hero (z-0) */}
        <div ref={heroRef} className="relative z-0 w-full h-screen">
          <Hero />
        </div>
          
        {/* About (z-10) */}
        <div ref={aboutRef} className="relative z-10 bg-black">
          <About />
        </div>

        {/* Events (z-20) */}
        <div ref={eventsRef} className="relative z-20 bg-black">
          <Events />
        </div>

        {/* Timeline (z-30) */}
        <div ref={timelineRef} className="relative z-30 bg-black">
          <Timeline />
        </div>

        {/* Sponsors (z-40) */}
        <div ref={sponsorsRef} className="relative z-40 bg-black">
          <Sponsors />
        </div>

        {/* Contact (z-50) */}
        <div ref={contactRef} className="relative z-50 bg-black pb-20">
          <Contact />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
