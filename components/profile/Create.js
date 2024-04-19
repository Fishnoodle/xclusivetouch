import { React, useState } from 'react'
import { Card, Input, Checkbox, Button, Typography, Textarea } from '@material-tailwind/react'

const Create = () => {
    // useStates
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [occupation, setOccupation] = useState('')
    const [company, setCompany] = useState('')
    const [about, setAbout] = useState('')
    const [headerColour, setHeaderColour] = useState('')
    const [cardColour, setCardColour] = useState('')
    const [photo, setPhoto] = useState('')

    async function handleSubmit(e) {
        event.preventDefault()

        const response = await fetch('http://146.190.246.199:8001/api/profile', {
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
                profilePhoto: photo
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


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', minHeight: '5vh'}}>
     <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
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

        <Typography variant="h6" color="blue-gray" className="-mb-3">
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
        />

        </div>
        <Button className="mt-6" fullWidth onClick={handleSubmit}>
          create your profile
        </Button>
      </form>
    </Card>
    </div>
    )
}

export default Create