import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import StatusView from './status-view.jsx';
import AvatarSelector from './avatar-selector.jsx';
import NameInput from './name-input.jsx';
import BotDownload from './bot-download.jsx';
import IconsPanel from './icons-panel.jsx';
import Navigation from './navigation.jsx';

if (!localStorage.getItem('botSettings')){
    localStorage.setItem('botSettings',JSON.stringify(
      {
          id: 'noname@flab',
          avatarId: 'blank',
          description: '',
          name: '',
      }
    ))
}

export default function Dashboard(props){
  const [mode, setMode] = useState('Ready');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [botName, setBotName] = useState(localStorage.getItem('botName') || '');
  const [botSettings, setBotSettings] = useState(JSON.parse(localStorage.getItem('botSettings')));

  // const estate = localStorage.getItem('bot.estate') || ''

  useEffect(() => {
    // DidMount / DidUpdate
    if(userAvatar === ''){ setMode('AvatarSelect'); }

  },[userAvatar]);

  function handleSetUserName(name){
    localStorage.setItem('userName',name);
    setUserName(name);
  }

  function handleSetUserAvatar(avatar) {
    localStorage.setItem('userAvatar',avatar);
    setUserAvatar(avatar);
  }

  function handleSetBotSettings(settings){
    localStorage.setItem('botSettings',JSON.stringify(settings));
    setBotSettings(settings);
  }

  function handleSetBotName(name){
    localStorage.setItem('botName',botName);
    setUserAvatar(botName);
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
          firebase={props.firebase}
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
            settings={botSettings}
            handleSetBotSettings = {handleSetBotSettings}
            handleNext = {() => setMode('BotNameInput')} />
        }
        { mode === 'BotNameInput' &&
          <NameInput
            label="Fairy Name"
            name={botSettings.name}
            handleChangeName={handleSetBotName}
            handleCancel={handleCancel}
            handleNext = {() => setMode('Ready')} />
        }
      </Box>
      <Box order={0} flexGrow={1}>
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          botName={botSettings.name}
          botAvatar={botSettings.avatarId} />
      </Box>
      <Box order={0} >
        { mode === 'Ready' &&
          userAvatar !== '' && userName !== '' && botSettings.id !== '' && botSettings.name!== '' &&
          <Navigation
            botAvatar={botSettings.avatarId}
            handleToHome={props.handleToHome}
            handleToHub={props.handleToHub}
            />
        }
      </Box>
    </Box>
    );

}
