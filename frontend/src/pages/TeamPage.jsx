import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const loaderRef = useRef(null);

  const teamMembers = [
    { name: "Alex Johnson", role: "Lead Organizer", image: "https://randomuser.me/api/portraits/men/32.jpg", color: "cyan" },
    { name: "Sarah Williams", role: "Tech Lead", image: "https://randomuser.me/api/portraits/women/44.jpg", color: "purple" },
    { name: "Michael Chen", role: "Design Head", image: "https://randomuser.me/api/portraits/men/22.jpg", color: "cyan" },
    { name: "Emily Davis", role: "Marketing Lead", image: "https://randomuser.me/api/portraits/women/28.jpg", color: "purple" },
    { name: "David Miller", role: "Logistics", image: "https://randomuser.me/api/portraits/men/54.jpg", color: "cyan" },
    { name: "Jessica Taylor", role: "Sponsorships", image: "https://randomuser.me/api/portraits/women/65.jpg", color: "purple" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    loaderTimeline
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.inOut"
      });

  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.2)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-white text-lg font-display">Loading Team...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen pt-24 pb-12 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div ref={titleRef}>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white relative">
              Meet the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-text">Team</span>
              
              <div className="absolute -bottom-4 left-0 w-32 h-1 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h1>
            <p className="text-gray-400 mt-8 text-lg">The brilliant minds behind Synchronize 4.0</p>
          </div>
          
          <Link 
            to="/" 
            className="group px-8 py-4 border-2 border-cyan-400/30 rounded-full text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all backdrop-blur-sm relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className="group relative cursor-pointer glass-card p-8 rounded-2xl flex flex-col items-center text-center hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${member.color === 'cyan' ? 'from-cyan-500/0 to-cyan-500/10' : 'from-purple-500/0 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className={`absolute inset-0 rounded-full ${member.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <div className={`relative w-36 h-36 rounded-full overflow-hidden border-4 ${member.color === 'cyan' ? 'border-cyan-400/30 group-hover:border-cyan-400' : 'border-purple-400/30 group-hover:border-purple-400'} transition-all duration-500 shadow-2xl`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    <div className={`absolute inset-0 bg-linear-to-t ${member.color === 'cyan' ? 'from-cyan-400/20' : 'from-purple-400/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {member.name}
                </h3>
                
                <div className={`px-4 py-2 rounded-full ${member.color === 'cyan' ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400' : 'bg-purple-400/10 border border-purple-400/30 text-purple-400'} font-sans tracking-wider uppercase text-xs font-semibold group-hover:shadow-lg transition-all duration-300`}>
                  {member.role}
                </div>

                <div className="flex space-x-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a 
                    href="#"
                    className={`w-8 h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="#"
                    className={`w-8 h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                    style={{ transitionDelay: '50ms' }}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href="#"
                    className={`w-8 h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 ${member.color === 'cyan' ? 'border-cyan-400/20' : 'border-purple-400/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 ${member.color === 'cyan' ? 'border-cyan-400/20' : 'border-purple-400/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>

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

export default TeamPage;
