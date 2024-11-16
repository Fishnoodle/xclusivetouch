import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { useRouter } from 'next/router';

// Mui Components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import dynamic from 'next/dynamic';
// Import components normally for layout components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

// Keep dynamic imports for heavy components
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});
const RotatingLines = dynamic(() => import('react-loader-spinner').then(mod => mod.RotatingLines), {
  ssr: false,
});
const Create = dynamic(() => import('@/components/profile/Create'), {
  loading: () => <Loader />,
  ssr: false,
});
const MultiStepForm = dynamic(() => import('@/components/Onboarding'), {
  loading: () => <Loader />,
  ssr: false,
});

function LoginProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useState({
    profile: null,
    username: "",
    editMode: false,
    loading: true
  });

  useEffect(() => {
    if (!id) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`);
        
        if (!res.ok) {
          setState(prev => ({ ...prev, profile: null, loading: false }));
          return;
        }

        const data = await res.json();

        console.log('retreived data:', data.data);

        const profileData = data.data?.profile?.[0];

        if (!profileData) {
          setState(prev => ({ ...prev, profile: null, loading: false }));
          return;
        }

        setState(prev => ({
          ...prev,
          profile: profileData,
          username: data.data.username,
          loading: false
        }));
      } catch (error) {
        console.error(error);
        setState(prev => ({ ...prev, profile: null, loading: false }));
      }
    };

    fetchProfile();
  }, [id]);

  const handleEditClick = useCallback((event) => {
    event.preventDefault();
    setState(prev => ({ ...prev, editMode: true }));
  }, []);

  if (state.loading) {
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
        />
      </div>
    );
  }

  if (!state.profile) {
    return <MultiStepForm />;
  }

  if (state.editMode) {
    return <Create id={id} profile={state.profile} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      <main className="flex-grow flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4">
        {/* Public Profile Card */}
        <Card className='mt-6 w-96 mb-6'>
          <CardHeader color='gray' className='relative h-56 flex justify-center items-center'>
            <Image 
              src='/assets/hero_img.png'
              alt='Picture of XclusiveTouch business cards floating'
              layout="fill"
              objectFit='cover'
            />
          </CardHeader>
          <CardContent>
            <Typography variant='h5' className='mb-2'>
              Public Profile
            </Typography>
            <Typography>
              Click here to see your public profile
            </Typography>
          </CardContent>
          <CardActions className='pt-0'>
            <Link href={`/profile/${state.username}`} passHref>
              <Button component="a" target='_blank'>
                Public Profile
              </Button>
            </Link>
          </CardActions>
        </Card>

        {/* Edit Profile Card */}
        <Card className='mt-6 w-96 mb-6'>
          <CardHeader color='gray' className='relative h-56 flex justify-center items-center'>
            <Image 
              src='/assets/hero_img.png'
              width={250}
              height={250}
              alt='Picture of XclusiveTouch business cards floating'
              priority
            />
          </CardHeader>
          <CardContent>
            <Typography variant='h5' color="blue-gray" className='mb-2'>
              Edit Profile
            </Typography>
            <Typography>
              Click here to edit your profile 
            </Typography>
          </CardContent>
          <CardActions className='pt-0'>
            <Button onClick={handleEditClick}>
              Edit Profile
            </Button>
          </CardActions>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default memo(LoginProfile);