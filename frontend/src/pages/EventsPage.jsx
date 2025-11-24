import { useState, useEffect } from 'react';
import gsap from 'gsap';
import EventDetailsCard from '../components/EventDetailsCard';

const eventsData = {
  flagship: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Flagship",
      description: "The biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      venue: "Main Auditorium",
      prize: "₹1,00,000",
      poc: { name: "Rahul Sharma", email: "rahul.sharma@techfest.com" }
    },
    {
      id: 2,
      title: "Innovation Challenge",
      category: "Flagship",
      description: "Present your innovative ideas and prototypes to a panel of judges. Best innovation wins funding and mentorship.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      venue: "Innovation Hub",
      prize: "₹75,000",
      poc: { name: "Priya Patel", email: "priya.patel@techfest.com" }
    }
  ],
  coding: [
    {
      id: 3,
      title: "Hackathon 2025",
      category: "Coding",
      description: "24-hour coding marathon where teams build innovative solutions to real-world problems. Mentorship and resources provided.",
      image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=800",
      date: "March 15-16, 2025",
      venue: "Computer Lab A",
      prize: "₹50,000",
      poc: { name: "Arjun Mehta", email: "arjun.mehta@techfest.com" }
    },
    {
      id: 4,
      title: "Code Relay",
      category: "Coding",
      description: "Team-based competitive programming event. Solve algorithmic challenges in a relay format against the clock.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      venue: "Computer Lab B",
      prize: "₹30,000",
      poc: { name: "Sneha Reddy", email: "sneha.reddy@techfest.com" }
    },
    {
      id: 5,
      title: "Web Dev Workshop",
      category: "Coding",
      description: "Learn modern web development techniques from industry experts. Build a full-stack application from scratch.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      venue: "Workshop Hall",
      prize: "Certificates",
      poc: { name: "Vikram Singh", email: "vikram.singh@techfest.com" }
    }
  ],
  robotics: [
    {
      id: 6,
      title: "RoboWars",
      category: "Robotics",
      description: "Build combat robots and compete in an arena battle. Last robot standing wins the championship.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      venue: "Arena Ground",
      prize: "₹60,000",
      poc: { name: "Aditya Kumar", email: "aditya.kumar@techfest.com" }
    },
    {
      id: 7,
      title: "Line Follower Challenge",
      category: "Robotics",
      description: "Design autonomous robots that can navigate complex paths. Fastest and most accurate robot wins.",
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      venue: "Robotics Lab",
      prize: "₹25,000",
      poc: { name: "Ananya Desai", email: "ananya.desai@techfest.com" }
    },
    {
      id: 8,
      title: "Drone Racing",
      category: "Robotics",
      description: "Race your custom-built drones through obstacle courses. Speed and precision are key to victory.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800",
      date: "March 15, 2025",
      venue: "Open Ground",
      prize: "₹40,000",
      poc: { name: "Rohan Gupta", email: "rohan.gupta@techfest.com" }
    }
  ],
  gaming: [
    {
      id: 9,
      title: "Esports Tournament",
      category: "Gaming",
      description: "Compete in popular esports titles including Valorant, CS:GO, and more. Solo and team events available.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      venue: "Gaming Arena",
      prize: "₹45,000",
      poc: { name: "Karan Malhotra", email: "karan.malhotra@techfest.com" }
    },
    {
      id: 10,
      title: "Mobile Gaming Championship",
      category: "Gaming",
      description: "Battle it out in mobile gaming tournaments featuring BGMI, COD Mobile, and Clash Royale.",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      venue: "Gaming Zone",
      prize: "₹20,000",
      poc: { name: "Ishita Joshi", email: "ishita.joshi@techfest.com" }
    }
  ],
  creative: [
    {
      id: 11,
      title: "Design Derby",
      category: "Creative",
      description: "Showcase your design skills in UI/UX, graphic design, and digital art competitions.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      venue: "Design Studio",
      prize: "₹35,000",
      poc: { name: "Meera Kapoor", email: "meera.kapoor@techfest.com" }
    },
    {
      id: 12,
      title: "Photography Contest",
      category: "Creative",
      description: "Capture the essence of technology and innovation through your lens. Multiple categories available.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      venue: "Campus Wide",
      prize: "₹15,000",
      poc: { name: "Siddharth Rao", email: "siddharth.rao@techfest.com" }
    }
  ]
};



const EventCard = ({ event, onClick }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer bg-black"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-linear-to-t from-cyan-500/20 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="text-cyan-400 text-xs uppercase tracking-wider mb-2 block">{event.category}</span>
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
          <span>View Details</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'flagship', name: 'Flagship' },
    { id: 'coding', name: 'Coding' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'creative', name: 'Creative' }
  ];

  const getFilteredEvents = () => {
    if (selectedCategory === 'all') {
      return Object.values(eventsData).flat();
    }
    return eventsData[selectedCategory] || [];
  };

  useEffect(() => {
    gsap.fromTo('.event-card',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Our <span className="text-cyan-400">Events</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our diverse range of technical and creative events. Find your passion and register now!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredEvents().map((event) => (
            <div key={event.id} className="event-card">
              <EventCard event={event} onClick={() => setSelectedEvent(event)} />
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default EventsPage;
