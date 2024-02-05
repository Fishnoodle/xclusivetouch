import Head from "next/head";
import React from 'react';
import { Inter } from  'next/font/google';

// Components
import Footer from "../components/Footer";
import Navbar from '../components/NavBar';
import FAQ from '../components/FAQ';

const inter = Inter({ subsets: ['latin' ]});

export default function About() {
    return (
        <div>
            <Head>
                <title>Xclusive Touch</title>
            </Head>
            <Navbar/>

            <FAQ/>
            <Footer/>
        </div>
    )
}