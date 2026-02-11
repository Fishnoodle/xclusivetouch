import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HiOutlinePhotograph, HiOutlineColorSwatch, HiOutlineDocument, HiOutlineUpload, HiOutlineUser } from 'react-icons/hi';
import Image from 'next/image';
import Cropper from 'react-easy-crop';

const Step2 = ({ formData, handleChange, handleFileChange, showErrors }) => {
    const [isFocused, setIsFocused] = useState({
        headerColour: false,
        cardColour: false,
        about: false,
        photo: false,
    });
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(formData.photo ? URL.createObjectURL(formData.photo) : null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleFocus = (field) => {
        setIsFocused({ ...isFocused, [field]: true });
    };

    const handleBlur = (field) => {
        setIsFocused({ ...isFocused, [field]: false });
    };

    const isFieldInvalid = (field) => showErrors && !formData[field];

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const newPreview = URL.createObjectURL(file);
            setRawImage(newPreview);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setIsCropOpen(true);
        }
    };

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new window.Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', reject);
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
        });
    };

    const handleCropSave = async () => {
        if (!rawImage || !croppedAreaPixels) {
            setIsCropOpen(false);
            return;
        }

        const croppedBlob = await getCroppedImg(rawImage, croppedAreaPixels);
        if (!croppedBlob) {
            setIsCropOpen(false);
            return;
        }

        const croppedFile = new File([croppedBlob], 'profile-photo.jpg', { type: 'image/jpeg' });

        if (previewImage) {
            URL.revokeObjectURL(previewImage);
        }
        const croppedPreview = URL.createObjectURL(croppedFile);
        setPreviewImage(croppedPreview);

        handleFileChange({
            target: {
                name: 'photo',
                files: [croppedFile]
            }
        });

        if (rawImage) {
            URL.revokeObjectURL(rawImage);
        }
        setRawImage(null);
        setIsCropOpen(false);
    };

    const handleCropCancel = () => {
        if (rawImage) {
            URL.revokeObjectURL(rawImage);
        }
        setRawImage(null);
        setIsCropOpen(false);
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
                            Card Background Color
                        </label>
                        <div className="flex items-center space-x-3">
                            <input
                                type="color"
                                name="cardColour"
                                value={formData.cardColour}
                                onChange={handleChange}
                                onFocus={() => handleFocus('cardColour')}
                                onBlur={() => handleBlur('cardColour')}
                                className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent"
                            />
                            <div className="flex-1 px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white overflow-hidden">
                                {formData.cardColour}
                            </div>
                        </div>
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

            {isCropOpen && rawImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-[#0A1822] w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h3 className="text-white font-semibold">Adjust your photo</h3>
                            <button
                                type="button"
                                onClick={handleCropCancel}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="relative w-full h-80 bg-black">
                            <Cropper
                                image={rawImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm text-gray-300">Zoom</label>
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCropCancel}
                                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCropSave}
                                    className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black hover:bg-[#E5C158] transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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