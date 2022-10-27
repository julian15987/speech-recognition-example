import React, { useState } from 'react'

import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechMicComponent = () => {

    const [message, setMessage] = useState();
    const supporstGeoLocation = navigator.geolocation;
  
    const commands = [
      {
        command: "qué hora es",
        callback: () => {
          const currentDate = new Date();
          setMessage(`La hora es: ${currentDate.toISOString()}`);
        },
      },
      {
        command: [
          "Voy a almorzar * (por favor)",
          "Voy a cenar * (por favor)",
        ],
        callback: (comida) => setMessage(`Pidiendo ${comida} ...`),
      },  
    ];
  
    if (supporstGeoLocation) {
      commands.push({
        command: "Donde estoy",
        callback: () => {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setMessage(`Latitud: ${latitude}, Longitud: ${longitude}`);
          });
        },
      });
    }
  
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
      commands,
    });
  
    const startListening = () => {
      resetTranscript();
      setMessage();
      SpeechRecognition.startListening({
        // Comandos no funcionan con es-HN
        // language: "es-HN",
        continuous: true,
      });
    };
  
    const stopListening = () => {
      SpeechRecognition.stopListening();
    };
  
    if (!browserSupportsSpeechRecognition) {
      return <div>Broswer is not supported!</div>;
    }
  
    const Icon = listening ? MicIcon : MicOffIcon;
  
    return (
      <div className="App">
        <header className="App-header">
          <Tooltip
            title={
              listening
                ? "Listening..."
                : "Mantener el boton"
            }
          >
            <IconButton
              className="mic-button"
              color="primary"
              aria-label="listen"
              size="large"
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
              onTouchCancel={stopListening}
            >
              <Icon className="mic-icon" />
            </IconButton>
          </Tooltip>
          {transcript && <div>{transcript}</div>}
          {message && <div>{message}</div>}
        </header>
      </div>
    );
}

export default SpeechMicComponent;
