import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamic Imports
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});
const RotatingLines = dynamic(() => import('react-loader-spinner').then(mod => mod.RotatingLines), {
  ssr: false,
});
const Create = dynamic(() => import('@/components/profile/Create'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const MultiStepForm = dynamic(() => import('@/components/Onboarding'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const Navbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => <p>Loading Navbar...</p>,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <p>Loading Footer...</p>,
});

// Import only necessary components from @material-tailwind/react
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@mui/material';

export default function LoginProfile() {
  const router = useRouter();
  const { id } = router.query;

  // State hooks
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Wait for the id to be available

    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);

        if (!res.ok) {
          console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
          setProfile(null);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (!data.data || !data.data.profile || data.data.profile.length === 0) {
          console.error('Invalid profile data structure:', data);
          setProfile(null);
          setLoading(false);
          return;
        }

        setProfile(data.data.profile[0]); // Adjust as per your API's response structure
        setUsername(data.data.profile[0].username); // Ensure 'username' exists
      } catch (error) {
        console.error(`Error fetching profile data for id ${id}:`, error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditClick = (event) => {
    event.preventDefault();
    setEditMode(true);
  };

  // Loading state
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

  // No profile found
  if (!profile) {
    return <MultiStepForm />;
  }

  // Edit mode
  if (editMode) {
    return <Create id={id} profile={profile} />;
  }

  // Main Content
  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">
        {/* Public Profile Card */}
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

        {/* Edit Profile Card */}
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