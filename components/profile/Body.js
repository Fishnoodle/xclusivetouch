import { React, useState } from 'react'
import Header from "@/components/profile/Header";
import Create from "@/components/profile/Create";

const Body = (id) => {

    // If id exists, return header component. if not, return create

    return (
        <div>
        <Header id={id}/>
        </div>
        
        <div>
        <Create />
        <div>
    )
}

export default Body