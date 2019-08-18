import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import {RightBalloon,LeftBalloon} from '../balloons.jsx';

const CHAT_WINDOW = 10;

export default function ChatViewer(props){

  const currentLog = props.log.slice(-CHAT_WINDOW);

  // --------------------------------------------------------
  // currentLogが変更されたら最下行へ自動スクロール
  const myRef = useCallback(node => {
    if(node!== null){
      node.scrollIntoView({behavior:"smooth",block:"end"});
    }
  },[currentLog])


  const speeches = currentLog.map(speech =>{
    return speech.uid === props.account.uid ?
      <LeftBalloon speech={speech}/>
    :
      <RightBalloon speech={speech} />
  }
   );


  return(
    <Box >
      {speeches}
      <div ref={myRef}></div>
    </Box>
  );
}
