import { React, useState } from 'react'
import Header from "@/components/profile/Header";
import Footer from "@/components/profile/Footer";

const Body = (id, profilePicture) => {

    // console.log(id, 'ID')
    // console.log(profilePicture, 'Profile Picture')

    return (
        <div className="flex flex-col min-h-screen">
            <Header id={id} profilePicture={profilePicture} />
            <div className="flex-grow my-8"></div>
            <Footer />
        </div>
    );
}

export default Body