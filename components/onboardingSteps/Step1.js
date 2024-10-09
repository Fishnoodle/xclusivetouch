import React, { useState } from 'react';

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
        <div className="max-w-lg mx-auto p-6 bg-white">
            <h2 className="text-4xl font-semibold mb-6 text-start">Step 1<span className='text-gold'>.</span> <br/> Tell Us About Yourself</h2>
            <div className="mb-4">
                <label className={`block font-bold mb-2 ${isFocused.firstName ? 'text-gold' : isFieldInvalid('firstName') ? 'text-red-500' : 'text-gray-700'}`}>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('firstName')}
                    onBlur={() => handleBlur('firstName')}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('firstName') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('firstName') && <p className="text-red-500 text-sm mt-1">First Name is required</p>}
            </div>

            <div className="mb-4">
                <label className={`block font-bold mb-2 ${isFocused.lastName ? 'text-gold' : isFieldInvalid('lastName') ? 'text-red-500' : 'text-gray-700'}`}>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('lastName')}
                    onBlur={() => handleBlur('lastName')}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('lastName') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('lastName') && <p className="text-red-500 text-sm mt-1">Last Name is required</p>}
            </div>

            <div className="mb-4">
                <label className={`block font-bold mb-2 ${isFocused.company ? 'text-gold' : isFieldInvalid('company') ? 'text-red-500' : 'text-gray-700'}`}>Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => handleFocus('company')}
                    onBlur={() => handleBlur('company')}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('company') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('company') && <p className="text-red-500 text-sm mt-1">Company is required</p>}
            </div>

            <div className="mb-4">
                <label className={`block font-bold mb-2 ${isFocused.occupation ? 'text-gold' : isFieldInvalid('occupation') ? 'text-red-500' : 'text-gray-700'}`}>Occupation</label>
                <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    onFocus={() => handleFocus('occupation')}
                    onBlur={() => handleBlur('occupation')}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('occupation') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('occupation') && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
            </div>

            <div className="mb-4">
                <label className={`block font-bold mb-2 ${isFocused.companyAddress ? 'text-gold' : 'text-gray-700'}`}>Company Address - Optional</label>
                <input
                    type="text"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    onFocus={() => handleFocus('companyAddress')}
                    onBlur={() => handleBlur('companyAddress')}
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-gold"
                />
            </div>
        </div>
    );
};

export default Step1;