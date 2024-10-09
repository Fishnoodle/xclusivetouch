import React from 'react'
import ResetPasswordSection from "@/components/ResetPasswordSection";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ResetPassword() {
    return (
        <div>
            <ResetPasswordSection/>
        </div>
    )
}