import React, { useContext,useState } from 'react';
import Box from '@material-ui/core/Box';
import IconsPanel from './icons-panel.jsx';
import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';


const initialState={

}

export default function Dashboard(props){
  const {userName,userAvatar,handleToUserSettings,handleToBotSettings} = props;

  return(
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">
      <Box order={0} >
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          handleToUserSettings={handleToUserSettings}
          handleToBotSettings={handleToBotSettings}
        />
      </Box>
      <Box flexGrow={1}>

      </Box>
    </Box>
  )
}
