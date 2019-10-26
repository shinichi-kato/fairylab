import React , {useReducer,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';

import PartCard from './part-card.jsx';

const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch',
   padding: 6
 },
 textField: {
   width: "100%",
 },
 partCard:{
   width: "100%",
   marginBottom: theme.spacing(1),
 },
}));


function init(){
  return {
    name: localStorage.getItem('bot.name') || "",
    id : localStorage.getItem('bot.id') || "",
    avatarId : localStorage.getItem('bot.avatarId') || "",
    creator : localStorage.getItem('bot.creator') || "",
    description : localStorage.getItem('bot.description') || "",
    published: localStorage.getItem('bot.published') || false,
    parts: JSON.parse(localStorage.getItem('bot.parts')) || [],
  }

}

function reducer(state,action){
  switch(action.type){
    case 'ChangeName' : {
      // 名前を変えただけではcreatorを変更しない
      return ({
        ...state,name:action.name,
        parts:[...state.parts]
      });
    }

    case 'ChangeId' : {
      return ({
        ...state,id:action.id,creator:action.creator,
        parts:[...state.parts]
      });
    }

    case 'ChangeAvatarId':{
      return ({
        ...state,creator:action.creator,avatarId:action.avatarId,
        parts:[...state.parts]
      });
    }

    case 'ChangeDescription':{
      return ({
        ...state,creator:action.creator,description:action.description,
        parts:[...state.parts]
      });
    }

    case 'ChangePublished':{
      return ({
        ...state,published:!state.published,
        parts:[...state.parts]
      });
    }

    case 'Up':{
      const newParts=[...state.parts];
      if(action.index !== 0){
        const cell = state.parts[action.index];
        newParts.splice(action.index,1);
        newParts.splice(action.index-1,0,cell);
      }
      return ({
        ...state,creator:action.creator,
        parts:[...newParts]
      });
    }

    case 'Down':{
      const newParts=[...state.parts];
      const cell = state.parts[action.index];
      newParts.splice(action.index,1);
      newParts.splice(action.index+1,0,cell);
      return ({
        ...state,creator:action.creator,
        parts:[...newParts]
      });
    }

    case 'Delete':{
      const name=state.parts[action.index].name;
      localStorage.removeItem(`bot.dict.${name}`);

      const newParts=[...state.parts];
      newParts.splice(action.index,1);
      return ({
        ...state,creator:action.creator,
        parts:[...newParts]
      });
    }

    case 'Add':{
      let number=0;
      let name="";
      const names = state.parts.map(p=>p.name);
      do {
        name="part"+number;
        number++;
      }while(names.indexOf(name)!==-1)


      const newPart={
        name: name,
        type:'sensor',
        availability: 1,
        triggerLevel: 0,
        retention: 1,

      };
      return ({
        ...state,creator:action.creator,
        parts:[...state.parts,newPart]
      });
    }

    case 'ChangePart':{
      const newParts=[...state.parts];
      const cell = action.part;
      newParts.splice(action.index,1);
      newParts.splice(action.index,0,cell);
      return ({
        ...state,
        creator:action.creator,
        // currentPartIndex:null,  // dialogをclose
        parts:[...newParts],
      });
    }


    case 'LocalSave':{

      localStorage.setItem('bot.name',state.name);
      localStorage.setItem('bot.id',state.id);
      localStorage.setItem('bot.avatarId',state.avatarId);
      localStorage.setItem('bot.creator',state.creator);
      localStorage.setItem('bot.description',state.description);
      localStorage.setItem('bot.published',state.published);
      localStorage.setItem('bot.parts',JSON.stringify(state.parts));

      return ({
        // currentPartIndex:null,
        ...state,
        parts:[...state.parts],
      });
    }

    case 'Load':{
      return init();
    }

    default:
      throw new Error(`invalid action ${action.type}`);
  }
}

export default function ScriptEditor(props){
  const classes = useStyles();
  const {account,userName,firebase} = props;
  const [state,dispatch] = useReducer(reducer,init());
  const creator = account.email || userName;
  const bot = useContext(BiomeBotContext);

  function handleSaveScript(){
    dispatch({type:'LocalSave'});
    bot.handleCompile();
  }

  useEffect(()=>{
    dispatch({type:'Load'})
  },[]);

  const fieldUnsatisfied= state.name.length === 0 || state.id.length === 0;
  const partNames = state.parts.map(p=>p.name) || [];

  return(
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="filled"
            required
            id="name"
            margin="normal"
            label="チャットボットの名前"
            value={state.name}
            onChange={e=>dispatch({type:'ChangeName',name:e.target.value})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            variant="filled"
            required
            id="name"
            margin="normal"
            label="id(型式)"
            value={state.id}
            onChange={e=>dispatch(
              {type:'ChangeId',id:e.target.value,creator:creator})}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.textField}
            disabled
            variant="filled"
            id="creator"
            margin="normal"
            label="作成者"
            value={state.creator}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            variant="filled"
            id="description"
            margin="normal"
            multiline
            rowMax="4"
            label="概要"
            value={state.description}
            onChange={e=>dispatch(
              {type:'ChangeDescription',description:e.target.value,creator:creator})}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle">パート</Typography>
          {state.parts.map((part,index) =>
            <PartCard
              part={part}
              partNames={partNames}
              handleUp={()=>dispatch({type:'Up',index:index,creator:creator})}
              handleDown={()=>dispatch({type:'Down',index:index,creator:creator})}
              handleChangePart=
                {p=>dispatch({type:'ChangePart',part:p,index:index,creator:creator})}
              handleExecuteDelete=
                {()=>dispatch({type:'Delete',index:index,creator:creator})}
            />
          )}
          <Button
            className={classes.partCard}
            variant="contained"
            onClick={()=>dispatch({type:'Add',creator:creator})}
          ><AddCircleIcon />パートを追加</Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.partCard}
            variant="contained"
            disabled ={fieldUnsatisfied}
            color="primary"
            onClick={e=>handleSaveScript()}>
            保存
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
