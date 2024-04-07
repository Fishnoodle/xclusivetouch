import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useState } from 'react';

import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Shop() {
  return (
    <div>
        <ShopSection/>
    </div>
  );
}