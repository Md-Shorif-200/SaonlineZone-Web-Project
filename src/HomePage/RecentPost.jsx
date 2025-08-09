import React, { useState, useEffect } from "react";


const posts = [
  {
    date: "May 5, 2019",
    category: "Design",
    title: "The Best Tips to Make You Rich.",
    image: "https://i.ibb.co/RT0QJs0k/micheile-henderson-So-T4-m-Zhyh-E-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    date: "Oct 6, 2019",
    category: "Logo",
    title: "How to Create a Great Business.",
    image: "https://i.ibb.co/60jtqrJz/seo-galaxy-z-Z7-J5qri6q-Y-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    date: "Sep 20, 2019",
    category: "Branding",
    title: "Steps to Encourage Yourself to Work.",
    image: "https://i.ibb.co/RTxk6jXZ/mario-gogh-VBLHICVh-l-I-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    date: "Nov 15, 2019",
    category: "Marketing",
    title: "Digital Marketing Strategies That Work.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    date: "Dec 2, 2019",
    category: "Business",
    title: "Building Your Online Presence.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
  {
    date: "Jan 10, 2020",
    category: "Technology",
    title: "Future of Web Development.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  },
];


const PrevArrow = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-white p-3 rounded-full shadow-lg absolute -top-16 right-16 z-20 transition-all duration-300 ${
      disabled 
        ? 'bg-gray-300 cursor-not-allowed' 
        : 'bg-blue-500 hover:bg-blue-600 hover:scale-110'
    }`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
);

const NextArrow = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-white p-3 rounded-full shadow-lg absolute -top-16 right-2 z-20 transition-all duration-300 ${
      disabled 
        ? 'bg-gray-300 cursor-not-allowed' 
        : 'bg-blue-500 hover:bg-blue-600 hover:scale-110'
    }`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
    </svg>
  </button>
);

const RecentPost = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // Large devices: 3 slides
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Medium devices: 2 slides
      } else {
        setSlidesToShow(1); // Small devices: 1 slide
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    setCurrentIndex(0);
  }, [slidesToShow]);

  const maxIndex = Math.max(0, posts.length - slidesToShow);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };


  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (canGoNext) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => clearInterval(autoPlay);
  }, [currentIndex, canGoNext]);

  return (
    <section className="py-16 lg:py-24 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div className="mb-6 lg:mb-0">
            <p className="text-sm text-blue-500 uppercase font-semibold mb-2 tracking-wider">
              What are the latest news
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Creative Recent Posts
            </h2>
          </div>
          <p className="text-gray-600 max-w-md lg:max-w-lg text-sm leading-relaxed">
            We specialize in providing creative and cost-effective business solutions tailored to your unique needs. Whether you're a startup or an established enterprise, our strategies help you drive growth.
          </p>
        </div>

        
        <div className="relative">
          
          {posts.length > slidesToShow && (
            <>
              <PrevArrow onClick={handlePrev} disabled={!canGoPrev} />
              <NextArrow onClick={handleNext} disabled={!canGoNext} />
            </>
          )}
          
          
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {posts.map((post, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <article className="bg-blue-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 sm:h-56 lg:h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <time className="text-sm text-blue-500 font-medium">
                          {post.date}
                        </time>
                        <div className="w-8 h-0.5 bg-blue-500"></div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                      
                      <a
                        href="#"
                        className="inline-flex items-center text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors duration-200 group"
                      >
                        Read More
                        <svg 
                          className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
};

export default RecentPost;