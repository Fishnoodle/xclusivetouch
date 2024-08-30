import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react';
import { Select, MenuItem, TextField } from '@mui/material';

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
    const [link, setLink] = useState('')

    const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Youtube', 'Twitch']

    const handleAdd = () => {
        setSocialMedia(prev => [...prev, { platform: '', link: '' }])
    }

    async function handleSubmit(e) {
        event.preventDefault()

        if (id) {
            const response = await fetch(`https://api.xclusivetouch.ca/api/profile/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phone,
                    email: email,
                    position: occupation,
                    company: company,
                    about: about,
                    primaryColour: headerColour,
                    cardColour: cardColour,
                    profilePhoto: photo,
                    socialMedia: socialMedia
                })
            })

            const data = await response.json()

            if (!data.error) {
                alert('Profile updated successfully!')
                window.location.reload();
            } else {
                alert(data.error)
            }
        } else {

        const response = await fetch('https://api.xclusivetouch.ca/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                email: email,
                position: occupation,
                company: company,
                about: about,
                primaryColour: headerColour,
                cardColour: cardColour,
                profilePhoto: photo,
                socialMedia: socialMedia
            })
        })

        const data = await response.json()

        if (!data.error) {
            alert('Profile created successfully!')
            window.location.reload();
        } else {
            alert(data.error)
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
                        setLastName(id.lastName)
                        setPhone(profile.phoneNumber)
                        setEmail(profile.email)
                        setOccupation(profile.position)
                        setCompany(profile.company)
                        setAbout(profile.about)
                        setHeaderColour(profile.colours[0]?.primaryColour)
                        setCardColour(profile.colours[0]?.cardColour)
                        setPhoto(profile.colours[0]?.profilePhoto)
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
        <Input
            type="color" // Add this line
            size="lg"
            id="headerColour"
            placeholder="Header Colour"
            value={headerColour}
            onChange={(e) => setHeaderColour(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Choose a colour for your Card
        </Typography>
        <Input
            type="color" // Add this line
            size="lg"
            id="cardColour"
            placeholder="Card Colour"
            value={cardColour}
            onChange={(e) => setCardColour(e.target.value)}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />

        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
            Upload a photo
        </Typography>
        <Input
            type="file"
            size="lg"
            placeholder="Photo"
            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        /> */}

{socialMedia.map((media, index) => (
    <div key={index}>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            Choose your social media
        </Typography>
        <Select
            fullWidth
            value={media.platform}
            className='!border-t-blue-gray-200 focus:!border-t-gray-900 mt-3'
            onChange={(e) => {
                const newMedia = [...socialMedia]
                newMedia[index] = { ...newMedia[index], platform: e.target.value }
                setSocialMedia(newMedia)
            }}
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

        <Typography variant="h6" color="blue-gray" className="-mb-3">
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
            onChange={(e) => {
                const newMedia = [...socialMedia]
                newMedia[index] = { ...newMedia[index], link: e.target.value }
                setSocialMedia(newMedia)
            }}
        />
    </div>
))}

        <Button onClick={handleAdd}>Add</Button>

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