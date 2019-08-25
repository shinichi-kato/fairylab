import React, {useEffect, useRef,useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

import 'firebase/storage';
import 'firebase/firestore';

const useStyles = makeStyles(theme => createStyles({
  card: {
    borderRadius: 10,
    margin: 0,
    height: 300,
  },
  textField: {
    size: 20,
  },
  avatar: {
    width: 40,
    height: 40
  },

}));

const swipeableStyles = {
  root: {
    padding: '0 30px',
  },
  slideContainer: {
    padding: '0 10px',
  },
  slide: {
    padding: 15,
    minHeight: 100,
  },

};

const bots_blank = [
  {
    avatar:'avatar/bot/blank.svg',
    desc:'ダウンロードするにはサインインが必要です',
    ownerId:'',
    id:'',
    parts:[]
  },
];

export default function BotDownload(props){
  // botのsettings情報はfirebaseに格納し、各パートの辞書はstorageに格納する。
  // まずbotのsettingsリストをfirebaseから取得し、決定した後storageから辞書を得る。

  const classes = useStyles();

  function handleDownload(e,id,avatar,description){
    props.handleSetBotSettings(
      {
          id: id,
          avatarId: avatar,
          description: description,
          name: ''

      }
    );
    props.handleNext();
  }



  // -----------------------------------------------------
  // firestoreからbot群のsettingsを取得
  //

  const botsRef = useRef(null);
  const [bots,setBots] = useState(bots_blank);

  useEffect(()=> {
    if(props.firestoreRef.current){
      botsRef.current = props.firestoreRef.current.collection("Bots")
      botsRef.current.get()
        .then(snapshot => {
          const b = [];
          snapshot.forEach(doc => {
            b.push(doc.data());
          });
          setBots(b);
          console.log("bots=",b)
        });
    }
  },[props.account]);


  const botItems = bots.map((bot) =>
      <div style={swipeableStyles.slide}>
      <Card className={classes.card} >
        <CardHeader avatar={
          <Avatar src={bot.avatar} className={classes.avatar} />
        }
        title={bot.id} />

        <CardContent>
          <Typography>{bot.description}</Typography>
        </CardContent>
        <CardActions disableSpacing >
          <Button variant="contained" color="primary"
          onClick={e=>handleDownload(e,bot.id,bot.avatar,bot.description)} >
          Download
          </Button>
        </CardActions>
      </Card>
      </div>
  );

  return(
    <SwipeableViews
      enableMouseEvents
      style={swipeableStyles.root}
      slideStyle={swipeableStyles.slideContainer}>
      {botItems}
    </SwipeableViews>
  )

};
