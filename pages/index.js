import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState } from 'react';

// Components
import HowItWorks from '@/components/HowItWorks';
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Reviews } from "@/components/Reviews";
import BentoBox from "@/components/BentoBox";

import FAQ from "@/components/FAQ";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <div>
      <Head>
        <title>Xclusive Touch</title>
        <link rel="icon" href="/assets/logo.png"></link>
        <meta name="description" content="Xclusive Touch" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Xclusive Touch, Xclusive, Touch, XclusiveTouch, Xclusive, Xclusive Moments, XclusiveMoments" />
      </Head>
      <Hero/>
      {/*<BentoBox/>*/}

      <HowItWorks/>
      <Reviews/>
      <FAQ/>
    </div>
  );
}

