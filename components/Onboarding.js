import React from "react";
import Button from "@material-tailwind/react/components/Button"
import toast, { Toaster } from "react-hot-toast";
import Step1 from "./onboardingSteps/Step1";
import { useState } from "react";
import Step2 from "./onboardingSteps/Step2";
import Step3 from "./onboardingSteps/Step3";
import Step4 from "./onboardingSteps/Step4";
import { ArrowBack, ArrowForward } from "@mui/icons-material";


const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [showErrors, setShowErrors] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        companyAddress: '',
        occupation: '',
        company: '',
        about: '',
        headerColour: '#000000',
        cardColour: '#000000',
        photo: null,
        socialMedia: [{ platform: '', link: '' }]
    });

    const isValidURL = (url) => {
        try {
            // Add default protocol if missing
            if (!/^https?:\/\//i.test(url)) {
                url = 'http://' + url;
            }
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.firstName || !formData.lastName || !formData.company || !formData.occupation) {
                setShowErrors(true);
                toast.error('Please fill in all required fields');
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.headerColour || !formData.cardColour || !formData.about || !formData.photo) {
                setShowErrors(true);
                toast.error(formData.about)

                toast.error('Please fill in all required fields');
                return;
            }
        } else if (currentStep === 3) {
            if (formData.socialMedia.some(social => social.link && !isValidURL(social.link))) {
                setShowErrors(true);
                toast.error('Please provide a valid URL for social media links');
                return;
            }
        } else if (currentStep === 4) {
            if (!formData.phone || !formData.email) {
                setShowErrors(true);
                toast.error('Please fill in all required fields');
                return;
            }
        }
        setShowErrors(false);
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handlePlatformChange = (index, event) => {
        const newSocialMedia = [...formData.socialMedia];
        newSocialMedia[index].platform = event.target.value;
        setFormData({
            ...formData,
            socialMedia: newSocialMedia
        });
    };

    const handleLinkChange = (index, event) => {
        const newSocialMedia = [...formData.socialMedia];
        newSocialMedia[index].link = event.target.value;
        setFormData({
            ...formData,
            socialMedia: newSocialMedia
        });
    };

    const handleAddSocialMedia = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            socialMedia: [...prevFormData.socialMedia, { platform: '', link: '' }]
        }));
    };

    const handleRemoveSocialMedia = (index) => {
        const newSocialMedia = [...formData.socialMedia];
        newSocialMedia.splice(index, 1);
        setFormData({
            ...formData,
            socialMedia: newSocialMedia
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = new FormData();

        form.append('firstName', formData.firstName);
        form.append('lastName', formData.lastName);
        form.append('phoneNumber', formData.phone);
        form.append('email', formData.email);
        form.append('companyAddress', formData.companyAddress);
        form.append('position', formData.occupation);
        form.append('company', formData.company);
        form.append('about', formData.about);
        form.append('primaryColour', formData.headerColour);
        form.append('cardColour', formData.cardColour);
        form.append('profilePhoto', formData.photo);
        form.append('socialMedia', JSON.stringify(formData.socialMedia));


        const response = await fetch('https://api.xclusivetouch.ca/api/profile', {
            method: 'POST',
            body: form,
        });

        const data = await response.json();

        console.log(data.data._id, 'DATA');

        if (!data.error) {
            toast.success('Profile created successfully!');
            window.location.reload();
            //window.location.href = `/profile/${data._id}`;
        } else {
            toast.error('Profile creation failed: ' + data.error);
        }
    }

    return (
        <>
            <Toaster/>
            {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} showErrors={showErrors} />}
            {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} showErrors={showErrors} />}
            {currentStep === 3 && <Step3 formData={formData} setFormData={setFormData} handlePlatformChange={handlePlatformChange} handleLinkChange={handleLinkChange} handleAddSocialMedia={handleAddSocialMedia} handleRemoveSocialMedia={handleRemoveSocialMedia} showErrors={showErrors} />}
            {currentStep === 4 && <Step4 formData={formData} handleChange={handleChange} showErrors={showErrors} />}

            <div className='flex justify-between items-center mt-4 px-4 sm:px-0'>
                {currentStep > 1 && (
                    <Button
                        onClick={handlePrev}
                        className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold-600 w-full sm:w-auto"
                    >
                        Preview <ArrowBack className="mr-2" style={{ marginTop: '-2px' }} />
                    </Button>
                )}
                <div className="flex items-center mx-4">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`w-3 h-3 rounded-full mx-1 ${currentStep === step ? 'bg-gold' : 'bg-gray-300'}`}
                        ></div>
                    ))}
                </div>
                {currentStep < 4 && (
                    <Button
                        onClick={handleNext}
                        className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold-600 w-full sm:w-auto"
                    >
                        Next <ArrowForward className="ml-2" style={{ marginTop: '-2px' }} />
                    </Button>
                )}
                {currentStep === 4 && (
                    <Button
                        onClick={handleSubmit}
                        className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold-600 w-full sm:w-auto"
                    >
                        Submit
                    </Button>
                )}
            </div>
        </>
    )
}

export default MultiStepForm