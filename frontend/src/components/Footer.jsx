import { Instagram, Github, Linkedin, MapPin, Mail, Phone, ArrowRight, Shield, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';


const Footer = () => {
  
  const navigate = useNavigate();

  return (
    <footer className="bg-[#F0F4F8] border-t-8 border-black pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-10 relative overflow-hidden">
      {/* Comic Book Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0055AA] via-[#AA0505] to-iron-gold opacity-10" />
      
      {/* Halftone Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)',
          backgroundSize: '15px 15px'
        }}
      />
      
      {/* Speed Lines Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 speed-lines" />
      </div>

      {/* Comic Book Action Bursts */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-marvel-red rounded-full flex items-center justify-center comic-shadow opacity-30 animate-comic-float">
        <Star className="w-8 h-8 text-white fill-current" />
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-iron-gold rounded-full flex items-center justify-center comic-shadow opacity-30 animate-comic-spin">
        <Zap className="w-6 h-6 text-black fill-current" />
      </div>
      
      {/* Additional Comic Elements */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
        <div className="bg-white border-4 border-black px-4 py-2 transform -rotate-12 comic-shadow">
          <span className="font-black text-[#AA0505] text-lg">POW!</span>
        </div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-4 sm:space-y-6">
            {/* Comic Book Title Card */}
            <div className="relative bg-slate-50 border-4 border-black comic-shadow p-3 mb-6 transform rotate-1 text-[#0055AA]">
              <h2 className="text-xl sm:text-2xl font-display font-black mb-2 pop-art-text">
                SYNCHRONIZE<span className="text-[#AA0505]"> 4.0</span>
              </h2>
            </div>
            
            {/* Speech Bubble Description */}
            <div className="relative bg-white border-4 border-black comic-shadow p-4 rounded-lg">
              <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-10px border-l-transparent border-r-10 border-r-transparent border-t-10 border-t-black" />
              <div className="absolute -bottom-1 left-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
              <p className="text-black text-xs sm:text-sm leading-relaxed font-bold">
                "ASSEMBLE FOR THE ULTIMATE TECH ADVENTURE! WHERE HEROES OF CODE UNITE!"
              </p>
            </div>
            
            {/* Comic Book Social Icons */}
            <div className="flex space-x-2 sm:space-x-3">
              {[
                { icon: Instagram, color: '#E1306C', href: '#', label: 'Instagram' },
                { icon: Github, color: '#000000', href: 'https://github.com/RADXIshan/Synchronize-4.0', label: 'Github' },
                { icon: Linkedin, color: '#0077B5', href: '#', label: 'LinkedIn' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <div key={i} className="relative group">
                    <a 
                      href={social.href} 
                      className="relative w-12 h-12 sm:w-14 sm:h-14 border-4 border-black comic-shadow flex items-center justify-center text-white hover:-translate-y-1 hover:scale-105 transition-all duration-200"
                      style={{ backgroundColor: social.color }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    {/* Action Bubble */}

                  </div>
                );
              })}
            </div>

            {/* Previous Editions - Comic Style */}
            <div className="pt-4 border-t-4 border-black border-dashed">
              <div className="bg-iron-gold border-2 border-black px-3 py-1 inline-block transform -rotate-1 mb-3">
                <p className="text-xs text-black font-black">LEGENDARY EDITIONS</p>
              </div>
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'Synchronize 3.0', url: 'https://synchronizexim.in' },
                  { name: 'Synchronize 2.0', url: '#' },
                  { name: 'Synchronize 1.0', url: '#' }
                ].map((edition, i) => (
                  <a
                    key={i}
                    href={edition.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm text-black hover:text-[#AA0505] transition-all duration-300 flex items-center gap-2 font-bold"
                  >
                    <div className="w-3 h-3 bg-[#AA0505] border border-black transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="relative">
                      {edition.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links - Comic Style */}
          <div>
            {/* Comic Book Header */}
            <div className="bg-[#0055AA] border-4 border-black comic-shadow p-3 mb-6 transform rotate-1">
              <h3 className="text-lg sm:text-xl font-black text-white pop-art-text">
                MISSION CONTROL
              </h3>
            </div>
            
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/', icon: '🏠' },
                { name: 'About Us', path: '/#about', icon: '🛡️'},
                { name: 'Events', path: '/#events', icon: '⚡' },
                { name: 'Schedule', path: '/#schedule', icon: '📅' },
                { name: 'Sponsors', path: '/#sponsors', icon: '💎' },
                { name: 'Team', path: '/team', icon: '👥' },
                { name: 'Gallery', path: '/gallery', icon: '📸' },
                { name: 'Contact', path: '/#contact', icon: '📞' }
              ].map((link, i) => (
                <li 
                  key={i}
                  className="group cursor-pointer" 
                  onClick={() => {
                    if (link.path.includes('#')) {
                      const [path, hash] = link.path.split('#');
                      navigate(path || '/');
                      setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    } else {
                      navigate(link.path);
                    }
                  }}
                >
                  <div className="bg-white border-2 border-black p-2 flex items-center gap-3 hover:translate-y-[-2px] comic-shadow-hover transition-all duration-200 transform hover:-rotate-1">
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-md font-bold text-black">
                      {link.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#0055AA] ml-auto group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact - Comic Style */}
          <div>
            {/* Comic Book Header */}
            <div className="bg-[#AA0505] border-4 border-black comic-shadow p-3 mb-6 transform -rotate-1">
              <h3 className="text-lg sm:text-xl font-black text-white pop-art-text">
                ASSEMBLE HERE!
              </h3>
            </div>
            
            <div className="space-y-4">
              {/* Location Card */}
              <div className="bg-white border-4 border-black comic-shadow p-4 transform hover:rotate-1 transition-transform duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-marvel-red border-2 border-black flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm mb-1">HEADQUARTERS</h4>
                    <span className="text-xs text-black font-bold leading-tight">
                      XIM UNIVERSITY<br/>
                      Nijigada, Kurki<br/>
                      Odisha 752050, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border-4 border-black comic-shadow p-4 transform hover:-rotate-1 transition-transform duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0055AA] border-2 border-black flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm mb-1">SIGNAL</h4>
                    <span className="text-xs text-black font-bold break-all">
                      techfest-scse@xim.edu.in
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white border-4 border-black comic-shadow p-4 transform hover:rotate-1 transition-transform duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-iron-gold border-2 border-black flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm mb-1">HOTLINE</h4>
                    <span className="text-xs text-black font-bold">
                      +91 6204-148753
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Map/Location - Comic Style */}
          <div>
            {/* Comic Book Header */}
            <div className="bg-iron-gold border-4 border-black comic-shadow p-3 mb-6 transform rotate-1">
              <h3 className="text-lg sm:text-xl font-black pop-art-text">
                BATTLE ZONE
              </h3>
            </div>
            
            <div className="relative group">
              {/* Comic Book Map Frame */}
              <div className="w-full h-40 bg-white border-4 border-black comic-shadow overflow-hidden relative transform group-hover:rotate-1 transition-transform duration-300">
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=XIM+University+Nijigada+Kurki+Harirajpur+Kakudia+Odisha+752050&zoom=15`}
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy"
                  className="sepia group-hover:sepia-0 transition-all duration-500"
                  title="Location Map"
                ></iframe>
                
                {/* Comic Book Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#0055AA]/20 via-transparent to-[#AA0505]/20 pointer-events-none" />
                
                {/* Location Pin Effect */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-marvel-red border-2 border-white rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-marvel-red border-2 border-white rounded-full" />
              </div>
            </div>
            
            {/* Comic Book Button */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=XIM+University+Nijigada+Kurki+Plot+No+12A+Harirajpur+Kakudia+Odisha+752050" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-white border-4 border-black comic-shadow p-3 flex items-center gap-2 group hover:translate-y-[-2px] comic-shadow-hover transition-all duration-200 transform hover:-rotate-1"
            >
              <span className="text-black font-black text-sm">GET DIRECTIONS</span>
              <ArrowRight className="w-4 h-4 text-[#AA0505] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Bottom section - Comic Style */}
        <div className="border-t-4 border-black pt-6 sm:pt-8">
          {/* Main Copyright Banner */}
          <div className="bg-linear-to-r from-[#0055AA] via-[#AA0505] to-iron-gold border-4 border-black comic-shadow p-4 mb-6 transform -rotate-1">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center">
                  <Shield className="w-3 h-3 text-black fill-current" />
                </div>
                <p className="font-black text-sm md:text-base pop-art-text">
                  © {new Date().getFullYear()} SYNCHRONIZE FEST - ALL RIGHTS RESERVED
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="#" className="bg-white text-black px-3 py-1 border-2 border-black font-black text-xs hover:-translate-y-px transition-transform duration-200">
                  PRIVACY POLICY
                </a>
                <span className="text-white font-black">•</span>
                <a href="#" className="bg-white text-black px-3 py-1 border-2 border-black font-black text-xs hover:-translate-y-px transition-transform duration-200">
                  TERMS OF SERVICE
                </a>
              </div>
            </div>
          </div>

          {/* Team Credit - Comic Speech Bubble */}
          <div className="text-center">
            <div className="inline-block bg-white border-4 border-black comic-shadow p-4 relative transform rotate-1">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-b-12 border-b-black" />
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-10 border-b-white" />
              <p className="text-black font-black text-sm flex items-center justify-center gap-2">
                <span>CRAFTED WITH</span>
                <span className="text-marvel-red text-lg">❤️</span>
                <span>BY THE SYNCHRONIZE HEROES!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes comic-float {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-8deg); }
        }
        @keyframes comic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-comic-float {
          animation: comic-float 3s ease-in-out infinite;
        }
        .animate-comic-spin {
          animation: comic-spin 4s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
