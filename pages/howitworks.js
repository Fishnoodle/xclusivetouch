import Head from "next/head";
import React from 'react';
import { Inter } from  'next/font/google';

// Components
import Footer from "@/components/Footer";
import FAQ from '@/components/FAQ';
import HowItWorksPage from "@/components/HowItWorksPage";

const inter = Inter({ subsets: ['latin' ]});

export default function HowItWorks() {
    return (
        <div>
            <Head>
                <title>Xclusive Touch</title>
            </Head>
            <HowItWorksPage/>

            <FAQ/>
            <Footer/>
        </div>
    )
}