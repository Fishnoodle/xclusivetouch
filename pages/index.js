import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState } from 'react';

// Components
import HowItWorks from '../components/HowItWorks';
import NavBar from '../components/NavBar'
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Reviews } from "../components/Reviews";
import BentoBox from "../components/BentoBox";

import FAQ from "../components/FAQ";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <div>
      <Head>
        <title>Xclusive Touch</title>
      </Head>
      <NavBar />
      <Hero/>
      <BentoBox/>

      <HowItWorks/>
      <Reviews/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
