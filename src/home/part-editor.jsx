import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 4
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
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
  },
  dictionaryInput: {
    marginTop: 19,
    width: '90%',

  }
}));


export default function PartEditor(props){
  const classes = useStyles();
  const part = props.parts[props.index];
  const [param,setParam] = useState(
      {
        name:part.name,
        type:part.type,
        availability:part.availability,
        triggerLevel:part.triggerLevel,
        retention:part.retention
      }
  );
  const [dictionary,setDictionary] = useState(part.dictionary)
  const [dictSyntaxError,setDictSyntaxError] = useState(false);

  const handleChange = name => event => {
    setParam({ ...param, [name]: event.target.value });
  };

  function handleSave(event){
    try {
      JSON.parse(dictionary);
    }
    catch(e){
      if (e instanceof SyntaxError){
        setDictSyntaxError(true);
      }
    }
    setDictSyntaxError(false);
    props.handleChangePart(
      {...param,...dictionary}
    );
    props.handleClosePartEditor();
  }

  const handleChangeDictionary = event =>{
    setDictionary(event.target.value)
  }

  return(
    <form className={classes.container} noValidate autoComplete="off"
      style={{display:'flex'}}>
      <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          required
          id="name"
          label="名前"
          className={classes.textField}
          value={param.name}
          onChange={handleChange('name')}
          margin="normal" />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.textField}>
        <FormControl>
          <InputLabel htmlFor="type-select" >Type</InputLabel>
          <Select
            value={param.type}
            onChange={handleChange}
            inputProps={{name:'type',id:'type-select'}}
          >
            <MenuItem value={'sensor'}>sensor</MenuItem>
            <MenuItem value={'answerer'}>answerer</MenuItem>
            <MenuItem value={'questionser'}>questionser</MenuItem>
            <MenuItem value={'enactor'}>enactor</MenuItem>
            <MenuItem value={'namer'}>namer</MenuItem>
          </Select>
        </FormControl>
        </div>
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="availability"
          label="稼働率"
          className={classes.textField}
          value={param.availability}
          onChange={handleChange('availability')}
          margin="normal" />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="triggerLevel"
          label="トリガーレベル"
          className={classes.textField}
          value={param.triggerLevel}
          onChange={handleChange('triggerLevel')}
          margin="normal" />
      </Grid>
      <Grid item xs={4}>
        <TextField
          required
          id="retention"
          label="維持率"
          className={classes.textField}
          value={param.retention}
          onChange={handleChange('retention')}
          margin="normal" />
      </Grid>


      <Grid item xs={12}>
        <TextField
          error={dictSyntaxError}
          id="dictionary-input"
          label="辞書(JSON形式)"
          className={classes.dictionaryInput}
          margin="dense"
          variant="outlined"
          value={dictionary}
          multiline
          onChange={handleChangeDictionary}
        />
        { dictSyntaxError &&
          <Typography color='error'>
          文法がJSON形式になっていません。
          </Typography>
        }
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary"
          onClick={handleSave}
          className={classes.button}>
        Save
        </Button>
        <Button color="default"
          onClick={(e)=>props.handleClosePartEditor()}
          className={classes.button}
          >
        Cancel
        </Button>
      </Grid>
    </Grid>
    </form>

  )
}
