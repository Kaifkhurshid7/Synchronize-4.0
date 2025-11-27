import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [draggedPositions, setDraggedPositions] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef(null);
  const polaroidsRef = useRef([]);
  const loaderRef = useRef(null);
  const dragState = useRef({});

  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600", caption: "Opening Ceremony", date: "Jan 2024", color: "from-pink-500/20 to-purple-500/20" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1000", caption: "Tech Workshop", date: "Jan 2024", color: "from-blue-500/20 to-cyan-500/20" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200", caption: "Hackathon Night", date: "Jan 2024", color: "from-purple-500/20 to-pink-500/20" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=700", caption: "Team Building", date: "Jan 2024", color: "from-green-500/20 to-emerald-500/20" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600", caption: "Keynote Speech", date: "Jan 2024", color: "from-orange-500/20 to-red-500/20" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=900", caption: "Networking", date: "Jan 2024", color: "from-cyan-500/20 to-blue-500/20" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1100", caption: "Awards Night", date: "Jan 2024", color: "from-yellow-500/20 to-orange-500/20" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=650", caption: "Cultural Show", date: "Jan 2024", color: "from-rose-500/20 to-pink-500/20" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800", caption: "Code Sprint", date: "Jan 2024", color: "from-indigo-500/20 to-purple-500/20" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600", caption: "Collaboration", date: "Jan 2024", color: "from-teal-500/20 to-cyan-500/20" },
    { id: 11, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000", caption: "Innovation Hub", date: "Jan 2024", color: "from-violet-500/20 to-purple-500/20" },
    { id: 12, url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=700", caption: "Team Spirit", date: "Jan 2024", color: "from-fuchsia-500/20 to-pink-500/20" },
  ];

  const getRandomRotation = (index) => {
    const rotations = [-8, -5, -3, 3, 5, 8, -6, 4, -4, 6, -7, 7];
    return rotations[index % rotations.length];
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

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

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(polaroidsRef.current,
        { opacity: 0, scale: 0.3, y: 100, rotation: 180 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: (index) => getRandomRotation(index),
          duration: 1,
          stagger: 0.1,
          ease: "elastic.out(1, 0.6)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const handleMouseDown = (e, id, index) => {
    if (isMobile) return; // Disable dragging on mobile
    if (e.target.closest('.polaroid-image-wrapper')) return;
    
    e.preventDefault();
    const element = polaroidsRef.current[index];
    
    dragState.current[id] = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: draggedPositions[id]?.x || 0,
      currentY: draggedPositions[id]?.y || 0,
      element: element
    };

    gsap.to(element, { scale: 1.1, duration: 0.2, ease: "power2.out" });
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
      const element = polaroidsRef.current[index];
      gsap.to(element, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
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

  const resetPositions = () => {
    setDraggedPositions({});
    polaroidsRef.current.forEach((el, index) => {
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
      {loading && <LoadingAnimation loaderRef={loaderRef} loadingText="Loading Gallery..." />}

      <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 relative z-10 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
          
          {/* Floating particles */}
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 sm:mb-16 gap-4 sm:gap-6">
            <div ref={titleRef}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white relative">
                Event <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-text">Gallery</span>
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-24 sm:w-32 h-0.5 sm:h-1 bg-linear-to-r from-purple-400 to-cyan-400 rounded-full" />
              </h1>
              <p className="text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg">
                {isMobile ? 'Click to enlarge' : 'Drag photos around • Click to enlarge'}
              </p>
            </div>
            
            <div className="flex gap-3">
              {!isMobile && (
                <button
                  onClick={resetPositions}
                  className="cursor-pointer group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 rounded-full text-white hover:border-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 transition-all backdrop-blur-sm relative overflow-hidden text-sm sm:text-base shadow-lg hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-500" />
                    Reset
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              )}
              
              <Link 
                to="/" 
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/30 rounded-full text-white hover:border-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all backdrop-blur-sm relative overflow-hidden text-sm sm:text-base shadow-lg hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" />
                  Back
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>

          {/* Polaroid Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto py-8">
            {galleryImages.map((image, index) => {
              const position = draggedPositions[image.id] || { x: 0, y: 0 };
              
              return (
                <div
                  key={image.id}
                  ref={el => polaroidsRef.current[index] = el}
                  className="polaroid-container"
                  style={{
                    transform: `rotate(${getRandomRotation(index)}deg) translate(${position.x}px, ${position.y}px)`,
                    cursor: isMobile ? 'default' : 'grab',
                    touchAction: 'none',
                  }}
                  onMouseDown={(e) => !isMobile && handleMouseDown(e, image.id, index)}
                >
                  <div className="polaroid group">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-linear-to-br ${image.color} rounded-sm blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    
                    {/* Tape effect */}
                    <div className="tape tape-top" />
                    <div className="tape tape-bottom" />
                    
                    <div 
                      className={`polaroid-image-wrapper ${!isMobile ? 'cursor-pointer' : ''}`}
                      onClick={() => !isMobile && openLightbox(image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption}
                        className="polaroid-image"
                        draggable="false"
                      />
                      
                      {/* Shine effect */}
                      <div className="shine" />
                      
                      {/* Corner fold */}
                      <div className="corner-fold" />
                    </div>
                    
                    <div className="polaroid-caption">
                      <p className="text-gray-800 font-handwriting text-lg leading-tight">{image.caption}</p>
                      <p className="text-gray-500 text-xs mt-1 font-mono">{image.date}</p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-linear-to-br from-yellow-200 to-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }} />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-linear-to-br from-pink-200 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 8px rgba(244, 114, 182, 0.5)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={closeLightbox}
            style={{ isolation: 'isolate' }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl w-full relative z-10" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-fit mx-auto">
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.caption}
                  className="relative max-h-[70vh] sm:max-h-[85vh] w-auto rounded-xl sm:rounded-2xl shadow-2xl object-contain border-4 border-white/10"
                  style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.3)' }}
                />
                <button
                  onClick={closeLightbox}
                  className="cursor-pointer absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-101 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-linear-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 border-2 border-white/20 transition-all duration-300 group backdrop-blur-sm shadow-lg hover:shadow-red-500/50 hover:scale-110"
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:rotate-90 transition-all duration-300" />
                </button>
              </div>
              <div className="mt-6 sm:mt-8 text-center px-4">
                <h3 className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-text">{selectedImage.caption}</h3>
                <p className="text-gray-400 mt-3 text-lg font-mono">{selectedImage.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #a855f7, #06b6d4);
          border-radius: 50%;
          animation: float linear infinite;
          opacity: 0.3;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .polaroid-container {
          transition: transform 0.05s ease-out, z-index 0s;
          user-select: none;
          will-change: transform;
        }

        .polaroid-container:hover {
          z-index: 10;
        }

        .polaroid-container:active {
          cursor: grabbing !important;
        }

        .polaroid {
          background: linear-gradient(145deg, #ffffff, #f5f5f5);
          padding: 14px;
          padding-bottom: 65px;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.15),
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          pointer-events: auto;
          border-radius: 2px;
        }

        .polaroid::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
          pointer-events: none;
          border-radius: 2px;
        }

        .polaroid:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.25),
            0 30px 60px rgba(0, 0, 0, 0.2),
            0 40px 80px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transform: scale(1.03) translateY(-5px);
        }

        .tape {
          position: absolute;
          width: 60px;
          height: 20px;
          background: rgba(255, 248, 220, 0.7);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 10;
          left: 50%;
          transform: translateX(-50%);
        }

        .tape-top {
          top: -8px;
          transform: translateX(-50%) rotate(-2deg);
        }

        .tape-bottom {
          bottom: 55px;
          transform: translateX(-50%) rotate(2deg);
        }

        .polaroid-image-wrapper {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f5f5f5;
          position: relative;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .polaroid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .polaroid-image-wrapper:hover .polaroid-image {
          transform: scale(1.08);
        }

        .shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
          pointer-events: none;
        }

        .polaroid:hover .shine {
          left: 100%;
        }

        .corner-fold {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 20px 20px;
          border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .polaroid:hover .corner-fold {
          opacity: 1;
        }

        .polaroid-caption {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          text-align: center;
          pointer-events: none;
        }

        @font-face {
          font-family: 'Handwriting';
          src: local('Bradley Hand'), local('Comic Sans MS'), local('Segoe Print'), local('Brush Script MT');
        }

        .font-handwriting {
          font-family: 'Handwriting', cursive;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default GalleryPage;
