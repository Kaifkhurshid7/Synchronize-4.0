import { useEffect, useRef, useState } from 'react';
import { useCursor, CURSOR_OPTIONS } from '../context/CursorContext';
import gsap from 'gsap';

const CursorChoiceModal = () => {
    const { showModal, setShowModal, selectCursor, currentCursor } = useCursor();
    const [hoveredOption, setHoveredOption] = useState(null);
    const modalRef = useRef(null);
    const containerRef = useRef(null);
    const optionsRef = useRef([]);

    // Determine background color based on hover or selection
    const activeColor = hoveredOption 
        ? CURSOR_OPTIONS.find(c => c.id === hoveredOption)?.color 
        : (CURSOR_OPTIONS.find(c => c.id === currentCursor)?.color || '#000000');

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            
            const tl = gsap.timeline();
            tl.set(modalRef.current, { display: 'flex' })
              .fromTo(modalRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
              )
              .fromTo(containerRef.current,
                { scale: 0.8, y: 100, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, ease: "back.out(1.2)", duration: 0.5 }
              )
              .fromTo(optionsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out", duration: 0.3 },
                "-=0.2"
              );
              
        } else {
            document.body.style.overflow = 'auto';
            if (modalRef.current) gsap.set(modalRef.current, { display: 'none' });
        }
    }, [showModal]);

    if (!showModal) return null;

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-100 hidden items-center justify-center bg-black/90 p-4 transition-colors duration-700"
        >
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 halftone-pattern opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none"></div>

            <div 
                ref={containerRef}
                className="relative w-full min-h-[90vh] flex flex-col items-center"
            >
                {/* Close Button - Comic Style */}
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute -top-6 -right-4 z-50 bg-red-600 text-white w-12 h-12 flex items-center justify-center border-4 border-black comic-shadow hover:scale-110 active:scale-95 transition-all duration-200 transform hover:rotate-6"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Main Comic Panel */}
                <div className="w-full bg-white border-4 border-black comic-shadow p-6 md:p-10 relative">
                    
                    {/* Header */}
                    <div className="text-center mb-8 relative z-10">
                        <h2 
                            className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter transform -skew-x-6"
                            style={{ 
                                textShadow: `4px 4px 0px ${activeColor !== '#000000' ? activeColor : '#000'}`,
                                WebkitTextStroke: '2px black',
                                color: 'white'
                            }}
                        >
                            CHOOSE YOUR <span style={{ color: activeColor === '#000000' ? 'black' : activeColor, textShadow: 'none', WebkitTextStroke: activeColor === '#000000' ? '0px' : '2px black' }}>CHARACTER</span>
                        </h2>
                        
                        <div className="mt-2 text-sm font-black uppercase tracking-widest bg-black text-white inline-block px-4 py-1 transform skew-x-12">
                            Select Your Weapon
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="w-full overflow-y-auto overflow-x-hidden p-6 scrollbar-custom max-h-[60vh]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-8 gap-6 pb-20">
                            {CURSOR_OPTIONS.map((option, index) => {
                                const isSelected = currentCursor === option.id;
                                const isHovered = hoveredOption === option.id;
                                const isActive = isSelected || isHovered;

                                return (
                                    <button
                                        key={option.id}
                                        ref={el => optionsRef.current[index] = el}
                                        onClick={() => selectCursor(option.id)}
                                        onMouseEnter={() => setHoveredOption(option.id)}
                                        onMouseLeave={() => setHoveredOption(null)}
                                        className={`group relative aspect-square transition-all duration-200 
                                            ${isActive ? 'z-10 scale-105' : 'scale-100 grayscale hover:grayscale-0'}
                                        `}
                                    >
                                        {/* Card Container */}
                                        <div 
                                            className="absolute inset-0 border-4 border-black bg-white transition-all duration-200"
                                            style={{
                                                boxShadow: isActive ? `8px 8px 0px 0px ${option.color}` : '4px 4px 0px 0px #000',
                                                transform: isActive ? 'translate(-4px, -4px)' : 'none'
                                            }}
                                        >
                                            {/* Half-tone background for card */}
                                            <div 
                                                className="absolute inset-0 opacity-10"
                                                style={{ 
                                                    backgroundImage: `radial-gradient(${option.color} 1px, transparent 1px)`,
                                                    backgroundSize: '8px 8px'
                                                }}
                                            ></div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10">
                                                {option.icon ? (
                                                    <img 
                                                        src={option.icon} 
                                                        alt={option.name} 
                                                        className={`w-16 h-16 object-contain transition-transform duration-300
                                                            ${isActive ? 'scale-110 rotate-3' : ''}
                                                        `}
                                                        style={{
                                                            filter: `drop-shadow(4px 4px 0px rgba(0,0,0,0.2))`
                                                        }}
                                                    />
                                                ) : (
                                                    <div className={`w-12 h-12 border-2 border-black border-dashed rounded-full flex items-center justify-center`}>
                                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                                    </div>
                                                )}
                                                
                                                {/* Badge */}
                                                <div 
                                                    className="mt-3 px-2 py-0.5 text-[0.6rem] md:text-xs font-black uppercase tracking-wider border-2 border-black transform -skew-x-6 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: isActive ? option.color : 'transparent',
                                                        color: isActive && (option.color === '#000000' || option.id === 'widow' || option.id === 'panther') ? 'white' : 'black'
                                                    }}
                                                >
                                                    {option.name}
                                                </div>
                                            </div>

                                            {/* Corner Accents */}
                                            <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-black bg-white"></div>
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-black bg-white"></div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <span className="text-xs font-mono font-bold bg-yellow-300 px-2 py-1 border-2 border-black shadow-[2px_2px_0px_black] uppercase tracking-widest">
                            Hover to Preview • Click to Equip
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CursorChoiceModal;
