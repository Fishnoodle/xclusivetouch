import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FiChevronsDown } from "react-icons/fi";

const FAQ = () => {
    const [open, setOpen] = React.useState(1);
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // Custom icon component for the accordion
    const customAnimation = {
      mount: { scale: 1 },
      unmount: { scale: 0.9 },
    };

    // Custom icon for the accordion
    const customIcon = (id) => (
      <FiChevronsDown 
        className={`${open === id ? "rotate-180" : ""} h-5 w-5 transition-transform duration-300 text-[#D4AF37]`}
      />
    );

    return (
      <div className="container mx-auto py-16 px-6 md:px-8 lg:px-12">
        <div className="mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {[
            {
              id: 1,
              question: "What sets XclusiveTouch digital business cards apart from traditional ones?",
              answer: "XclusiveTouch digital business cards offer a dynamic and interactive way to share your information. Stand out with customizable designs, multimedia content, and real-time updates, making a lasting impression."
            },
            {
              id: 2,
              question: "How do I get started with XclusiveTouch digital business cards?",
              answer: "Getting started is easy! Visit our website, sign up for an account, and begin creating your personalized digital business card. Choose from a variety of templates and customize them to match your style and brand."
            },
            {
              id: 3,
              question: "Can I include my company logo and social media links in my XclusiveTouch digital business card?",
              answer: "Absolutely! Showcase your brand by adding your company logo and links to your social media profiles. XclusiveTouch digital business cards are fully customizable, allowing you to create a professional and cohesive representation of your brand."
            },
            {
              id: 4,
              question: "Is there a limit to the number of XclusiveTouch digital business cards I can create?",
              answer: "No limits! You can create multiple XclusiveTouch digital business cards for different purposes or individuals. Whether it's for personal or professional use, each card can be uniquely tailored to your needs."
            },
            {
              id: 5,
              question: "How secure is the information on my XclusiveTouch digital business card?",
              answer: "We prioritize the security of your information. Your data is encrypted, and we follow best practices to ensure the confidentiality and integrity of your XclusiveTouch digital business card details."
            },
            {
              id: 6,
              question: "Can I track who views my XclusiveTouch digital business card?",
              answer: "Yes, our platform provides analytics to track views and interactions with your digital business card. Gain insights into who is interested in your profile and tailor your networking efforts accordingly."
            }
          ].map((item) => (
            <div key={item.id} className="mb-4">
              <Accordion
                open={open === item.id}
                icon={() => customIcon(item.id)}
                animate={customAnimation}
                className="border border-gray-200 rounded-lg overflow-hidden mb-4 hover:shadow-md transition-shadow duration-300"
              >
                <AccordionHeader 
                  onClick={() => handleOpen(item.id)}
                  className={`border-b-0 transition-colors ${open === item.id ? "text-[#D4AF37]" : "text-gray-900"} hover:text-[#D4AF37] p-5 flex justify-between text-lg font-medium`}
                >
                  {item.question}
                </AccordionHeader>
                <AccordionBody className="text-base text-gray-700 px-5 pb-5 pt-0">
                  {item.answer}
                </AccordionBody>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    );
};

export default FAQ;