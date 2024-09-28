import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react';
import { Select, MenuItem, TextField } from '@mui/material';

const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Youtube', 'Twitch']

const Create = ({ id = null, profile = null }) => {
    // useStates
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [occupation, setOccupation] = useState('')
    const [company, setCompany] = useState('')
    const [about, setAbout] = useState('')
    const [headerColour, setHeaderColour] = useState('#000000')
    const [cardColour, setCardColour] = useState('#000000')
    const [photo, setPhoto] = useState(null)
    const [socialMedia, setSocialMedia] = useState([{ platform: '', link: '' }])

    const handlePlatformChange = (index, event) => {
        const newSocialMedia = [...socialMedia]
        newSocialMedia[index].platform = event.target.value
        setSocialMedia(newSocialMedia)
    }

    const handleLinkChange = (index, event) => {
        const newSocialMedia = [...socialMedia]
        newSocialMedia[index].link = event.target.value
        setSocialMedia(newSocialMedia)
    }

    const handleAddSocialMedia = () => {
        setSocialMedia(prevSocialMedia => [...prevSocialMedia, { platform: '', link: '' }]);
    }

    const handleRemoveSocialMedia = (index) => {
        const newSocialMedia = [...socialMedia]
        newSocialMedia.splice(index, 1)
        setSocialMedia(newSocialMedia)
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneNumber', phone);
        formData.append('email', email);
        formData.append('position', occupation);
        formData.append('company', company);
        formData.append('about', about);
        formData.append('primaryColour', headerColour);
        formData.append('cardColour', cardColour);
        formData.append('profilePhoto', photo);
        formData.append('socialMedia', JSON.stringify(socialMedia));
    
        // Log FormData entries
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    
        if (id) {
            const response = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`, {
                method: 'PUT',
                body: formData
            });
    
            const data = await response.json();
    
            if (!data.error) {
                alert('Profile updated successfully!');
                window.scrollTo(0, 0);
                window.location.reload();
            } else {
                alert(data.error);
            }
        } else {
            console.log(firstName);
    
            const response = await fetch('https://api.xclusivetouch.ca/api/profile', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
    
            if (!data.error) {
                alert('Profile created successfully!');
                window.scrollTo(0, 0);
                window.location.reload();
            } else {
                alert(data.error);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    console.log(id)
                    if (profile !== null) {
                        setFirstName(profile.firstName)
                        setLastName(profile.lastName)
                        setPhone(profile.phoneNumber)
                        setEmail(profile.email)
                        setOccupation(profile.position)
                        setCompany(profile.company)
                        setAbout(profile.about)
                        setHeaderColour(profile.colours[0]?.primaryColour)
                        setCardColour(profile.colours[0]?.cardColour)
                        setPhoto(profile.colours[0]?.profilePhoto)
                        

                        // Transform the profile.socialMedia data into the format that the form expects
                        const initialSocialMedia = profile.socialMedia.map(item => {
                            const platform = Object.keys(item)[0]
                            const link = item[platform]
                            return { platform: platform.charAt(0).toUpperCase() + platform.slice(1), link: link }
                        })

                        setSocialMedia(initialSocialMedia)
                    } 
                }
            } catch (err) {
                console.log('Error caught:', err);
            }
        }

        fetchData()
    }, [id])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', minHeight: '5vh'}}>
     <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        {id ? 'Edit Profile' : 'Sign Up'}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details profile.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
            
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            First Name
          </Typography>
          <Input
            size="lg"
            id="first_name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Last Name
          </Typography>
          <Input
            size="lg"
            id="last_name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Phone Number
        </Typography>
        <Input
            type='tel'
            size="lg"
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
        </Typography>
        <Input
            type='email'
            size="lg"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Occupation
        </Typography>
        <Input
            size="lg"
            id="occupation"
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Company
        </Typography>
        <Input
            size="lg"
            id="company"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Tell Us About Yourself
        </Typography>
        <Textarea
            id="about"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Choose a colour for your heading
        </Typography>
        <TextField
            id="headerColour"
            type="color"
            value={headerColour}
            onChange={(e) => setHeaderColour(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            InputLabelProps={{
                className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Choose a colour for your Card
        </Typography>
        <Select
            size="lg"
            id="cardColour"
            value={cardColour}
            onChange={(e) => setCardColour(e.target.value)}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
                className: "before:content-none after:content-none",
            }}
        >
            <MenuItem value="#000000">Black</MenuItem>
            <MenuItem value="#FFFFFF">White</MenuItem>
        </Select>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Upload a photo
        </Typography>
        <Input
            type="file"
            size="lg"
            placeholder="Photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/*"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        {/* Social Media */}
        {socialMedia.map((media, index) => (
            <div key={index}>
                <Typography variant='h6' color='blue-gray' className='-mb-1'>
                    Choose your social media platform
                </Typography>
                <Select
                    fullWidth
                    value={media.platform}
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900 mt-3'
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

                <Typography variant='h6' color='blue-gray' className='-mb-1 mt-3'>
                    Enter your social media link
                </Typography>
                <Input
                    size='lg'
                    id='socialMediaLink'
                    placeholder='Social Media Link'
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900 mt-3'
                    labelProps={{
                        className: 'before:content-none after:content-none',
                    }}
                    value={media.link}
                    onChange={(event) => handleLinkChange(index, event)}
                />
                <Button onClick={() => handleRemoveSocialMedia(index)} className='mt-5'>Remove</Button>
            </div>
        ))}
            <Button onClick={handleAddSocialMedia}>Add Social Media</Button>

        </div>
        <Button className="mt-6" fullWidth onClick={handleSubmit}>
            {id ? 'Update Profile' : 'Create Profile'}
        </Button>
      </form>
    </Card>
    </div>
    )
}

export default Create