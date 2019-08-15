import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
  card: {
    width: '90%',
    margin: '4px auto',
  },
}));


export default function UploaderScriptCard(props){
  const classes = useStyles();
  const botSettings=props.botSettings;
  const script=props.script;

  return(
    <Card key={botSettings.id} className={classes.card}>
    <CardHeader
      avatar={
        <Avatar src={botSettings.avatarId} className={classes.avatar}>

        </Avatar>
      }
      title={botSettings.id}
      />

      <CardActions disablespacing>
      <IconButton aria-label="delete" >
        <DeleteIcon />
      </IconButton>
      <Button color="primary">
      上書き
      </Button>
      <Button color="default" onClick={props.handleClose}>
      CANCEL
      </Button>
      </CardActions>
    </Card>
  )
}
