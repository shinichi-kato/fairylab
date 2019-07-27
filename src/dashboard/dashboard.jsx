import React, { useEffect, useState } from 'react';
import ApplicationBar from './application-bar.jsx';
import StatusView from './status-view.jsx';
import AvatarSelector from './avatar-selector.jsx';
import NameInput from './name-input.jsx';
import BotDownload from './bot-download.jsx';
import IconsPanel from './icons-panel.jsx';
import Navigation from './navigation.jsx';
import classes from './dashboard.css';



export default function Dashboard(props){
  const [mode, setMode] = useState('Ready');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [botId, setBotId] = useState(localStorage.getItem('botId') || '');
  const [botName, setBotName] = useState(localStorage.getItem('botName') || '');
  const [botAvatar, setBotAvatar] = useState(localStorage.getItem('botAvatar') || '');

  useEffect(() => {
    // DidMount / DidUpdate
    if(userAvatar == ''){ setMode('AvatarSelect'); }

  });

  function handleSetUserName(name){
    localStorage.setItem('userName',name);
    setUserName(name);
  }

  function handleSetUserAvatar(avatar) {
    localStorage.setItem('userAvatar',avatar);
    setUerAvatar(avatar);
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

  return(
    <div className={classes.flexContainer}>
      <div className={classes.topMenu}>
      <ApplicationBar
        handleDoSettings= {()=>setMode('AvatarSelect')}
      />
      </div>
      <div className={classes.inputPanel}>
        { mode == 'Ready' &&
          <StatusView

            />
        }
        { mode == 'AvatarSelect' &&
          <AvatarSelector
            handleSetUserAvatar={handleSetUserAvatar}
            handleNext = {() => setMode('UserNameInput')}  />
        }
        { mode == 'UserNameInput' &&
          <NameInput
            label="Your Name"
            name={userName}
            handleChangeName={handleSetUserName}
            handleNext = {() => setMode('BotDownload')} />
        }
        { mode == 'BotDownload' &&
          <BotDownload
            botId={botId}
            handleSetBotId = {handleSetBotId}
            handleSetBotAvatar = {handleSetBotAvatar}
            handleNext = {() => setMode('BotNameInput')} />
        }
        { mode == 'BotNameInput' &&
          <NameInput
            label="Fairy Name"
            name={botName}
            handleChangeName={handleSetBotName}
            handleNext = {() => setMode('Ready')} />
        }
      </div>
      <div className={classes.iconsPanel}>
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          botName={botName}
          botAvatar={botAvatar} />
      </div>
      <div className={classes.navigation}>
        { mode == 'Ready' &&
          'userAvatar != '' && userName != '' && botId != '' && botName!= '' &&
          <Navigation />
        }
      </div>
    </div>
  )
}
