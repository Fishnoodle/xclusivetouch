import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import toast from "react-hot-toast";
import { 
  HiOutlineUser, 
  HiOutlinePhotograph,
  HiOutlineColorSwatch,
  HiOutlineLink,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineCheck
} from 'react-icons/hi';
import Step1 from "./onboardingSteps/Step1";
import Step2 from "./onboardingSteps/Step2";
import Step3 from "./onboardingSteps/Step3";
import Step4 from "./onboardingSteps/Step4";
import PropTypes from 'prop-types';

const OnboardingForm = ({ userId, prefillData }) => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        headerColour: '#D4AF37',
        cardColour: '#000000',
        photo: null,
        socialMedia: [{ platform: '', link: '' }]
    });

    // Initialize form with prefill data if available
    useEffect(() => {
        if (prefillData) {
            try {
                // Split name into first and last if provided
                let firstName = '';
                let lastName = '';
                
                if (prefillData.name) {
                    const nameParts = prefillData.name.split(' ');
                    firstName = nameParts[0] || '';
                    lastName = nameParts.slice(1).join(' ') || '';
                }
                
                setFormData(prev => ({
                    ...prev,
                    firstName: firstName || prev.firstName,
                    lastName: lastName || prev.lastName,
                    email: prefillData.email || prev.email,
                }));
            } catch (error) {
                console.error('Error setting prefill data:', error);
            }
        }
    }, [prefillData]);

    // Track progress
    const totalSteps = 4;
    const progress = Math.round((currentStep / totalSteps) * 100);

    const isValidURL = (url) => {
        if (!url) return true; // Empty URLs are handled separately
        
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

    const validateStep = (step) => {
        setShowErrors(true);
        
        switch(step) {
            case 1:
                if (!formData.firstName || !formData.firstName.trim()) {
                    toast.error('First name is required');
                    return false;
                }
                if (!formData.lastName || !formData.lastName.trim()) {
                    toast.error('Last name is required');
                    return false;
                }
                if (!formData.company || !formData.company.trim()) {
                    toast.error('Company name is required');
                    return false;
                }
                if (!formData.occupation || !formData.occupation.trim()) {
                    toast.error('Position/Title is required');
                    return false;
                }
                return true;
                
            case 2:
                if (!formData.about || !formData.about.trim()) {
                    toast.error('About section is required');
                    return false;
                }
                return true;
                
            case 3:
                // Check any provided social media entries have both platform and valid URL
                for (const social of formData.socialMedia) {
                    if (social.platform && !social.link) {
                        toast.error(`Please provide a URL for ${social.platform}`);
                        return false;
                    }
                    if (!social.platform && social.link) {
                        toast.error('Please select a platform for all provided URLs');
                        return false;
                    }
                    if (social.link && !isValidURL(social.link)) {
                        toast.error(`Invalid URL format for ${social.platform || 'social media'}`);
                        return false;
                    }
                }
                return true;
                
            case 4: {
                if (!formData.phone || !formData.phone.trim()) {
                    toast.error('Phone number is required');
                    return false;
                }
                if (!formData.email || !formData.email.trim()) {
                    toast.error('Email address is required');
                    return false;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    toast.error('Please enter a valid email address');
                    return false;
                }
                
                // Basic phone validation (at least 10 digits)
                const phoneDigits = formData.phone.replace(/\D/g, '');
                if (phoneDigits.length < 10) {
                    toast.error('Please enter a valid phone number');
                    return false;
                }
                
                return true;
            }
                
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (currentStep === 0) {
            // Welcome screen doesn't need validation
            setCurrentStep(1);
            return;
        }
        
        if (validateStep(currentStep)) {
            setShowErrors(false);
            setCurrentStep(currentStep + 1);
            
            // If this was the last step, submit the form
            if (currentStep === 4) {
                handleSubmit();
            }
            
            // Scroll to top on step change
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handlePrev = () => {
        setCurrentStep(Math.max(0, currentStep - 1));
        setShowErrors(false);
        
        // Scroll to top on step change
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
        if (e.target.files && e.target.files[0]) {
            // Basic file validation
            const file = e.target.files[0];
            
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size exceeds 5MB limit');
                return;
            }
            
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
                return;
            }
            
            setFormData({
                ...formData,
                [e.target.name]: file
            });
        }
    };

    const formatSocialMediaForAPI = (socialMedia) => {
        // Filter out empty entries
        const filteredSocial = socialMedia.filter(
            item => item.platform && item.link
        );
        
        // Transform to the structure the API expects: [{platform: url}]
        return filteredSocial.map(item => {
            return { [item.platform]: item.link };
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setCurrentStep(5); // Show submitting state
        
        try {
            const form = new FormData();

            // Add user details
            form.append('firstName', formData.firstName.trim());
            form.append('lastName', formData.lastName.trim());
            form.append('phoneNumber', formData.phone.trim());
            form.append('email', formData.email.trim());
            form.append('companyAddress', formData.companyAddress.trim());
            form.append('position', formData.occupation.trim());
            form.append('company', formData.company.trim());
            form.append('about', formData.about.trim());
            form.append('primaryColour', formData.headerColour);
            form.append('cardColour', formData.cardColour);
            
            // Add photo if present
            if (formData.photo) {
                form.append('profilePhoto', formData.photo);
            }
            
            // Add social media
            const formattedSocialMedia = formatSocialMediaForAPI(formData.socialMedia);
            form.append('socialMedia', JSON.stringify(formattedSocialMedia));
            
            // Add userId if provided
            if (userId) {
                form.append('userId', userId);
            }

            const response = await fetch('https://api.xclusivetouch.ca/api/profile', {
                method: 'POST',
                body: form,
            });

            const data = await response.json();

            if (!data.error) {
                toast.success('Profile created successfully!');
                // Go to success state
                setCurrentStep(6);
                
                // Redirect after a short delay
                setTimeout(() => {
                    router.push(`/login/${userId}`);
                }, 2500);
            } else {
                toast.error('Profile creation failed: ' + (data.error || 'Unknown error'));
                setIsSubmitting(false);
                setCurrentStep(4); // Go back to last step on error
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An unexpected error occurred. Please try again.');
            setIsSubmitting(false);
            setCurrentStep(4); // Go back to last step on error
        }
    };

    // Render content based on current step
    const renderStepContent = () => {
        switch(currentStep) {
            case 0: // Welcome screen
                return (
                    <div className="bg-gradient-to-r from-[#0A1822] to-[#071013] rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-10 text-center">
                            <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <HiOutlineUser className="w-12 h-12 text-[#D4AF37]" />
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Welcome{formData.firstName ? `, ${formData.firstName}` : ''}!
                            </h1>
                            
                            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
                                Let&apos;s create your digital business card profile. This will only take a few minutes.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
                                <div className="bg-black/30 rounded-xl p-5 text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                                            <HiOutlineUser className="w-5 h-5 text-[#D4AF37]" />
                                        </div>
                                        <h3 className="text-white font-semibold">Personal Info</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">Your name, company, and professional details</p>
                                </div>
                                
                                <div className="bg-black/30 rounded-xl p-5 text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                                            <HiOutlinePhotograph className="w-5 h-5 text-[#D4AF37]" />
                                        </div>
                                        <h3 className="text-white font-semibold">Profile Photo</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">Upload a professional image for your digital card</p>
                                </div>
                                
                                <div className="bg-black/30 rounded-xl p-5 text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                                            <HiOutlineColorSwatch className="w-5 h-5 text-[#D4AF37]" />
                                        </div>
                                        <h3 className="text-white font-semibold">Customize Look</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">Choose colors and design elements for your card</p>
                                </div>
                                
                                <div className="bg-black/30 rounded-xl p-5 text-left">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                                            <HiOutlineLink className="w-5 h-5 text-[#D4AF37]" />
                                        </div>
                                        <h3 className="text-white font-semibold">Social Media</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm">Add your social profiles and contact information</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleNext}
                                className="bg-[#D4AF37] hover:bg-[#C09A20] text-black py-4 px-10 rounded-xl font-medium transition-colors shadow-lg flex items-center justify-center mx-auto gap-2"
                            >
                                <span>Get Started</span>
                                <HiOutlineChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                );
            case 1:
                return <Step1
                    formData={formData}
                    handleChange={handleChange}
                    showErrors={showErrors}
                />;
            case 2:
                return <Step2
                    formData={formData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    showErrors={showErrors}
                />;
            case 3:
                return <Step3
                    formData={formData}
                    setFormData={setFormData}
                    handlePlatformChange={handlePlatformChange}
                    handleLinkChange={handleLinkChange}
                    handleAddSocialMedia={handleAddSocialMedia}
                    handleRemoveSocialMedia={handleRemoveSocialMedia}
                    showErrors={showErrors}
                />;
            case 4:
                return <Step4
                    formData={formData}
                    handleChange={handleChange}
                    showErrors={showErrors}
                />;
            case 5: // Submitting state
                return (
                    <div className="bg-[#0A1822] rounded-2xl shadow-xl p-10 md:p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
                        </div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Creating Your Profile...</h2>
                        <p className="text-gray-400">Please wait while we set up your digital business card.</p>
                    </div>
                );
            case 6: // Success state
                return (
                    <div className="bg-[#0A1822] rounded-2xl shadow-xl p-10 md:p-12 text-center">
                        <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                            <HiOutlineCheck className="w-12 h-12 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Profile Created Successfully!</h2>
                        <p className="text-gray-300 text-lg mb-6">Your digital business card is ready to use.</p>
                        <div className="p-4 bg-black/30 rounded-lg inline-block">
                            <p className="text-gray-400">Redirecting to your dashboard...</p>
                            <div className="w-full bg-gray-700 h-1 mt-2 overflow-hidden rounded-full">
                                <div className="bg-[#D4AF37] h-1 animate-pulse w-full"></div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Something went wrong</div>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-16">
            {/* Enhanced Progress Indicator - only show for steps 1-4 */}
            {currentStep > 0 && currentStep < 5 && (
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mr-3">
                                <span className="text-[#D4AF37] font-bold">{currentStep}</span>
                            </div>
                            <p className="text-white font-medium text-lg">Step {currentStep} of {totalSteps}</p>
                        </div>
                        <div className="bg-black/30 py-1 px-3 rounded-full border border-[#D4AF37]/20">
                            <p className="text-[#D4AF37] font-medium">{progress}% Complete</p>
                        </div>
                    </div>
                    
                    {/* Step indicators */}
                    <div className="flex w-full mb-2">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex-1 flex items-center">
                                <div 
                                    className={`w-full h-1 ${
                                        step < currentStep 
                                            ? 'bg-[#D4AF37]' 
                                            : step === currentStep 
                                                ? 'bg-gradient-to-r from-[#D4AF37] to-gray-700' 
                                                : 'bg-gray-700'
                                    }`}
                                ></div>
                                {step < 4 && (
                                    <div className={`w-4 h-4 rounded-full ${
                                        step < currentStep 
                                            ? 'bg-[#D4AF37]' 
                                            : step === currentStep 
                                                ? 'bg-[#D4AF37]/50' 
                                                : 'bg-gray-700'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Progress bar with animation */}
                    <div className="w-full bg-gray-800/40 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-800">
                        <div 
                            className="bg-gradient-to-r from-[#D4AF37] to-[#E5C156] h-3 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(212,175,55,0.5)]" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    {/* Step labels */}
                    <div className="flex justify-between mt-2 px-1 text-xs text-gray-400">
                        <span className={currentStep >= 1 ? "text-[#D4AF37]" : ""}>Personal</span>
                        <span className={currentStep >= 2 ? "text-[#D4AF37]" : ""}>Profile</span>
                        <span className={currentStep >= 3 ? "text-[#D4AF37]" : ""}>Social</span>
                        <span className={currentStep >= 4 ? "text-[#D4AF37]" : ""}>Contact</span>
                    </div>
                </div>
            )}

            {/* Content container with animation */}
            <div className="transition-all duration-300 ease-in-out">
                {renderStepContent()}
            </div>

            {/* Navigation buttons - only show for steps 1-4 */}
            {currentStep > 0 && currentStep < 5 && (
                <div className="flex justify-between mt-10">
                    <button
                        onClick={handlePrev}
                        className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl transition-colors hover:bg-white/5 flex items-center gap-2"
                    >
                        <HiOutlineChevronLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                    
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className={`px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-medium transition-colors hover:bg-[#C09A20] flex items-center gap-2 ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        <span>{currentStep === 4 ? 'Submit' : 'Continue'}</span>
                        {currentStep < 4 ? (
                            <HiOutlineChevronRight className="w-5 h-5" />
                        ) : (
                            <HiOutlineCheck className="w-5 h-5" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
OnboardingForm.propTypes = {
    userId: PropTypes.string,
    prefillData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default OnboardingForm;