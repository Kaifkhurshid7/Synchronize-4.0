import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const EventDetailsCard = ({ event, onClose }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const lenis = window.lenis;

    // Stop Lenis smooth scrolling (if present)
    if (lenis?.stop) {
      lenis.stop();
    }

    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight || '';
    // prevent layout shift when scrollbar disappears
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    
    // Hide navbar when modal is open
    document.body.classList.add('modal-open');

    // Close on Escape
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      
      // Show navbar again
      document.body.classList.remove('modal-open');

      // Re-enable Lenis
      if (lenis?.start) {
        lenis.start();
      }

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

  // prevent wheel/touch from bubbling to overlay/global scrollers
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-100 flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
      style={{ isolation: 'isolate' }}
    >
      <div
        className="modal-content relative z-110 w-full max-w-4xl h-[85vh] sm:h-[90vh] bg-linear-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="cursor-pointer absolute z-120 top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-red-600/20 border border-white/50 hover:border-red-500 transition-all duration-300 group backdrop-blur-sm"
          aria-label="Close event details"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
        </button>

        {/* Event Image */}
        <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl sm:rounded-t-2xl shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-12 sm:right-16">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
              <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-cyan-400/20 border border-cyan-400 text-cyan-400 text-[10px] sm:text-xs uppercase tracking-wider rounded-full">
                {event.category}
              </span>
              <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-purple-400/20 border border-purple-400 text-purple-400 text-[10px] sm:text-xs uppercase tracking-wider rounded-full">
                {Array.isArray(event.day) 
                  ? `Day ${Math.min(...event.day)}-${Math.max(...event.day)}`
                  : `Day ${event.day}`
                }
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white text-glow">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Event Details - Scrollable */}
        <div
          ref={scrollContainerRef}
          onWheel={stopProp}
          onTouchStart={stopProp}
          onTouchMove={stopProp}
          className="p-4 sm:p-6 md:p-8 overflow-y-auto scrollbar-custom flex-1 min-h-0 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'auto' }}
        >
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
            {event.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="glass-card p-3 sm:p-4 rounded-lg border-l-3 sm:border-l-4 border-cyan-400">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Date</span>
              </div>
              <p className="text-white font-semibold text-sm sm:text-base">{event.date}</p>
            </div>

            <div className="glass-card p-3 sm:p-4 rounded-lg border-l-3 sm:border-l-4 border-purple-400">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Venue</span>
              </div>
              <p className="text-white font-semibold text-sm sm:text-base">{event.venue}</p>
            </div>

            <div className="glass-card p-3 sm:p-4 rounded-lg border-l-3 sm:border-l-4 border-yellow-400">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">Prize</span>
              </div>
              <p className="text-white font-semibold text-sm sm:text-base">{event.prize}</p>
            </div>
          </div>

          {/* POC Section */}
          <div className="glass-card p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Point of Contact
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold text-base sm:text-lg">{event.poc.name}</p>
                <a
                  href={`mailto:${event.poc.email}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mt-1 text-sm sm:text-base break-all"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {event.poc.email}
                </a>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <a
            href={event.registrationLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer group relative w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/60 mb-4 sm:mb-6 overflow-hidden text-sm sm:text-base block text-center"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-cyan-400/20 to-blue-500/20 blur-xl"></div>

            <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 group-hover:gap-3 transition-all duration-300">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="group-hover:tracking-wider transition-all duration-300">Register Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          {/* Registration Queries Section */}
          <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-4 sm:p-6">
            <h4 className="text-white font-semibold text-center mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              For Registration Queries Contact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-white/10">
                <p className="text-white font-semibold mb-1 text-sm sm:text-base">[Contact Name 1]</p>
                <a
                  href="tel:+919876543210"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 [Phone Number 1]
                </a>
              </div>
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 border border-white/10">
                <p className="text-white font-semibold mb-1 text-sm sm:text-base">[Contact Name 2]</p>
                <a
                  href="tel:+919876543211"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 [Phone Number 2]
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EventDetailsCard;
