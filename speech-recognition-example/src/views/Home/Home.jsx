import React, { useState } from 'react'
import SpeechMicComponent from '../../components/speech-mic/SpeechMicComponent'
import MessageComponent from '../../components/message/MessageComponent'

const Home = () => {

    const [message, setMessage] = useState('')

    const handleChangeMessage = (text) => {
        setMessage(text)
    }

    return (
        <>
            <SpeechMicComponent handleChangeMessage={handleChangeMessage} />
            <MessageComponent message={message}  />
        </>
    )
}

export default Home;
