import React, { useEffect, useState } from 'react';
import ApplicationBar from './application-bar.jsx';
import StatusView from './status-view.jsx';
import AvatarSelector from './avatar-selector.jsx';
import NameInput from './name-input.jsx';
import BotDownload from './bot-download.jsx';
import IconsPanel from './icons-panel.jsx';
import classes from './dashboard.css';



export default function Dashboard(props){
  const [mode, setMode] = useState('StatusView');
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [botId, setBotId] = useState(localStorage.getItem('botId') || '');
  const [botName, setBotName] = useState(localStorage.getItem('botName') || '');
  const [botAvatar, setBotAvatar] = useState(localStorage.getItem('botAvatar') || '');

  useEffect(() => {
    // DidMount / DidUpdate
    if(userAvatar == ''){ setMode('AvatarSelect'); }

  });

  return(
    <div className={classes.flexContainer}>
      <div className={classes.topMenu}>
      <ApplicationBar
        handleDoSettings= {()=>setMode('AvatarSelect')}
      />
      </div>
      <div className={classes.inputPanel}>
        { mode == 'StatusView' &&
          <StatusView

            />
        }
        { mode == 'AvatarSelect' &&
          <AvatarSelector
            handleChangeUserAvatar={setUserAvatar}
            handleNext = {() => setMode('UserNameInput')}  />
        }
        { mode == 'UserNameInput' &&
          <NameInput
            label="Your Name"
            name={userName}
            handleChangeName={setUserName}
            handleNext = {() => setMode('BotDownload')} />
        }
        { mode == 'BotDownload' &&
          <BotDownload
            botId={botId}
            handleNext = {() => setMode('BotNameInput')} />
        }
        { mode == 'BotNameInput' &&
          <NameInput
            label="Fairy Name"
            name={botName}
            handleChangeName={setBotName}
            handleNext = {() => setMode('StatusView')} />
        }
      </div>
      <div className={classes.iconsPanel}>
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          botName={botName}
          botAvatar={botAvatar} />
      </div>
      <div className={classes.navigation}></div>
    </div>
  )
}
