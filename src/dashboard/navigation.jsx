import React, {useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => createStyles({
  root: {
    padding: theme.spacing(0)
  }
  leftCanvas: {
    width: 200,
    height: 200,
    borderRadius: '0% 100% 100% 0% / 100% 100% 0% 0% ',
  },
  rightCanvas: {
    width: 200,
    height: 200,
    borderRadius: '0% 100% 100% 0% / 100% 100% 0% 0% '
  },
  avatar: {
    width: 40,
    height: 40
  }
}));


export default function Navigation(props){
  const classes = useStyles();

  return(


  )
}
