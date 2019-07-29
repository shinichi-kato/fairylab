import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import EditPreference from './edit-preference.jsx';
import ChatViewer from './chat-viewer.jsx';


export default function Dashboard(props){
  const [mode, setMode] = useState('Chat');
  const userAvatar = localStorage.getItem('userAvatar');
  const userName  = localStorage.getItem('userName');
  const botId = localStorage.getItem('botId');
  const botName = localStorage.getItem('botName');
  const botAvatar  = localStorage.getItem('botAvatar');


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
            handleExit= {props.handleExit}
            handleSetMode = {(m) => setMode(m) }
          />
        </Box>

        <Box order={0} flexGrow={1}>
          { mode === "Chat" &&
            <ChatViewer />
          }
          { mode === "EditPreference" &&
            <EditPreference />
          }
        </Box>

        { mode === "Chat" &&
          <Box order={0}>
          input
          </Box>
        }

      </Box>
  );
}
