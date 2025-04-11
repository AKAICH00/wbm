"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, ChevronDown, Download, Play, Users, Book, Calculator, Briefcase, DollarSign, Shield, TrendingUp, Repeat } from 'lucide-react';
import { useAuth, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

// Add custom bounce animation style
const customBounceStyle = `
  @keyframes slowBounce {
    0%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    50% {
      transform: translateY(-10px) translateX(-50%);
    }
  }
`;

// Import our animation components
// Note: In a real implementation, you would import the actual components
// For this demo, we'll simulate imports by adding placeholders
const MansionAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Only run the animation if not completed
    if (progress < 150 && !animationComplete) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 150) {
            clearInterval(interval);
            setAnimationComplete(true);
            return 150;
          }
          return newProgress;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [progress, animationComplete]);
  
  return (
    <div className="mansion-animation-container w-full h-full flex flex-col justify-end pb-6 -mt-8 md:-mt-8">
      <svg 
        viewBox="0 0 500 300" 
        className="w-full h-auto scale-[1.5] md:scale-[2.0] lg:scale-[2.625] translate-x-0 md:translate-x-[70px] lg:translate-x-[140px]"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: 'transparent' }}
      >
        {/* Main mansion */}
        {/* Main building */}
        <rect 
          x={200 - (progress < 25 ? progress * 3 : 75)} 
          y={210 - (progress >= 25 && progress < 40 ? (progress - 25) * 4 : (progress < 25 ? 0 : 60))} 
          width={(progress < 25 ? progress * 3 : 75) * 2} 
          height={(progress >= 25 && progress < 40 ? (progress - 25) * 4 : (progress < 25 ? 0 : 60))} 
          fill="none"
          stroke="white" 
          strokeWidth="1.5"
          strokeDasharray={progress >= 75 ? "0" : "5,5"}
          strokeDashoffset={-progress * 2}
        />
        
        {/* Left Wing */}
        {progress >= 40 && (
          <rect 
            x={125 - (progress >= 40 && progress < 50 ? (progress - 40) * 2.5 : (progress < 40 ? 0 : 25))} 
            y={210 - (progress >= 40 && progress < 50 ? (progress - 40) * 3 : (progress < 40 ? 0 : 30))} 
            width={(progress >= 40 && progress < 50 ? (progress - 40) * 2.5 : (progress < 40 ? 0 : 25))} 
            height={(progress >= 40 && progress < 50 ? (progress - 40) * 3 : (progress < 40 ? 0 : 30))} 
            fill="none"
            stroke="white" 
            strokeWidth="1.5"
            strokeDasharray={progress >= 75 ? "0" : "5,5"}
            strokeDashoffset={-progress * 2}
          />
        )}
        
        {/* Right Wing */}
        {progress >= 40 && (
          <rect 
            x={275} 
            y={210 - (progress >= 40 && progress < 50 ? (progress - 40) * 3 : (progress < 40 ? 0 : 30))} 
            width={(progress >= 40 && progress < 50 ? (progress - 40) * 2.5 : (progress < 40 ? 0 : 25))} 
            height={(progress >= 40 && progress < 50 ? (progress - 40) * 3 : (progress < 40 ? 0 : 30))} 
            fill="none"
            stroke="white" 
            strokeWidth="1.5"
            strokeDasharray={progress >= 75 ? "0" : "5,5"}
            strokeDashoffset={-progress * 2}
          />
        )}
        
        {/* Main Roof */}
        {progress >= 50 && (
          <polygon 
            points={`
              ${125},${150} 
              ${275},${150} 
              ${200},${150 - (progress >= 50 && progress < 60 ? (progress - 50) * 2 : (progress < 50 ? 0 : 20))}
            `}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={progress >= 75 ? "0" : "5,5"}
            strokeDashoffset={-progress * 2}
          />
        )}
        
        {/* Left Wing Roof */}
        {progress >= 60 && (
          <polygon 
            points={`
              ${100},${180} 
              ${125},${180} 
              ${112.5},${180 - (progress >= 60 && progress < 65 ? (progress - 60) * 2 : (progress < 60 ? 0 : 10))}
            `}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={progress >= 75 ? "0" : "5,5"}
            strokeDashoffset={-progress * 2}
          />
        )}
        
        {/* Right Wing Roof */}
        {progress >= 60 && (
          <polygon 
            points={`
              ${275},${180} 
              ${300},${180} 
              ${287.5},${180 - (progress >= 60 && progress < 65 ? (progress - 60) * 2 : (progress < 60 ? 0 : 10))}
            `}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={progress >= 75 ? "0" : "5,5"}
            strokeDashoffset={-progress * 2}
          />
        )}
        
        {/* Front Steps */}
        {progress >= 65 && (
          <>
            <rect 
              x={180} 
              y={210} 
              width={40} 
              height={5} 
              fill="none"
              stroke="white" 
              strokeWidth="1"
              strokeDasharray={progress >= 75 ? "0" : "5,5"}
            />
            <rect 
              x={185} 
              y={215} 
              width={30} 
              height={3} 
              fill="none"
              stroke="white" 
              strokeWidth="1"
              strokeDasharray={progress >= 75 ? "0" : "5,5"}
            />
            <rect 
              x={190} 
              y={218} 
              width={20} 
              height={2} 
              fill="none"
              stroke="white" 
              strokeWidth="1"
              strokeDasharray={progress >= 75 ? "0" : "5,5"}
            />
          </>
        )}
        
        {/* Main Door - no fill or shade */}
        {progress >= 70 && (
          <>
            <rect 
              x={190} 
              y={180} 
              width={20} 
              height={30} 
              fill="none"
              stroke="white" 
              strokeWidth="1.5"
              strokeDasharray={progress >= 80 ? "0" : "5,5"}
            />
            {/* Door Detail */}
            <path
              d={`M190,180 A10,10 0 0 1 210,180`}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray={progress >= 80 ? "0" : "5,5"}
            />
            <line 
              x1={200} 
              y1={180} 
              x2={200} 
              y2={210} 
              stroke="white" 
              strokeWidth="0.75"
              strokeDasharray={progress >= 85 ? "0" : "3,3"}
            />
          </>
        )}
        
        {/* Windows - Main Building */}
        {progress >= 75 && (
          <>
            <rect x={145} y={165} width={15} height={20} fill="none" stroke="white" strokeWidth="1" />
            <rect x={170} y={165} width={15} height={20} fill="none" stroke="white" strokeWidth="1" />
            <rect x={215} y={165} width={15} height={20} fill="none" stroke="white" strokeWidth="1" />
            <rect x={240} y={165} width={15} height={20} fill="none" stroke="white" strokeWidth="1" />
            
            <rect x={145} y={190} width={15} height={15} fill="none" stroke="white" strokeWidth="1" />
            <rect x={240} y={190} width={15} height={15} fill="none" stroke="white" strokeWidth="1" />
          </>
        )}
        
        {/* Windows - Left Wing */}
        {progress >= 80 && (
          <>
            <rect x={105} y={185} width={15} height={15} fill="none" stroke="white" strokeWidth="1" />
          </>
        )}
        
        {/* Windows - Right Wing */}
        {progress >= 80 && (
          <>
            <rect x={280} y={185} width={15} height={15} fill="none" stroke="white" strokeWidth="1" />
          </>
        )}
        
        {/* Window Crosses */}
        {progress >= 85 && (
          <>
            {/* Main Building */}
            <line x1={152.5} y1={165} x2={152.5} y2={185} stroke="white" strokeWidth="0.75" />
            <line x1={145} y1={175} x2={160} y2={175} stroke="white" strokeWidth="0.75" />
            
            <line x1={177.5} y1={165} x2={177.5} y2={185} stroke="white" strokeWidth="0.75" />
            <line x1={170} y1={175} x2={185} y2={175} stroke="white" strokeWidth="0.75" />
            
            <line x1={222.5} y1={165} x2={222.5} y2={185} stroke="white" strokeWidth="0.75" />
            <line x1={215} y1={175} x2={230} y2={175} stroke="white" strokeWidth="0.75" />
            
            <line x1={247.5} y1={165} x2={247.5} y2={185} stroke="white" strokeWidth="0.75" />
            <line x1={240} y1={175} x2={255} y2={175} stroke="white" strokeWidth="0.75" />
            
            <line x1={152.5} y1={190} x2={152.5} y2={205} stroke="white" strokeWidth="0.75" />
            <line x1={145} y1={197.5} x2={160} y2={197.5} stroke="white" strokeWidth="0.75" />
            
            <line x1={247.5} y1={190} x2={247.5} y2={205} stroke="white" strokeWidth="0.75" />
            <line x1={240} y1={197.5} x2={255} y2={197.5} stroke="white" strokeWidth="0.75" />
            
            {/* Left Wing */}
            <line x1={112.5} y1={185} x2={112.5} y2={200} stroke="white" strokeWidth="0.75" />
            <line x1={105} y1={192.5} x2={120} y2={192.5} stroke="white" strokeWidth="0.75" />
            
            {/* Right Wing */}
            <line x1={287.5} y1={185} x2={287.5} y2={200} stroke="white" strokeWidth="0.75" />
            <line x1={280} y1={192.5} x2={295} y2={192.5} stroke="white" strokeWidth="0.75" />
          </>
        )}
        
        {/* Chimneys */}
        {progress >= 90 && (
          <>
            <rect x={140} y={135} width={8} height={15} fill="none" stroke="white" strokeWidth="1" />
            <rect x={260} y={135} width={8} height={15} fill="none" stroke="white" strokeWidth="1" />
          </>
        )}
        
        {/* Additional Architectural Details */}
        {progress >= 95 && (
          <>
            {/* Columns */}
            <line x1={175} y1={150} x2={175} y2={210} stroke="white" strokeWidth="1" />
            <line x1={225} y1={150} x2={225} y2={210} stroke="white" strokeWidth="1" />
            
            {/* Balcony */}
            <rect x={180} y={160} width={40} height={5} fill="none" stroke="white" strokeWidth="1" />
            
            {/* Balcony railings */}
            {Array.from({length: 9}).map((_, i) => (
              <line 
                key={i}
                x1={180 + i * 5}
                y1={160}
                x2={180 + i * 5}
                y2={165}
                stroke="white"
                strokeWidth="0.75"
              />
            ))}
          </>
        )}
        
        {/* Mansion Detail Lines */}
        {progress >= 100 && (
          <>
            {/* Roof detail lines */}
            <line x1={125} y1={150} x2={200} y2={130} stroke="white" strokeWidth="0.5" opacity="0.8" />
            <line x1={275} y1={150} x2={200} y2={130} stroke="white" strokeWidth="0.5" opacity="0.8" />
            
            {/* Foundation line */}
            <line x1={100} y1={210} x2={300} y2={210} stroke="white" strokeWidth="1" />
            
            {/* Corner details */}
            <line x1={125} y1={150} x2={125} y2={210} stroke="white" strokeWidth="1" />
            <line x1={275} y1={150} x2={275} y2={210} stroke="white" strokeWidth="1" />
            <line x1={100} y1={180} x2={100} y2={210} stroke="white" strokeWidth="1" />
            <line x1={300} y1={180} x2={300} y2={210} stroke="white" strokeWidth="1" />
          </>
        )}
        
        {/* Decorative Lines */}
        {progress >= 110 && (
          <>
            {/* Main roof decorative finial */}
            <path 
              d={`M198,130 L200,125 L202,130`} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.75"
            />
            
            {/* Wing Roof decorative finials */}
            <path 
              d={`M110.5,170 L112.5,167 L114.5,170`} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.75"
            />
            <path 
              d={`M285.5,170 L287.5,167 L289.5,170`} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.75"
            />
          </>
        )}
        
        {/* Final Details - Interior Suggestion Lines */}
        {progress >= 120 && (
          <>
            {/* Interior walls suggestion */}
            <line x1={160} y1={150} x2={160} y2={210} stroke="white" strokeWidth="0.5" opacity="0.6" />
            <line x1={240} y1={150} x2={240} y2={210} stroke="white" strokeWidth="0.5" opacity="0.6" />
            <line x1={125} y1={175} x2={275} y2={175} stroke="white" strokeWidth="0.5" opacity="0.6" />
            
            {/* Center hall */}
            <rect 
              x={180} 
              y={175} 
              width={40} 
              height={35} 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5"
              opacity="0.6" 
            />
          </>
        )}
      </svg>
  </div>
);
};

const WealthFlowAnimation = () => {
  const circleRadius = 354; // Current radius
  const circleCenterX = 300; // Center X for SVG viewBox 600x600
  const circleCenterY = 300; // Center Y

  return (
    <div className="wealth-cycle-animated w-full h-full flex items-center justify-center p-2"> 
      <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible"> 
        
        {/* Display the cycle.png image centered using SVG defaults - Shifted right again */}
        <image 
          href="/cycle.png" 
          x="0" 
          y="0" 
          width="85.5%"
          height="85.5%"
          transform="translate(30, 0)" // Increased right shift to 30px
        />

        {/* Visible Dotted Circle - Now rotating */}
        <circle
          cx={circleCenterX}
          cy={circleCenterY}
          r={circleRadius} 
          fill="none"
          stroke="#FFFFFF" // White dotted line
          strokeWidth="2"
          strokeDasharray="8 12" 
        >
          {/* Add rotation animation */}
          <animateTransform 
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 ${circleCenterX} ${circleCenterY}`}
            to={`360 ${circleCenterX} ${circleCenterY}`}
            dur="30s" // Slow rotation duration
            repeatCount="indefinite"
          />
        </circle>

      </svg>
  </div>
);
};

const BasicWealthBuilderPortal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [revealedSections, setRevealedSections] = useState(['home']);
  const { isSignedIn, isLoaded } = useAuth();
  
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const investmentRef = useRef(null);
  const taxRef = useRef(null);
  const accessRef = useRef(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Check which sections are in view
      const newRevealed = [...revealedSections];
      
      if (position > 100) {
        if (!newRevealed.includes('about')) {
          newRevealed.push('about');
        }
      }
      
      if (position > 700) {
        if (!newRevealed.includes('investment')) {
          newRevealed.push('investment');
        }
      }
      
      if (position > 1300) {
        if (!newRevealed.includes('tax')) {
          newRevealed.push('tax');
        }
      }
      
      if (position > 1900) {
        if (!newRevealed.includes('access')) {
          newRevealed.push('access');
        }
      }
      
      setRevealedSections(newRevealed);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [revealedSections]);
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleActiveSection = () => {
      const position = window.scrollY;
      
      if (position < 500) {
        setActiveSection('home');
      } else if (position < 1100) {
        setActiveSection('about');
      } else if (position < 1700) {
        setActiveSection('investment');
      } else if (position < 2300) {
        setActiveSection('tax');
      } else {
        setActiveSection('access');
      }
    };
    
    window.addEventListener('scroll', handleActiveSection);
    return () => {
      window.removeEventListener('scroll', handleActiveSection);
    };
  }, []);
  
  const scrollTo = (ref: any) => {
    if (ref && ref.current) {
      // Adjust scroll position to account for header height
      const headerHeight = 80; // Approximate header height
      window.scrollTo({
        top: ref.current.offsetTop - headerHeight,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Add custom animation styles */}
      <style jsx global>{customBounceStyle}</style>
      
      {/* Fixed Header - gets solid background on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 ? 'bg-white/90 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-20">
          <div className="flex items-center space-x-2">
            <div className={`text-xl font-bold transition-colors duration-300 ${
              scrollPosition > 50 ? 'text-blue-900' : 'text-white'
            }`}>
              <div className="flex flex-col items-center">
                <span>Wealth Builder</span>
                <span>Mortgage Educators</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'home', ref: homeRef },
              { name: 'About', id: 'about', ref: aboutRef },
              { name: 'Investment', id: 'investment', ref: investmentRef },
              { name: 'Tax Benefits', id: 'tax', ref: taxRef },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.ref)}
                className={`relative transition-colors duration-300 font-medium ${
                  activeSection === item.id 
                    ? scrollPosition > 50 ? 'text-blue-600' : 'text-blue-300'
                    : scrollPosition > 50 ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
            
            {isLoaded && (
              isSignedIn ? (
                <div className="relative">
                  <SignOutButton>
                    <button 
                      className={`transition-colors duration-300 font-medium ${
                        scrollPosition > 50 ? 'text-gray-800' : 'text-white'
                      } hover:text-blue-300 hover:underline cursor-pointer`}
                    >
                      Logout
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                <Link 
                  href="/sign-in"
                  className={`transition-colors duration-300 font-medium ${
                    scrollPosition > 50 ? 'text-gray-800' : 'text-white'
                  } hover:text-blue-300 hover:underline`}
                >
                  Login
                </Link>
              )
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${scrollPosition > 50 ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrollPosition > 50 ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-blue-900 z-40 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col`}
        style={{ paddingTop: '5rem' }}
      >
        <div className="flex flex-col p-6">
          {[
            { name: 'Home', id: 'home', ref: homeRef },
            { name: 'About', id: 'about', ref: aboutRef },
            { name: 'Investment', id: 'investment', ref: investmentRef },
            { name: 'Tax Benefits', id: 'tax', ref: taxRef },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.ref)}
              className="py-4 text-left text-white text-xl font-medium border-b border-blue-800"
            >
              {item.name}
            </button>
          ))}
          
          {isLoaded && (
            isSignedIn ? (
              <SignOutButton>
                <button 
                  className="py-4 text-left text-white text-xl font-medium border-b border-blue-800 hover:text-blue-300 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </SignOutButton>
            ) : (
              <Link 
                href="/sign-in"
                className="py-4 text-left text-white text-xl font-medium border-b border-blue-800 hover:text-blue-300 hover:underline"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
      
      {/* Main Content - Add pt-16 padding top to account for header */}
      <main className="pt-16 relative z-0">
        {/* Hero Section */}
        <section 
          ref={homeRef}
          className="min-h-screen relative flex items-center"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            marginTop: '-4rem'  // Negative margin to compensate for the padding-top on main
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }} />
            
            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 flex flex-col md:flex-row pt-20">
            <div className="md:w-1/2 mb-12 md:mb-0 text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Build Wealth Through <span className="text-blue-300">Strategic Real Estate</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 md:pr-8">
                Discover how real estate investing can create tax advantages, passive income, and long-term wealth.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-4 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center justify-center group">
                  <span>Download Free Guide</span>
                  <Download className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </button>
                <button className="px-8 py-4 bg-blue-700 text-white border border-blue-600 rounded-lg hover:bg-blue-800 transition flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
              <div className="w-full h-full transform transition-all duration-1000 translate-y-0">
                <MansionAnimation />
              </div>
            </div>
          </div>
          
          <div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer hover:text-blue-300 transition-colors duration-300"
            onClick={() => scrollTo(aboutRef)}
            role="button"
            aria-label="Scroll to about section"
            style={{ animation: 'slowBounce 3s infinite' }}
          >
            <div className="text-sm mb-2">Scroll to discover</div>
            <ChevronDown className="h-6 w-6" />
          </div>
        </section>
        
        {/* About Section */}
        <section 
          ref={aboutRef}
          className="py-20 md:py-32 bg-white"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center">
              <div className="text-center mb-8">
                <div className="inline-block mb-6 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  About WealthBuilderMortgage
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Building Financial Freedom Through Real Estate
                </h2>
              </div>
              
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-gray-700 mb-6">
                  WealthBuilderMortgage helps investors, property owners, and real estate professionals unlock the hidden wealth-building potential in real estate.
                </p>
                <p className="text-lg text-gray-700 mb-12">
                  Our community shares exclusive strategies for tax optimization, passive income generation, and long-term wealth accumulation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Community</h3>
                    <p className="text-gray-600">Connect with like-minded investors and professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Book className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Resources</h3>
                    <p className="text-gray-600">Premium guides and educational content</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Tools</h3>
                    <p className="text-gray-600">Interactive calculators and analyzers</p>
                  </div>
                </div>
                
                <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <ArrowRight className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Strategies</h3>
                    <p className="text-gray-600">Proven wealth-building approaches</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-12 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center group">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
        
        {/* Investment Strategy Section */}
        <section 
          ref={investmentRef}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="inline-block mb-6 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Investment Strategy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Wealth Building Cycle
              </h2>
              <p className="text-lg text-gray-700 mx-auto max-w-3xl">
                Our approach leverages the natural advantages of real estate to create a self-reinforcing cycle of wealth generation.
              </p>
            </div>
            
            <div 
              className="rounded-lg shadow-md p-8 mt-12 h-96 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
            >
              {/* Grid Background */}
              <div 
                className="absolute inset-0 z-0" 
                style={{ 
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px',
                }} 
              />
              {/* Animation Content */}
              <div className="relative z-10 w-full h-full">
                <WealthFlowAnimation />
              </div>
            </div>
          </div>
        </section>
        
        {/* Tax Benefits Section */}
        <section 
          ref={taxRef}
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <div className="inline-block mb-6 px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Tax Advantages
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Optimize Your Tax Strategy
              </h2>
              <div className="max-w-3xl">
                <p className="text-lg text-gray-700 mb-6">
                  Real estate provides unique tax advantages that can significantly reduce your overall tax burden while building wealth.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Our strategies help you legally minimize taxes through deductions, depreciation, and strategic entity structures.
                </p>
              </div>
              
              <ul className="space-y-4 mb-12">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-green-600 font-medium text-sm">1</div>
                  <span className="text-gray-700">Mortgage interest deductions</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-green-600 font-medium text-sm">2</div>
                  <span className="text-gray-700">Depreciation tax shield</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-green-600 font-medium text-sm">3</div>
                  <span className="text-gray-700">1031 exchange for tax deferral</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-green-600 font-medium text-sm">4</div>
                  <span className="text-gray-700">Pass-through entity benefits</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Access Section */}
        <section 
          ref={accessRef}
          className="py-20 bg-blue-600 text-white relative"
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }} />
            
            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600 opacity-20 blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-block mb-6 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                Exclusive Access
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Wealth Building Community
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl">
                Get access to premium resources, interactive tools, and connect with like-minded investors.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-6">What You'll Get</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 text-white font-medium text-sm">✓</div>
                      <span>Comprehensive tax strategy guides</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 text-white font-medium text-sm">✓</div>
                      <span>Interactive wealth building calculators</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 text-white font-medium text-sm">✓</div>
                      <span>Networking with investors and professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 text-white font-medium text-sm">✓</div>
                      <span>Regular webinars and education sessions</span>
                    </li>
                  </ul>
                </div>
                
                <a href="#guide-form" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-1 font-medium group">
                  <span>Download Free Guide to Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              
              <div className="lg:w-1/2" id="guide-form">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Get Your Free Guide</h3>
                  </div>
                  
                  <div className="p-6">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Investment Experience</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option>New to real estate investing</option>
                          <option>1-3 properties</option>
                          <option>4+ properties</option>
                          <option>Professional investor</option>
                        </select>
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Download PDF Guide
                      </button>
                    </form>
                    
                    <p className="mt-4 text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white text-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-bold text-gray-900 mb-4">WealthBuilderMortgage</div>
              <p className="mb-4">Building wealth through strategic real estate investment and tax optimization.</p>
              <p className="text-sm">© {new Date().getFullYear()} WealthBuilderMortgage. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Guides</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Calculators</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BasicWealthBuilderPortal; 