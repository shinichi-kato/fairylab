import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import ScriptEditor from './script-editor.jsx';
import ChatViewer from './chat-viewer.jsx';


export default function Dashboard(props){
  const [mode, setMode] = useState('Chat');
  const userAvatar = localStorage.getItem('userAvatar');
  const userName  = localStorage.getItem('userName');
  const botSettings = JSON.parse(localStorage.getItem('botSettings'));


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
            handleChat = {()=>setMode('Chat') }
            handleEdit = {()=>setMode('ScriptEditor')}
            handleUpload = {()=>setMode('Uploader')}
          />
        </Box>

        <Box order={0} flexGrow={1}>
          { mode === "Chat" &&
            <div style={{height:'calc( 100vh-64px)',overflowY:'scroll'}}>
            <ChatViewer />
            </div>
          }

          { mode === "ScriptEditor" &&
            <div style={{height:'calc(100vh - 64px)',overflowY:'scroll'}}>
            <ScriptEditor />
            </div>
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
