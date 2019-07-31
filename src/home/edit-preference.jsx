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
}));

const dummy = {
  id: 'reframer@flab',
  avatarId: 'reflamer',
  description: '説明',
  botName: 'テスト',
  parts: [
    {
      path: 'reframing',
      availability: 0.5,
      triggerLevel: 0.04,
      retention: 0.6,

    },
    {
      path: 'greeting',
      availability: 0.5,
      triggerLevel: 0.04,
      retention: 0.6,
    }
  ]
}




export default function EditPreference(props){
  const classes = useStyles();
  const [bot,setBot] = useState({
    id: 'reframer@flab',
    avatarId: 'reflamer',
    description: '説明',
    name: 'テスト',
    parts: [
      {
        name: 'reframing',
        type: 'sensor',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionary: {},
      },
      {
        name: 'greeting',
        type: 'answerer',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionary: {},
      }
    ]
  });

  const handleChange = name => event => {
    setBot({ ...bot, [name]: event.target.value });
  };


  const partItems = bot.parts.map( (part,index) =>
      <PartCard id={index} part={part} />
  );

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        required
        id="name"
        label="名前"
        className={classes.textField}
        value={bot.name}
        onChange={handleChange('name')}
        margin="normal" />
      <TextField
        required
        id="botId"
        label="Bot Id"
        className={classes.textField}
        value={bot.id}
        onChange={handleChange('id')}
        margin="normal" />
      <TextField
        required
        id="botAvatarId"
        label="Avatar Id"
        className={classes.textField}
        value={bot.avatarId}
        onChange={handleChange('avatarId')}
        margin="normal" />
      <TextField
        required
        fullWidth
        id="description"
        label="説明"
        className={classes.textField}
        value={bot.description}
        onChange={handleChange('description')}
        margin="normal" />
      {partItems}
    </form>


  )
}
