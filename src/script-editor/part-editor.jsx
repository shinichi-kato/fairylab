import React , {useReducer,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TypeSelectorDialog from './type-selector-dialog.jsx';


import {partIcons} from './part-icons.jsx';

const useStyles = makeStyles(theme => ({
  container: {
    padding:theme.spacing(2),
 },
 textField: {
   width: "100%",
 },
 partType:{
    margin: 'auto',
 },
 partTypeButton:{
   textTransform: 'capitalize',
 },
 partCard:{
   width: "100%",
   marginBottom: theme.spacing(1),
 },
}));

function initialState(part){
  console.log(part);
  return {
    name:part.name,
    type:part.type,
    availability:part.availability,
    triggerLevel:part.triggerLevel,
    retention:part.retention,
    anchorEl:null,
  }
}

function reducer(state,action){
  switch(action.type){
    case 'ChangeName':{
      return {
        ...state,
        name:action.name
      }
    }

    case 'ChangeType':{
      return {
        ...state,
        type:action.typeName,
        anchorEl:false,
      }
    }
    case 'ChangeAvailability':{
      return {
        ...state,
        availability:parseFloat(action.availability),
      }
    }
    case 'ChangeRetention':{
      return {
        ...state,
        retention:parseFloat(action.retention),
      }
    }
    case 'ChangeTriggerLevel':{
      return {
        ...state,
        triggerLevel:parseFloat(action.triggerLevel),
      }
    }
    case 'OpenDialog':{
      return {
        ...state,
        anchorEl:action.event.currentTarget,
      }
    }

    case 'CloseDialog':{
      return {
        ...state,
        anchorEl:false,
      }
    }

    default:
      throw new Error(`invalid action ${action.type}`)
  }
}


export default function PartEditor(props){
  // Partのパラメータ、名前、辞書を編集する。
  // 辞書は巨大になるので`bot.sourceDicts.${name}`という個別のlocalStorageに格納する。
  // ${name}はpartの名前と同じにする。

  const classes = useStyles();
  const [state,dispatch] = useReducer(reducer,initialState(props.part));
  const dictionaries = JSON.parse(localStorage.getItem('bot.dictionaries')) || new Object();
  const dictionaryNames = Object.keys(dictionaries);
  const {part} = props;
  const [dict,setDict] = useState(
    localStorage.getItem(`bot.dict.${state.name}`) || "");


  function handleChangePart(){
    localStorage.setItem(`bot.dict.${state.name}`,dict);
    const newPart={
      name:state.name,
      type:state.type,
      availability:state.availability,
      triggerLevel:state.triggerLevel,
      retention:state.retention,
    };
    props.handleChangePart(newPart);
  }

  return (
    <Paper className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            variant="filled"
            id="name"
            margin="normal"
            label="パートの名前"
            value={state.name}
            onChange={e=>dispatch({type:'ChangeName',name:e.target.value})}
          />
        </Grid>
        <Grid item xs={6} className={classes.partType}>
          <Button
            className={classes.partTypeButton}
            aria-controls="type-selector-dialog"
            aria-haspopup="true"
            onClick={e=>dispatch({type:'OpenDialog',event:e})}
          >
          {state.type !== '' &&
          <Avatar style={{backgroundColor:partIcons[state.type].backgroundColor}}>
            {partIcons[state.type].icon}</Avatar>
          }
          {state.type}
          <ExpandMoreIcon/>

          </Button>
          <TypeSelectorDialog
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            handleChangeType={t=>dispatch({type:'ChangeType',typeName:t})}
            handleClose={()=>dispatch({type:'CloseDialog'})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            variant="filled"
            id="availability"
            margin="normal"
            label="稼働率 ()"
            value={state.availability}
            onChange={e=>dispatch({type:'ChangeAvailability',availability:e.target.value})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            variant="filled"
            id="triggerLevel"
            margin="normal"
            label="トリガーレベル"
            value={state.triggerLevel}
            onChange={e=>dispatch({type:'ChangeTriggerLevel',triggerLevel:e.target.value})}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            className={classes.textField}
            variant="filled"
            id="availability"
            margin="normal"
            label="稼働率"
            value={state.retention}
            onChange={e=>dispatch({type:'ChangeRetention',retention:e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
          className={classes.textField}
          variant="filled"
          id="availability"
          margin="normal"
          label="辞書"
          row={12}
          value={dict}
          onChange={e=>setDict(e.target.value)}
        />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.partCard}
            variant="contained"
            color="default"
            onClick={e=>props.handleClose()}>
            キャンセル
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.partCard}
            variant="contained"
            color="primary"
            onClick={e=>handleChangePart()}>
            保存
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
