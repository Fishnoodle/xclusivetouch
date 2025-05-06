import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      image: '/assets/HowItWorks1.png',
      title: 'Tap or Scan Card',
      description: 'XclusiveTouch works on all devices via NFC.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477z" />
          <path d="M21.356 10.558c.6-1.511.769-2.973.571-4.212a12.63 12.63 0 01-4.068 2.509 14.17 14.17 0 01-1.01 3.27 18.874 18.874 0 004.507-1.567zM16.235 6.782a15.424 15.424 0 01-2.235-4.34 10.041 10.041 0 00-4.31.992 15.435 15.435 0 012.307 4.346 19.065 19.065 0 014.238-.998zM7.777 8.22a19.068 19.068 0 014.238.998 15.434 15.434 0 012.307-4.346 10.04 10.04 0 00-4.31-.992c-.989 1.43-1.775 2.849-2.235 4.34zm2.772 14.99c-1.232-1.866-2.198-3.82-2.894-5.813a17.034 17.034 0 01-5.498-2.478 12.62 12.62 0 004.068 8.294 10.058 10.058 0 004.324-.003zm3.564-2.433c-.99 1.43-1.775 2.85-2.235 4.34a10.04 10.04 0 004.31-.992 15.434 15.434 0 01-2.075-3.348zm1.553-16.736a10.042 10.042 0 00-4.324.003 12.62 12.62 0 014.068-8.294 17.035 17.035 0 01-5.498 2.477c-.697 1.993-1.662 3.948-2.894 5.814 1.232 1.866 2.198 3.82 2.894 5.814a17.035 17.035 0 015.498 2.477c.7-1.994 1.662-3.948 2.894-5.814-1.23-1.866-2.196-3.82-2.894-5.814A17.03 17.03 0 0116.666 3.7a12.62 12.62 0 01-4.068 8.294 10.058 10.058 0 004.324-.003c.696-1.994 1.662-3.948 2.894-5.814z" />
        </svg>
      )
    },
    {
      id: 2,
      image: '/assets/HowItWorks2.png',
      title: 'Create Engagement',
      description: 'Profiles can be customized to your needs, creating engaging and interactive experiences for users.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 3,
      image: '/assets/HowItWorks3.png',
      title: 'Start Networking',
      description: 'Make it easier to connect with people by saving your contact details, as well as sharing information seamlessly.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#071013] rounded-3xl px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="container mx-auto py-14 md:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#F6F8FF] relative inline-block">
            How It Works
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#D4AF37] rounded-full"></div>
          </h2>
          <p className="mt-8 text-[#F6F8FF]/80 text-base md:text-lg max-w-2xl mx-auto">
            Getting started with XclusiveTouch is simple. Follow these steps to begin networking like never before.
          </p>
        </div>

        {/* Mobile View: Modern Card Design */}
        <div className="lg:hidden space-y-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48 sm:h-56">
                <Image
                  src={step.image}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt={`XclusiveTouch - ${step.title}`}
                  className="brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center">
                  <div className="flex items-center justify-center bg-[#D4AF37] text-black w-10 h-10 rounded-full font-bold text-lg mr-3 flex-shrink-0">
                    {step.id}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">{step.title}</h3>
                </div>
              </div>
              
              <div className="p-5 sm:p-6">
                <div className="flex items-start">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#D4AF37]/20 items-center justify-center text-[#D4AF37] mr-4 flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <p className="text-[#F6F8FF]/90 text-base">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop View: Interactive Card Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 py-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md shadow-lg border border-transparent hover:border-[#D4AF37]/20 transition-all duration-300"
            >
              <div className="absolute top-4 left-4 z-10 flex items-center">
                <div className="flex items-center justify-center bg-[#D4AF37] text-black w-10 h-10 rounded-full font-bold text-lg">
                  {step.id}
                </div>
                <div className="ml-3 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="text-sm font-medium text-white">Step {step.id}</span>
                </div>
              </div>
              
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={step.image}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt={`XclusiveTouch - ${step.title}`}
                  className="transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mr-3">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#F6F8FF]">{step.title}</h3>
                </div>
                
                <p className="text-[#F6F8FF]/80 text-base">{step.description}</p>
                
                <div className="mt-auto pt-4">
                  <div className="w-0 group-hover:w-full h-0.5 bg-[#D4AF37] transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-14 md:mt-20 text-center">
          <Link href="/register" className="inline-block">
            <button className="px-8 py-3.5 bg-[#D4AF37] text-black rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-[#D4AF37]/20 inline-flex items-center gap-2 transform hover:-translate-y-1">
              Get Your Card Now
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          
          <p className="mt-4 text-[#F6F8FF]/60 text-sm">
            No commitments. Easy to set up.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;