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
          published: false,
      }
    ))
}

export default function Dashboard(props){
  const [mode, setMode] = useState('Ready');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || props.account.displayName || '');
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
    const newSettings={...botSettings,name:name};
    localStorage.setItem('botSettings',JSON.stringify(newSettings));
    setBotSettings(newSettings);
  }

  function handleCancel(){ setMode('Ready'); }
  function handleToAvatarSelect(){ setMode('AvatarSelect') }
  function handleToUserNameInput(){ setMode('UserNameInput') }
  function handleToBotDownload(){ setMode('BotDownload') }
  function handleToBotNameInput(){ setMode('BotNameInput') }

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
          account={props.account}
          handleChangeAccount={props.handleChangeAccount}
          handleDoSettings= {handleToAvatarSelect}
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
            handleCancel={handleCancel}
            handleNext = {handleToUserNameInput}  />
        }
        { mode === 'UserNameInput' &&
          <NameInput
            label="Your Name"
            name={userName}
            handleChangeName={handleSetUserName}
            handleCancel={handleCancel}
            handleNext = {handleToBotDownload} />
        }
        { mode === 'BotDownload' &&
          <BotDownload
            firebase = {props.firebase}
            firestoreRef = {props.firestoreRef}
            settings={botSettings}
            account={props.account}
            handleSetBotSettings = {handleSetBotSettings}
            handleNext = {handleToBotNameInput} />
        }
        { mode === 'BotNameInput' &&
          <NameInput
            label="Fairy Name"
            name={botSettings.name}
            handleChangeName={handleSetBotName}
            handleCancel={handleCancel}
            handleNext = {handleCancel} />
        }
      </Box>
      <Box order={0} flexGrow={1}>
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          botSettings={botSettings}
          />
      </Box>
      <Box order={0} >
        { mode === 'Ready' &&
          userAvatar !== '' && userName !== '' && botSettings.id !== '' && botSettings.name!== '' &&
          <Navigation
            account={props.account}
            botAvatar={botSettings.avatarId}
            handleToHome={props.handleToHome}
            handleToHub={props.handleToHub}
            />
        }
      </Box>
    </Box>
    );

}
