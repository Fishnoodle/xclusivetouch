import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlinePhone, HiOutlineMail, HiOutlineShieldCheck, HiOutlineInformationCircle } from 'react-icons/hi';

const Step4 = ({ formData, handleChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        phone: false,
        email: false
    });

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const isFieldInvalid = (field) => showErrors && !formData[field];

    // Format phone number as user types
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = value.length > 3 ? `(${value.slice(0, 3)})` : `(${value}`;
            
            if (value.length > 3) {
                formattedValue += ` ${value.slice(3, 6)}`;
            }
            
            if (value.length > 6) {
                formattedValue += `-${value.slice(6, 10)}`;
            }
        }
        
        const event = {
            target: {
                name: 'phone',
                value: formattedValue
            }
        };
        
        handleChange(event);
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Contact Information</h2>
                <p className="text-gray-400">How people can reach you directly</p>
            </div>
            
            {/* Email Warning Banner */}
            <div className="mb-6 p-4 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-lg">
                <div className="flex items-start gap-3">
                    <HiOutlineInformationCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-white text-sm font-medium mb-1">Important: Use Your Login Email</h3>
                        <p className="text-gray-300 text-sm">
                            For security reasons, please ensure you use the same email address that you used to login. 
                            This helps us verify your identity and protect your digital business card.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-8">
                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.phone ? 'text-[#D4AF37]' : isFieldInvalid('phone') ? 'text-red-500' : 'text-gray-300'}`}>
                        <HiOutlinePhone className="w-4 h-4 mr-2" />
                        Phone Number
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                            placeholder="(123) 456-7890"
                            className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('phone') ? 'border-red-500' : isFocused.phone ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                        />
                    </div>
                    {isFieldInvalid('phone') && <p className="text-red-500 text-xs mt-1">Phone number is required</p>}
                </div>

                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.email ? 'text-[#D4AF37]' : isFieldInvalid('email') ? 'text-red-500' : 'text-gray-300'}`}>
                        <HiOutlineMail className="w-4 h-4 mr-2" />
                        Email Address <span className="text-[#D4AF37] ml-1 text-xs">(Same as login email)</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('email') ? 'border-red-500' : isFocused.email ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                    />
                    {isFieldInvalid('email') && <p className="text-red-500 text-xs mt-1">Email address is required</p>}
                </div>
                
                <div className="p-4 md:p-5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg">
                    <div className="flex gap-3">
                        <HiOutlineShieldCheck className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-white text-sm font-medium mb-1">Your information is protected</h3>
                            <p className="text-gray-400 text-sm">
                                Your contact details will only be shared when someone scans your XclusiveTouch card.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Step4.propTypes = {
    formData: PropTypes.shape({
        phone: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired
};

export default Step4;