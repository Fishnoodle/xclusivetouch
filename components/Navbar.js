import React, { useState } from "react";
import Link from 'next/link'
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';

const Navbar = () => {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    console.log(nav)
    setNav(!nav);
  };

    
  return (
    <div className="w-full h-20 lg:h-28 border-b-[1px] border-gray-500 text-white bg-[#071013] rounded-b-3xl">
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl uppercase font-bold">
          <Link href='/'>
          <Image
            src='/assets/logo.png'
            width={150}
            height={150}
            alt='Picture of Hero Page'
          />
          </Link>
        </h1>
        <ul className="hidden lg:inline-flex items-center gap-8 uppercase text-sm font-semibold">
          <li className="navbarLi">
            <Link href='howitworks' className="hover:text-[#D4AF37]">
              how it works
            </Link>
          </li>
          <li className="navbarLi">
            <Link href='about' className="hover:text-[#D4AF37]">
              about us
            </Link>
          </li>
        </ul>

        <div className="hidden lg:inline-flex gap-8 items-center">
          <Link href='/shop'>
          <button href='/shop' className="w-36 h-10 bg-white text-black uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-white duration-300">
            Shop
          </button>
          </Link>
          <Link href='/login'>
            <button className="w-36 h-10 bg-white text-black uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-white duration-300">
                login & register
            </button>
          </Link>
        </div>

        <div onClick={handleNav} className="inline-flex lg:hidden">
          <FiMenu className="text-3xl" />
        </div>
      </div>

      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-[#071013]/70 display block z-10' : ''}>
        <div className={
          nav
          ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#071013] p-10 ease-in duration-500 rounded-xl z-100'
          : 'fixed left-[-100%] h-screen top-0 p-10 ease-in duration-500'
        }
        >
          <div className="flex w-full items-center justify-between">
            <Link href='/'>
              <Image
                src='/assets/logo.png'
                width={150}
                height={150}
                alt='Picture of XclusiveTouch Logo - in gold'
              />
            </Link>
            <div onClick={handleNav} className="text-3xl p-1 pb-3 cursor-pointer">
              <AiOutlineClose />
            </div>
          </div>
          <div className="py-8 flex flex-col">
            <ul className="uppercase py-8 font-semibold">
              <li onClick={()=> setNav(false)} className="">
                <Link href='howitworks'> how it works </Link>
              </li>
              <li onClick={()=> setNav(false)} className="py-8">
                <Link href='about'> about us </Link>
              </li>
              <li onClick={()=> setNav(false)} className="py-8">
                <button href='/shop' className="w-48 h-14 bg-[#D4AF37] text-white uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-black duration-300">
                  Shop
                </button>
              </li>
              <li onClick={()=> setNav(false)} className="py-8">
                <button href='/login' className="w-48 h-14 bg-[#D4AF37] text-white uppercase text-sm font-semibold rounded-md hover:bg-[#D4AF37] hover:text-black duration-300">
                  login & register
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;