import React, { useContext,useState } from 'react';
import Box from '@material-ui/core/Box';
import IconsPanel from './icons-panel.jsx';
import Navigation from './navigation.jsx';
import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';


const initialState={

}

export default function Dashboard(props){
  const {userName,userAvatar,account,
    handleToUserSettings,handleToBotSettings,
    handleToHome,handleToHub} = props;

  return(
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">
      <Box order={0} flexGrow={1} >
        <IconsPanel
          userName={userName}
          userAvatar={userAvatar}
          handleToUserSettings={handleToUserSettings}
          handleToBotSettings={handleToBotSettings}
        />
      </Box>
      <Box order={0} >
        <Navigation
        userName={userName}
        userAvatar={userAvatar}
        handleToHome={handleToHome}
        handleToHub={handleToHub}
        account={account}
        />
      </Box>
    </Box>
  )
}
