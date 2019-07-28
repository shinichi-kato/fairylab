import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import StatusView from './status-view.jsx';
import AvatarSelector from './avatar-selector.jsx';
import NameInput from './name-input.jsx';
import BotDownload from './bot-download.jsx';
import IconsPanel from './icons-panel.jsx';
import Navigation from './navigation.jsx';



export default function Dashboard(props){
  const [mode, setMode] = useState('Ready');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [botId, setBotId] = useState(localStorage.getItem('botId') || '');
  const [botName, setBotName] = useState(localStorage.getItem('botName') || '');
  const [botAvatar, setBotAvatar] = useState(localStorage.getItem('botAvatar') || '');

  // const estate = localStorage.getItem('bot.estate') || ''

  useEffect(() => {
    // DidMount / DidUpdate
    if(userAvatar === ''){ setMode('AvatarSelect'); }

  });

  function handleSetUserName(name){
    localStorage.setItem('userName',name);
    setUserName(name);
  }

  function handleSetUserAvatar(avatar) {
    localStorage.setItem('userAvatar',avatar);
    setUserAvatar(avatar);
  }

  function handleSetBotId(botId){
    localStorage.setItem('botId',botId);
    setBotId(botId);
  }

  function handleSetBotAvatar(avatar){
    localStorage.setItem('botAvatar',avatar);
    setBotAvatar(avatar);
  }
  function handleSetBotName(name){
    localStorage.setItem('botName',name);
    setBotName(name);
  }

  function handleCancel(){
    setMode('Ready');
  }

  return(
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">
      <Box order={0}>
        <ApplicationBar
          handleDoSettings= {()=>setMode('AvatarSelect')}
        />
      </Box>
      <Box order={0}>
        { mode === 'Ready' &&
          <StatusView

            />
        }
        { mode === 'AvatarSelect' &&
          <AvatarSelector
            handleSetUserAvatar={handleSetUserAvatar}
            handleCancel={() => setMode('Ready')}
            handleNext = {() => setMode('UserNameInput')}  />
        }
        { mode === 'UserNameInput' &&
          <NameInput
            label="Your Name"
            name={userName}
            handleChangeName={handleSetUserName}
            handleCancel={handleCancel}
            handleNext = {() => setMode('BotDownload')} />
        }
        { mode === 'BotDownload' &&
          <BotDownload
            botId={botId}
            handleSetBotId = {handleSetBotId}
            handleSetBotAvatar = {handleSetBotAvatar}
            handleNext = {() => setMode('BotNameInput')} />
        }
        { mode === 'BotNameInput' &&
          <NameInput
            label="Fairy Name"
            name={botName}
            handleChangeName={handleSetBotName}
            handleCancel={handleCancel}
            handleNext = {() => setMode('Ready')} />
        }
      </Box>
      <Box order={0} flexGrow={1}>
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          botName={botName}
          botAvatar={botAvatar} />
      </Box>
      <Box order={0} >
        { mode === 'Ready' &&
          userAvatar !== '' && userName !== '' && botId !== '' && botName!== '' &&
          <Navigation
            handleToHome={props.handleToHome}
            handleToHub={props.handleToHub}
            />
        }
      </Box>
    </Box>
    );

}
