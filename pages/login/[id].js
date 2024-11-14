import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { toast, Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import Create from "@/components/profile/Create";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import MultiStepForm from "@/components/Onboarding";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google';

// Initialize the Inter font with desired configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function Profile({ profileData, id }) {
  const router = useRouter();
  const isProfilePage = router.pathname.startsWith('/profile');
  const isOnboarding = router.pathname.startsWith('/login/');

  // UseStates
  const [profile, setProfile] = useState(profileData);
  const [username, setUsername] = useState(profileData?.username || "");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(!profileData);

  const handleClick = () => {   
    window.location.href = `/profile/${username}`;
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  // If profileData is not provided, handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#D4AF37"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!profile) {
    return <MultiStepForm />;
  }

  if (editMode) {
    return <Create {...(editMode ? { id, profile } : {})} />;
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">
        <Card className='mt-6 w-96 mb-6'>
          <CardHeader color='gray' className='relative h-56 flex justify-center items-center'>
            <Image 
              src='/assets/hero_img.png'
              width={250}
              height={250}
              alt='Picture of XclusiveTouch business cards floating'
            />
          </CardHeader>
          <CardBody>
            <Typography variant='h5' className='mb-2'>
              Public Profile
            </Typography>
            <Typography>
              Click here to see your public profile
            </Typography>
          </CardBody>
          <CardFooter className='pt-0'>
            <Link href={`/profile/${username}`} passHref>
              <Button component="a" target='_blank'>
                Public Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className='mt-6 w-96 mb-6'>
          <CardHeader color='gray' className='relative h-56 flex justify-center items-center'>
            <Image 
              src='/assets/hero_img.png'
              width={250}
              height={250}
              alt='Picture of XclusiveTouch business cards floating'
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
            <Button onClick={handleEditClick}>
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}

// Switch to getServerSideProps instead of getStaticProps/getStaticPaths
export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const res = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);
    
    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    if (!data.data || !data.data.profile || data.data.profile.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        profile: data.data.profile[0],
        id,
      }
    };
  } catch (error) {
    console.error(`Error fetching profile data for id ${id}:`, error);
    return { notFound: true };
  }
}