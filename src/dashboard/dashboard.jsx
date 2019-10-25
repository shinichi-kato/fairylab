import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconsPanel from './icons-panel.jsx';
import Navigation from './navigation.jsx';

const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch',
   padding: 0,
   margin: 0,
 },
 textField: {
   width: "100%",
 },
 partCard:{
   width: "100%",
   marginBottom: theme.spacing(1),
 },
}));



export default function Dashboard(props){
  const classes = useStyles();
  const {userName,userAvatar,account,
    handleToUserSettings,handleToBotSettings,
    handleToHome,handleToHub} = props;

  return(
    <div className={classes.container}>
      <Box display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="flex-start"
        alignContent="stretch"
        alignItems="stretch"
        height="100%">
        <Box orfer={0} >
        {process.env.npm_package_version}
        </Box>
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
    </div>
  )
}
