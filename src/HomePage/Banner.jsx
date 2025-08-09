import React, { useEffect, useState } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      <div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      
      <div className="absolute inset-0 bg-black/50" />
      
  

      
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center text-center text-white px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="overflow-hidden">
            <h4 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-cyan-400 animate-fade-in-up">
              Best Solution & Creative
            </h4>
          </div>

          
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase font-bold leading-tight animate-fade-in-up-delay bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Grow Your Business Now
            </h1>
          </div>

          
          <div className="overflow-hidden">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-200 max-w-3xl mx-auto animate-fade-in-up-delay-2">
              Together we are going to help you determine a goal, choose your tools, and develop your business to make it distinct.
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-8 w-full sm:w-auto animate-fade-in-up-delay-3">
            <button className="group relative overflow-hidden bg-transparent border-2 border-cyan-400 text-cyan-400 hover:text-white px-6 py-3 uppercase font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 w-full sm:w-auto">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative z-10">Get Started</span>
            </button>
            <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 uppercase font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto">
              <span className="relative z-10">Read More</span>
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>

    

      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-light">Scroll down</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 1s ease-out 0.9s forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;