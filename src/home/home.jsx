import React, { useContext,useState,useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Console from './console.jsx';
import {RightBalloon,LeftBalloon} from '../balloons.jsx';

import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';
const CHAT_WINDOW = 10;

const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px - 64px - 2px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch',
   padding: 6
 }
}));



export default function Home(props){
  const classes = useStyles();
  const bot = useContext(BiomeBotContext);
  const {userName,userAvatar} = props;
  const [homeLog,setHomeLog] = useState(JSON.parse(localStorage.getItem('homeLog'))|| []);
  const homeLogSlice = homeLog.slice(-CHAT_WINDOW);


  // --------------------------------------------------------
  // currentLogが変更されたら最下行へ自動スクロール
  const myRef = useCallback(node => {
    if(node!== null){
      node.scrollIntoView({behavior:"smooth",block:"end"});
    }
  },[homeLogSlice])



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
    bot.handleReply(message)
      .then(reply => {
        if(reply.text !== null){
          newHomeLog.push(reply);
          setHomeLog(newHomeLog);
          localStorage.setItem('homeLog',JSON.stringify(newHomeLog))
        }
      })

  }


  const speeches = homeLogSlice.map(speech =>{
    return speech.uid === props.account.uid ?
      <LeftBalloon speech={speech}/>
    :
      <RightBalloon speech={speech} />
  }
   );

  return(
      <Box display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="flex-start"
        alignContent="stretch"
        alignItems="stretch"
        >
        <Box flexGrow={1} order={0} className={classes.container}>
          {speeches}
          <div ref={myRef}></div>
        </Box>
        <Box order={0} justifyContent="center">
          <Console
            position={0}
            handleWriteMessage={handleWriteMessage}/>
        </Box>
      </Box>
    )

}
