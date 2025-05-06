import React, { useState } from 'react';
import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react';
import { Select, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

// Disabled LinkedIn for now - until we can figure out how to save LinkedIn key
const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'Youtube', 'Twitch', 'Other']

const Create = ({ id }) => {
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

            const response = await fetch('https://api.xclusivetouch.ca/api/profile', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!data.error) {
                toast.success('Profile created successfully!');
                setTimeout(() => {
                    if (id) {
                        router.push(`/login/${id}`);
                    } else {
                        window.location.reload();
                    }
                }, 1500);
            } else {
                toast.error(data.error || 'Failed to create profile');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Create error:', error);
            toast.error('An unexpected error occurred.');
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card color="transparent" shadow={false} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Typography variant="h4" color="white" className="text-2xl md:text-3xl font-bold">
                            Create Your Profile
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Nice to meet you! Enter your profile details.
                        </Typography>
                    </div>
                    
                    {photoPreview && (
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                            <img 
                                src={photoPreview} 
                                alt="Profile preview" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
                
                <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                First Name*
                            </Typography>
                            <Input
                                size="lg"
                                id="first_name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Last Name*
                            </Typography>
                            <Input
                                size="lg"
                                id="last_name"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Phone Number*
                            </Typography>
                            <Input
                                type='tel'
                                size="lg"
                                id="phone"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Email*
                            </Typography>
                            <Input
                                type='email'
                                size="lg"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Company Address (Optional)
                            </Typography>
                            <Input
                                size="lg"
                                id="address"
                                placeholder="Company Address"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Occupation*
                            </Typography>
                            <Input
                                size="lg"
                                id="occupation"
                                placeholder="Occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Company*
                            </Typography>
                            <Input
                                size="lg"
                                id="company"
                                placeholder="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Tell Us About Yourself
                            </Typography>
                            <Textarea
                                id="about"
                                placeholder="Share a little about yourself, your experience, and your expertise..."
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] mt-2"
                                rows={4}
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Choose a color for your heading
                            </Typography>
                            <div className="flex items-center gap-3">
                                <TextField
                                    id="headerColour"
                                    type="color"
                                    value={headerColour}
                                    onChange={(e) => setHeaderColour(e.target.value)}
                                    className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37] w-16 h-10"
                                />
                                <span className="text-white">{headerColour}</span>
                            </div>
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Choose a color for your Card
                            </Typography>
                            <Select
                                id="cardColour"
                                value={cardColour}
                                onChange={(e) => setCardColour(e.target.value)}
                                className="!border-blue-gray-200 focus:!border-[#D4AF37] bg-white"
                            >
                                <MenuItem value="#000000">Black</MenuItem>
                                <MenuItem value="#FFFFFF">White</MenuItem>
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Upload a profile photo
                            </Typography>
                            <Input
                                type="file"
                                size="lg"
                                placeholder="Photo"
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="!border-t-blue-gray-200 focus:!border-t-[#D4AF37]"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography color="gray" className="mt-1 text-xs italic">
                                Recommended size: 400x400px square image
                            </Typography>
                        </div>

                        {/* Social Media Section */}
                        <div className="md:col-span-2 mt-6">
                            <Typography variant="h5" color="blue-gray" className="mb-4">
                                Social Media Profiles (Optional)
                            </Typography>
                            
                            {socialMedia.map((media, index) => (
                                <div key={index} className="mb-8 p-4 bg-black/20 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Typography variant='h6' color='blue-gray' className='mb-2'>
                                                Platform
                                            </Typography>
                                            <Select
                                                fullWidth
                                                value={media.platform}
                                                className='!border-blue-gray-200 focus:!border-[#D4AF37] bg-white'
                                                onChange={(event) => handlePlatformChange(index, event)}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {socialMediaOptions.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </div>

                                        <div>
                                            <Typography variant='h6' color='blue-gray' className='mb-2'>
                                                Profile URL
                                            </Typography>
                                            <Input
                                                size='lg'
                                                id='socialMediaLink'
                                                placeholder='https://example.com/profile'
                                                className='!border-t-blue-gray-200 focus:!border-t-[#D4AF37]'
                                                labelProps={{
                                                    className: 'before:content-none after:content-none',
                                                }}
                                                value={media.link}
                                                onChange={(event) => handleLinkChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                    
                                    <Button 
                                        onClick={() => handleRemoveSocialMedia(index)} 
                                        className="mt-3 bg-red-500 hover:bg-red-600"
                                        size="sm"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            
                            <Button 
                                onClick={handleAddSocialMedia}
                                className="bg-[#D4AF37] hover:bg-[#E5C158] text-black"
                            >
                                Add Social Media
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end mt-10">
                        <Button 
                            type="submit"
                            className="bg-[#D4AF37] hover:bg-[#E5C158] text-black py-3 px-8"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Profile'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

Create.propTypes = {
    id: PropTypes.string
};

export default Create;