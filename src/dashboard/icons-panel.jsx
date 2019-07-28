import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
          <Avatar
            className={classes.avatar}
            src={props.botAvatar || blankBotAvatar} />
        </Grid>
        <Grid item xs={12} className={classes.char}>
          <Typography
            className={classes.name}>
            {props.botName}
          </Typography>
        </Grid>
      </Grid>

    </Grid>

  )
}
