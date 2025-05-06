import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black pt-12 pb-4">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                    {/* Column 1: Logo & Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-6">
                            <Image
                                src="/assets/logo.png"
                                width={180}
                                height={60}
                                alt="XclusiveTouch Logo"
                                className="object-contain"
                            />
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4">
                            <Link 
                                href="https://www.instagram.com/xclusivetouch23?igsh=MTl6M29ncTdsamxsNA==" 
                                target="_blank"
                                className="text-white hover:text-[#D4AF37] transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-2xl" />
                            </Link>
                            <Link 
                                href="https://www.tiktok.com/@xclusivetouch23?_t=8jhM3zJFR7F&_r=1" 
                                target="_blank" 
                                className="text-white hover:text-[#D4AF37] transition-colors"
                                aria-label="TikTok"
                            >
                                <FaTiktok className="text-2xl" />
                            </Link>
                            <Link 
                                href="https://www.facebook.com/xclusive.touch23?mibextid=ZbWKwL" 
                                target="_blank"
                                className="text-white hover:text-[#D4AF37] transition-colors"
                                aria-label="Facebook"  
                            >
                                <FaFacebook className="text-2xl" />
                            </Link>
                        </div>
                        
                        <p className="text-gray-400 text-sm mt-6 text-center md:text-left">
                            Connect with us on social media for the latest updates and announcements.
                        </p>
                    </div>
                    
                    {/* Column 2: Xclusive Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Xclusive
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href="/howitworks"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/login"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/register"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/shop"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Company Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Company
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href="/about"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/faq"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/blog"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Support Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
                            Support
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href="/contact"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/privacy"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/terms"
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gray-800 my-8"></div>
                
                {/* Copyright Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 XclusiveTouch. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Designed & Developed by <span className="text-[#D4AF37]">SP Designs</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}