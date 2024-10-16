import { Button } from "@material-tailwind/react"
import Image from "next/image"
import { useState, React, useEffect, useRef} from "react"
import jwt from "jsonwebtoken"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Twitch, Link, Globe } from "react-feather"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTwitch } from 'react-icons/fa';

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

    const aboutRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMultiLine, setIsMultiLine] = useState(false);

    const iconMapping = {
        facebook: <FaFacebook className="text-blue-600" size={32} />,
        instagram: <FaInstagram className="text-pink-600" size={32} />,
        twitter: <FaTwitter className="text-blue-400" size={32} />, // Change to X twtiterelol
        linkedin: <FaLinkedin className="text-blue-700" size={32} />,
        youtube: <FaYoutube className="text-red-600" size={32} />,
        twitch: <FaTwitch className="text-purple-600" size={32} />,
        other: <Globe className="text-black-600" />, // You can keep this as is or find a suitable icon
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

    useEffect(() => {
        if (aboutRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(aboutRef.current).lineHeight, 10);
            const aboutHeight = aboutRef.current.offsetHeight;
            setIsMultiLine(aboutHeight > lineHeight);
        }
    })

    const createVCard = () => {
        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:;${firstName} ${lastName};;;`,
            `FN:${firstName} ${lastName}`,
            `TEL;TYPE=work,voice:${phoneNumber}`,
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

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <div className="overflow-hidden relative">
          <div style={{ backgroundColor: headerColour, width: '100vw', height: '200px' }}/>
        
          <div className="w-[90%] h-[200px] md:h-[400px] -translate-y-1/2 mx-auto flex overflow-hidden rounded-lg shadow-2xl shadow-gray-900 mt-5 md:mt-10">
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
                <span className="block text-[26px] md:text-[55px] font-semibold">
                  {firstName} {lastName}
                </span>
              </div>
              <div className="pl-2">
                <span className="block text-[16px] md:text-[36px] font-light">{position}</span>
                <span className="block text-[16px] md:text-[36px] font-light">@ {company}</span>
              </div>
            </div>
          </div>
        
          <div className="w-[90%] mx-auto -mt-16">
            <div className="flex justify-center items-center space-x-10">
              <Button fullWidth variant="outlined" size="lg" className="text-sm" onClick={createVCard}>
                <span className="text-[60%]">Save Contact</span>
              </Button>
              <Button fullWidth variant="gradient" size="lg" className="text-sm" onClick={() => window.location.href = `sms:${phoneNumber}`}>
                <span className="text-[60%]">Message Contact</span>
              </Button>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Button fullWidth variant="gradient" size="lg" className="text-sm">
                <span className="text-[60%]">Exchange Profile</span>
              </Button>
            </div>
          </div>
        
          <div className={`w-[90%] mx-auto mt-8 ${isMultiLine ? 'mt-20 md:mt-24' : 'mt-10 md:mt-12'} flex flex-col space-y-5`}>
            {companyAddress && (
              <div>
                <p className="text-2xl font-bold mb-3">Company Address</p>
                <p>{companyAddress}</p>
              </div>
            )}
        
          <div>
              <p className="text-2xl font-bold mb-3">About</p>
              <div className={`relative ${isExpanded ? '' : 'line-clamp-2'}`}>
                {about}
              </div>
              <button onClick={toggleExpand} className="text-gold mt-2">
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
        
          <div className="w-[90%] mx-auto mt-5 md:mt-10">
            <p className="text-2xl font-bold mb-3">Social Media Links</p>
            <div className="flex space-x-4 overflow-x-auto">
              {Object.entries(socialLinks).map(([name, link]) => (
                <div key={name} className="w-16 h-16 bg-gray-200 rounded-2xl flex-none items-center justify-center">
                  <a href={link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    {iconMapping[name.toLowerCase()] || name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Header