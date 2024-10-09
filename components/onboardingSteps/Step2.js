import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, TextField, Typography } from '@mui/material';

const Step2 = ({ formData, handleChange, handleFileChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        headerColour: false,
        cardColour: false,
        about: false,
        photo: false,
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
            <h2 className="text-4xl font-semibold mb-6 text-start">Step 2<span className='text-gold'>.</span> <br/> Customize Your Profile</h2>
            
            <div className="mb-4">
                <Typography variant="body1" className={`block font-bold mb-2 ${isFocused.headerColour ? 'text-gold' : isFieldInvalid('headerColour') ? 'text-red-500' : 'text-gray-700'}`}>
                    Header Colour
                </Typography>
                <TextField
                    type="color"
                    name="headerColour"
                    value={formData.headerColour}
                    onChange={handleChange}
                    onFocus={() => handleFocus('headerColour')}
                    onBlur={() => handleBlur('headerColour')}
                    fullWidth
                    variant="outlined"
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('headerColour') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('headerColour') && <p className="text-red-500 text-sm mt-1">Header Colour is required</p>}
            </div>

            <div className="mb-4">
                <FormControl fullWidth>
                    <Typography
                        variant="body2"
                        className={`mt-1 font-bold ${isFocused.cardColour ? 'text-gold' : isFieldInvalid('cardColour') ? 'text-red-500' : 'text-gray-700'}`}
                    >
                        Card Colour
                    </Typography>
                    <Select
                        name="cardColour"
                        value={formData.cardColour}
                        onChange={handleChange}
                        onFocus={() => handleFocus('cardColour')}
                        onBlur={() => handleBlur('cardColour')}
                        className={`w-full ${isFieldInvalid('cardColour') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                    >
                        <MenuItem value="">Select Card Colour</MenuItem>
                        <MenuItem value="#000000">Black</MenuItem>
                        <MenuItem value="#FFFFFF">White</MenuItem>
                    </Select>
                </FormControl>
                {isFieldInvalid('cardColour') && <p className="text-red-500 text-sm mt-1">Card Colour is required</p>}
            </div>

            <div className="mb-4">
                <Typography variant="body1" className={`block font-bold mb-2 ${isFocused.about ? 'text-gold' : isFieldInvalid('about') ? 'text-red-500' : 'text-gray-700'}`}>
                    About
                </Typography>
                <TextField
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    onFocus={() => handleFocus('about')}
                    onBlur={() => handleBlur('about')}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('about') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('about') && <p className="text-red-500 text-sm mt-1">about is required</p>}
            </div>

            <div className="mb-4">
                <Typography variant="body2" className={`block font-bold mb-2 ${isFocused.photo ? 'text-gold' : isFieldInvalid('photo') ? 'text-red-500' : 'text-gray-700'}`}>
                    Photo
                </Typography>
                <TextField
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    onFocus={() => handleFocus('photo')}
                    onBlur={() => handleBlur('photo')}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    className={`w-full px-3 py-2 border-b-2 ${isFieldInvalid('photo') ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                />
                {isFieldInvalid('photo') && <p className="text-red-500 text-sm mt-1">Photo is required</p>}
            </div>
        </div>
    );
};

export default Step2;