"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, ChevronDown, Download, Play, Users, Book, Calculator } from 'lucide-react';
import HouseBuildingAnimation from './HouseBuildingAnimation';
import WealthFlowAnimation from './WealthFlowAnimation';
import TaxSavingsAnimation from './TaxSavingsAnimation';
import { useTheme } from '@/context/ThemeContext';

// Define type for section item
type SectionItem = {
  name: string;
  id: string;
  ref: React.RefObject<HTMLElement>;
};

const WealthBuilderPortal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [revealedSections, setRevealedSections] = useState(['home']);
  
  // Make sure refs are properly typed for sections
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const investmentRef = useRef<HTMLElement>(null);
  const taxRef = useRef<HTMLElement>(null);
  const accessRef = useRef<HTMLElement>(null);
  
  // Use theme context
  const { theme, toggleTheme } = useTheme();
  
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
  
  // Type-safe scroll function
  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };
  
  // Define sections array
  const sections: SectionItem[] = [
    { name: 'Home', id: 'home', ref: homeRef },
    { name: 'About', id: 'about', ref: aboutRef },
    { name: 'Investment', id: 'investment', ref: investmentRef },
    { name: 'Tax Benefits', id: 'tax', ref: taxRef },
    { name: 'Access', id: 'access', ref: accessRef },
  ];
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Fixed Header - gets solid background on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 ? theme === 'light' ? 'bg-white shadow-md' : 'bg-gray-900 shadow-md' : 'bg-transparent'
        } py-${scrollPosition > 50 ? '3' : '5'}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`text-xl font-bold transition-colors duration-300 ${
              scrollPosition > 50 
                ? theme === 'light' ? 'text-blue-900' : 'text-blue-300'
                : theme === 'light' ? 'text-white' : 'text-white'
            }`}>
              WealthBuilderMortgage
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.ref)}
                className={`relative transition-colors duration-300 font-medium ${
                  activeSection === item.id 
                    ? scrollPosition > 50 
                      ? theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                      : theme === 'light' ? 'text-blue-300' : 'text-blue-300'
                    : scrollPosition > 50 
                      ? theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                      : theme === 'light' ? 'text-white' : 'text-white'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
            
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'light' 
                  ? scrollPosition > 50 ? 'bg-gray-200 text-gray-800' : 'bg-white/20 text-white'
                  : scrollPosition > 50 ? 'bg-gray-700 text-gray-200' : 'bg-gray-800/30 text-white'
              }`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${
                scrollPosition > 50 
                  ? theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                  : 'text-white'
              }`} />
            ) : (
              <Menu className={`h-6 w-6 ${
                scrollPosition > 50 
                  ? theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                  : 'text-white'
              }`} />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 ${theme === 'light' ? 'bg-blue-900' : 'bg-gray-900'} z-40 transition-transform duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col`}
        style={{ paddingTop: '5rem' }}
      >
        <div className="flex flex-col p-6">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.ref)}
              className="py-4 text-left text-white text-xl font-medium border-b border-blue-800"
            >
              {item.name}
            </button>
          ))}
          
          {/* Mobile theme toggle */}
          <button 
            onClick={toggleTheme}
            className="py-4 text-left text-white text-xl font-medium border-b border-blue-800 flex items-center"
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section 
          ref={homeRef as React.RefObject<HTMLElement>}
          className="min-h-screen relative flex items-center"
          style={{
            background: theme === 'light' 
              ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' 
              : 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)'
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
          
          <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 flex flex-col md:flex-row items-center">
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
            
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg transform transition-all duration-1000 translate-y-0">
                <HouseBuildingAnimation />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-bounce">
            <div className="text-sm mb-2">Scroll to discover</div>
            <ChevronDown className="h-6 w-6" />
          </div>
        </section>
        
        {/* About Section */}
        <section 
          ref={aboutRef as React.RefObject<HTMLElement>}
          className={`py-20 md:py-32 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 transform ${
                revealedSections.includes('about') ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}>
                <div className="relative">
                  <div className="absolute -top-5 -left-5 h-64 w-64 bg-blue-200 rounded-full opacity-20"></div>
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Real Estate Investment" 
                    className="rounded-lg shadow-xl relative z-10"
                  />
                </div>
              </div>
              
              <div className={`md:w-1/2 md:pl-12 transition-all duration-1000 delay-300 transform ${
                revealedSections.includes('about') ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}>
                <div className={`inline-block mb-6 px-4 py-1 ${
                  theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-300'
                } rounded-full text-sm font-medium`}>
                  About WealthBuilderMortgage
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Building Financial Freedom Through Real Estate
                </h2>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-6`}>
                  WealthBuilderMortgage helps investors, property owners, and real estate professionals unlock the hidden wealth-building potential in real estate. 
                </p>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8`}>
                  Our community shares exclusive strategies for tax optimization, passive income generation, and long-term wealth accumulation.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-full ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
                    } flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Users className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Community</h3>
                      <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Connect with like-minded investors and professionals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-full ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
                    } flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Book className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Resources</h3>
                      <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Premium guides and educational content</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-full ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
                    } flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Calculator className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Tools</h3>
                      <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Interactive calculators and analyzers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-full ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
                    } flex items-center justify-center mr-4 flex-shrink-0`}>
                      <ArrowRight className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Strategies</h3>
                      <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Proven wealth-building approaches</p>
                    </div>
                  </div>
                </div>
                
                <button className={`mt-8 px-6 py-3 ${
                  theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800'
                } text-white rounded-lg transition inline-flex items-center group`}>
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Investment Strategy Section */}
        <section 
          ref={investmentRef as React.RefObject<HTMLElement>}
          className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800 text-white'}`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className={`inline-block mb-6 px-4 py-1 ${
                theme === 'light' ? 'bg-indigo-100 text-indigo-800' : 'bg-indigo-900 text-indigo-300'
              } rounded-full text-sm font-medium`}>
                Investment Strategy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Wealth Building Cycle
              </h2>
              <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mx-auto max-w-3xl`}>
                Our approach leverages the natural advantages of real estate to create a self-reinforcing cycle of wealth generation.
              </p>
            </div>
            
            <div className={`transition-all duration-1000 transform ${
              revealedSections.includes('investment') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} rounded-xl shadow-xl overflow-hidden`}>
                <WealthFlowAnimation />
              </div>
            </div>
          </div>
        </section>
        
        {/* Tax Benefits Section */}
        <section 
          ref={taxRef as React.RefObject<HTMLElement>}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 transform ${
                revealedSections.includes('tax') ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}>
                <div className={`inline-block mb-6 px-4 py-1 ${
                  theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-300'
                } rounded-full text-sm font-medium`}>
                  Tax Advantages
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Optimize Your Tax Strategy
                </h2>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-6`}>
                  Real estate provides unique tax advantages that can significantly reduce your overall tax burden while building wealth.
                </p>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-8`}>
                  Our strategies help you legally minimize taxes through deductions, depreciation, and strategic entity structures.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className={`h-6 w-6 rounded-full ${
                      theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900 text-green-400'
                    } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium text-sm`}>1</div>
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Mortgage interest deductions</span>
                  </li>
                  <li className="flex items-start">
                    <div className={`h-6 w-6 rounded-full ${
                      theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900 text-green-400'
                    } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium text-sm`}>2</div>
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Depreciation tax shield</span>
                  </li>
                  <li className="flex items-start">
                    <div className={`h-6 w-6 rounded-full ${
                      theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900 text-green-400'
                    } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium text-sm`}>3</div>
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>1031 exchange for tax deferral</span>
                  </li>
                  <li className="flex items-start">
                    <div className={`h-6 w-6 rounded-full ${
                      theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900 text-green-400'
                    } flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium text-sm`}>4</div>
                    <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Pass-through entity benefits</span>
                  </li>
                </ul>
              </div>
              
              <div className={`md:w-1/2 md:pl-12 transition-all duration-1000 delay-300 transform ${
                revealedSections.includes('tax') ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}>
                <TaxSavingsAnimation />
              </div>
            </div>
          </div>
        </section>
        
        {/* Access Section */}
        <section 
          ref={accessRef as React.RefObject<HTMLElement>}
          className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className={`flex flex-col md:flex-row items-center transition-all duration-1000 transform ${
              revealedSections.includes('access') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="inline-block mb-6 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Exclusive Access
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Join Our Wealth Building Community
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Get access to premium resources, interactive tools, and connect with like-minded investors.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">What You'll Get</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-white font-medium text-sm">✓</div>
                      <span>Comprehensive tax strategy guides</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-white font-medium text-sm">✓</div>
                      <span>Interactive wealth building calculators</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-white font-medium text-sm">✓</div>
                      <span>Networking with investors and professionals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-white font-medium text-sm">✓</div>
                      <span>Regular webinars and education sessions</span>
                    </li>
                  </ul>
                </div>
                
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition transform hover:-translate-y-1 font-medium flex items-center group">
                  <span>Download Free Guide to Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Get Your Free Guide</h3>
                  </div>
                  
                  <div className="p-6">
                    <form className="space-y-4">
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
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
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
      <footer className={theme === 'light' ? 'bg-gray-900 text-gray-400' : 'bg-gray-950 text-gray-400'}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-bold text-white mb-4">WealthBuilderMortgage</div>
              <p className="mb-4">Building wealth through strategic real estate investment and tax optimization.</p>
              <p className="text-sm">© {new Date().getFullYear()} WealthBuilderMortgage. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Guides</a></li>
                <li><a href="#" className="hover:text-white transition">Calculators</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WealthBuilderPortal; 