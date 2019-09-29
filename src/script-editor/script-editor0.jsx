import React , {useState} from 'react';

import SettingsEditor from './settings-editor.jsx';
import PartEditor from './part-editor.jsx';

const initialState={
  page:'SettingsEditor',
  currentPartIndex:0,

  name: localStorage.getItem('bot.name') || "",
  id : localStorage.getItem('bot.id') || "",
  avatarId : localStorage.getItem('bot.avatarId') || "",
  creator : localStorage.getItem('bot.creator') || "",
  description : localStorage.getItem('bot.description') || "",
  published: localStorage.getItem('bot.published') || false,
  parts: JSON.parse(localStorage.getItem('bot.parts')) || [],
};

function reducer(state,action){
  switch(action.type){
    case 'EditSettings':{
      return {
        ...state,
        page:'SettingsEditor',
        parts:[...state.parts],
      }
    }
    case 'PartEditor':{
      return {
        ...state,
        page:'PartEditor',
        currentPartIndex:action.index,
        parts:[...state.parts],
      }
    }

    case 'ChangeSettings':{
      return {
        page: 'ScriptEditor',
        currentPartIndex: state.currentPartIndex,
        ...action.settings,
        parts:[...action.state.parts],

      }
    }
    case 'ChangePart':{
      const newParts=state.parts;
      const cell = {
        name:state.name,
        type:state.type,
        availability:state.availability,
        triggerLevel:state.triggerLevel,
        retention:state.retention,
      }
      newParts.splice(state.index,1);
      newParts.splice(state.index,0,cell);

      return {
        ...state,
        page: 'ScriptEditor',
        parts:[...action.parts],
      }
    }


    case 'LocalSave':{
      const settings=action.settings;

      localStorage.setItem('bot.name',settings.name);
      localStorage.setItem('bot.id',settings.id);
      localStorage.setItem('bot.avatarId',settings.avatarId);
      localStorage.setItem('bot.creator',settings.creator);
      localStorage.setItem('bot.description',settings.description);
      localStorage.setItem('bot.published',settings.published);
      localStorage.setItem('bot.published',settings.published);
      localStorage.setItem('bot.parts',JSON.stringify(settings.parts));

      return ({
        page:'SettingsEditor',
        currentPartIndex:0,
        ...settings,
        parts:[...settings.parts],
      });
  }
}

export default function ScriptEditor(props){
  const [state,dispatch]=useReducer(reducer,initialState);
  const index=state.currentPartIndex;

  return(
    <>
    {page === 'SettingsEditor' &&
      <SettingsEditor
        account={props.account}
        firebase={props.firebase}
        userName={props.userName}
        settings={state}
        handleSaveSettings={s=>dispatch({type:'LocalSave',settings:s})}
        handleEditPart={i=>dispatch({type:'EditPart',index:i})}
      />
    }
    {page === 'PartEditor' &&

      <PartEditor
        part={state.parts[index]}
        handleChangePart={p=>dispatch({type:'ChangePart',part:p,index:index})}
      />
    }
    </>
  )
}
