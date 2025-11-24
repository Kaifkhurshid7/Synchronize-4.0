import { useEffect } from 'react';
import gsap from 'gsap';

const EventDetailsCard = ({ event, onClose }) => {
  useEffect(() => {
    gsap.fromTo('.modal-overlay', 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo('.modal-content',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
  }, []);

  const handleClose = () => {
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3
    });
  };

  return (
    <div 
      className="modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="modal-content relative w-full max-w-4xl max-h-[90vh] bg-linear-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500 transition-all duration-300 group"
        >
          <svg className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Event Image */}
        <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 bg-cyan-400/20 border border-cyan-400 text-cyan-400 text-xs uppercase tracking-wider rounded-full mb-2">
              {event.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-glow">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Event Details - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto scrollbar-custom flex-1 min-h-0">
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {event.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-4 rounded-lg border-l-4 border-cyan-400">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm uppercase tracking-wide">Date</span>
              </div>
              <p className="text-white font-semibold">{event.date}</p>
            </div>

            <div className="glass-card p-4 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm uppercase tracking-wide">Venue</span>
              </div>
              <p className="text-white font-semibold">{event.venue}</p>
            </div>

            <div className="glass-card p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400 text-sm uppercase tracking-wide">Prize</span>
              </div>
              <p className="text-white font-semibold">{event.prize}</p>
            </div>
          </div>

          {/* POC Section */}
          <div className="glass-card p-6 rounded-lg mb-6">
            <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Point of Contact
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">{event.poc.name}</p>
                <a 
                  href={`mailto:${event.poc.email}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 mt-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {event.poc.email}
                </a>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 mb-6">
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Register Now
            </span>
          </button>

          {/* Registration Queries Section */}
          <div className="bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
            <h4 className="text-white font-semibold text-center mb-4 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              For Registration Queries Contact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">[Contact Name 1]</p>
                <a 
                  href="tel:+919876543210"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 [Phone Number 1]
                </a>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                <p className="text-white font-semibold mb-1">[Contact Name 2]</p>
                <a 
                  href="tel:+919876543211"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
