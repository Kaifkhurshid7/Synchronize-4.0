import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github, ArrowLeft } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

gsap.registerPlugin(ScrollTrigger);

const TeamPage = () => {
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const loaderRef = useRef(null);

  const teamMembers = [
    { name: "Kaif Khurshid", role: "Lead Organizer", image: "https://randomuser.me/api/portraits/men/32.jpg", color: "cyan" },
    { name: "Ishan Roy", role: "Tech Lead", image: "https://randomuser.me/api/portraits/men/44.jpg", color: "purple" },
    { name: "Manish Nanda", role: "Design Head", image: "https://randomuser.me/api/portraits/men/22.jpg", color: "cyan" },
    { name: "Simran Osta", role: "Marketing Lead", image: "https://randomuser.me/api/portraits/women/28.jpg", color: "purple" },
    { name: "Suraj Maharana", role: "Logistics", image: "https://randomuser.me/api/portraits/men/54.jpg", color: "cyan" },
    { name: "Rhea Bachheti", role: "Sponsorships", image: "https://randomuser.me/api/portraits/women/65.jpg", color: "purple" }
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
        delay: 2.2,
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
      {loading && <LoadingAnimation loaderRef={loaderRef} loadingText="Preparing Team..." />}

      <div className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div ref={titleRef}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white relative">
              Meet the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient-text">Team</span>
              
              <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-24 sm:w-32 h-0.5 sm:h-1 bg-linear-to-r from-cyan-400 to-purple-400 rounded-full" />
            </h1>
            <p className="text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg">The brilliant minds behind Synchronize 4.0</p>
          </div>
          
          <Link 
            to="/" 
            className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400/30 rounded-full text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all backdrop-blur-sm relative overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className="group relative cursor-pointer glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col items-center text-center hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${member.color === 'cyan' ? 'from-cyan-500/0 to-cyan-500/10' : 'from-purple-500/0 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className={`absolute inset-0 rounded-full ${member.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <div className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-3 sm:border-4 ${member.color === 'cyan' ? 'border-cyan-400/30 group-hover:border-cyan-400' : 'border-purple-400/30 group-hover:border-purple-400'} transition-all duration-500 shadow-2xl`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    <div className={`absolute inset-0 bg-linear-to-t ${member.color === 'cyan' ? 'from-cyan-400/20' : 'from-purple-400/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {member.name}
                </h3>
                
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${member.color === 'cyan' ? 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-400' : 'bg-purple-400/10 border border-purple-400/30 text-purple-400'} font-sans tracking-wider uppercase text-[10px] sm:text-xs font-semibold group-hover:shadow-lg transition-all duration-300`}>
                  {member.role}
                </div>

                <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                  <a 
                    href="#"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                  >
                    <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a 
                    href="#"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                    style={{ transitionDelay: '50ms' }}
                  >
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a 
                    href="#"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${member.color === 'cyan' ? 'bg-cyan-400/10 hover:bg-cyan-400/20 border-cyan-400/30' : 'bg-purple-400/10 hover:bg-purple-400/20 border-purple-400/30'} border flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 ${member.color === 'cyan' ? 'border-cyan-400/20' : 'border-purple-400/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 ${member.color === 'cyan' ? 'border-cyan-400/20' : 'border-purple-400/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>

      </div>
    </>
  );
};

export default TeamPage;
