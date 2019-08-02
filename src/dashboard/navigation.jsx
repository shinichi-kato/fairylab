import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

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
    backgroundColor: theme.palette.primary.main
  },
  buttonImage: {
    width: 90,
    height: 90
  },
  takeMeButton: {

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
      <Grid item xs={6} style={{textAlign:'right', position:"relative"}}>
        <Button className={classes.hubButton}
          onClick={props.handleToHub}>
          <img className={classes.buttonImage} src="icons/hub.svg" alt="HUB"/>
        </Button>
        <Box position="absolute" top={0} left={0}>
          <Button className={classes.takeMeButton}>
            <Avatar src={props.botAvatar} />つれていく</Button>

        </Box>
      </Grid>
      </Grid>


    </div>
  )
}
