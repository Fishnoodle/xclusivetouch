import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import components
const Header = dynamic(() => import('@/components/profile/Header'), {
  loading: () => <p>Loading Header...</p>,
});
const Login = dynamic(() => import('../login'), {
  loading: () => <p>Loading Login...</p>,
});

export default function Profile({ profile, url }) {
  const router = useRouter();
  const { id } = router.query;

  // If using getServerSideProps, profile and url are passed as props
  // Otherwise, fetch them client-side as needed

  // If you opt for client-side fetching, ensure to memoize functions and handle loading efficiently

  if (!profile) {
    return <Login />;
  }

  return (
    <div>
      <Header profile={profile} profilePictureUrl={url} />
      <div className="flex-grow my-8"></div>
    </div>
  );
}

// Example using getServerSideProps for server-side data fetching
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://api.xclusivetouch.ca/api/publicProfile/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
      return { props: { profile: null, url: null } };
    }

    const data = await res.json();

    if (!data.data || !data.data.profile || data.data.profile.length === 0) {
      console.error('Invalid profile data structure:', data);
      return { props: { profile: null, url: null } };
    }

    return {
      props: {
        profile: data.data.profile[0],
        url: data.url || null,
      },
    };
  } catch (error) {
    console.error(`Error fetching profile data for id ${id}:`, error);
    return { props: { profile: null, url: null } };
  }
}