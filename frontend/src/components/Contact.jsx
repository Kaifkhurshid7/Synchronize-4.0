import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Instagram, Linkedin, Send, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import ContactBg from '../assets/backgrounds/contact-bg.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.5, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );

      // Form Animation
      gsap.fromTo(formRef.current,
        { x: 100, opacity: 0, rotationY: 45 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const toastId = toast.loading('Sending secure transmission...');

    try {
      const response = await api.post('api/mail/contact', formData);
      if (response.data.success) {
        toast.success('Transmission received!', { id: toastId });
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Transmission failed.', { id: toastId });
      setSubmitStatus({ type: 'error', message: 'Failed to send message.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden bg-black">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <img src={ContactBg} alt="Contact Background" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black via-red-950/20 to-black pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 z-20 relative">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white uppercase text-shadow-comic tracking-wider">
            CONTACT <span className="text-red-600">US</span>
          </h2>
          <div className="h-1 w-24 sm:w-48 bg-red-600 mx-auto mt-2 sm:mt-4 shadow-[0_0_20px_#DC2626]"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-300 font-mono">Secure Channel Open. Transmit Data.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          <div className="space-y-6 sm:space-y-8">
             <div className="comic-panel p-6 sm:p-8 bg-zinc-900 border-l-4 sm:border-l-8 border-red-600 transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_4px_0_#000]">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 flex items-center justify-center rounded-none transform rotate-3 shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white -rotate-3" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider italic">Email Link</h3>
                    <p className="text-gray-400 font-mono mt-0.5 sm:mt-1 text-sm sm:text-base break-all">techfest-scse@xim.edu.in</p>
                  </div>
                </div>
             </div>

             <div className="comic-panel p-6 sm:p-8 bg-zinc-900 border-l-4 sm:border-l-8 border-white transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_4px_0_#000]">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white flex items-center justify-center rounded-none transform -rotate-2 shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-black rotate-2" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider italic">Location</h3>
                    <p className="text-gray-400 font-mono mt-0.5 sm:mt-1 text-sm sm:text-base">New Campus XIM University Xavier City, <br />
                      Plot No.: 12 (A), Nijigada, Kurki Harirajpur P.O - 752050, <br />Dist - Puri, Odisha</p>
                  </div>
                </div>
             </div>

             <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center md:justify-start">
               {[
                 { Icon: Instagram, color: "hover:text-white hover:bg-pink-600", link: "https://www.instagram.com/synchronize_xim?igsh=ZjF6NXpwbG82ZDgy" },
                 { Icon: Linkedin, color: "hover:text-white hover:bg-blue-600", link: "https://www.linkedin.com/company/xim-university/" },
                 { Icon: Youtube, color: "hover:text-white hover:bg-red-600", link: "https://youtube.com/@synchronizexim?si=PXis2RtPVcj0mN7g" }
               ].map(({ Icon, color, link }, i) => (
                 <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 sm:w-14 sm:h-14 bg-zinc-900 border-2 border-gray-700 flex items-center justify-center text-gray-400 ${color} transition-all transform hover:scale-110 shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]`}>
                   <Icon className="w-5 h-5 sm:w-8 sm:h-8" />
                 </a>
               ))}
             </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="comic-panel bg-zinc-900/90 p-8 md:p-10 border-4 border-red-600 relative backdrop-blur-sm shadow-[12px_12px_0_#000]">
            <div className="absolute -top-6 -right-6 bg-white text-black font-black px-6 py-2 -rotate-3 border-4 border-black shadow-[4px_4px_0_#000]">
              TOP SECRET
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-red-500 font-black uppercase tracking-widest text-sm">Agent Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Natasha Romanoff"
                  className="w-full bg-black border-2 border-gray-700 focus:border-red-500 p-4 text-white placeholder-gray-600 outline-none transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-red-500 font-black uppercase tracking-widest text-sm">Secure Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="agent@shield.gov"
                  className="w-full bg-black border-2 border-gray-700 focus:border-red-500 p-4 text-white placeholder-gray-600 outline-none transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-red-500 font-black uppercase tracking-widest text-sm">Mission Report</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter briefing details..."
                  className="w-full bg-black border-2 border-gray-700 focus:border-red-500 p-4 text-white placeholder-gray-600 outline-none transition-all font-mono resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-5 border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Encrypting...</span>
                ) : (
                  <>
                    <span>TRANSMIT</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      <style>{`
        .text-shadow-comic {
          text-shadow: 4px 4px 0px #000;
          -webkit-text-stroke: 2px #000;
        }
      `}</style>
    </section>
  );
};

export default Contact;
