import React from "react";
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="px-6 lg:px-5 py-20">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-24">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
              The new generation of <br className="lg:flex hidden"/> business cards
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              An All-In-One Digital Business Card to help you seize opportunities and <br  className="lg:flex hidden"/> make better connections
            </p>
            <button className="btn btn-sm lg:btn-lg bg-[#D4AF37] text-white rounded-lg border-none w-36 lg:w-44 capitalize py-3">Contact Us</button>
          </div>
          <Image
            src='/assets/hero_img.png'
            width={750}
            height={750}
            alt='Picture of Hero Page'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;