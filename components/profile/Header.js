import { Button } from "@material-tailwind/react"
import Image from "next/image"
import { useState, React } from "react"

//Tabler Icons
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons'

const Header = () => {
    // Use States
    const [headerColour, setHeaderColour] = useState("bg-red-500")
    const [firstName, setFirstName] = useState("First")
    const [lastName, setLastName] = useState("Last")

    const [phoneNumber, setPhoneNumber] = useState("1234567890")
    const [email, setEmail] = useState("email@email.com")

    const [position, setPosition] = useState("Tech Marketer")
    const [company, setCompany] = useState("Tech Company")

    const [about, setAbout] = useState("I'm passionate about connecting tech and marketing for success. Let's exchange contacts and collaborate on innovative and tech-driven marketing solutions to fuel your growth!")

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
            <div className={`${headerColour} w-screen h-[200px] rounded-b-lg`}/>

            <div className="w-[90%] h-[200px] bg-blue-gray-100 -translate-y-1/2 rounded-lg mx-auto flex">
                <div className="w-2/5 relative">
                    <Image
                        src="https://randomuser.me/api/portraits/men/41.jpg"
                        alt="Profile"
                        fill="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="w-3/5 bg-black flex flex-col items-start justify-center pl-3">
                    <span className="block text-white text-[40px] font-bold"> {firstName}</span>
                    <span className="block text-white text-[40px] font-bold"> {lastName}</span>
                </div>

            </div>
            
            <div className="w-[90%] top-[50%] flex justify-center items-center space-x-10 mx-auto -translate-y-20">
                <Button fullWidth variant="outlined" size="lg" className="text-sm" onClick={createVCard}>
                    <span className="text-[11px]">Save Contact</span>
                </Button>
                <Button fullWidth variant="gradient" size="lg" className="text-sm" onClick={() => window.location.href = `sms:${phoneNumber}`}>
                    <span className="text-[11px]">Message Contact</span>
                </Button>
            </div>

            <div className="mx-5 -translate-y-1/3">
                <p className="text-2xl font-bold mb-3"> About </p>
                <p>{about}</p>
            </div>

            <div className="mx-5 -translate-y-1/4">
                <p className="text-2xl font-bold mb-3"> Social Media Links </p>
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none">
                        <button>
                            <IconBrandGithub size={32} />
                        </button>
                    </div>
                    <div className="w-16 h-16 bg-blue-500 rounded flex-none">
                        <button>
                            <IconBrandLinkedin size={32} />
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