import React from 'react';
import PropTypes from 'prop-types';

// Mui Imports 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Delete, DragIndicator } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Step3 = ({ formData, setFormData, handlePlatformChange, handleLinkChange, handleAddSocialMedia, handleRemoveSocialMedia, showErrors }) => {
    const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Youtube', 'Twitch', 'Other'];

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
        <div className="max-w-lg mx-auto p-6 bg-white">
            <h2 className="text-4xl font-semibold mb-6 text-start">Step 3<span className='text-gold'>.</span> <br/> Social Media</h2>
            
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="socialMediaList">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {formData.socialMedia.map((social, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="mb-4"
                                        >
                                            <CardContent className="flex items-center space-x-4">
                                                {formData.socialMedia.length > 1 && (
                                                    <IconButton {...provided.dragHandleProps} className="mr-2">
                                                        <DragIndicator />
                                                    </IconButton>
                                                )}
                                                <FormControl className="mr-2" style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                                                    <Select
                                                        value={social.platform}
                                                        onChange={(e) => handlePlatformChange(index, e)}
                                                        className={`w-full ${showErrors && !social.platform ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                                                        style={{ height: '40px' }} // Decrease height
                                                    >
                                                        {socialMediaOptions.map((option) => (
                                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    value={social.link}
                                                    onChange={(e) => handleLinkChange(index, e)}
                                                    placeholder="Enter URL"
                                                    fullWidth
                                                    variant="outlined"
                                                    className={`w-full ${showErrors && !social.link ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gold`}
                                                    InputProps={{ style: { height: '40px' } }} // Decrease height
                                                    style={{ flex: 6 }}
                                                />
                                                {formData.socialMedia.length > 1 && (
                                                    <IconButton onClick={() => handleRemoveSocialMedia(index)} className="ml-2" style={{ flex: 1 }}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </CardContent>
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button onClick={handleAddSocialMedia} className="text-gold px-4 py-2 rounded-md hover:bg-gold-600">
                Add Social Media
            </Button>
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
        )
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    handlePlatformChange: PropTypes.func.isRequired,
    handleLinkChange: PropTypes.func.isRequired,
    handleAddSocialMedia: PropTypes.func.isRequired,
    handleRemoveSocialMedia: PropTypes.func.isRequired,
    showErrors: PropTypes.bool.isRequired
};

export default Step3;