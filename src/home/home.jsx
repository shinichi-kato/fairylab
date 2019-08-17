import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import ScriptEditor from './script-editor.jsx';
import ChatViewer from './chat-viewer.jsx';
import Console from './console.jsx';
import ScriptUploader from './script-uploader.jsx';



const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch'
 }
}));

if (!localStorage.getItem('homeLog')){
  localStorage.setItem('homeLog',JSON.stringify(
    [
      {
        id:0,
        name:'user',
        speakerId: 'mailaddress',
        avatar:'avatar/user/1boy.svg',
        text:'こんにちは！',
        timestamp:Date.parse('04 Dec 2018 00:12:00 GMT')
      },
      {
        id: 1,
        name:'bot',
        speakerId:'bot@mailadress',
        avatar:'avatar/user/8dino.svg',
        text:'やあ！',
        timestamp:Date.parse('02 Dec 2018 00:12:00 GMT')
      }
    ]));
}

export default function Home(props){
  const classes = useStyles();
  const [mode, setMode] = useState('Chat');
  const userAvatar = localStorage.getItem('userAvatar');
  const userName  = localStorage.getItem('userName');
  const botSettings = JSON.parse(localStorage.getItem('botSettings'));
  const [homeLog,setHomeLog]= useState(JSON.parse(localStorage.getItem('homeLog')));

  const [position,setPosition] = useState(0);

  useEffect(() => {
    // body要素はfixedであるが、にもかかわらずスクロールを検出した場合は
    // スマホ端末でソフトキーボードが出現したときと消えたとき。
    // これらに対応してチャットログを表示する<Box>のりサイズを行う
    const handler = (event) => {

      setPosition(window.scrollY);

    }
    window.addEventListener("scroll",handler);

    return () => {
      window.removeEventListener("scroll",handler);
    }
  },[]);

  function handleWriteMessage(text){
    const ts = new Date();
    const message={
      name:userName,
      speakerId: userName,
      avatar:userAvatar,
      text:text,
      timestamp:ts.getTime()
    };

    const newHomeLog=[...homeLog,message];
    setHomeLog(newHomeLog);
    localStorage.setItem('homeLog',JSON.stringify(newHomeLog));
  }

  function handleExit(){
    if(mode !== 'Chat'){
      setMode('Chat');
      return;
    }
    props.handleExit()
  }

  function handleChat(){ setMode('Chat');}
  function handleEdit(){ setMode('ScriptEditor')}
  function handleUpload(){ setMode('Uploader')}


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
            account={props.account}
            handleExit= {handleExit}
            handleChat = {handleChat}
            handleEdit = {handleEdit}
            handleUpload = {handleUpload}
          />
        </Box>

        { mode === "Chat" &&
          <>
            <Box
              flexGrow={1} order={0} className={classes.container}>

              <ChatViewer
                account={props.account}
                log={homeLog}/>
            </Box>
            <Box order={0} justifyContent="center">
              <Console
                position={position}
                handleWriteMessage={handleWriteMessage}/>
            </Box>
          </>
        }
        { mode === "ScriptEditor" &&
          <Box>
            <div className={classes.container}>
            <ScriptEditor />
            </div>
          </Box>
        }
        { mode === "Uploader" &&
          <Box>
          <div className={classes.containr}>
            <ScriptUploader
              handleClose={handleChat}
              botSettings={botSettings}
            />
          </div>
        </Box>
        }

      </Box>
  );
}
