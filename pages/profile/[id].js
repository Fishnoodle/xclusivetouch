import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { API_ENDPOINTS } from '@/lib/api';

// Import layout components normally
const Header = dynamic(() => import('@/components/profile/Header'), {
  loading: () => <Loader />,
  ssr: false
});
const Login = dynamic(() => import('@/components/LoginSection'), {
  loading: () => <Loader />,
  ssr: false
});

function Profile({ profile, url }) {
  if (!profile) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header profile={profile} profilePictureUrl={url} />
      <div className="flex-grow my-8"></div>
    </div>
  );
}
Profile.propTypes = {
  profile: PropTypes.object,
  url: PropTypes.string,
};

export async function getServerSideProps(context) {
  const { id: slug } = context.params;

  try {
    const res = await fetch(API_ENDPOINTS.publicProfile(slug));
    
    if (!res.ok) {
      return { props: { profile: null, url: null } };
    }

    const data = await res.json();
    const profileData = data.data?.profile?.[0];
    const profilePhotoUrl = profileData?.colours?.[0]?.profilePhotoUrl || null;

    if (!profileData) {
      return { props: { profile: null, url: null } };
    }

    return {
      props: {
        profile: profileData,
        url: profilePhotoUrl,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { profile: null, url: null } };
  }
}

export default Profile;