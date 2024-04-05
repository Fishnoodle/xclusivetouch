import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState } from 'react';

import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <div>
        <LoginSection/>
        <Footer/>
    </div>
  );
}