import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => createStyles({
  card: {
    width: '100%',
    borderRadius: 10,
  },
  avatarButton: {
    margin: theme.spacing(0),
  },
  avatar: {
    width: 40,
    height: 40
  }
}));

const avatarsDir = 'avatar/user/';
const avatarPaths = [
  '0person.svg',
  '1boy.svg',
  '2girl.svg',
  '3girl.svg',
  '4boy.svg',
  '5girl.svg',
  '6corgi.svg',
  '7cow.svg',
  '8dino.svg',
  '9eleph.svg',
  '10fish.svg',
  '11ladybird.svg',
  '12panther.svg',
  '13lion.svg',
  '14panda.svg',
  '15unico.svg',
];

export default function AvatarSelector(props) {
  const classes = useStyles();


  function handleSelectAvatar(event,img){
    props.handleSetUserAvatar(avatarsDir+img);
    props.handleNext();
  }

  const avatarItems = avatarPaths.map((img) =>
    <IconButton className={classes.avatarButton} aria-label={img} key={img}
      onClick={(e) => handleSelectAvatar(e,img)}>
      <Avatar src={avatarsDir+img} className={classes.avatar} />
    </IconButton>
  )

  return(
    <Card className={classes.card}>
      <CardContent>
      {avatarItems}
      </CardContent>
      <CardActions>
        <Button size="small">Cancel</Button>
      </CardActions>
    </Card>
  );
}
