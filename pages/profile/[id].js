// pages/profile/[id].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/profile/Header";
import Login from "../login";
import { RotatingLines } from 'react-loader-spinner';
import Footer from "@/components/Footer";

export default function Profile() {
    const router = useRouter();
    const { id } = router.query;

    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://api.xclusivetouch.ca/api/publicProfile/${id}`);

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

                setUrl(data.url)
                setProfile(data.data.profile[0]);
            } catch (error) {
                console.error(`Error fetching profile data for id ${id}:`, error);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

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
                />
            </div>
        );
    }

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