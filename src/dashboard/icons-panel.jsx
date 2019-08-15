import React ,{useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import BotStatusDialog from './bot-status-dialog.jsx';



const blankUserAvatar = 'avatar/user/blank.svg';
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

export default function IconsPanel(props){
  const classes = useStyles();
  const botSettings = props.botSettings;
  const [open,setOpen] = useState(false);

  function handleClickOpen() { setOpen(true); }
  function handleClose() { setOpen(false); }

  return(
    <Grid
      className={classes.root}
      container spacing={1}
    >
      <Grid container item xs={6} >
        <Grid item xs={12}
          className={classes.char}>
          <Avatar
            className={classes.avatar}
            src={props.userAvatar || blankUserAvatar} />
        </Grid>
        <Grid item xs={12}
          className={classes.char}>
          <Typography
            className={classes.name}>
            {props.userName}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid item xs={12} className={classes.char}>
          <Button onClick={handleClickOpen}>
          <Avatar
            className={classes.avatar}
            src={botSettings.avatarId || blankBotAvatar} />
          </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="bot-status-title"
              aria-describedby="bot-status-description"
            >
              <BotStatusDialog
                botSettings={props.botSettings}
                handleClose={handleClose}/>

            </Dialog>
        </Grid>
        <Grid item xs={12} className={classes.char}>
          <Typography
            className={classes.name}>
            {botSettings.name}
          </Typography>
        </Grid>
      </Grid>


    </Grid>

  )
}
