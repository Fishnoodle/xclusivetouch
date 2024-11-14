import Header from "@/components/profile/Header";
import Login from "../login";
import { RotatingLines } from 'react-loader-spinner';
import Footer from "@/components/Footer";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Initialize global cache if it doesn't exist
if (!global.profileCache) {
    global.profileCache = {};
}

export default function Profile({ id, initialProfile }) {
    const profile = initialProfile;
    const loading = !profile;

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
        <div>
            <Header profile={profile} />
            <div className="flex-grow my-8"></div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const now = Date.now();

    // Access the global cache
    const cachedData = global.profileCache[id];

    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`Serving profile ${id} from global cache.`);
        }
        return {
            props: {
                id,
                initialProfile: cachedData.profile,
            }
        };
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(`Fetching profile from API for ID: ${id}`);
    }

    try {
        const response = await fetch(`https://api.xclusivetouch.ca/api/publicProfile/${id}`);
        const data = await response.json();

        if (data && data.data && data.data.profile && data.data.profile.length > 0) {
            const profileData = data.data.profile[0];
            const profile = {
                ...profileData,
                url: data.url || '',
            };

            // Store in global cache
            global.profileCache[id] = {
                profile,
                timestamp: now,
            };

            if (process.env.NODE_ENV === 'development') {
                console.log(`Profile data cached in global cache for ID: ${id}`);
            }

            return {
                props: {
                    id,
                    initialProfile: profile,
                }
            };
        } else {
            if (process.env.NODE_ENV === 'development') {
                console.log('No profile data found.');
            }
            return {
                props: {
                    id,
                    initialProfile: null,
                }
            };
        }
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log('Error fetching profile:', err);
        }
        return {
            props: {
                id,
                initialProfile: null,
            }
        };
    }
}