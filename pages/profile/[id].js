import React, { memo } from 'react';
import dynamic from 'next/dynamic';

// Import layout components normally
const Header = dynamic(() => import('@/components/profile/Header'), {
  loading: () => <p>Loading Header...</p>,
  ssr: false
});
const Login = dynamic(() => import('@/components/LoginSection'), {
  loading: () => <p>Loading Login...</p>,
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

export default memo(Profile);

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://api.xclusivetouch.ca/api/publicProfile/${id}`);
    
    if (!res.ok) {
      return { props: { profile: null, url: null } };
    }

    const data = await res.json();
    const profileData = data.data?.profile?.[0];

    if (!profileData) {
      return { props: { profile: null, url: null } };
    }

    return {
      props: {
        profile: profileData,
        url: data.url || null,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { profile: null, url: null } };
  }
}