import React from 'react'
import Image from 'next/image'

const HowItWorksPage = () => {
    return (
        <>
    <div className="container mx-auto my-10 ">
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
        <Image
            src='/assets/hero.png'
            width={750}
            height={750}
            alt='Picture of Hero Page'
          />
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
              Step 1 
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              An All-In-One Digital Business Card to help you seize opportunities and <br  className="lg:flex hidden"/> make better connections
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
              Step 2
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              An All-In-One Digital Business Card to help you seize opportunities and <br  className="lg:flex hidden"/> make better connections
            </p>
          </div>
          <Image
            src='/assets/hero.png'
            width={750}
            height={750}
            alt='Picture of Hero Page'
          />
        </div>
      </div>
    </div>
    <div className="container mx-auto my-10 ">
      <div className="px-6 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
        <Image
            src='/assets/hero.png'
            width={750}
            height={750}
            alt='Picture of Hero Page'
          />
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium uppercase">
              Step 3
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-black">
              An All-In-One Digital Business Card to help you seize opportunities and <br  className="lg:flex hidden"/> make better connections
            </p>
          </div>
        </div>
      </div>
    </div>
        </>
    );
};

export default HowItWorksPage