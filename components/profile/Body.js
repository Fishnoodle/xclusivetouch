import { React, useState } from 'react'
import Header from "@/components/profile/Header";

const Body = (id, profilePicture) => {

    console.log(id, 'ID')
    console.log(profilePicture, 'Profile Picture')

    return (
        <div>
        <Header id={id} profilePicture={profilePicture} />
        </div>
    )
}

export default Body