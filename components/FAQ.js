import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const FAQ = () => {
    const [open, setOpen] = React.useState(1);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);


    return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center">

    <div className="mx-auto md:text-center py-10 px-2">
    <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
        Frequently Asked Questions
    </h1>
    </div>

    <div className="py-10 block relative md: px-10">
        <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)}>What sets XclusiveTouch digital business cards apart from traditional ones?</AccordionHeader>
            <AccordionBody className='text-lg'>
                XclusiveTouch digital business cards offer a dynamic and interactive way to share your information.
                Stand out with customizable designs, multimedia content, and real-time updates, making a lasting
                impression.
            </AccordionBody>
        </Accordion>

        <Accordion open={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}>
                How do I get started with XclusiveTouch digital business cards?
            </AccordionHeader>
            <AccordionBody className='text-lg'>
                Getting started is easy! Visit our website, sign up for an account, and begin creating your
                personalized digital business card. Choose from a variety of templates and customize them to match
                your style and brand.
            </AccordionBody>
        </Accordion>

        <Accordion open={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)}>
                Can I include my company logo and social media links in my XclusiveTouch digital business card?
            </AccordionHeader>
            <AccordionBody className='text-lg'>
                Absolutely! Showcase your brand by adding your company logo and links to your social media
                profiles. XclusiveTouch digital business cards are fully customizable, allowing you to create
                a professional and cohesive representation of your brand.
            </AccordionBody>
        </Accordion>

        <Accordion open={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)}>
                Is there a limit to the number of XclusiveTouch digital business cards I can create?
            </AccordionHeader>
            <AccordionBody className='text-lg'>
                No limits! You can create multiple XclusiveTouch digital business cards for different purposes
                or individuals. Whether its for personal or professional use, each card can be uniquely
                tailored to your needs.
            </AccordionBody>
        </Accordion>

        <Accordion open={open === 5}>
            <AccordionHeader onClick={() => handleOpen(5)}>
                How secure is the information on my XclusiveTouch digital business card?
            </AccordionHeader>
            <AccordionBody className='text-lg'>
                We prioritize the security of your information. Your data is encrypted, and we follow best practices
                to ensure the confidentiality and integrity of your XclusiveTouch digital business card details.
            </AccordionBody>
        </Accordion>

        <Accordion open={open === 6}>
            <AccordionHeader onClick={() => handleOpen(6)}>
                Can I track who views my XclusiveTouch digital business card?
            </AccordionHeader>
            <AccordionBody className='text-lg'>
                Yes, our platform provides analytics to track views and interactions with your digital business
                card. Gain insights into who is interested in your profile and tailor your networking efforts
                accordingly.
            </AccordionBody>
        </Accordion>
      </div>
    </div>
    )
}

export default FAQ