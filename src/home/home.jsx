import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';


export default function Dashboard(props){
  const [mode, setMode] = useState('Ready');
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
          />
        </Box>

        <Box order={0} flexGrow={1}>
                chat window
        </Box>
        <Box order={0}>
        input
        </Box>
      </Box>
  );
}
