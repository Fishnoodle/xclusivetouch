import Body from "@/components/profile/Body";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Login from "../login";
import { RotatingLines } from 'react-loader-spinner';

const inter = Inter({ subsets: ["latin"] });

export default function Profile({ id }) {
    // UseStates
    const [profile, setProfile] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            console.log(id);

            const token = localStorage.getItem("token");
            console.log('Token:', token);
            fetchUser();
        }
    }, [id]);

    async function fetchUser() {
        try {
            console.log('About to make fetch request');
            const req = await fetch(`https://api.xclusivetouch.ca/api/publicProfile/${id}`);
            console.log('Fetch request made');

            if (req.ok) {
                console.log('Response OK');
            } else {
                console.log('Response not OK', req.status);
            }

            const data = await req.json();
            console.log('Response data:', data);

            if (data !== null) {
                setProfile({
                    ...data.data.profile[0],
                    url: data.url
                });
                setProfilePicture(data.url);
            }
        } catch (err) {
            console.log('Error caught:', err);
        } finally {
            setLoading(false);
        }
    }

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
        return <Login />;
    }

    return (
        <>
            {profilePicture !== "" && <Body profile={profile} profilePicture={profilePicture} />}
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    return {
        props: { id }, // will be passed to the page component as props
    };
}