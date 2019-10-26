import React , {useReducer,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    availablity:part.availablity,
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
    case 'ChangeAavailablity':{
      return {
        ...state,
        availablity:action.availablity,
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
  const {part} = props;
  const [dict,setDict] = useState(
    localStorage.getItem(`bot.sourceDict.${state.name}`) || "");



  function handleChangePart(){
    localStorage.setItem(`bot.sourceDict.${state.name}`,dict);
    localStorage.removeItem(`bot.compiledDict.${state.name}`);
    
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

  const field_availablity=parseFloat(state.availablity);
  const field_triggerLevel=parseFloat(state.triggerLevel);
  const field_retention=parseFloat(state.retention);
  const field_availablity_bad = field_availablity < 0 || 1 < field_availablity;
  const field_triggerLevel_bad = field_triggerLevel <0 || 1 < field_triggerLevel;
  const field_retention_bad = field_retention <0 || 1 < field_retention;
  const field_name_bad = state.name === "" || props.partNames.filter(p=>p===state.name).length>1;
  const fieldUnsatisfied =
    field_availablity_bad ||
    field_triggerLevel_bad ||
    field_retention_bad ||
    field_name_bad;



  return (
    <ClickAwayListener onClickAway={handleChangePart}>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          className={classes.textField}
          variant="filled"
          id="name"
          required
          margin="normal"
          label="パートの名前"
          error={field_name_bad}
          helperText={field_name_bad && "名前が重複しています"}
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
          id="availablity"
          margin="normal"
          required
          label="稼働率"
          error={field_availablity_bad}
          helperText={field_availablity_bad && "0≦稼働率≦1"}
          value={state.availablity}
          onChange={e=>dispatch({type:'ChangeAavailablity',availablity:e.target.value})}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          className={classes.textField}
          variant="filled"
          id="triggerLevel"
          required
          margin="normal"
          label="トリガレベル"
          error={field_triggerLevel_bad}
          helperText={field_triggerLevel_bad && "0≦トリガレベル≦1"}
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
          required
          label="維持率"
          error={field_retention_bad}
          helperText={field_retention_bad && "0≦維持率≦1"}
          value={state.retention}
          onChange={e=>dispatch({type:'ChangeRetention',retention:e.target.value})}
        />
      </Grid>
      <Grid item xs={12}>
      <TextField
        className={classes.textField}
        variant="filled"
        id="availablity"
        margin="normal"
        label="辞書"
        multiline
        disabled={state.type.startsWith('@dev')}
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
          disabled={fieldUnsatisfied}
          onClick={e=>handleChangePart()}>
          保存して閉じる
        </Button>
      </Grid>
    </Grid>
    </ClickAwayListener>
  )
}
