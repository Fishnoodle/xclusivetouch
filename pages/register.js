import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState } from 'react';

import RegisterSection from "@/components/RegisterSection";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  return (
    <div>
        <RegisterSection/>
        <Footer/>
    </div>
  );
}