import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Create from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';

import DeletePartDialog from './delete-part-dialog.jsx';

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

  toUp:{
    marginLeft: 'auto',
    transform:'rotate(180deg)'
  },
  toDown:{
    marginLeft: 'auto',
    transform:'rotate(0deg)'
  }
}));

export function AddCard(props){
  const classes = useStyles();
  return(
    <Button className={classes.card}
      onClick={(e)=>props.handleAdd()}
      variant="contained"
      color="deafult"
    >
    パートを追加
    <AddCircle color="disabled" />
    </Button>
  );
}

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
      <IconButton aria-label="delete" onClick={props.handleOpenDialog}>
        <DeleteIcon />
      </IconButton>
      <DeletePartDialog
        part={part}
        open={props.openDialog}
        handleClose={props.handleCloseDialog}
        handleExecuteDelete={()=>props.handleExecuteDelete(props.id)} />
      <IconButton aria-label="to upper"
        onClick={(e)=>props.handleUp()}>
        <ExpandMoreIcon className={classes.toUp}
          disabled={props.index===0 }/>
      </IconButton>
      <IconButton aria-label="to lower"
        onClick={(e)=>props.handleDown()}>
        <ExpandMoreIcon className={classes.toDown}
        disabled={props.index===props.len-1}/>
      </IconButton>
      </CardActions>
    </Card>
  )
}
