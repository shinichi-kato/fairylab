import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import PartCard from './part-card.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  partCard: {
    margin: '2%',
  }
}));


if (!localStorage.getItem('botParts')){
  localStorage.setItem('botParts',JSON.stringify(
    [
      {
        path: 'reframing',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionary: {}
      },
      {
        path: 'greeting',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionry: {}
      }
    ]));
  }



export default function ScriptEditor(props){
  const classes = useStyles();
  const settings = localStorage.getItem('botSettings');
  const parts = localStorage.getItem('botParts');

  const handleChange = name => event => {
    localStorage.setItem('botSettings',{ ...settings, [name]: event.target.value });
  };

  const partItems = parts.map( (part,index) =>
      <PartCard id={index} part={part} className={classes.partCard}/>
  );

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        required
        id="name"
        label="名前"
        className={classes.textField}
        value={settings.name}
        onChange={handleChange('name')}
        margin="normal" />
      <TextField
        required
        id="botId"
        label="Bot Id"
        className={classes.textField}
        value={settings.id}
        onChange={handleChange('id')}
        margin="normal" />
      <TextField
        required
        id="botAvatarId"
        label="Avatar Id"
        className={classes.textField}
        value={settings.avatarId}
        onChange={handleChange('avatarId')}
        margin="normal" />
      <TextField
        required
        fullWidth
        id="description"
        label="説明"
        className={classes.textField}
        value={settings.description}
        onChange={handleChange('description')}
        margin="normal" />
      {partItems}
    </form>


  )
}
