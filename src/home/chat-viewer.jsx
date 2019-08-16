import React, { useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import {RightBalloon,LeftBalloon} from '../balloons.jsx';

const CHAT_WINDOW = 10;

export default function ChatViewer(props){

  const componentRef = useRef(null);
  const anchorRef = useRef(null);

  function scrollToBottom(){
    anchorRef.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    const ref = componentRef.current;
    ref.addEventListener('resize',scrollToBottom);

    return ()=>{
      ref.removeEventListener('resize',scrollToBottom)

    }
  },[])

  const currentLog = props.log.slice(-CHAT_WINDOW);
  const speeches = currentLog.map(speech =>{
    return speech.uid === props.account.uid ?
      <LeftBalloon speech={speech}/>
    :
      <RightBalloon speech={speech} />
  }
   );


  return(
    <Box ref={componentRef}>
      {speeches}
      <div ref={anchorRef}></div>
    </Box>
  );
}
