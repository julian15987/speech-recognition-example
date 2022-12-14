import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

const MessageComponent = ({ message }) => {
    return (
        <>
            <TextareaAutosize
                placeholder="..."
                style={{ width: 800, height: 300 }}
                defaultValue={message}
            />
            
        </>
    )
}

export default MessageComponent;
