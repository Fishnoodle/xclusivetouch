import Head from "next/head";
import React from 'react';

// Components
import FAQ from '@/components/FAQ';
import AboutSection from "@/components/AboutSection";

export default function About() {
    return (
        <div>
            <Head>
                <title>Xclusive Touch</title>
                <link rel="icon" href="/assets/logo.png"></link>
                <meta name="description" content="Xclusive Touch" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="Xclusive Touch, Xclusive, Touch, XclusiveTouch, Xclusive, Xclusive Moments, XclusiveMoments" />
            </Head>

            <AboutSection/>
            <FAQ/>
        </div>
    )
}