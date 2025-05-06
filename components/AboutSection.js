import React from 'react'

const AboutSection = () => {
    return (
        <div className="bg-[#071013] rounded-b-2xl">
            <div className="container mx-auto py-10">
                <div className="mx-auto md:text-center">
                    <p className="text-3xl lg:text-5xl font-semibold text-[#F6F8FF]  mt-3 pb-10">
                        About Us
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <video autoPlay muted loop className="w-full h-full">
                        <source src="/assets/AboutSection.mp4" type="video/mp4" className='w-full h-full' />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default AboutSection