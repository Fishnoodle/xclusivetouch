import { React, useState } from 'react'
import Header from "@/components/profile/Header";

const Body = (id, profilePicture) => {

    console.log('BODY PROFILEPICTURE', profilePicture)

    return (
        <div>
        <Header id={id} profilePicture={profilePicture} />
        </div>
    )
}

export default Body