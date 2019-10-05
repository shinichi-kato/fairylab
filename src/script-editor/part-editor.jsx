import React , {useReducer,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import TypeSelectorDialog from './type-selector-dialog.jsx';
import DeletePartDialog from './delete-part-dialog.jsx';

import {partIcons} from './part-icons.jsx';
import {sampleScript} from '../biome-bot/sampleScript.jsx';

const useStyles = makeStyles(theme => ({
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
  return {
    name:part.name,
    type:part.type,
    availability:part.availability,
    triggerLevel:part.triggerLevel,
    retention:part.retention,
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
      }
    }
    case 'ChangeAvailability':{
      return {
        ...state,
        availability:action.availability,
      }
    }
    case 'ChangeRetention':{
      return {
        ...state,
        retention:action.retention,
      }
    }
    case 'ChangeTriggerLevel':{
      return {
        ...state,
        triggerLevel:action.triggerLevel,
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
    props.handleChangePart(state);
  }

  function handleChangeType(t){
    dispatch({type:'ChangeType',typeName:t});
    props.handleChangePart(state);
    props.handleCloseTypeSelector();
  }

  function handleAppendScript(type){
      setDict(dict+sampleScript[type]);
  }

  // ↓一文字ごとに再描画が起きてフォーカスが外れるのでNG
  // function handleChangeName(n){
  //   dispatch({type:'ChangeName',name:n});
  //   props.handleChangePart(state);
  // }

  return (
    <ClickAwayListener onClickAway={handleChangePart}>
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
          onClick={e=>props.handleOpenTypeSelector(e)}
        >
        {state.type !== '' &&
        <Avatar style={{backgroundColor:partIcons[state.type].backgroundColor}}>
          {partIcons[state.type].icon}</Avatar>
        }
        {state.type}
        <ExpandMoreIcon/>

        </Button>
        <TypeSelectorDialog
          anchorEl={props.anchorEl}
          open={Boolean(props.anchorEl)}
          handleChangeType={t=>handleChangeType(t)}
          handleClose={props.handleCloseTypeSelector}
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
          label="トリガレベル"
          value={state.triggerLevel}
          onChange={e=>dispatch({type:'ChangeTriggerLevel',triggerLevel:e.target.value})}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          className={classes.textField}
          variant="filled"
          id="retention"
          margin="normal"
          label="維持率"
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
        multiline
        rows={12}
        value={dict}
        onChange={e=>setDict(e.target.value)}
      />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">
        辞書はjson形式です。
          <Button onClick={e=>handleAppendScript(state.type)}>
          {state.type}用の例文を挿入
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          className={classes.partCard}
          variant="text"
          color="inherit"
          onClick={e=>props.handleClose()}>
          キャンセル
        </Button>
      </Grid>
      <Grid item xs={6}>

        <Button
          aria-label="delete"
          className={classes.partCard}
          variant="contained"
          color="default"
          onClick={e=>props.handleOpenDeleteDialog()}>
          <DeleteIcon/>削除
        </Button>
        <DeletePartDialog
          part={part}
          open={props.deleteDialogOpen}
          handleClose={props.handleCloseDeleteDialog}
          handleExecuteDelete={props.handleExecuteDelete} />

      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.partCard}
          variant="contained"
          color="primary"
          onClick={e=>handleChangePart()}>
          閉じる
        </Button>
      </Grid>
    </Grid>
    </ClickAwayListener>
  )
}
