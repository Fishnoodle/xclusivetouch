import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="flex items-center">
                <div className="w-24 h-24 md:w-64 md:h-64 flex items-center">
                    <Image
                        src="/assets/logo.png"
                        layout="intrinsic"
                        width={250}
                        height={250}
                        alt="Picture of Hero Page"
                    />
                </div>
                <h1 className="text-sm md:text-2xl text-gray-600 font-semibold ml-4 flex items-center">
                    Powered by Xclusive Touch
                </h1>
            </div>
        </div>
    );
};

export default Footer;