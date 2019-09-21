import React, { useContext,useCallback,useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Console from './console.jsx';
import {RightBalloon,LeftBalloon} from '../balloons.jsx';

import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';
const CHAT_WINDOW = 10;
const LOG_WINDOW = 100;

const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px - 64px - 2px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch',
   padding: 6
 }
}));

const localStorageHomeLog=JSON.parse(localStorage.getItem('homeLog')) || [];

const initialState = {
  homeLog : localStorageHomeLog,
  homeLogSlice : localStorageHomeLog.slice(-CHAT_WINDOW),
}

function reducer(state,action) {
  switch(action.type) {
    case 'pushMessage' : {
      const newHomeLog = [...state.homeLog,action.message].slice(-LOG_WINDOW);
      localStorage.setItem('homeLog',JSON.stringify(newHomeLog));

      return {
        homeLog: newHomeLog,
        homeLogSlice: newHomeLog.slice(-CHAT_WINDOW),
      }
    }
    default:
     throw new Error(`invalid action ${action} in Home`);
  }
}

export default function Home(props){
  const classes = useStyles();
  const bot = useContext(BiomeBotContext);
  const {userName,userAvatar} = props;
  const [state,dispatch] = useReducer(reducer,initialState);
  // const [homeLog,setHomeLog] = useState(JSON.parse(localStorage.getItem('homeLog'))|| []);
  // let homeLogSlice = homeLog.slice(-CHAT_WINDOW);


  // --------------------------------------------------------
  // currentLogが変更されたら最下行へ自動スクロール
  const myRef = useCallback(node => {
    if(node!== null){
      node.scrollIntoView({behavior:"smooth",block:"end"});
    }
  },[state])




  function handleWriteMessage(text){
    const ts = new Date();
    const message={
      name:userName,
      speakerId: userName,
      avatar:userAvatar,
      text:text,
      timestamp:ts.getTime()
    };

    dispatch({type:'pushMessage',message:message})

    bot.handleReply(message)
      .then(reply => {
        if(reply.text !== null){

          dispatch({type:'pushMessage',message:reply});

        }
      })

  }


  const speeches = state.homeLogSlice.map(speech =>{
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
