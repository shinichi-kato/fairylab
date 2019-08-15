import React ,{useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const blankBotAvatar = 'avatar/bot/blank.svg';

const useStyles = makeStyles(theme => createStyles({
  root: {
    height: 180,
    width: '60%',
    margin: 'auto'
  },
  char: {
    textAlign: 'center'
  },
  avatar: {
    width: 100,
    height: 100
  },
  name: {
    size: 16,
    textAlign: "center",
  }

}));

export default function BotStatusDialog(props){
    const classes = useStyles();
    const botSettings=props.botSettings;

    return (
      <>
      <DialogTitle id="bot-status-title">{props.botName}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="row">
          <Box>
            <Avatar
              className={classes.avatar}
              src={botSettings.avatarId || blankBotAvatar} />
          </Box>
          <Box>
            <Typography>id: {botSettings.id}</Typography>
            <Typography>名前: {botSettings.name}</Typography>
            <Typography>概要: {botSettings.description}</Typography>
            <Typography>パート: </Typography>

          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
      </>
    )
}
