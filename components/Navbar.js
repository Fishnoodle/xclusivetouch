import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Navbar() {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  
  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem('xclusiveToken');
    localStorage.removeItem('userId');
    toast.success('Successfully logged out');
    router.push('/login');
    setNav(false); // Close mobile menu if open
  };

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('xclusiveToken');
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Add padding to the body/main content
    document.body.style.paddingTop = '80px'; // 80px equals h-20
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Remove padding when component unmounts
      document.body.style.paddingTop = '0px';
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-black'
    }`}>
      <div className="max-w-screen-2xl h-20 mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/assets/logo.png"
            width={130}
            height={50}
            alt="XclusiveTouch Logo"
            className="object-contain"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            <li>
              <Link 
                href="/howitworks" 
                className="text-white text-sm font-medium tracking-wide hover:text-[#D4AF37] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-white text-sm font-medium tracking-wide hover:text-[#D4AF37] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#D4AF37] after:transition-all hover:after:w-full"
              >
                About Us
              </Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href={`/login/${localStorage.getItem('userId')}`}>
                <button className="px-6 py-2.5 bg-[#D4AF37] text-black text-sm font-medium rounded-md hover:bg-white transition-colors duration-300">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm font-medium rounded-md hover:bg-[#D4AF37]/10 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2.5 bg-[#D4AF37] text-black text-sm font-medium rounded-md hover:bg-white transition-colors duration-300">
                Login / Register
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={handleNav} 
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {nav ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          nav ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleNav}
      />
      
      <div 
        className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[60%] md:w-[45%] bg-black z-50 p-8 transform transition-transform duration-300 ease-in-out lg:hidden ${
          nav ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <Image
            src="/assets/logo.png"
            width={120}
            height={40}
            alt="XclusiveTouch Logo"
            className="object-contain"
          />
          <button 
            onClick={handleNav} 
            className="text-white p-2"
            aria-label="Close menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          <Link 
            href="/howitworks"
            onClick={() => setNav(false)} 
            className="text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#D4AF37] transition-colors"
          >
            How It Works
          </Link>
          
          <Link 
            href="/about"
            onClick={() => setNav(false)} 
            className="text-white text-lg font-medium py-3 border-b border-gray-800 hover:text-[#D4AF37] transition-colors"
          >
            About Us
          </Link>
          
          <div className="mt-8 flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href={`/login/${localStorage.getItem('userId')}`}
                  onClick={() => setNav(false)} 
                  className="w-full py-3 bg-[#D4AF37] text-black text-center font-medium rounded-md hover:bg-white transition-colors"
                >
                  Dashboard
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] text-center font-medium rounded-md hover:bg-[#D4AF37]/10 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                onClick={() => setNav(false)} 
                className="w-full py-3 bg-[#D4AF37] text-black text-center font-medium rounded-md hover:bg-white transition-colors"
              >
                Login / Register
              </Link>
            )}
            
            <Link 
              href="/contact"
              onClick={() => setNav(false)} 
              className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] text-center font-medium rounded-md hover:bg-[#D4AF37]/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-10 left-8 right-8">
          <p className="text-gray-400 text-sm text-center">
            © 2024 XclusiveTouch
          </p>
        </div>
      </div>
    </div>
  );
}