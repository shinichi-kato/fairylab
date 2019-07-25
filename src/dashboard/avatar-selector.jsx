import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => {
  card: {
    width: '100%',
    borderRadius: 10,

  }
})

export default function AvatarSelector(props) {
  const classes = useStyles();

  return(
    <Card className={classes.card}>
      <CardContent>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
}
