import { Button } from "@material-tailwind/react"
import Image from "next/image"
import { useState, React, useEffect } from "react"
import jwt from "jsonwebtoken"
import { FaFacebook } from "react-icons/fa"

const Header = (profile) => {
    // Use States
    const [loading, setLoading] = useState(false)
    const [headerColour, setHeaderColour] = useState("bg-red-500")
    const [firstName, setFirstName] = useState("First")
    const [lastName, setLastName] = useState("Last")

    const [phoneNumber, setPhoneNumber] = useState("1234567890")
    const [email, setEmail] = useState("email@email.com")

    const [position, setPosition] = useState("Tech Marketer")
    const [company, setCompany] = useState("Tech Company")

    const [about, setAbout] = useState("I'm passionate about connecting tech and marketing for success. Let's exchange contacts and collaborate on innovative and tech-driven marketing solutions to fuel your growth!")

    useEffect(() => {
        const info = profile.id.profile

        console.log(info.colours[0].profilePhoto.url)

        setFirstName(info.firstName);
        setLastName(info.lastName);
        setPhoneNumber(info.phoneNumber);
        setEmail(info.email);
        setPosition(info.position);
        setCompany(info.company);
        setAbout(info.about);
    }, [profile]);

    const createVCard = () => {
        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:;${firstName} ${lastName};;;`,
            `FN:${firstName} ${lastName}`,
            `TEL;TYPE=work,voice;VALUE=uri:tel:${phoneNumber}`,
            `EMAIL:${email}`,
            `ORG:${company}`,
            'END:VCARD',
        ].join('\n');

        const a = document.createElement('a');
        a.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`;
        a.download = 'contact.vcf';
        a.click();
    };
    

    return (
        <div className="overflow-hidden relative">
            <div className={`${headerColour} w-screen h-[200px]`}/>

            <div className="w-[90%] h-[200px] bg-blue-gray-100 -translate-y-1/2 mx-auto flex overflow-hidden rounded-lg">
                <div className="w-2/5 relative">
                    <Image
                        src="https://randomuser.me/api/portraits/men/41.jpg"
                        alt="Profile"
                        fill="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="w-3/5 bg-black flex flex-col items-start justify-center pl-3">
                    <div className="mb-2 pl-2">
                        <span className="block text-white text-[22px] font-semibold"> {firstName}</span>
                        <span className="block text-white text-[22px] font-semibold"> {lastName}</span>
                    </div>
                    <div className="pl-2">
                        <span className="block text-white text-[14px] font-light"> {position}</span>
                        <span className="block text-white text-[14px] font-light"> {company}</span>
                    </div>
                </div>

            </div>

            <div className="w-[90%] top-[50%] flex justify-center items-center space-x-10 mx-auto -translate-y-20">
                <Button fullWidth variant="outlined" size="lg" className="text-sm" onClick={createVCard}>
                    <span className="text-[60%]">Save Contact</span>
                </Button>
                <Button fullWidth variant="gradient" size="lg" className="text-sm" onClick={() => window.location.href = `sms:${phoneNumber}`}>
                    <span className="text-[60%]">Message Contact</span>
                </Button>
            </div>

            <div className="mx-5 -translate-y-1/2">
                <p className="text-2xl font-bold mb-3"> About </p>
                <p>{about}</p>
            </div>

            <div className="mx-5 -translate-y-1/5">
                <p className="text-2xl font-bold mb-3"> Social Media Links </p>
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="w-16 h-16 bg-gray-500 rounded flex-none items-center justify-center">
                        <button className="w-full h-full flex items-center justify-center">
                            <FaFacebook className="text-white text-2xl w-full h-full" />
                        </button>
                    </div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none">
                        <button>
                        </button>
                    </div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none"></div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none"></div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none"></div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none"></div>
                    {/* Add more squares as needed */}
                </div>
            </div>

        </div>
    )
}

export default Header