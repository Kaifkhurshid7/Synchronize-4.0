import React, { useState, useEffect, useRef } from "react";
import { Share2, Heart } from "lucide-react";
import gsap from "gsap";
import spideyCursor from "../assets/cursor_spiderman.png";
import venomCursor from "../assets/cursor_venom.png";
import spideyComicBg from "../assets/spidey_comic_bg.png";

// Mock Data for Gallery
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The Ultimate Clash",
    image: "/assets/gallery/spidey_venom_clash.png", // Generated
    category: "Covers",
    likes: "12.5k",
  },
  {
    id: 2,
    title: "Maximum Carnage",
    image: "/assets/gallery/carnage.png", // Generated
    category: "Villains",
    likes: "8.9k",
  },
  {
    id: 3,
    title: "Friendly Neighborhood",
    image: "/assets/gallery/spidey_venom_clash.png", // Reuse
    category: "Heroes",
    likes: "15.2k",
  },
  {
    id: 4,
    title: "Symbiote Takeover",
    image: "/assets/gallery/carnage.png", // Reuse
    category: "Black Suit",
    likes: "10.1k",
  },
  {
    id: 5,
    title: "Web of Shadows",
    image: "/assets/gallery/spidey_venom_clash.png",
    category: "Events",
    likes: "9.4k",
  },
  {
    id: 6,
    title: "Lethal Protector",
    image: "/assets/gallery/carnage.png",
    category: "Anti-Hero",
    likes: "11.8k",
  },
];

const GalleryPage = () => {
  const [theme, setTheme] = useState("spiderman"); // 'spiderman' or 'venom'
  const [selectedImage, setSelectedImage] = useState(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "spiderman" ? "venom" : "spiderman"));
  };

  // Animate In when selectedImage changes
  useEffect(() => {
    if (selectedImage && overlayRef.current && modalRef.current) {
        // Overlay fade in
        gsap.fromTo(overlayRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        // Modal zoom/fade in
        gsap.fromTo(modalRef.current,
            { scale: 0.8, opacity: 0, rotate: -5 },
            { scale: 1, opacity: 1, rotate: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    }
  }, [selectedImage]);

  const closeOverlay = () => {
      if (overlayRef.current && modalRef.current) {
          gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in"
          });
          gsap.to(modalRef.current, {
              scale: 0.8,
              opacity: 0,
              rotate: 5,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => setSelectedImage(null)
          });
      } else {
          setSelectedImage(null);
      }
  };

  // Dynamic Theme Colors
  const themeStyles =
    theme === "spiderman"
      ? {
          bg: "bg-[#e23636]",
          bgImage: `url(${spideyComicBg})`,
          bgSize: "cover",
          bgRepeat: "no-repeat",
          bgPosition: "center center",
          text: "text-white",
          accent: "bg-blue-600",
          border: "border-black",
          cardBg: "bg-white",
          cardText: "text-black",
          shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          hoverShadow: "hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
          titleGradient: "from-red-600 to-blue-600",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          filterActive: "bg-red-600 text-white border-black",
          filterInactive: "bg-white text-black border-black",
        }
      : {
          bg: "bg-[#1a1a1a]",
          bgImage: "url('/assets/gallery/venom_bg.png')",
          bgSize: "400px",
          bgRepeat: "repeat",
          bgPosition: "top left",
          text: "text-gray-100",
          accent: "bg-purple-700",
          border: "border-gray-800",
          cardBg: "bg-gray-900",
          cardText: "text-white",
          shadow: "shadow-[0px_0px_15px_rgba(168,85,247,0.5)]",
          hoverShadow: "hover:shadow-[0px_0px_25px_rgba(168,85,247,0.8)]",
          titleGradient: "from-black via-purple-900 to-black",
          button: "bg-purple-800 hover:bg-purple-900 text-white",
          filterActive: "bg-purple-700 text-white border-purple-500",
          filterInactive: "bg-black text-gray-300 border-gray-700",
        };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ease-in-out relative overflow-x-hidden ${themeStyles.bg}`}
      style={{
        backgroundImage: themeStyles.bgImage,
        backgroundSize: themeStyles.bgSize, // Adjust based on patterns
        backgroundAttachment: "fixed",
        backgroundRepeat: themeStyles.bgRepeat,
        backgroundPosition: themeStyles.bgPosition,
      }}
    >
      {/* Overlay for readability if needed */}
      <div className={`absolute inset-0 ${theme === 'venom' ? 'bg-black/70' : 'bg-white/20'} pointer-events-none transition-all duration-700`} />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-36 pb-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1
              className={`text-6xl md:text-8xl font-black uppercase tracking-tighter italic transform -skew-x-12 pr-3.5 ${
                theme === "spiderman"
                  ? "text-marvel-red drop-shadow-[4px_4px_0px_#000]"
                  : "text-transparent bg-clip-text bg-linear-to-br from-gray-200 to-gray-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              } transition-all duration-500`}
            >
              {theme === "spiderman" ? "Spider-Verse" : "Symbiote-City"}
            </h1>
            <p
              className={`mt-2 text-xl font-bold bg-black inline-block px-4 py-1 transform -skew-x-12 ${
                theme === "spiderman" ? "text-yellow-400" : "text-purple-400"
              }`}
            >
              The Comic Gallery
            </p>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`group relative overflow-hidden px-6 py-1 mt-3.5 rounded-full border-4 font-black text-xl uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              theme === "spiderman"
                ? "bg-slate-900 border-white text-white hover:bg-purple-600"
                : "bg-white border-black text-black hover:bg-red-600 hover:text-white"
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {theme === "spiderman" ? (
                <>
                  <img src={venomCursor} alt="Venom" className="w-15 h-15 object-contain animate-pulse" /> Unleash Venom
                </>
              ) : (
                <>
                  <img src={spideyCursor} alt="Spidey" className="w-15 h-15 object-contain animate-pulse" /> Call Spidey
                </>
              )}
            </span>
          </button>
        </header>



        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`group relative ${themeStyles.cardBg} border-4 ${themeStyles.border} p-2 transition-all duration-300 ${theme === 'spiderman' ? themeStyles.shadow : ''} hover:-translate-y-2 hover:rotate-2 cursor-pointer`}
              style={{
                boxShadow: theme === 'venom' ? '0 0 20px rgba(100,0,200, 0.2)' : undefined
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-2/3 border-2 border-black">
                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110`} style={{ backgroundImage: `url(${item.image})` }} />
                
                {/* Halftone / Glitch Overlay */}
                <div className={`absolute inset-0 opacity-20 pointer-events-none ${theme === 'spiderman' ? 'bg-[url("https://www.transparenttextures.com/patterns/black-dots.png")]' : 'bg-purple-900 mix-blend-overlay'}`} />
                

              </div>

              {/* Card Footer */}
              <div className={`mt-3 flex justify-between items-center ${themeStyles.cardText} font-bold uppercase`}>
                <span className="bg-black text-white px-2 py-1 text-xs">{item.category}</span>
                <span className="flex items-center gap-1 text-sm">
                   <Heart className={`w-4 h-4 ${theme === 'spiderman' ? 'text-red-500 fill-red-500' : 'text-purple-500 fill-purple-500'}`} /> {item.likes}
                </span>
              </div>
              
              {/* Decorative Corner / Comic Element */}
              <div className={`absolute -top-3 -right-3 w-8 h-8 ${theme === 'spiderman' ? 'bg-red-600 text-white border-2 border-black' : 'bg-purple-600 border-2 border-white'} rounded-full z-20 flex items-center justify-center font-black text-xs transform rotate-12`}>
                #{item.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Overlay Modal */}
      {selectedImage && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/90 p-4"
          onClick={closeOverlay}
        >
          <div 
            ref={modalRef}
            className={`relative max-w-4xl max-h-[80vh] w-full p-2 border-4 ${themeStyles.border} ${themeStyles.cardBg} transform rotate-1`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeOverlay}
              className={`absolute -top-6 -right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full border-4 border-black text-white font-black text-xl hover:scale-110 transition-transform ${theme === 'spiderman' ? 'bg-red-600' : 'bg-purple-700'}`}
            >
              X
            </button>

            {/* Image */}
            <div className="relative border-2 border-black overflow-hidden">
               <img 
                 src={selectedImage.image} 
                 alt={selectedImage.title} 
                 className="w-full h-full object-contain max-h-[70vh]"
               />
               {/* Halftone Overlay */}
               <div className={`absolute inset-0 opacity-10 pointer-events-none ${theme === 'spiderman' ? 'bg-[url("https://www.transparenttextures.com/patterns/black-dots.png")]' : 'bg-purple-900 mix-blend-overlay'}`} />
            </div>

            {/* Title Tag */}
            <div className={`absolute bottom-4 left-4 right-4 text-center transform skew-x-[-10deg]`}>
              <span className={`inline-block px-6 py-2 border-4 border-black font-black text-2xl uppercase ${theme === 'spiderman' ? 'bg-yellow-400 text-black' : 'bg-purple-900 text-white'}`}>
                {selectedImage.title}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Spidey / Venom Custom Cursor could go here */}
      <style>{`
        .clip-path-notch {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0 100%
          );
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;