import React from 'react'
import Image from 'next/image'

const HowItWorks = () => {
    return(
      <div className='bg-[#071013] rounded-3xl'>
        <div className="container mx-auto py-10">
        <p className="text-base lg:text-xl font-medium text-white uppercase">
         XlclusiveTouch
        </p>
        <p className="text-3xl lg:text-5xl font-semibold text-white  mt-3">
        How It Works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 py-10 lg:py-20">
          <div className="flex flex-col gap-5 ">
            <Image
            src='/assets/hiw1.png'
            width={800}
            height={800}
            alt='Picture of HowItWorks'
            className='rounded-3xl'
            />
            <p className="text-2xl font-semibold text-white">1. Tap or Scan Card</p>
            <div className="flex items-center gap-2">
              <p className="text-white">
                XlclusiveTouch works on all devices via NFC.
              </p>
            </div>
         
          </div>
          <div className="flex flex-col gap-5 ">
          <Image
            src='/assets/hiw2.png'
            width={800}
            height={800}
            alt='Picture of HowItWorks'
            className='rounded-3xl'
            />
            <p className="text-2xl font-semibold text-white">2. Create Engagement</p>
            <div className="flex items-center gap-2">
              <p className="text-white">
                Profiles can be customize to your needs, creating engaging and an interactive experience for your users
              </p>
            </div>
         
          </div>
          <div className="flex flex-col gap-5 ">
          <Image
            src='/assets/hiw3.png'
            width={800}
            height={800}
            alt='Picture of HowItWorks'
            className='rounded-3xl'
            />
            <p className="text-2xl font-semibold text-white">3. Start Networking</p>
            <div className="flex items-center gap-2">
              <p className="text-white">
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