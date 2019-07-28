import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => createStyles({
  root: {
    flexGrow: 1,

  },
  homeButton: {
    width: 200,
    height: 200,
    margin: 'auto',
    borderRadius: '0% 100% 100% 0% / 100% 100% 0% 0% ',
    backgroundColor: theme.palette.primary.main
  },
  hubButton: {
    width: 200,
    height: 200,
    margin: 'auto',
    borderRadius: '100% 0% 0% 100% / 100% 100% 0% 0% ',
    backgroundColor: theme.palette.primary.main
  },
  buttonImage: {
    width: 100,
    height: 100
  }
}));


export default function Navigation(props){
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Grid container spacing={0}>
      <Grid item xs={6} style={{textAlign:'left'}}>
        <Button className={classes.homeButton}
          onClick={props.handleToHome}>
          <img className={classes.buttonImage } src="icons/home.svg" alt="HOME"/>
        </Button>
      </Grid>
      <Grid item xs={6} style={{textAlign:'right'}}>
        <Button className={classes.hubButton}
          onClick={props.handleToHub}>
          <img className={classes.buttonImage} src="icons/hub.svg" alt="HUB"/>
        </Button>
      </Grid>
      </Grid>
    </div>
  )
}
