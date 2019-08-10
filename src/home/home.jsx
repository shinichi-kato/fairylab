import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import ScriptEditor from './script-editor.jsx';
import ChatViewer from './chat-viewer.jsx';
import Console from './console.jsx';


if (!localStorage.getItem('homeLog')){
  localStorage.setItem('homeLog',JSON.stringify(
    [
      {
        id:0,
        name:'user',
        speakerId: 'mailaddress',
        avatar:'avatar/user/1boy.svg',
        text:'こんにちは！',
        timestamp:[2019,7,9,12,12,22]
      },
      {
        id: 1,
        name:'bot',
        speakerId:'bot@mailadress',
        avatar:'avatar/user/8dino.svg',
        text:'やあ！',
        timestamp:[2019,7,9,12,12,22]
      }
    ]));
}

export default function Home(props){
  const [mode, setMode] = useState('Chat');
  const userAvatar = localStorage.getItem('userAvatar');
  const userName  = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const botSettings = JSON.parse(localStorage.getItem('botSettings'));
  const [homeLog, setHomeLog] = useState(JSON.parse(localStorage.getItem('homeLog')));


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

        <Box flexGrow={1} order={0}>
          { mode === "Chat" &&
            <div style={{height:'calc( 100vh-64px)',overflowY:'scroll'}}>
            <ChatViewer
              userId={0}
              buddyId={0}
              log={homeLog}/>
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
          <Console />
          </Box>
        }

      </Box>
  );
}
