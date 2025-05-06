import React from "react";
import Button from "@material-tailwind/react/components/Button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTwitch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import toast from "react-hot-toast"
import { Globe } from "react-feather";

const Header = ({ profile, profilePictureUrl }) => {
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
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const iconMapping = {
        facebook: <FaFacebook className="text-blue-600" size={32} />,
        instagram: <FaInstagram className="text-pink-600" size={32} />,
        twitter: <FaTwitter className="text-blue-400" size={32} />,
        linkedin: <FaLinkedin className="text-blue-700" size={32} />,
        youtube: <FaYoutube className="text-red-600" size={32} />,
        twitch: <FaTwitch className="text-purple-600" size={32} />,
        other: <Globe className="text-gray-600" size={32} />,
    };

    useEffect(() => {
      if (profile) {
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setPhoneNumber(profile.phoneNumber || "");
        setEmail(profile.email || "");
        setCompanyAddress(profile.companyAddress || "");
        setPosition(profile.position || "");
        setCompany(profile.company || "");
        setAbout(profile.about || "");

        setHeaderColour(profile?.colours?.[0]?.primaryColour || "#FFFFFF");
        setCardColour(profile?.colours?.[0]?.cardColour || "#FFFFFF");

        const socialsArray = profile?.socialMedia || [];
        
        setProfilePictureLink(profilePictureUrl || "");

        let newSocialLinks = {};
        socialsArray.forEach(social => {
            for (let key in social) {
                if (key !== '_id') {
                    newSocialLinks[key] = social[key];
                }
            }
        });
        
        setSocialLinks(newSocialLinks);
      }
    }, [
      profile,
      profilePictureUrl
    ]);

    useEffect(() => {
        if (aboutRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(aboutRef.current).lineHeight, 10);
            const aboutHeight = aboutRef.current.offsetHeight;
            setIsMultiLine(aboutHeight > lineHeight * 2);
        }
    }, [about]);

    const createVCard = () => {
        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${lastName};${firstName};;;`,
            `FN:${firstName} ${lastName}`,
            `TEL;TYPE=work,voice:${phoneNumber}`,
            `EMAIL:${email}`,
            `ORG:${company}`,
            `TITLE:${position}`,
            `ADR;TYPE=WORK:;;${companyAddress}`,
            'END:VCARD',
        ].join('\n');

        const a = document.createElement('a');
        a.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`;
        a.download = `${firstName}_${lastName}.vcf`;
        a.click();
    };

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    const exchangeContact = () => {
      setShowModal(true);
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const id = profile._id;

      try {
        const response = await fetch(`https://api.xclusivetouch.ca/api/exchangeContact/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          })
        });

        const data = await response.json();

        if (!data.error) {
          toast.success('Contact exchanged successfully');
          setShowModal(false);
          
          // Set a timeout before page reload
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } else {
          toast.error('Contact exchange failed: ' + data.error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An unexpected error occurred.');
        setLoading(false);
      }
    };

    const closeModal = () => {
      setShowModal(false);
    };

    const textColor = cardColour === '#000000' ? 'text-white' : 
                    cardColour === '#FFFFFF' ? 'text-black' : 
                    'text-black';

    return (
        <div className="overflow-hidden relative">
          <div style={{ backgroundColor: headerColour }} className="w-full h-[200px] md:h-[250px]"/>
        
          <div className="w-[90%] max-w-4xl h-auto md:h-[400px] -translate-y-[20%] mx-auto flex flex-col md:flex-row overflow-hidden rounded-lg shadow-2xl shadow-gray-900 mt-5 md:mt-10">
            <div className="w-full md:w-1/2 h-[200px] md:h-full relative">
              <Image
                src={profilePictureLink || "/assets/default-profile.jpg"}
                alt={`${firstName} ${lastName}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
                className="object-cover"
              />
            </div>
        
            <div
              style={{ backgroundColor: cardColour }}
              className={`w-full md:w-1/2 p-4 md:p-6 flex flex-col items-start justify-center ${textColor}`}
            >
              <div className="mb-2">
                <span className="block text-xl md:text-3xl lg:text-4xl font-semibold">
                  {firstName} {lastName}
                </span>
              </div>
              <div>
                <span className="block text-base md:text-xl lg:text-2xl font-light">{position}</span>
                {company && (
                  <span className="block text-base md:text-xl lg:text-2xl font-light">@ {company}</span>
                )}
              </div>
            </div>
          </div>
        
          <div className="w-[90%] max-w-4xl mx-auto -mt-4 md:mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                fullWidth 
                variant="outlined" 
                className="py-3 text-sm rounded-lg" 
                onClick={createVCard}
              >
                Save Contact
              </Button>
              <Button 
                fullWidth 
                variant="gradient" 
                className="py-3 text-sm rounded-lg" 
                onClick={() => window.location.href = `sms:${phoneNumber}`}
              >
                Message
              </Button>
              <Button 
                fullWidth 
                variant="gradient" 
                className="py-3 text-sm rounded-lg" 
                onClick={exchangeContact}
              >
                Exchange Profile
              </Button>
            </div>
          </div>
        
          <div className="w-[90%] max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <div 
                className={`relative ${isExpanded ? '' : 'line-clamp-3'}`} 
                ref={aboutRef}
              >
                {about || "No information provided."}
              </div>
              {isMultiLine && (
                <button 
                  onClick={toggleExpand} 
                  className="mt-2 text-sm flex items-center text-blue-500"
                >
                  {isExpanded ? (
                    <>Show Less <FaChevronUp className="ml-1" size={12} /></>
                  ) : (
                    <>Show More <FaChevronDown className="ml-1" size={12} /></>
                  )}
                </button>
              )}
            </div>
            
            {/* Details Section */}
            <div className="bg-white/5 backdrop-blur-sm p-5 rounded-xl">
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              
              {companyAddress && (
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Company Address</p>
                  <p>{companyAddress}</p>
                </div>
              )}
              
              {/* Social Media Section */}
              {Object.keys(socialLinks).length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Connect</p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(socialLinks).map(([name, link]) => (
                      <a
                        key={name}
                        href={link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        title={name}
                      >
                        {iconMapping[name.toLowerCase()] || <Globe size={24} />}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Exchange Contact Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                  <h2 className="text-xl font-bold">Exchange Contact Information</h2>
                  <p className="text-white/80 text-sm">Connect with {firstName} {lastName}</p>
                </div>
                
                {/* Modal Body */}
                <div className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Hi! I'd like to connect with you..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Send Contact Request'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
    );
};

Header.propTypes = {
  profile: PropTypes.object.isRequired,
  profilePictureUrl: PropTypes.string.isRequired,
};

export default Header;