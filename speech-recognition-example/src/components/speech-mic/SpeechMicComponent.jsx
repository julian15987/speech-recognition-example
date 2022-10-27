import React, {useEffect} from 'react'

import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechMicComponent = ({handleChangeCommand, handleChangeTranslate}) => {

    const supporstGeoLocation = navigator.geolocation;

    const commands = [
      {
        command: "qué hora es",
        callback: () => {
          const currentDate = new Date();
          handleChangeCommand(`Comando recibido - Accion: La hora es: ${currentDate.toISOString()}`);
        },
      },
      {
        command: [
          "tocar botón *",
        ],
        callback: (button) => handleChangeCommand(`Comando recibido - Accion: Haciendo clic en boton "${button}"`),
      },
      {
        command: [
          "cerrar ventana *",
        ],
        callback: (window) => handleChangeCommand(`Comando recibido - Accion: Cerrando ventana "${window}"`),
      },  
    ];
  
    if (supporstGeoLocation) {
      commands.push({
        command: "Donde estoy",
        callback: () => {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            handleChangeCommand(`Latitud: ${latitude}, Longitud: ${longitude}`);
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

    useEffect(() => {
        handleChangeTranslate(transcript);
    }, [transcript])
  
    const startListening = () => {
      resetTranscript();
      handleChangeTranslate();
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
      <>
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

      </>
    );
}

export default SpeechMicComponent;
