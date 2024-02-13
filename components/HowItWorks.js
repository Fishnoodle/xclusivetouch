import React from 'react'
import Image from 'next/image'


const HowItWorks = () => {
    return(
      <div className='bg-[#071013] rounded-3xl'>
        <div className="container mx-auto py-10">
          <div className='mx-auto md:text-center'>
            <p className="text-3xl lg:text-5xl font-semibold text-[#F6F8FF]  mt-3">
              How It Works
            </p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-10 lg:py-20">
          <div className="flex flex-col gap-5 ">
            <Image
            src='/assets/HowItWorks1.png'
            width={400}
            height={400}
            alt='Picture of how XclusiveTouch works - Step 1'
            className='rounded-3xl h-[400px]'
            />
            <p className="text-2xl font-semibold text-[#F6F8FF]">1. Tap or Scan Card</p>
            <div className="flex items-center gap-2">
              <p className="text-[#F6F8FF]">
                XclusiveTouch works on all devices via NFC.
              </p>
            </div>
         
          </div>
          <div className="flex flex-col gap-5 ">
          <Image
            src='/assets/HowItWorks2.png'
            width={400}
            height={400}
            alt='Picture of how XclusiveTouch works - Step 2'
            className='rounded-3xl h-[400px]'
            />
            <p className="text-2xl font-semibold text-[#F6F8FF]">2. Create Engagement</p>
            <div className="flex items-center gap-2">
              <p className="text-[#F6F8FF]">
                Profiles can be customized to your needs, creating engaging and interactive experiences for users
              </p>
            </div>
         
          </div>
          <div className="flex flex-col gap-5 ">
          <Image
            src='/assets/HowItWorks3.png'
            width={400}
            height={400}
            alt='Picture of how XclusiveTouch works - Step 3'
            className='rounded-3xl h-[400px]'
            />
            <p className="text-2xl font-semibold text-[#F6F8FF]">3. Start Networking</p>
            <div className="flex items-center gap-2">
              <p className="text-[#F6F8FF]">
                Make it easier to connect with people by saving your contact details, as well as sharing information seamlessly
              </p>
            </div>
         
          </div>
        </div>
      </div>
      </div>
    );
};

export default HowItWorks