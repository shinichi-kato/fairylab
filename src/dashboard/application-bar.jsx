import React ,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountDialog from './account-dialog.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ApplicationBar(props){
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="settings"
            onClick={props.handleDoSettings}>
            <Settings />
          </IconButton>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          <AccountDialog
            account={props.account}
            handleChangeAccount={props.handleChangeAccount}
            firebase={props.firebase}
            />
        </Toolbar>
      </AppBar>
    </div>
  );
}
