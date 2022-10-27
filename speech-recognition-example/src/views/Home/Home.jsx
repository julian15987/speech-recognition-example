import React, { useState } from 'react'
import SpeechMicComponent from '../../components/speech-mic/SpeechMicComponent'
import MessageComponent from '../../components/message/MessageComponent'

const Home = () => {
    const [command, setCommand] = useState('')
    const [translate, setTranslate] = useState('')

    const handleChangeCommand = (text) => {
        setCommand(command + '\n' + text)
    }

    const handleChangeTranslate = (text) => {
        setTranslate(text) 
    }

    return (
        <>
            <SpeechMicComponent handleChangeCommand={handleChangeCommand} handleChangeTranslate={handleChangeTranslate}/>
            <div className={'container_message'}> </div>
            <h2>Lectura</h2>
            <MessageComponent message={translate}  />
            <hr />
            <h2>Comandos</h2>
            <MessageComponent message={command}  />
        </>
    )
}

export default Home;
