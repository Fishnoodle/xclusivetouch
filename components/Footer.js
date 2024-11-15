import React from "react";
import Link from 'next/link'
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className="">
			<div className="bg-[#071013] h-1/2 w-full flex md:flex-row flex-col sm:content-center justify-around md:items-start items-center p-20 rounded-t-3xl">
				<div className="p-5 ">
					<ul>
						<Image
							src='/assets/logo.png'
							width={200}
							height={200}
							alt='Picture of XclusiveTouch Logo'
						/>
						<div className="flex items-center justify-center gap-8 md:flex md:gap-6 md:pb-5">
							<Link href='https://www.instagram.com/xclusivetouch23?igsh=MTl6M29ncTdsamxsNA==' target="_blank">
							<FaInstagram className="text-2xl cursor-pointer text-white hover:text-yellow-600" />
							</Link>
							<Link href='https://www.tiktok.com/@xclusivetouch23?_t=8jhM3zJFR7F&_r=1' target="_blank">
							<FaTiktok className="text-2xl cursor-pointer text-white hover:text-[#D4AF37]" />
							</Link>
							<Link href='https://www.facebook.com/xclusive.touch23?mibextid=ZbWKwL' target="_blank">
							<FaFacebook className="text-2xl cursor-pointer text-white hover:text-[#D4AF37]" />
							</Link>
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Xclusive</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							<Link href='howitworks'>How It Works</Link>
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							<Link href='login'>Login</Link>
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							<Link href='register'>Sign Up</Link>
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							<Link href='shop'>Shop</Link>
						</li>

					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Company</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							<Link href='about'>About Us</Link>
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Support</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							Contact
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							Privacy Policy
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-[#D4AF37] cursor-pointer">
							Terms of Service
						</li>
					</ul>
				</div>
                
			</div>
			<div className="flex flex-col justify-center items-center text-center p-5 bg-[#071013]">
				<h1 className=" text-white font-semibold">
					© 2024 All rights reserved | SP Designs
				</h1>
			</div>
		</footer>
	);
}