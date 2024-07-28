import Head from "next/head";
import { Inter } from "next/font/google";
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {toast, Toaster} from 'react-hot-toast';

import Body from "@/components/profile/Body";
import Create from "@/components/profile/Create";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";

const inter = Inter({ subsets: ["latin"] });

export default function Profile({ id }) {
  // UseStates
  const [profile, setProfile] = useState(false);
  const [username, setUsername] = useState(false);

  const handleClick = () => {   
    window.location.href = `/profile/${username}`
  }

  useEffect(() => {
    if (id) {
      console.log(id);

      const token = localStorage.getItem("token");
      console.log('Token:', token);
      fetchUser();
    }
  }, [id])

  async function fetchUser() {
    try {
      console.log('About to make fetch request');
      const req = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`)
      console.log('Fetch request made');

      if (req.ok) {
        console.log('Response OK');
      } else {
        console.log('Response not OK', req.status);
      }

      const data = await req.json()
      console.log('Response data:', data);

      if (data.data !== null){
        setUsername(data.data.username)
        setProfile(data.data.profile[0])
      }
    } catch (err) {
      console.log('Error caught:', err);
    }
  }

  if (!profile) {
    <Create />
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">

        <Card className='mt-6 w-96 mb-6'>
          <CardHeader color='blue-gray' className='relative h-56'>
            <img
              src="https://images.unsplash.com/photo-1601933346352-1b4e1e4d4f6b"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant='h5' color="blue-gray" className='mb-2'>
              Public Profile
            </Typography>
            <Typography>
              Click here to see your public profile
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <a href={`/profile/${username}`} target='_blank'>
              <Button>
                Public Profile
              </Button>
            </a>
          </CardFooter>
        </Card>

        <Card className='mt-6 w-96'>
          <CardHeader color='blue-gray' className='relative h-56'>
            <img
              src="https://images.unsplash.com/photo-1601933346352-1b4e1e4d4f6b"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant='h5' color="blue-gray" className='mb-2'>
              Edit Profile
            </Typography>
            <Typography>
              Click here to edit your profile 
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <a href={`#`} target='_blank' className='pointer-events-none'>
              <Button disabled>
                Edit Profile (IN PROGRESS)
              </Button>
            </a>
          </CardFooter>
        </Card>

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: { id }, // will be passed to the page component as props
  };
}