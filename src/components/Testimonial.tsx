import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Organic Farmer",
    quote: "Harvest Nexus transformed our farm's efficiency! Their innovative tools helped us increase yield by 30% while reducing waste.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "AgriTech Consultant",
    quote: "The data analytics from Harvest Nexus gave us insights we never had before. It's a game-changer for sustainable farming!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Crop Distributor",
    quote: "With Harvest Nexus, our supply chain is seamless. Their platform connects farmers and buyers effortlessly.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 4
  },
  {
    name: "James Patel",
    role: "Farm Co-op Manager",
    quote: "Harvest Nexus's user-friendly interface made it easy for our team to adopt new technology. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    name: "Laura Thompson",
    role: "Sustainable Agriculture Advocate",
    quote: "Partnering with Harvest Nexus has empowered our community to farm smarter and more sustainably.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-lg ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simple auto-slide function
  const autoSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  // Auto-slide with pause on hover - FIXED VERSION
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only set interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(autoSlide, 5000);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, autoSlide]); // Add autoSlide to dependencies

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(testimonials.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, goToSlide]);

  return (
    <section 
      className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Testimonials about Harvest Nexus"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/images/logo.avif"
                alt="Harvest Nexus Logo"
                className="h-20 w-auto transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg mix-blend-multiply opacity-10"></div>
            </div>
          </div>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wide">
              Trusted by Farmers Worldwide
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-green-900 mb-4 leading-tight">
            What Our <span className="text-green-600">Clients Say</span>
          </h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of agricultural professionals who have transformed their operations with Harvest Nexus
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex flex-col items-center text-center p-10 lg:p-14 bg-white/80 backdrop-blur-sm"
                    aria-hidden={currentIndex !== index}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${testimonials.length}`}
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaQuoteLeft className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Testimonial Text */}
                    <blockquote className="max-w-3xl mx-auto mb-8">
                      <p className="text-xl lg:text-2xl text-gray-800 italic leading-relaxed font-light">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-green-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-green-600 font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 text-green-700 p-4 rounded-full shadow-2xl hover:bg-white hover:text-green-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Previous testimonial"
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 text-green-700 p-4 rounded-full shadow-2xl hover:bg-white hover:text-green-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Next testimonial"
              >
                <FaArrowRight className="text-xl" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-green-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              />
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-4" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`group relative p-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full ${
                    currentIndex === index ? 'scale-110' : 'hover:scale-110'
                  }`}
                  role="tab"
                  aria-selected={currentIndex === index}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 scale-125' 
                      : 'bg-green-300 group-hover:bg-green-400'
                  }`} />
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-green-700 font-semibold text-sm shadow-lg">
                <span className="text-green-600 font-bold">{currentIndex + 1}</span>
                <span className="mx-2">/</span>
                <span>{testimonials.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-green-700 font-semibold mb-6 uppercase tracking-wide text-sm">
            Trusted by Agricultural Leaders Worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-green-600">5000+</div>
            <div className="w-px h-8 bg-green-300"></div>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="w-px h-8 bg-green-300"></div>
            <div className="text-2xl font-bold text-green-600">30+</div>
            <div className="w-px h-8 bg-green-300"></div>
            <div className="text-2xl font-bold text-green-600">4.9/5</div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-green-600 text-sm font-medium mt-2">
            <div>Happy Farmers</div>
            <div>Success Rate</div>
            <div>Countries</div>
            <div>Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;