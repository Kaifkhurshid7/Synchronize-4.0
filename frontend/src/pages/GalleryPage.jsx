import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, X, RotateCcw, Bug, Binary } from 'lucide-react';

import MagneticButton from '../components/MagneticButton';

import spideyBg from '../assets/spidey_comic_bg.png';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [draggedPositions, setDraggedPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef(null);
  const panelsRef = useRef([]);
  const loaderRef = useRef(null);
  const dragState = useRef({});

  // Reverted to Event/Vibe Photos (User wants theme on cards, not AS the content)
  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600", caption: "OPENING NIGHT", date: "ISSUE #1", color: "bg-[#E62429]" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1000", caption: "WEB SLINGING", date: "ISSUE #2", color: "bg-[#2563EB]" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200", caption: "SPIDER-VERSE", date: "ISSUE #3", color: "bg-white" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=700", caption: "TEAM UP", date: "ISSUE #4", color: "bg-[#E62429]" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600", caption: "DAILY BUGLE", date: "ISSUE #5", color: "bg-[#2563EB]" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=900", caption: "NETWORKING", date: "ISSUE #6", color: "bg-white" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1100", caption: "AWARDS", date: "ISSUE #7", color: "bg-[#E62429]" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=650", caption: "CULTURAL", date: "ISSUE #8", color: "bg-[#2563EB]" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800", caption: "CODE SPRINT", date: "ISSUE #9", color: "bg-white" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600", caption: "COLLAB", date: "ISSUE #10", color: "bg-[#E62429]" },
    { id: 11, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000", caption: "INNOVATION", date: "ISSUE #11", color: "bg-[#2563EB]" },
    { id: 12, url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=700", caption: "SPIRIT", date: "ISSUE #12", color: "bg-white" },
  ];

  const getRandomRotation = (index) => {
    const rotations = [-4, -3, -2, 2, 3, 4, -4, 3, -2, 4, -3, 2];
    return rotations[index % rotations.length];
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    // Simulate loading
    loaderTimeline.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.2,
      ease: "power2.inOut"
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // THWIP Sound Effect Interaction
  useEffect(() => {
    const createThwipObj = (e) => {
        // Only trigger on main body, not if inside interacting elements
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.panel-image-wrapper')) return;

        const thwip = document.createElement('div');
        thwip.innerText = 'THWIP!';
        thwip.style.position = 'fixed';
        thwip.style.left = `${e.clientX}px`;
        thwip.style.top = `${e.clientY}px`;
        thwip.style.color = '#fff';
        thwip.style.fontFamily = 'Montserrat, sans-serif'; 
        thwip.style.fontWeight = '900';
        thwip.style.fontSize = '1.5rem';
        thwip.style.fontStyle = 'italic';
        thwip.style.textShadow = '3px 3px 0px #000';
        thwip.style.pointerEvents = 'none';
        thwip.style.zIndex = '9999';
        thwip.style.transform = 'translate(-50%, -50%) rotate(-10deg)';
        
        // Add comic bubble style
        thwip.style.backgroundColor = '#E62429';
        thwip.style.padding = '5px 10px';
        thwip.style.border = '2px solid black';
        thwip.style.boxShadow = '4px 4px 0px black';
        
        document.body.appendChild(thwip);

        gsap.to(thwip, {
            y: -50,
            opacity: 0,
            scale: 1.5,
            rotation: 10,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                if(document.body.contains(thwip)) document.body.removeChild(thwip);
            }
        });
    };

    window.addEventListener('click', createThwipObj);
    return () => window.removeEventListener('click', createThwipObj);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }
      );

      gsap.fromTo(panelsRef.current,
        { opacity: 0, y: 100, rotation: 180 },
        {
          opacity: 1,
          y: 0,
          rotation: (index) => getRandomRotation(index),
          duration: 0.8,
          stagger: 0.1,
          ease: "elastic.out(1, 0.7)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const handleMouseDown = (e, id, index) => {
    if (isMobile) return;
    if (e.target.closest('.panel-image-wrapper')) return;
    
    e.preventDefault();
    const element = panelsRef.current[index];
    
    dragState.current[id] = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: draggedPositions[id]?.x || 0,
      currentY: draggedPositions[id]?.y || 0,
      element: element
    };

    gsap.to(element, { 
      scale: 1.1, 
      boxShadow: '12px 12px 0px rgba(0,0,0,1)',
      duration: 0.2, 
      ease: "power2.out" 
    });
    element.style.cursor = 'grabbing';
    element.style.zIndex = '1000';
  };

  const handleMouseMove = (e) => {
    Object.keys(dragState.current).forEach(id => {
      const state = dragState.current[id];
      if (state?.isDragging) {
        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;
        
        setDraggedPositions(prev => ({
          ...prev,
          [id]: {
            x: state.currentX + deltaX,
            y: state.currentY + deltaY
          }
        }));
      }
    });
  };

  const handleMouseUp = (id, index) => {
    if (dragState.current[id]) {
      const element = panelsRef.current[index];
      gsap.to(element, { 
        scale: 1, 
        boxShadow: '6px 6px 0px rgba(0,0,0,1)',
        duration: 0.3, 
        ease: "back.out(1.7)" 
      });
      dragState.current[id].element.style.cursor = 'grab';
      dragState.current[id].element.style.zIndex = '';
      dragState.current[id].isDragging = false;
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => {
      Object.keys(dragState.current).forEach((id, index) => handleMouseUp(id, index));
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedPositions]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto';
    };
  }, []);

  const resetPositions = () => {
    setDraggedPositions({});
    panelsRef.current.forEach((el, index) => {
      gsap.fromTo(el,
        { scale: 0.5, rotation: 360 },
        { 
          scale: 1, 
          rotation: getRandomRotation(index),
          duration: 0.8, 
          ease: "elastic.out(1, 0.5)",
          delay: index * 0.05
        }
      );
    });
  };

  return (
    <>


      {/* Increased top margin/padding to prevent Navbar overlap: pt-40 sm:pt-48 */}
      <div className="min-h-screen pt-40 sm:pt-48 pb-12 sm:pb-16 px-4 sm:px-6 relative z-10 overflow-hidden bg-white">
        
        {/* Enhanced Background - Graphic Novel Style */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
             className="absolute inset-0 opacity-15 bg-cover bg-center" 
             style={{ backgroundImage: `url(${spideyBg})` }}
          />
          
          <div className="absolute top-0 right-0 w-full h-full opacity-25 pointer-events-none">
            <div className="absolute top-10 right-[-200px] w-[800px] h-[60px] bg-linear-to-r from-[#E62429] to-[#FF6B6B] rotate-12 transform shadow-lg" />
            <div className="absolute top-32 right-[-150px] w-[600px] h-[30px] bg-linear-to-r from-[#2563EB] to-[#60A5FA] rotate-12 transform shadow-lg" />
            <div className="absolute top-56 right-[-250px] w-[700px] h-[20px] bg-black rotate-12 transform shadow-lg" />
          </div>
          
           {/* Floating Comic Text (Background) */}
           <div className="absolute inset-0 pointer-events-none opacity-8">
             <div className="absolute top-20 left-20 text-6xl text-[#E62429] transform rotate-12 animate-pulse">🕷️</div>
             <div className="absolute top-40 right-32 text-4xl text-[#2563EB] transform -rotate-12 animate-pulse delay-1000">🕸️</div>
             
             {/* Emblem */}
             <div className="absolute bottom-10 right-10 opacity-20 transform -rotate-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Spider-Man_emblem.svg" className="w-64 h-64 invert" style={{ filter: 'drop-shadow(4px 4px 0px #E62429)' }} alt="" />
             </div>
           </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div ref={titleRef} className="relative">
              <div className="absolute -top-8 -left-8 bg-[#E62429] text-white px-4 py-2 font-bold transform -rotate-6 border-4 border-black shadow-[6px_6px_0px_#000] z-20">
                <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-wider">DAILY BUGLE EXCLUSIVE</span>
                </div>
              </div>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-black italic relative z-10 tracking-tighter">
                <span className="text-[#1e56cd] drop-shadow-[4px_4px_0px_rgba(37,99,235,0.5)] stroke-white stroke-2">AMAZING</span>{' '}
                <span className="text-[#E62429] drop-shadow-[4px_4px_0px_rgba(230,36,41,0.5)] stroke-white stroke-2">GALLERY</span>
              </h1>
              
              <div className="mt-4 bg- text-black bg-white border-2 border-black p-3 inline-block shadow-[4px_4px_0px_#111] max-w-md transform rotate-1">
                 <p className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                   <Bug className="w-5 h-5 fill-black text-black" />
                   {isMobile ? 'Touch for details' : 'Use your web shooters to drag panels'}
                 </p>
              </div>
            </div>
            
            <div className="flex gap-4 z-50">
              {!isMobile && (
                <MagneticButton onClick={resetPositions} className="cursor-pointer px-6 py-3 bg-white text-black font-black border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#E62429] transition-all">
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 font-bold" />
                      RESET
                    </span>
                </MagneticButton>
              )}
              
              <Link to="/">
                <MagneticButton className="cursor-pointer px-6 py-3 bg-[#E62429] text-white font-black border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 font-bold" />
                    BACK
                  </span>
                </MagneticButton>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16 max-w-7xl mx-auto py-8 px-4">
            {galleryImages.map((image, index) => {
              const position = draggedPositions[image.id] || { x: 0, y: 0 };
              
              return (
                <div
                  key={image.id}
                  ref={el => panelsRef.current[index] = el}
                  className="panel-container relative"
                  style={{
                    transform: `rotate(${getRandomRotation(index)}deg) translate(${position.x}px, ${position.y}px)`,
                    cursor: isMobile ? 'default' : 'grab',
                    touchAction: isMobile ? 'auto' : 'none',
                    zIndex: 1
                  }}
                  onMouseDown={(e) => !isMobile && handleMouseDown(e, image.id, index)}
                >
                  {/* Comic Panel - The Card Frame */}
                  <div className="group relative bg-white border-4 border-black p-3 shadow-[8px_8px_0px_#000] transition-transform hover:scale-[1.02]">
                    
                    {/* Corner Decorations on Frame (NOT on photo) */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-[#E62429] z-20"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-[#2563EB] z-20"></div>

                    {/* Spider Icon Stamp on Frame */}
                    <div className={`absolute -top-4 -right-4 w-10 h-10 ${index % 2 === 0 ? 'bg-[#E62429]' : 'bg-[#2563EB]'} border-2 border-black z-30 flex items-center justify-center shadow-[2px_2px_0px_#000] rounded-full transform rotate-12 group-hover:rotate-45 transition-transform duration-300`}>
                       <Bug className="w-6 h-6 text-white fill-current" />
                    </div>

                    {/* "Flash" Sticker on random cards */}
                    {index % 3 === 0 && (
                        <div className="absolute -bottom-4 -left-4 bg-iron-gold border-2 border-black px-2 py-1 transform -rotate-12 z-30 shadow-[2px_2px_0px_#000]">
                            <span className="text-xs font-black">POP!</span>
                        </div>
                    )}

                    <div 
                      className={`panel-image-wrapper border-2 border-black overflow-hidden relative aspect-4/5 bg-gray-100 ${!isMobile ? 'cursor-pointer' : ''}`}
                      onClick={() => !isMobile && openLightbox(image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption}
                        className="w-full h-full object-cover filter brightness-100 contrast-110 hover:brightness-110 transition-all duration-500"
                        draggable="false"
                      />
                      {/* Removed overlay covering the image as per user request */}
                    </div>
                    
                    {/* Caption Box - Part of the Card */}
                    <div className="mt-3 relative">
                      <div className={`absolute inset-0 ${image.color} opacity-10 -skew-x-6 transform`} />
                      <div className="relative border-b-2 border-black pb-1 flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-xxs font-black tracking-widest text-gray-500 uppercase">MARVEL COMICS GROUP</span>
                           <p className="text-lg font-display font-black italic text-black uppercase leading-none mt-1">{image.caption}</p>
                           <p className="text-xs font-mono font-bold text-[#E62429] mt-1">{image.date} // $0.50</p>
                        </div>
                        <Binary className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comic Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={closeLightbox}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" >
               {/* Background elements in lightbox */}
            </div>

            <div className="relative max-w-5xl w-full z-10" onClick={(e) => e.stopPropagation()}>
              <div className="relative bg-white border-[6px] border-black shadow-[16px_16px_0px_#E62429] p-2 sm:p-4 transform rotate-1">
                
                <button
                  onClick={closeLightbox}
                  className="cursor-pointer absolute -top-8 -right-8 z-50 w-16 h-16 flex items-center justify-center bg-[#E62429] hover:bg-white text-white hover:text-[#E62429] border-4 border-black shadow-[4px_4px_0px_#000] hover:scale-110 hover:rotate-180 transition-all duration-300 group rounded-full"
                >
                  <X className="w-8 h-8 stroke-[3px]" />
                </button>

                <div className="relative border-4 border-black overflow-hidden bg-black">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.caption}
                    className="w-full max-h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#E62429] border-t-4 border-black p-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                     <h3 className="text-4xl font-display font-black italic uppercase text-shadow-black">{selectedImage.caption}</h3>
                     <p className="font-mono font-bold mt-2 text-black bg-white inline-block px-2">DAILY BUGLE // {selectedImage.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;
