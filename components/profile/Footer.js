import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="flex justify-center items-center py-4 bg-black">
            <div className="flex items-center">
                <div className="flex items-center" style={{ width: '150px', height: '150px' }}>
                    <Image
                        src="/assets/logo.png"
                        layout="fixed"
                        width={500}
                        height={500}
                        alt="Picture of Hero Page"
                    />
                </div>
                <h1 className="text-sm md:text-2xl text-gray-200 font-semibold ml-4 flex items-center">
                    Powered by Xclusive Touch
                </h1>
            </div>
        </div>
    );
};

export default Footer;