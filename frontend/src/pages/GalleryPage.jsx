import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ZoomIn, X } from 'lucide-react';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const titleRef = useRef(null);
  const imagesRef = useRef([]);
  const loaderRef = useRef(null);

  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600", title: "Opening Ceremony", category: "Events", height: "h-64" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1000", title: "Tech Workshop", category: "Workshops", height: "h-80" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200", title: "Hackathon", category: "Competition", height: "h-96" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=700", title: "Team Building", category: "Activities", height: "h-72" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600", title: "Keynote Speech", category: "Events", height: "h-64" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=900", title: "Networking", category: "Social", height: "h-80" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1100", title: "Awards Night", category: "Events", height: "h-96" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=650", title: "Cultural Show", category: "Entertainment", height: "h-72" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800", title: "Code Sprint", category: "Competition", height: "h-80" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600", title: "Collaboration", category: "Activities", height: "h-64" },
    { id: 11, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000", title: "Innovation Hub", category: "Workshops", height: "h-96" },
    { id: 12, url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=700", title: "Team Spirit", category: "Activities", height: "h-72" },
    { id: 13, url: "https://images.unsplash.com/photo-1559223607-a43c990c2e3a?w=800&h=650", title: "Tech Talks", category: "Events", height: "h-64" },
    { id: 14, url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=1100", title: "Coding Marathon", category: "Competition", height: "h-96" },
    { id: 15, url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=750", title: "Brainstorming", category: "Workshops", height: "h-80" },
    { id: 16, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600", title: "Presentations", category: "Events", height: "h-64" },
    { id: 17, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=900", title: "Team Huddle", category: "Activities", height: "h-80" },
    { id: 18, url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000", title: "Innovation", category: "Workshops", height: "h-96" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    loaderTimeline.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.8,
      ease: "power2.inOut"
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(imagesRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.2)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {loading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-white text-lg font-display">Loading Gallery...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-24 pb-12 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div ref={titleRef}>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white relative">
                Event <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-text">Gallery</span>
                <div className="absolute -bottom-4 left-0 w-32 h-1 bg-linear-to-r from-purple-400 to-cyan-400 rounded-full" />
              </h1>
              <p className="text-gray-400 mt-8 text-lg">Capturing moments from Synchronize 4.0</p>
            </div>
            
            <Link 
              to="/" 
              className="group px-8 py-4 border-2 border-purple-400/30 rounded-full text-white hover:border-purple-400 hover:bg-purple-400/10 transition-all backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                ref={el => imagesRef.current[index] = el}
                className="group relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl glass-card border border-white/5 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500 break-inside-avoid mb-3 md:mb-4"
                onClick={() => openLightbox(image)}
              >
                <div className={`relative w-full overflow-hidden ${image.height}`}>
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 md:p-5">
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">{image.category}</span>
                    <h3 className="text-sm md:text-lg lg:text-xl font-display font-bold text-white leading-tight">{image.title}</h3>
                  </div>

                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-purple-500/80">
                    <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>

                  <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-1 md:px-3 md:py-1.5 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] md:text-xs text-white font-semibold">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-50"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <span className="text-sm uppercase tracking-wider text-purple-400 font-semibold">{selectedImage.category}</span>
                <h3 className="text-3xl font-display font-bold text-white mt-2">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.05); opacity: 0.5; }
          }
          @keyframes gradient-text {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradient-text 3s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default GalleryPage;
