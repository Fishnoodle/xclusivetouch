import React from 'react';
import { 
    HiOutlineLink, 
    HiOutlinePlusCircle, 
    HiOutlineTrash,
    HiOutlineGlobe 
} from 'react-icons/hi';
import { 
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaYoutube
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Step3 = ({ formData, setFormData, handlePlatformChange, handleLinkChange, handleAddSocialMedia, handleRemoveSocialMedia, showErrors }) => {
    const socialMediaOptions = [
        { value: 'Facebook', icon: <FaFacebook className="w-5 h-5 text-[#1877F2]" /> },
        { value: 'Instagram', icon: <FaInstagram className="w-5 h-5 text-[#E1306C]" /> },
        { value: 'Twitter', icon: <FaTwitter className="w-5 h-5 text-[#1DA1F2]" /> },
        { value: 'LinkedIn', icon: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" /> },
        { value: 'YouTube', icon: <FaYoutube className="w-5 h-5 text-[#FF0000]" /> },
        { value: 'Other', icon: <HiOutlineGlobe className="w-5 h-5 text-[#D4AF37]" /> }
    ];

    const getPlatformIcon = (platform) => {
        const option = socialMediaOptions.find(opt => opt.value === platform);
        return option ? option.icon : <HiOutlineGlobe className="w-5 h-5 text-[#D4AF37]" />;
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(formData.socialMedia);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormData({
            ...formData,
            socialMedia: items
        });
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Social Media Links</h2>
                <p className="text-gray-400">Add your social media accounts to your digital card</p>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="socialMediaList">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 mb-6">
                            {formData.socialMedia.map((social, index) => (
                                <Draggable key={index} draggableId={`social-${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`p-4 rounded-lg border ${snapshot.isDragging ? 'border-[#D4AF37] bg-black/50' : 'border-gray-700 bg-black/30'} transition-colors`}
                                        >
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="w-full md:w-1/3">
                                                    <select
                                                        value={social.platform}
                                                        onChange={(e) => handlePlatformChange(index, e)}
                                                        className={`w-full px-4 py-3 bg-black/30 border ${showErrors && social.link && !social.platform ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors appearance-none`}
                                                        style={{ 
                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4AF37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'right 1rem center',
                                                            backgroundSize: '1.5em 1.5em',
                                                            paddingRight: '3rem'
                                                        }}
                                                    >
                                                        <option value="">Select Platform</option>
                                                        {socialMediaOptions.map(option => (
                                                            <option key={option.value} value={option.value}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                                <div className="flex-1 relative">
                                                    {social.platform && (
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                            {getPlatformIcon(social.platform)}
                                                        </div>
                                                    )}
                                                    <input
                                                        type="text"
                                                        value={social.link}
                                                        onChange={(e) => handleLinkChange(index, e)}
                                                        placeholder={social.platform ? `Enter your ${social.platform} URL` : "Enter social media URL"}
                                                        className={`w-full px-4 py-3 ${social.platform ? 'pl-11' : 'pl-4'} bg-black/30 border ${showErrors && social.platform && !social.link ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors`}
                                                    />
                                                </div>
                                                
                                                {formData.socialMedia.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSocialMedia(index)}
                                                        className="p-3 bg-black/30 border border-gray-700 rounded-lg text-red-400 hover:text-red-500 hover:border-red-500 transition-colors"
                                                    >
                                                        <HiOutlineTrash className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            
            <button
                type="button"
                onClick={handleAddSocialMedia}
                className="flex items-center gap-2 px-5 py-3 bg-black/30 border border-gray-700 rounded-lg text-[#D4AF37] hover:bg-black/50 hover:border-[#D4AF37] transition-colors"
            >
                <HiOutlinePlusCircle className="w-5 h-5" />
                <span>Add Social Media Link</span>
            </button>
            
            <div className="mt-6 p-4 bg-black/20 border border-gray-800 rounded-lg">
                <div className="flex items-start gap-3">
                    <HiOutlineLink className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                    <div>
                        <p className="text-gray-300 text-sm">Tip: Drag and drop to reorder your social media links.</p>
                        <p className="text-gray-500 text-xs mt-1">The order here will be reflected on your digital business card.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Step3.propTypes = {
    formData: PropTypes.shape({
        socialMedia: PropTypes.arrayOf(
            PropTypes.shape({
                platform: PropTypes.string,
                link: PropTypes.string
            })
        ).isRequired
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    handlePlatformChange: PropTypes.func.isRequired,
    handleLinkChange: PropTypes.func.isRequired,
    handleAddSocialMedia: PropTypes.func.isRequired,
    handleRemoveSocialMedia: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired
};

export default Step3;