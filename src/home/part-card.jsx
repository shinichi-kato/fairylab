import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Create from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  card: {
    width: '90%',
    margin: '4px auto',
  },
  sensor: {
    backgroundColor: '#f44336', //red[500]
  },
  answerer:{
    backgroundColor: '#9c27b0', //purple[500]
  },
  questioner:{
    backgroundColor: '#3f51b5', //indigo[500],
  },
  enactor:{
    backgroundColor: '#03a9f4', //lightBlue[500],
  },
  namer:{
    backgroundColor: '#009688', //terl[500],
  },

  toUpper:{
    marginLeft: 'auto',
    transform:'rotate(0deg)'
  },
  toLower:{
    marginLeft: 'auto',
    transform:'rotate(180deg)'
  }
}));



export default function PartCard(props){
  // props.part.name
  // props.part.type

  const classes = useStyles();

  const part = props.part;
  const subheader="A:"+part.availability.toFixed(2)+" T:"+
    part.triggerLevel+" R:"+part.retention;

  


  return(
    <Card key={props.id} className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="part" className={classes[part.type]}>
        {part.type[0].toUpperCase()}
        </Avatar>
      }
      title={part.name}
      action={
        <IconButton aria-label="edit">
        <Create />
        </IconButton>
      }
      subheader={subheader}/>

      <CardActions disablespacing>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="to upper">
        <ExpandMoreIcon className={classes.toUpper} />
      </IconButton>
      <IconButton aria-label="to lower">
        <ExpandMoreIcon className={classes.toLower} />
      </IconButton>
      </CardActions>
    </Card>
  )
}
