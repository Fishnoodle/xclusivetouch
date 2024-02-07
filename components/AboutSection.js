import React from 'react'
import Image from 'next/image'

const AboutSection = () => {
    return (
        <div className="bg-[#071013] rounded-3xl">
            <div className="container mx-auto py-10">
                <div className="mx-auto md:text-center">
                    <p className="text-3xl lg:text-5xl font-semibold text-[#F6F8FF]  mt-3">
                        About Us
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <video autoPlay muted loop className="w-full h-full">
                        <source src="/assets/AboutUs.mp4" type="video/mp4" className='w-screen' />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default AboutSection