import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import Body from "@/components/profile/Body";

const inter = Inter({ subsets: ["latin"] });

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  // Checks if user is logged in, otherwise redirects to login page
  useEffect(() => {
    if (id) {
      console.log(id);

      const token = localStorage.getItem("token")
      if (token) {
        const user = jwt.decode(token)
        if (!user) {
          localStorage.removeItem("token")
          history.replace("/login")
        }
      }
    }
  }, [id])

  return (
    <div>
      <Body id={id} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id }, // will be passed to the page component as props
  };
}