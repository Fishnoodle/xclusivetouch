import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react';
import { Select, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTwitch, FaGlobe } from 'react-icons/fa';
import { HiOutlinePhotograph, HiOutlineSave, HiArrowLeft, HiPlus, HiTrash } from 'react-icons/hi';

// Disabled LinkedIn for now - until we can figure out how to save LinkedIn key
const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'Youtube', 'Twitch', 'Other'];

const socialIcons = {
  Facebook: <FaFacebook className="text-blue-600" size={20} />,
  Instagram: <FaInstagram className="text-pink-600" size={20} />,
  Twitter: <FaTwitter className="text-blue-400" size={20} />,
  Youtube: <FaYoutube className="text-red-600" size={20} />,
  Twitch: <FaTwitch className="text-purple-600" size={20} />,
  Other: <FaGlobe className="text-gray-400" size={20} />
};

const EditProfile = ({ id, profile, profileUrl }) => {
    const router = useRouter();
    // useStates
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompany] = useState('');
    const [about, setAbout] = useState('');
    const [headerColour, setHeaderColour] = useState('#000000');
    const [cardColour, setCardColour] = useState('#000000');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [socialMedia, setSocialMedia] = useState([{ platform: '', link: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');

    const handlePlatformChange = (index, event) => {
        const newSocialMedia = [...socialMedia];
        newSocialMedia[index].platform = event.target.value;
        setSocialMedia(newSocialMedia);
    };

    const handleLinkChange = (index, event) => {
        const newSocialMedia = [...socialMedia];
        newSocialMedia[index].link = event.target.value;
        setSocialMedia(newSocialMedia);
    };

    const handleAddSocialMedia = () => {
        setSocialMedia(prevSocialMedia => [...prevSocialMedia, { platform: '', link: '' }]);
    };

    const handleRemoveSocialMedia = (index) => {
        const newSocialMedia = [...socialMedia];
        newSocialMedia.splice(index, 1);
        setSocialMedia(newSocialMedia);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

// Modify the handleCancel and handleSubmit functions:
    const handleCancel = () => {
        router.push(`/login/${id}`);
    };
    
    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const formData = new FormData();
    
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('phoneNumber', phone);
            formData.append('email', email);
            formData.append('companyAddress', companyAddress);
            formData.append('position', occupation);
            formData.append('company', company);
            formData.append('about', about);
            formData.append('primaryColour', headerColour);
            formData.append('cardColour', cardColour);
            
            if (photo && photo instanceof File) {
                formData.append('profilePhoto', photo);
            }
            
            formData.append('socialMedia', JSON.stringify(socialMedia));
    
            const response = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`, {
                method: 'PUT',
                body: formData
            });
    
            const data = await response.json();
    
            if (!data.error) {
                toast.success('Profile updated successfully!');
                
                // Give the toast time to be shown
                setTimeout(() => {
                    router.push(`/login/${id}`);
                }, 1500);
            } else {
                toast.error(data.error || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName || '');
            setLastName(profile.lastName || '');
            setPhone(profile.phoneNumber || '');
            setEmail(profile.email || '');
            setCompanyAddress(profile.companyAddress || '');
            setOccupation(profile.position || '');
            setCompany(profile.company || '');
            setAbout(profile.about || '');
            setHeaderColour(profile.colours?.[0]?.primaryColour || '#000000');
            setCardColour(profile.colours?.[0]?.cardColour || '#000000');
            
            // Set photo preview if there's a profile picture URL
            if (profileUrl) {
                setPhotoPreview(profileUrl);
            }

            // Transform the profile.socialMedia data into the format that the form expects
            if (profile.socialMedia && profile.socialMedia.length > 0) {
                const initialSocialMedia = profile.socialMedia.map(item => {
                    const platform = Object.keys(item)[0];
                    const link = item[platform];
                    return { 
                        platform: platform.charAt(0).toUpperCase() + platform.slice(1), 
                        link: link 
                    };
                });
                setSocialMedia(initialSocialMedia);
            }
        }
    }, [profile]);

    return (
        <div className="min-h-screen bg-[#071013] py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                    <button 
                        onClick={handleCancel}
                        className="mr-4 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
                        aria-label="Go back"
                    >
                        <HiArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Your Profile</h1>
                        <p className="text-gray-400 text-sm md:text-base">Update your personal information and settings</p>
                    </div>
                </div>

                {/* Main card */}
                <Card color="transparent" shadow={false} className="overflow-hidden rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                    {/* Profile header with preview */}
                    <div className="relative bg-gradient-to-r from-[#D4AF37]/20 to-blue-900/20 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-black/40 border-2 border-[#D4AF37]">
                                    {photoPreview ? (
                                        <img 
                                            src={photoPreview} 
                                            alt="Profile preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#D4AF37]">
                                            <HiOutlinePhotograph size={40} />
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="photo-upload" className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-black p-2 rounded-full cursor-pointer hover:bg-[#E5C158] transition-colors">
                                    <HiOutlinePhotograph size={18} />
                                    <input
                                        id="photo-upload"
                                        type="file"
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="md:flex-1 text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                    {firstName || lastName ? `${firstName} ${lastName}` : "Your Profile"}
                                </h2>
                                <p className="text-gray-300">
                                    {occupation && company ? `${occupation} at ${company}` : (occupation || company || "Complete your profile details")}
                                </p>
                                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                    {socialMedia.filter(item => item.platform && item.link).map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="p-2 bg-white/10 rounded-full"
                                            title={item.platform}
                                        >
                                            {socialIcons[item.platform] || socialIcons.Other}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation tabs */}
                    <div className="px-4 md:px-8 border-b border-white/10">
                        <div className="flex overflow-x-auto hide-scrollbar">
                            <button 
                                className={`py-4 px-6 font-medium whitespace-nowrap ${activeSection === 'personal' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveSection('personal')}
                            >
                                Personal Info
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium whitespace-nowrap ${activeSection === 'company' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveSection('company')}
                            >
                                Company Details
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium whitespace-nowrap ${activeSection === 'social' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveSection('social')}
                            >
                                Social Media
                            </button>
                            <button 
                                className={`py-4 px-6 font-medium whitespace-nowrap ${activeSection === 'appearance' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
                                onClick={() => setActiveSection('appearance')}
                            >
                                Appearance
                            </button>
                        </div>
                    </div>

                    {/* Form sections */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        {/* Personal Information Section */}
                        {activeSection === 'personal' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            First Name
                                        </Typography>
                                        <Input
                                            size="lg"
                                            id="first_name"
                                            placeholder="Your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            Last Name
                                        </Typography>
                                        <Input
                                            size="lg"
                                            id="last_name"
                                            placeholder="Your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            Phone Number
                                        </Typography>
                                        <Input
                                            type='tel'
                                            size="lg"
                                            id="phone"
                                            placeholder="Your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            Email Address
                                        </Typography>
                                        <Input
                                            type='email'
                                            size="lg"
                                            id="email"
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Typography variant="h6" color="white" className="font-medium">
                                        About Me
                                    </Typography>
                                    <Textarea
                                        id="about"
                                        placeholder="Tell us about yourself, your experience, and your expertise..."
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white min-h-[160px]"
                                        rows={5}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Company Details Section */}
                        {activeSection === 'company' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            Occupation / Position
                                        </Typography>
                                        <Input
                                            size="lg"
                                            id="occupation"
                                            placeholder="Your job title or position"
                                            value={occupation}
                                            onChange={(e) => setOccupation(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Typography variant="h6" color="white" className="font-medium">
                                            Company Name
                                        </Typography>
                                        <Input
                                            size="lg"
                                            id="company"
                                            placeholder="Your company name"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Typography variant="h6" color="white" className="font-medium">
                                        Company Address
                                    </Typography>
                                    <Textarea
                                        id="address"
                                        placeholder="Enter your company's full address"
                                        value={companyAddress}
                                        onChange={(e) => setCompanyAddress(e.target.value)}
                                        className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Social Media Section */}
                        {activeSection === 'social' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h5" color="white" className="font-bold">
                                        Social Media Profiles
                                    </Typography>
                                    <Button 
                                        onClick={handleAddSocialMedia}
                                        className="bg-[#D4AF37] hover:bg-[#E5C158] text-black flex items-center gap-2"
                                        size="sm"
                                    >
                                        <HiPlus size={16} />
                                        Add Platform
                                    </Button>
                                </div>
                                
                                {socialMedia.length === 0 ? (
                                    <div className="text-center py-10 bg-black/10 rounded-lg">
                                        <p className="text-gray-400">No social media profiles added yet.</p>
                                        <Button 
                                            onClick={handleAddSocialMedia}
                                            className="mt-4 bg-[#D4AF37] hover:bg-[#E5C158] text-black flex items-center gap-2 mx-auto"
                                        >
                                            <HiPlus size={16} />
                                            Add Your First Platform
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {socialMedia.map((media, index) => (
                                            <div 
                                                key={index} 
                                                className="p-5 bg-black/20 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                                    <div className="md:col-span-4">
                                                        <Typography variant='h6' color='white' className='mb-2 text-sm font-medium'>
                                                            Platform
                                                        </Typography>
                                                        <Select
                                                            fullWidth
                                                            value={media.platform}
                                                            onChange={(event) => handlePlatformChange(index, event)}
                                                            className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white rounded-lg"
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    color: 'white',
                                                                    '& fieldset': {
                                                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                                                    },
                                                                    '&:hover fieldset': {
                                                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        borderColor: '#D4AF37',
                                                                    },
                                                                },
                                                                '& .MuiSelect-icon': {
                                                                    color: 'white',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select a platform</em>
                                                            </MenuItem>
                                                            {socialMediaOptions.map((option) => (
                                                                <MenuItem key={option} value={option} className="flex items-center gap-2">
                                                                    {socialIcons[option]}
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </div>

                                                    <div className="md:col-span-7">
                                                        <Typography variant='h6' color='white' className='mb-2 text-sm font-medium'>
                                                            Profile URL
                                                        </Typography>
                                                        <Input
                                                            size='lg'
                                                            placeholder='https://example.com/profile'
                                                            className='!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white'
                                                            labelProps={{
                                                                className: 'before:content-none after:content-none',
                                                            }}
                                                            value={media.link}
                                                            onChange={(event) => handleLinkChange(index, event)}
                                                        />
                                                    </div>

                                                    <div className="md:col-span-1 flex items-end justify-center md:justify-end">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleRemoveSocialMedia(index)} 
                                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                                                            title="Remove platform"
                                                        >
                                                            <HiTrash size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Appearance Section */}
                        {activeSection === 'appearance' && (
                            <div className="space-y-8">
                                <div>
                                    <Typography variant="h5" color="white" className="font-bold mb-4">
                                        Color Scheme
                                    </Typography>
                                    <p className="text-gray-400 mb-6">Personalize your digital business card with your preferred colors.</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <Typography variant="h6" color="white" className="font-medium">
                                                Header Background Color
                                            </Typography>
                                            <div className="flex items-center gap-4">
                                                <TextField
                                                    id="headerColour"
                                                    type="color"
                                                    value={headerColour}
                                                    onChange={(e) => setHeaderColour(e.target.value)}
                                                    className="w-20 h-12 rounded-lg overflow-hidden"
                                                />
                                                <div className="flex-1">
                                                    <div className="text-white font-mono">{headerColour}</div>
                                                    <div className="text-gray-400 text-sm">Used for your card&#39;s header background</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <Typography variant="h6" color="white" className="font-medium">
                                                Card Color
                                            </Typography>
                                            <div className="space-y-3">
                                                <div 
                                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${cardColour === '#000000' ? 'border-[#D4AF37]' : 'border-transparent hover:border-white/20'}`}
                                                    onClick={() => setCardColour('#000000')}
                                                >
                                                    <div className="w-10 h-10 rounded-md bg-black mr-3"></div>
                                                    <div>
                                                        <div className="text-white">Black</div>
                                                        <div className="text-gray-400 text-sm">Dark background with light text</div>
                                                    </div>
                                                </div>
                                                
                                                <div 
                                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${cardColour === '#FFFFFF' ? 'border-[#D4AF37]' : 'border-transparent hover:border-white/20'}`}
                                                    onClick={() => setCardColour('#FFFFFF')}
                                                >
                                                    <div className="w-10 h-10 rounded-md bg-white mr-3"></div>
                                                    <div>
                                                        <div className="text-white">White</div>
                                                        <div className="text-gray-400 text-sm">Light background with dark text</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 bg-black/20 rounded-lg border border-white/10">
                                    <div className="flex items-start">
                                        <div className="shrink-0 mr-4 bg-blue-500/20 p-3 rounded-lg text-blue-400">
                                            <HiOutlinePhotograph size={24} />
                                        </div>
                                        <div>
                                            <Typography variant="h6" color="white" className="font-medium mb-1">
                                                Profile Photo
                                            </Typography>
                                            <p className="text-gray-400 text-sm mb-4">
                                                Upload a professional photo for your digital business card. Square photos work best.
                                            </p>
                                            <Input
                                                type="file"
                                                size="lg"
                                                placeholder="Photo"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                                className="!border-white/20 focus:!border-[#D4AF37] bg-black/20 text-white"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action buttons - fixed at bottom */}
                        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end">
                            <Button 
                                onClick={handleCancel}
                                className="bg-transparent hover:bg-white/5 text-white border border-white/20"
                            >
                                Cancel
                            </Button>
                            
                            <Button 
                                type="submit"
                                className="bg-[#D4AF37] hover:bg-[#E5C158] text-black flex items-center justify-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <HiOutlineSave size={18} />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

EditProfile.propTypes = {
    id: PropTypes.string.isRequired,
    profile: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        companyAddress: PropTypes.string,
        position: PropTypes.string,
        company: PropTypes.string,
        about: PropTypes.string,
        profilePic: PropTypes.string,
        colours: PropTypes.arrayOf(PropTypes.shape({
            primaryColour: PropTypes.string,
            cardColour: PropTypes.string,
        })),
        socialMedia: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    profileUrl: PropTypes.string,
};

export default EditProfile;