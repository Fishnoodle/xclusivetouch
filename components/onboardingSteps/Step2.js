import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { HiOutlinePhotograph, HiOutlineColorSwatch, HiOutlineDocument, HiOutlineUpload, HiOutlineUser } from 'react-icons/hi';
import Image from 'next/image';

const Step2 = ({ formData, handleChange, handleFileChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        headerColour: false,
        cardColour: false,
        about: false,
        photo: false,
    });
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(formData.photo ? URL.createObjectURL(formData.photo) : null);

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const isFieldInvalid = (field) => showErrors && !formData[field];

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // If there was a previous preview URL, revoke it to prevent memory leaks
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
            
            // Create a new preview URL
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            handleFileChange(e);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="bg-gradient-to-r from-[#0A1822] to-[#071013] rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Customize Your Profile</h2>
            <p className="text-gray-400 mb-8">Choose your colors and add your profile photo</p>
            
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.headerColour ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                            <HiOutlineColorSwatch className="w-4 h-4 mr-2" />
                            Primary Color
                        </label>
                        <div className="flex items-center space-x-3">
                            <input
                                type="color"
                                name="headerColour"
                                value={formData.headerColour}
                                onChange={handleChange}
                                onFocus={() => handleFocus('headerColour')}
                                onBlur={() => handleBlur('headerColour')}
                                className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent"
                            />
                            <div className="flex-1 px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white overflow-hidden">
                                {formData.headerColour}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.cardColour ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                            <HiOutlineColorSwatch className="w-4 h-4 mr-2" />
                            Card Background
                        </label>
                        <select
                            name="cardColour"
                            value={formData.cardColour}
                            onChange={handleChange}
                            onFocus={() => handleFocus('cardColour')}
                            onBlur={() => handleBlur('cardColour')}
                            className={`w-full px-4 py-3 bg-black/30 border ${isFocused.cardColour ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors appearance-none`}
                            style={{ 
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4AF37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 1rem center',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '3rem'
                            }}
                        >
                            <option value="#000000">Black</option>
                            <option value="#FFFFFF">White</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-2 ${isFocused.about ? 'text-[#D4AF37]' : isFieldInvalid('about') ? 'text-red-500' : 'text-gray-300'}`}>
                        <HiOutlineDocument className="w-4 h-4 mr-2" />
                        About You
                    </label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        onFocus={() => handleFocus('about')}
                        onBlur={() => handleBlur('about')}
                        rows="4"
                        placeholder="Write a brief professional bio"
                        className={`w-full px-4 py-3 bg-black/30 border ${isFieldInvalid('about') ? 'border-red-500' : isFocused.about ? 'border-[#D4AF37]' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                    ></textarea>
                    {isFieldInvalid('about') && <p className="text-red-500 text-xs mt-1">Please provide a brief description about yourself</p>}
                </div>

                <div className="form-group">
                    <label className={`flex items-center text-sm font-medium mb-3 ${isFocused.photo ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                        <HiOutlinePhotograph className="w-4 h-4 mr-2" />
                        Profile Photo <span className="text-gray-500 ml-1 text-xs">(Optional)</span>
                    </label>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-black/30 rounded-full overflow-hidden border-2 border-gray-700 flex items-center justify-center">
                            {previewImage ? (
                                <Image 
                                    src={previewImage} 
                                    alt="Profile preview" 
                                    width={128} 
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <HiOutlineUser className="w-16 h-16 text-gray-500" />
                            )}
                        </div>
                        
                        <div className="flex-1">
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white hover:border-[#D4AF37] transition-colors flex items-center justify-center gap-2"
                            >
                                <HiOutlineUpload className="w-5 h-5 text-[#D4AF37]" />
                                <span>{formData.photo ? 'Change Photo' : 'Upload Photo'}</span>
                            </button>
                            <p className="text-gray-500 text-xs mt-2">
                                Recommended: Square image, at least 400x400px. Max size: 5MB
                            </p>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="photo"
                                onChange={handlePhotoChange}
                                onFocus={() => handleFocus('photo')}
                                onBlur={() => handleBlur('photo')}
                                accept="image/jpeg, image/png, image/gif, image/webp"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Step2.propTypes = {
    formData: PropTypes.shape({
        headerColour: PropTypes.string,
        cardColour: PropTypes.string,
        about: PropTypes.string,
        photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired,
};

export default Step2;