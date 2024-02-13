import React from 'react'
import Image from 'next/image'


const HowItWorksPage = () => {
    return (
        <>
    <div className="container mx-auto my-10 ">
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
        <Image
            src='/assets/SingleCard.png'
            width={750}
            height={750}
            alt='Picture of XclusiveTouch single business card'
          />
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
            Effortless <span className='text-[#D4AF37]'> Networking </span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              Tap, Connect, Impress! With our NFC-enabled business cards, networking
              has never been easier. Simply tap your card to any NFC-enabled device to
              instantly share your digital profile, showcasing your professional prowess in a modern and efficient manner.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto my-10 ">
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
              Paperless <span className='text-[#D4AF37]'> Connectivity </span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
            Revolutionize your networking game with our NFC-powered business cards. Gone are the days
            of fumbling for paper cards. Just tap your card to a smartphone, and watch as your digital
            profile pops up, making a lasting impression on potential clients and collaborators.
            </p>
          </div>
          <Image
            src='/assets/black_logo.png'
            width={500}
            height={500}
            alt='Picture of XclusiveTouch Logo - in black' 
          />
        </div>
      </div>
    </div>
    <div className="container mx-auto my-10 ">
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
        <Image
            src='/assets/hero_img.png'
            width={750}
            height={750}
            alt='Picture of XclusiveTouch business cards floating'
          />
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase grow">
              Digital Networking  <span className='text-[#D4AF37]'> Made Easy </span>
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
            Experience the future of business networking with our cutting-edge NFC business cards.
            Seamlessly transfer your contact information, portfolio, and more with a simple tap. Elevate
            your networking strategy and stand out from the crowd with our innovative digital business card
            solution.
            </p>
            
          </div>
        </div>
      </div>
    </div>
        </>
    );
};

export default HowItWorksPage