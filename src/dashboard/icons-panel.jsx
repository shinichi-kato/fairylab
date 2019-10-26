import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';

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
  const bot = useContext(BiomeBotContext);
  console.log("iconspanel:botname=",bot.name)
  return(
    <Grid
      className={classes.root}
      container spacing={1}
    >
      <Grid container item xs={6} >
        <Grid item xs={12}
          className={classes.char}>
          <Button onClick={props.handleToUserSettings}>
          <Avatar
            className={classes.avatar}
            src={props.userAvatar || blankUserAvatar} />
          </Button>
        </Grid>
        <Grid item xs={12}
          className={classes.char}>
          <Typography
            className={classes.name}>
            {props.userName || "上のアイコンをクリック"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid item xs={12} className={classes.char}>
          <Button onClick={props.handleToBotSettings}>
          <Avatar
            className={classes.avatar}
            src={bot.avatarId || blankBotAvatar} />
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.char}>
          <Typography
            className={classes.name}>
            {bot.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>

  )
}
