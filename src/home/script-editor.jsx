import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PartCard ,{AddCard} from './part-card.jsx';

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
        name: 'reframing',
        type: 'sensor',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionary: {}
      },
      {
        name: 'greeting',
        type: 'answerer',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionry: {}
      }
    ]));
  }

export default function ScriptEditor(props){
  const classes = useStyles();
  const [settings,setSettings] = useState(JSON.parse(localStorage.getItem('botSettings')));
  const [parts,setParts] = useState(JSON.parse(localStorage.getItem('botParts')));
  const [openDialog,setOpenDialog] = useState(false);

  const handleChange = name => event => {
    setSettings({ ...settings, [name]: event.target.value });
  };

  function handleUp(index){
    if(index==0){ return };

    const cell = parts[index];
    const newParts=parts
    newParts.splice(index,1);
    newParts.splice(index-1,0,cell);
    setParts([...newParts]);
  }

  function handleDown(index){
    const newParts=parts;
    const cell = parts[index];
    newParts.splice(index,1);
    newParts.splice(index+1,0,cell);
    setParts([...newParts]);
  }

  function handleAdd(){
    const newPart= {
      name: 'part'+parts.length,
      type: 'sensor',
      availability: 1,
      triggerLevel: 0,
      retention: 1,
      dictionary: {}
    };
    setParts([...parts,newPart]);
  }

  function handleExecuteDelete(index){
    const newParts=parts;
    newParts.splice(index,1);
    setParts([...newParts]);
    setOpenDialog(false);
  }

  const partItems = parts.map( (part,index,parts) =>
      <PartCard
        len={parts.length}
        id={index}
        part={part}
        handleDelete={()=>setOpenDialog(true)}
        handleUp={()=>handleUp(index)}
        handleDown={()=>handleDown(index)}

        openDialog={openDialog}
        handleOpenDialog={()=>setOpenDialog(true)}
        handleCloseDialog={()=>setOpenDialog(false)}
        handleExecuteDelete={handleExecuteDelete}

      />
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
      <AddCard handleAdd={handleAdd}/>
      <Button variant="contained" color="primary">
      Save
      </Button>
    </form>


  )
}
