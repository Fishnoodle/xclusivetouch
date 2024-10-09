import React, { useState } from 'react';

const Step4 = ({ formData, handleChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        phone: false,
        email: false
    })

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const isFieldInvalid = (field) => showErrors && !formData[field];

    return(
        <div className="max-w-lg mx-auto p-6 bg-white">
            <h2 className="text-4xl font-semibold mb-6 text-start">Step 4<span className='text-gold'>.</span> <br/> Contact Information</h2>
            <div className='mb-4'>
                <label className={`block font-bold mb-2 ${isFocused.phone ? 'text-gold' : isFieldInvalid('phone') ? 'text-red-500' : 'text-gray-700'}`}>Phone</label>
                <input
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={() => handleBlur('phone')}
                className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('phone') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                inputMode="numeric" // Opens number pad on mobile
                pattern="\(\d{3}\) \d{3}-\d{4}" // Ensures the format (xxx) xxx-xxxx
                maxLength="14" // Maximum length for the formatted phone number
                placeholder="(___) ___-____" // Placeholder for the input field
            />
            {isFieldInvalid('phone') && <p className="text-red-500 text-sm mt-1">Phone is required</p>}
            </div>

            <div className='mb-4'>
                <label className={`block font-bold mb-2 ${isFocused.email ? 'text-gold' : isFieldInvalid('email') ? 'text-red-500' : 'text-gray-700'}`}>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('email') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('email') && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>
        </div>
    );
};

export default Step4;