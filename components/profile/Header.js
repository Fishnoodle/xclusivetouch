import Button from "@material-tailwind/react/components/Button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTwitch } from 'react-icons/fa';
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
        other: <Globe className="text-black-600" />, // Ensure Globe is imported or replace accordingly
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
    }, [profile, profilePictureUrl]);

    useEffect(() => {
        if (aboutRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(aboutRef.current).lineHeight, 10);
            const aboutHeight = aboutRef.current.offsetHeight;
            setIsMultiLine(aboutHeight > lineHeight);
        }
    }, [about]); // Add dependency to prevent continuous execution

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

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    const exchangeContact = () => {
      setShowModal(true);
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const id = profile._id // Adjust based on actual ID field

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
        })

        const data = await response.json()
        console.log(data.error)

        if (!data.error) {
          toast.success('Contact exchanged successfully')
        } else {
          toast.error('Contact exchange failed: ' + data.error)
        }

        setTimeout(() => {
          setLoading(false)
          window.location.reload()
        }, 3000)

        setShowModal(false);
      } catch (error) {
        console.error('Error:', error);
        toast.error('An unexpected error occurred.');
      } finally {
        setLoading(false)
      }
    };

    const handleCloseModal = (e) => {
      if (e.target.id === 'modal-background') {
        setShowModal(false);
      }
    }

    return (
        <div className="overflow-hidden relative">
          <div style={{ backgroundColor: headerColour, width: '100vw', height: '200px' }}/>
        
          <div className="w-[90%] h-[200px] md:h-[400px] -translate-y-1/2 mx-auto flex overflow-hidden rounded-lg shadow-2xl shadow-gray-900 mt-5 md:mt-10">
            <div className="w-1/2 h-full relative">
              <Image
                src={profilePictureLink}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
                className='object-cover'
                onError={(e) => {
                  console.error('Error loading image:', e);
                }}
               // style={{ objectFit: 'cover' }}
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
              <Button fullWidth variant="gradient" size="lg" className="text-sm" onClick={exchangeContact}>
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
                <div className={`relative ${isExpanded ? '' : 'line-clamp-2'}`} ref={aboutRef}>
                  {about}
                </div>
                {isMultiLine && (
                    <button onClick={toggleExpand} className="text-gold mt-2">
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
          </div>
        
          <div className="w-[90%] mx-auto mt-5 md:mt-10">
            <p className="text-2xl font-bold mb-3">Social Media Links</p>
            <div className="flex space-x-4 overflow-x-auto">
              {Object.entries(socialLinks).map(([name, link]) => (
                <div key={name} className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <a href={link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    {iconMapping[name.toLowerCase()] || name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {showModal && (
            <div id='modal-background' className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
              <div className='bg-white w-full md:w-1/2 p-6 rounded-t-lg'>
                <h2 className='text-xl font-bold mb-4'>Exchange Contact</h2>
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Name</label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Email</label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2' // Fixed typo: 'ronded-md' to 'rounded-md'
                        required
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Message</label>
                      <textarea
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                        required
                      />
                    </div>
                    <div className='flex justify-end'>
                      <Button type='submit' variant='gradient' size='lg' className='text-sm' disabled={loading}>
                        {loading ? 'Loading...' : 'Send'}
                      </Button>
                    </div>
                  </form>
              </div>
            </div>
          )}
        </div>
    );

}

export default Header