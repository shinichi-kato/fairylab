import React, {useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

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

const bots_dummy = [
  {
    avatar:'avatar/user/12panther.svg',
    desc:'リフレーミングの実験用チャットボット',
    id:'reflamer-test'
  },
  {
    avatar:'avatar/user/13lion.svg',
    desc:'ライオン（Panthera leo） は、食肉目ネコ科ヒョウ属に分類される食肉類の哺乳類。別名はシシ（獅子）。オスは体重は250キログラムを超えることもあり、ネコ科ではトラに次いで2番目に大きな種である',
    id:'test1'
  },
  {
    avatar:'avatar/user/14panda.svg',
    desc:'単にパンダといった場合、現在ではジャイアントパンダのことを指すことが多い。しかし、当初は先に発見されたレッサーパンダに対して「パンダ」と命名され、後に類縁関係にあると見做されたジャイアントパンダが',
    id:'test2'
  },
];

export default function BotDownload(props){

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


  const botItems = bots_dummy.map((bot) =>
      <div style={swipeableStyles.slide}>
      <Card className={classes.card} >
        <CardHeader avatar={
          <Avatar src={bot.avatar} className={classes.avatar} />
        }
        title={bot.id} />

        <CardContent>
          <Typography>{bot.desc}</Typography>
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
