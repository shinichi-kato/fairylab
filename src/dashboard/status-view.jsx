import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Create from '@material-ui/icons/Create';


const useStyles = makeStyles(theme => createStyles({
  root: {
    height: 180,
    margin: 'auto',
    padding: theme.spacing(1)
  }
}));

export default function StatusView(props){
  const classes = useStyles();
  const estate = 0;
  const learning = 0;

  return(
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
        <FavoriteBorder/> {estate}
        </Grid>
        <Grid item xs={12}>
        <Create/> {learning}
        </Grid>
      </Grid>

    </div>
  )
}
