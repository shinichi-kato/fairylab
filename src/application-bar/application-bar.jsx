import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Close from '@material-ui/icons/Close';

import AppMenu from './app-menu.jsx';
import Indicator from '../biome-bot/indicator.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center",
  },
}));


export default function ApplicationBar(props){
  const {page,parentPage,handleToParentPage,handleToScriptEditor} = props;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          { page !== 'Dashboard' &&
            <IconButton edge="start" onClick={(e)=>{handleToParentPage()}}>
              {page === 'UserSettings' || page === 'BotSettings' ?
                <Close />
                :
                <NavigateBefore />
              }
            </IconButton>
          }
          <Typography variant="h6" className={classes.title}>
          { page }
          </Typography>
          <Indicator />
          <AppMenu
            account={props.account}
            firebase = {props.firebase}
            handleAuth={props.handleAuth}
            handleToScriptEditor={handleToScriptEditor}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
