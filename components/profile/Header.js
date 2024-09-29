import { Button } from "@material-tailwind/react"
import Image from "next/image"
import { useState, React, useEffect } from "react"
import jwt from "jsonwebtoken"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Twitch, Link } from "react-feather"

const Header = (profile, profilePicture) => {
    // Use States
    const [loading, setLoading] = useState(false)
    
    const [headerColour, setHeaderColour] = useState("")
    const [cardColour, setCardColour] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [companyAddress, setCompanyAddress] = useState("")
    const [position, setPosition] = useState("")
    const [company, setCompany] = useState("")
    const [about, setAbout] = useState("")
    const [socialLinks, setSocialLinks] = useState({})
    const [profilePictureLink, setProfilePictureLink] = useState("")

    const iconMapping = {
        facebook: <Facebook className="text-gray-600" />,
        instagram: <Instagram className="text-gray-600" />,
        twitter: <Twitter className="text-gray-600" />,
        linkedin: <Linkedin className="text-gray-600" />,
        youtube: <Youtube className="text-gray-600" />,
        twitch: <Twitch className="text-gray-600" />,
        other: <Link className="text-gray-600" />,
        // Add more mappings as needed
      };

    useEffect(() => {
        const info = profile.id.profile

        console.log(info)

        setFirstName(info.firstName);
        setLastName(info.lastName);
        setPhoneNumber(info.phoneNumber);
        setEmail(info.email);
        setCompanyAddress(info.companyAddress);
        setPosition(info.position);
        setCompany(info.company);
        setAbout(info.about);

        setHeaderColour(info?.colours?.[0]?.primaryColour)
        setCardColour(info?.colours?.[0]?.cardColour)

        const socialsArray = info?.socialMedia || [];
        
        setProfilePictureLink(info.url);
        
        console.log(profilePictureLink);
        
        let newSocialLinks = {};
        socialsArray.forEach(social => {
            for (let key in social) {
                if (key !== '_id') {
                    newSocialLinks[key] = social[key];
                }
            }
        });
        
        setSocialLinks(newSocialLinks);

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
    
    console.log(profile)

    return (
        <div className="overflow-hidden relative">
            <div style={{ backgroundColor: headerColour, width: '100vw', height: '200px' }}/>

            <div className="w-[90%] h-[200px] md:h-[400px] -translate-y-1/2 mx-auto flex overflow-hidden rounded-lg shadow-2xl shadow-gray-900">
                <div className="w-1/2 h-full relative">
                    <Image
                        src={profilePictureLink}
                        alt="Profile"
                        layout="fill"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div
                    style={{ backgroundColor: cardColour }}
                    className={`w-1/2 flex flex-col items-start justify-center pl-3 ${
                        cardColour === '#000000' ? 'text-white' : 'text-black'
                    }`}
                >
                    <div className="mb-2 pl-2">
                        <span className="block text-[22px] font-semibold">{firstName}</span>
                        <span className="block text-[22px] font-semibold">{lastName}</span>
                    </div>
                    <div className="pl-2">
                        <span className="block text-[14px] font-light">{position}</span>
                        <span className="block text-[14px] font-light">{company}</span>
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
                <p className="text-2xl font-bold mb-3"> Company Address </p>
                <p> {companyAddress} </p>
            </div>

            <div className="mx-5 -translate-y-1/2 mt-10">
                <p className="text-2xl font-bold mb-3"> About </p>
                <div dangerouslySetInnerHTML={{ __html: about.replace(/\n/g, '<br />') }} />
            </div>

            <div className="mx-5 -translate-y-1/5">
                <p className="text-2xl font-bold mb-3"> Social Media Links </p>
                <div className="flex space-x-4 overflow-x-auto">
                    {Object.entries(socialLinks).map(([name, link]) => (
                        <div key={name} className="w-16 h-16 bg-gray-200 rounded flex-none items-center justify-center">
                            <a href={link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                {iconMapping[name.toLowerCase()] || name}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Header