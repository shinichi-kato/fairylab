import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => createStyles({
  card: {
    width: '95%',
    borderRadius: 10,


  }
}));

export default function AvatarSelector(props) {
  const classes = useStyles();

  return(
    <Card className={classes.card}>
      <CardContent>
      icons
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
