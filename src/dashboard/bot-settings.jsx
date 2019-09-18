import React ,{useEffect,useState,useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SwipeableViews from 'react-swipeable-views';

import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';

const useStyles = makeStyles(theme => createStyles({
  root: {
    padding: theme.spacing(2),
  },
  avatarButton: {
    margin: theme.spacing(0),
  },
  currentAvatar: {
    margin: 2,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
  textinput: {
    size: 40,
  },
  card: {
    borderRadius: 10,
    margin: 0,
    height: 300,
  },
  avatar: {
    width: 40,
    height: 40
  },

}));

const styles={
  root: {
    padding: '0 30px'
  },
  slideContainer: {
    padding: '0 0px',
  },
  slide: {
    padding: 15,
    height: 300,
    borderRadius: 10,

  },
}

export default function BotSettings(props){
  const {account,firebase} = props;
  const classes = useStyles();
  const bot = useContext(BiomeBotContext);
  const [name,setName] = useState(bot.name);
  const [index,setIndex] = useState(null);

  useEffect(()=>{
    let isCancel = false;
    if(!isCancel){
      bot.handleLoadBotSettingsList(firebase);

    }
    return(()=>{
      isCancel = true;
    })

  },[account]);

  function handleChangeName(e){
    setName(e.target.value);
  }

  function handleSetDownload(index){
    setIndex(index);
  }

  function handleExecuteBotSettings(){
    bot.handleSetName(name);
    bot.handleDownload(firebase,index);
    props.handleToParentPage();

  }

  const id = localStorage.getItem('bot.id') || null;
  let cursor = null;
  if(id !== null){
    for(let i in bot.botSettingsList){
      const b = bot.botSettingsList[i]
      if (b.id === id){
        cursor=i;
      }
    }
  }

  const botItems = bot.botSettingsList.map((bot,index) =>
    <Card style={styles.slide} key={index}>
      <CardHeader avatar={
        <Avatar src={bot.avatarId} className={classes.avatar} />
      }
      title={bot.id} />
      <CardContent>
        <Typography>{bot.description}</Typography>
        {cursor === index &&
          <Typography>選択中</Typography>
        }
      </CardContent>
      <CardActions disableSpacing >
        <Button variant="contained" color="primary"
        onClick={e=>handleSetDownload(index)} >
        Download
        </Button>
      </CardActions>

    </Card>
  );
  return (
    <form noValidate autoComplete="off" className={classes.root}>
    <Box
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">

      <Box>
        <Typography variant="h4">ChatBot</Typography>
      </Box>
      <Box>
      <SwipeableViews
        style={styles.root}
        slideStyle={styles.slideContainer}
        enableMouseEvents >
        {botItems}
      </SwipeableViews>
      </Box>
      <Box flexGrow={1}>

        <TextField
          className={classes.textinput}
          value={name}
          onChange={handleChangeName}
          margin="normal"
        />
      </Box>
      <Box>
        <Button
          onClick={props.handleToParentPage}>
          Cancel
        </Button>
        <Button
          disabled={!name || name.length === 0 || index === null}
          color="primary"
          type="submit"
          onClick={e=>{handleExecuteBotSettings()}}>
          OK
        </Button>
      </Box>
    </Box>
    </form>
  )
}
