import { useEffect, useRef } from 'react';
import { X, Zap, Shield, Trophy, MapPin, Calendar, User } from 'lucide-react';

const EventDetailsCard = ({ event, onClose }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const lenis = window.lenis;

    if (lenis?.stop) lenis.stop();

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight || '';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.classList.remove('modal-open');
      if (lenis?.start) lenis.start();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const stopProp = (e) => e.stopPropagation();

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      style={{ isolation: 'isolate' }}
    >
      {/* Comic Style Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[#1a0000] opacity-90 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#AA0505_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
      </div>

      <div
        className="modal-content relative z-[110] w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-white border-4 border-black shadow-[12px_12px_0px_#AA0505] flex flex-col overflow-hidden"
        onClick={stopProp}
      >
        {/* Comic Header Bar */}
        <div className="h-12 bg-[#AA0505] border-b-4 border-black flex justify-between items-center px-4 relative overflow-hidden">
            {/* Striped Pattern */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]"></div>
            
            <span className="relative z-10 text-[#FFD700] font-display font-black italic tracking-wider text-xl" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0px #000' }}>
              STARK INDUSTRIES
            </span>

            {/* Close Button - Comic Style */}
            <button
              onClick={handleClose}
              className="group cursor-pointer relative z-10 bg-[#FFD700] hover:bg-[#ED1D24] border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:scale-125 hover:rotate-90 transition-all duration-300 w-8 h-8 flex items-center justify-center rounded-sm"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-black group-hover:text-white stroke-[3px] transition-colors duration-300" />
            </button>
        </div>

        {/* Event Image Panel */}
        <div className="relative h-48 sm:h-64 shrink-0 border-b-4 border-black bg-black group z-20">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          {/* Comic Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(170,5,5,0.4),rgba(0,0,0,0.4))] mix-blend-hard-light pointer-events-none"></div>
          
          {/* Title Box - Overlapping */}
          <div className="absolute -bottom-6 left-6 z-30">
            <div className="bg-[#FFD700] border-4 border-black px-6 py-2 shadow-[8px_8px_0px_#000] transform -rotate-2">
              <h2 className="text-3xl sm:text-5xl font-display font-black text-[#AA0505] italic uppercase whitespace-nowrap" style={{ WebkitTextStroke: '1.5px black' }}>
                {event.title}
              </h2>
            </div>
          </div>
          
          {/* Category Tag */}
          <div className="absolute top-4 right-4 z-20">
             <span className="inline-block px-4 py-1 bg-black text-white font-black uppercase tracking-widest border-2 border-white transform rotate-2 shadow-[4px_4px_0px_#AA0505]">
                {event.category}
             </span>
          </div>
        </div>

        {/* content Scroll Area */}
        <div
          ref={scrollContainerRef}
          onWheel={stopProp}
          onTouchStart={stopProp}
          onTouchMove={stopProp}
          className="flex-1 overflow-y-auto scrollbar-custom bg-[#F0F0F0] p-4 sm:p-6 pt-10 sm:pt-12 relative z-10"
        >
          {/* Ben-Day Dots Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
             {/* Description Bubble */}
             <div className="bg-white border-3 border-black p-6 mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.2)] relative">
                <p className="font-sans font-bold text-black text-base md:text-lg leading-relaxed">
                   {event.description}
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -top-3 left-10 w-6 h-6 bg-white border-t-3 border-l-3 border-black transform rotate-45"></div>
             </div>

             {/* Info Panels */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* Date */}
                <div className="bg-[#AA0505] border-3 border-black p-3 text-center shadow-[4px_4px_0px_#000]">
                   <p className="text-[#FFD700] font-black text-xs uppercase mb-1">Date</p>
                   <p className="text-white font-display font-bold text-lg leading-tight">{event.date}</p>
                </div>
                {/* Venue */}
                <div className="bg-[#1a1a1a] border-3 border-black p-3 text-center shadow-[4px_4px_0px_#000]">
                   <p className="text-[#AA0505] font-black text-xs uppercase mb-1">Location</p>
                   <p className="text-white font-display font-bold text-lg leading-tight">{event.venue}</p>
                </div>
                {/* Prize */}
                <div className="bg-[#FFD700] border-3 border-black p-3 text-center shadow-[4px_4px_0px_#000]">
                   <p className="text-black font-black text-xs uppercase mb-1">Bounty</p>
                   <p className="text-[#AA0505] font-display font-black text-xl leading-tight">{event.prize}</p>
                </div>
             </div>

             {/* POC Section - Comic Box */}
             <div className="border-3 border-black bg-white p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[5px_5px_0px_#000]">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border-2 border-[#FFD700]">
                      <User className="text-white w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-gray-500">Contact</p>
                      <p className="font-bold text-black text-lg">{event.poc.name}</p>
                   </div>
                </div>
                <a href={`mailto:${event.poc.email}`} className="px-4 py-2 bg-black text-white font-bold text-sm hover:bg-[#AA0505] transition-colors border-2 border-transparent hover:border-black uppercase">
                   Signal Comms
                </a>
             </div>
             
             {/* Register Button - Action */}
             <a
               href={event.registrationLink || "#"}
               target="_blank"
               rel="noopener noreferrer"
               className="block w-full"
             >
               <button className="w-full py-4 bg-[#00BCD4] border-4 border-black font-display font-black text-2xl text-white uppercase italic tracking-wider shadow-[8px_8px_0px_#000] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000] hover:bg-[#00E5FF] transition-all transform skew-x-[-6deg]">
                  <span className="inline-block skew-x-[6deg] drop-shadow-[2px_2px_0px_#000]">
                     ENLIST NOW!
                  </span>
               </button>
             </a>

          </div>
        </div>

        {/* Footer Stripe */}
        <div className="h-4 bg-[repeating-linear-gradient(90deg,#AA0505,#AA0505_20px,#FFD700_20px,#FFD700_40px)] border-t-4 border-black"></div>
      </div>
    </div>
  );
};

export default EventDetailsCard;
