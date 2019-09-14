import React ,{useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BiomeBotContext from '../biome-bot/biome-bot-provider.jsx';



const useStyles = makeStyles(theme => createStyles({
  root: {
    flexGrow: 1,

  },
  homeButton: {
    width: 180,
    height: 180,
    margin: 'auto',
    padding: 'auto 10',
    borderRadius: '0% 100% 100% 0% / 100% 100% 0% 0% ',
    backgroundColor: theme.palette.primary.main
  },
  hubButton: {
    width: 180,
    height: 180,
    margin: 'auto',
    padding: 'auto 10',
    borderRadius: '100% 0% 0% 100% / 100% 100% 0% 0% ',
    backgroundColor: theme.palette.primary.main,
  },
  buttonImage: {
    width: 90,
    height: 90
  },
  takeMeButton: {

  }
}));


export default function Navigation(props){
  const {handleToHome,handleToHub,account,userName,userAvatar} = props;
  const bot = useContext(BiomeBotContext);
  const classes = useStyles();
  const homeDisabled = !userName || userName==="" || !userAvatar || !bot || !bot.name;

  const hubDisabled = homeDisabled || !account.uid ;

  return(
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={6} style={{textAlign:'left'}}>
          <Tooltip title={
            homeDisabled ? "ユーザ・チャットボットの設定が必要です" : "ユーザとチャットボットで会話します"
          }>
            <span>
              <Button className={classes.homeButton}
                onClick={handleToHome}
                disabled={homeDisabled}>
                {homeDisabled ?
                  <img className={classes.buttonImage } src="icons/homeDisabled.svg" alt="HOME"/>
                  :
                  <img className={classes.buttonImage } src="icons/home.svg" alt="HOME"/>
                }
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={6} style={{textAlign:'right', position:"relative"}}>
          <Tooltip title={
            hubDisabled ?
            "ユーザ・チャットボットの設定とログインが必要です"
             :
             "多人数でチャットします"}>
            <span>
              <Button className={classes.hubButton}
                onClick={handleToHub}
                disabled={hubDisabled}>
                {hubDisabled ?
                  <img className={classes.buttonImage} src="icons/hubDisabled.svg" alt="HUB"/>
                  :
                  <img className={classes.buttonImage} src="icons/hub.svg" alt="HUB"/>
                  }
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>


    </div>
  )
}
