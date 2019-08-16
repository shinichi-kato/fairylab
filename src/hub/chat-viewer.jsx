import React, { useEffect, useState,useCallback } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {RightBalloon,LeftBalloon} from '../balloons.jsx';

export default function ChatViewer(props){

  const myRef = useCallback(node => {
    if(node!== null){
      node.scrollIntoView({behavior:"smooth",block:"end"});
    }
  })

   console.log("log",props.log)
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
