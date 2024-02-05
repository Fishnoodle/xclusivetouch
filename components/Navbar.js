import React from "react";
import Link from 'next/link'
import { FiMenu } from "react-icons/fi";


const Navbar = () => {
    
  return (
    <div className="w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-white bg-[#071013]">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl uppercase font-bold">
          <Link href='/'>XclusiveTouch</Link>
        </h1>
        <ul className="hidden lg:inline-flex items-center gap-8 uppercase text-sm font-semibold">
          <li className="navbarLi">
            <Link href='howitworks'>how it works</Link>
          </li>
          <li className="navbarLi">
            <Link href='about'>about us</Link>
          </li>
        </ul>
        <div className="hidden lg:inline-flex gap-8 items-center">
          <button className="w-48 h-14 bg-white text-black uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-white duration-300">
            contact us
          </button>
        </div>
        <div className="inline-flex lg:hidden">
          <FiMenu className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;