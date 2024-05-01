import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import Body from "@/components/profile/Body";
import Create from "@/components/profile/Create";

const inter = Inter({ subsets: ["latin"] });

export default function Profile({ id }) {
  // UseStates
  const [profile, setProfile] = useState(false);

  // Checks if user is logged in, otherwise redirects to login page
  useEffect(() => {
    if (id) {
      console.log(id);

      const token = localStorage.getItem("token")
      if (token) {
        const user = jwt.decode(token)
        fetchUser()
        if (!user) {
          localStorage.removeItem("token")
          history.replace("/login")
        }
      }
    }
  }, [id])

  async function fetchUser() {
    try {
      const req = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`)

      console.log(id)
      

      const data = await req.json()
      console.log(data)
      if (data.data !== null){
        setProfile(data.data.profile[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
    {profile ? <Body profile={profile} /> : <Create />}
  </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id }, // will be passed to the page component as props
  };
}