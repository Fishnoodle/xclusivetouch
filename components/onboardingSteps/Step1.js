import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineUser, HiOutlineOfficeBuilding, HiOutlineBriefcase, HiOutlineLocationMarker } from 'react-icons/hi';

const Step1 = ({ formData, handleChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        firstName: false,
        lastName: false,
        company: false,
        occupation: false,
        companyAddress: false,
    });

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const isFieldInvalid = (field) => showErrors && !formData[field];

    return (
        <div className="w-full bg-gradient-to-r from-[#0A1822] to-[#071013] rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Personal Information</h2>
            <p className="text-gray-400 mb-8">Tell us about yourself and your professional details</p>
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.firstName ? 'text-[#D4AF37]' : isFieldInvalid('firstName') ? 'text-red-500' : 'text-gray-300'}`}>
                            <HiOutlineUser className="w-4 h-4 mr-2" />
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('firstName')}
                            onBlur={() => handleBlur('firstName')}
                            placeholder="John"
                            className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('firstName') ? 'border-red-500' : isFocused.firstName ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                        />
                        {isFieldInvalid('firstName') && <p className="text-red-500 text-xs mt-1">First name is required</p>}
                    </div>

                    <div className="form-group">
                        <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.lastName ? 'text-[#D4AF37]' : isFieldInvalid('lastName') ? 'text-red-500' : 'text-gray-300'}`}>
                            <HiOutlineUser className="w-4 h-4 mr-2" />
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('lastName')}
                            onBlur={() => handleBlur('lastName')}
                            placeholder="Doe"
                            className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('lastName') ? 'border-red-500' : isFocused.lastName ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                        />
                        {isFieldInvalid('lastName') && <p className="text-red-500 text-xs mt-1">Last name is required</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.company ? 'text-[#D4AF37]' : isFieldInvalid('company') ? 'text-red-500' : 'text-gray-300'}`}>
                        <HiOutlineOfficeBuilding className="w-4 h-4 mr-2" />
                        Company
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onFocus={() => handleFocus('company')}
                        onBlur={() => handleBlur('company')}
                        placeholder="Acme Corporation"
                        className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('company') ? 'border-red-500' : isFocused.company ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                    />
                    {isFieldInvalid('company') && <p className="text-red-500 text-xs mt-1">Company is required</p>}
                </div>

                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.occupation ? 'text-[#D4AF37]' : isFieldInvalid('occupation') ? 'text-red-500' : 'text-gray-300'}`}>
                        <HiOutlineBriefcase className="w-4 h-4 mr-2" />
                        Job Title
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        onFocus={() => handleFocus('occupation')}
                        onBlur={() => handleBlur('occupation')}
                        placeholder="Senior Developer"
                        className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('occupation') ? 'border-red-500' : isFocused.occupation ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                    />
                    {isFieldInvalid('occupation') && <p className="text-red-500 text-xs mt-1">Job title is required</p>}
                </div>

                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.companyAddress ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                        <HiOutlineLocationMarker className="w-4 h-4 mr-2" />
                        Company Address <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        onFocus={() => handleFocus('companyAddress')}
                        onBlur={() => handleBlur('companyAddress')}
                        placeholder="123 Business Ave, Suite 100"
                        className={`w-full px-4 py-3 bg-black/30 border ${isFocused.companyAddress ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                    />
                </div>
            </div>
        </div>
    );
};
Step1.propTypes = {
    formData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        company: PropTypes.string,
        occupation: PropTypes.string,
        companyAddress: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
};

export default Step1;