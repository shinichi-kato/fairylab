import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PartCard ,{AddCard} from './part-card.jsx';
import PartEditor from './part-editor.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    margin: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  partCard: {
    margin: '2%',
  },
  button: {
    margin: theme.spacing(1),
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
        dictionary: ""
      },
      {
        name: 'greeting',
        type: 'answerer',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionry: ""
      }
    ]));
  }

export default function ScriptEditor(props){
  const classes = useStyles();
  const [settings,setSettings] = useState(JSON.parse(localStorage.getItem('botSettings')));
  const [parts,setParts] = useState(JSON.parse(localStorage.getItem('botParts')));
  const [openDialog,setOpenDialog] = useState(false);
  const [currentPart,setCurrentPart] = useState(0);
  const [mode,setMode] = useState('ScriptEditor');

  const handleChange = name => event => {
    setSettings({ ...settings, [name]: event.target.value });
  };

  function handleUp(index){
    if(index===0){ return };

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
      dictionary: ""
    };
    setParts([...parts,newPart]);
  }
  function handleOpenDialog(){
    setOpenDialog(true);
  }
  function handleCloseDialog(){
    setOpenDialog(false);
  }

  function handleExecuteDelete(index){
    const newParts=parts;
    newParts.splice(index,1);
    setParts([...newParts]);
    setOpenDialog(false);
  }


  function handleChangePart(cell,index){
    const newParts=parts;
    newParts.splice(index,1,cell);
    setParts([...newParts])
    setMode('ScriptEditor');
  }

  function handleOpenPartEditor(index){
    setCurrentPart(index);
    setMode('PartEditor');
  }

  function handleClosePartEditor(){
    setMode('ScriptEditor');
  }

  const handleSaveScript = e => {
    localStorage.setItem('botSettings',JSON.stringify(settings))
    localStorage.setItem('botParts',JSON.stringify(parts))
  }

  const partItems = parts.map( (part,index,parts) =>
      <PartCard
        len={parts.length}
        id={index}
        part={part}
        handleDelete={handleOpenDialog}
        handleUp={()=>handleUp(index)}
        handleDown={()=>handleDown(index)}

        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleExecuteDelete={handleExecuteDelete}

        handleEditPart={()=>handleOpenPartEditor(index)}
        handleChangePart={part=>handleChangePart(part,index)}
      />
  );

  return (
    <form className={classes.container} noValidate autoComplete="off">
    { mode === 'ScriptEditor' &&
      <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          required
          id="name"
          label="スクリプトの名前"
          className={classes.textField}
          value={settings.name}
          onChange={handleChange('name')}
          margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          id="botId"
          label="Bot Id"
          className={classes.textField}
          value={settings.id}
          onChange={handleChange('id')}
          margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <TextField
          required
          id="botAvatarId"
          label="Avatar Id"
          className={classes.textField}
          value={settings.avatarId}
          onChange={handleChange('avatarId')}
          margin="normal" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="description"
          label="説明"
          className={classes.textField}
          value={settings.description}
          onChange={handleChange('description')}
          margin="normal" />
      </Grid>
      <Grid item xs={12}>
        パート
      </Grid>
      <Grid item xs={12}>
        {partItems}

        <AddCard handleAdd={handleAdd}/>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary"
          className={classes.button}
          onClick=handleSaveScript>
        Save
        </Button>
      </Grid>

    </Grid>
    }
    { mode === 'PartEditor' &&
      <PartEditor
        index={currentPart}
        parts={parts}
        handleChangePart={handleChangePart}
        handleClosePartEditor={handleClosePartEditor}
      />
    }
    </form>


  )
}
