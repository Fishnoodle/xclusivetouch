import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
	return (
		<footer>
			<div className="bg-[#071013] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 rounded-t-3xl">
				<div className="p-5 ">
					<ul>
						<p className="text-gray-200 font-bold text-3xl pb-6">
							Xclusive<span className="text-[#D4AF37]">Touch</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FaInstagram className="text-2xl cursor-pointer text-white hover:text-yellow-600" />
							<FaTwitter className="text-2xl cursor-pointer text-white hover:text-blue-600" />
							<FaLinkedin className="text-2xl cursor-pointer text-white hover:text-blue-600" />
							<FaYoutube className="text-2xl cursor-pointer text-white hover:text-red-600" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Xclusive</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							How It Works
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Login
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Sign Up
						</li>

					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Company</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							About
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-200 font-bold text-2xl pb-4 underline decoration-[#D4AF37]">Support</p>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Contact
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
							Privacy Policy
						</li>
						<li className="text-gray-200 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
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

export default Footer;