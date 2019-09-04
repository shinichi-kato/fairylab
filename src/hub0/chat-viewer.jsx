import React,{useCallback} from 'react';
import Box from '@material-ui/core/Box';


import {RightBalloon,LeftBalloon} from '../balloons.jsx';

export default function ChatViewer(props){

  // 最下行への自動スクロール
  const myRef = useCallback(node => {
    if(node!== null){
      node.scrollIntoView({behavior:"smooth",block:"end"});
    }
  },[props.log])

  const speeches = props.log.map(speech =>{
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
