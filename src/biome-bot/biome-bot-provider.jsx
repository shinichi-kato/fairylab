import React, {useReducer,createContext } from 'react';
import BiomeBot from './BiomeBot.jsx';
import {echoBot,internalReprBot,reflamerBot} from './PresetBots.jsx';

export const BiomeBotContext = createContext();

const bot = new BiomeBot();



const initialState = {
  botState: localStorage.getItem('bot.id') ? 'ready' : 'init',
  id: localStorage.getItem('bot.id') || null,
  botSettingsList : [],
  message: null,
};

function reducer (state,action){
  switch(action.type){
    case 'ready':{

      return {
        botState: 'ready',
        id: action.id,
        botSettingsList:[...state.botSettingsList],
        // botSettingsList: state.botSettingsList.map(node=>{
        //   return {...node,parts:[...node.parts]}
        // })
      }
    }
    case 'listLoading':{
      return {
        botState:'listLoading',
        id: state.id,
        botSettingsList: [],
      }
    }

    case 'listLoaded': {
      let botState='listLoaded';
      let id= state.id;
      if(bot.id !== null && bot.name !== null){
        // ボット設定済みの状態でリストをロード→キャンセルした場合
        botState='ready';
        id=bot.id;
      }
      return {
        botState:botState,
        id: id,
        botSettingsList: action.botSettingsList.map(node=>{
          return {...node,parts:[...node.parts]}
        })};
    }

    case 'firebaseDisconnected': {
      return {
        botState: 'disconnented',
        id: state.id,
        botSettingsList:[...state.botSettingsList],
        // botSettingsList: state.botSettingsList.map(node=>{
        //   return {...node,parts:[...node.parts]}
        // })
      }
    }

    case 'setName':{
      bot.name=action.name;
      localStorage.setItem('bot.name',bot.name);
      console.log("setName:",bot.name)
      return state;
    }
    case 'ParseError':{
      return {
        ...state,
        botState:'ParseError',
        message:action.message,
      }

    } 
    case 'CompileError':{
      return {
        ...state,
        botState:'ParseError',
        message:action.message,
      }

    }
    default:
      throw new Error(`invalid action ${action.type} in BiomeBotProvider`)
  }
}

export default function BiomeBotProvider(props){
  // ダウンロード可能なボットのSettingsリストをfirebaseから取得し、ユーザに提供する。
  // 開発中はこのリストにテスト用のPresetBotsを含める。
  //　その中でユーザが選んだボットについてpartと辞書をfirebaseからダウンロードし、
  // コンパイルを実行する。
  // botの内部構造の情報を遮蔽するため、botの設定や辞書を読み書きするfirebaseとのI/Oは
  // このコンポーネントすべて処理する。
  // ダウンロードなどの状態はBiomeBotProviderで把握管理する。
  const [state,dispatch] = useReducer(reducer,initialState);

  function handleLoadBotSettingsList(firebase){
    // firebaseからbotのリストをロードしてbotSettingsListに格納

    const settings=[echoBot,internalReprBot,reflamerBot];
    if (!firebase){
      dispatch({type:'listLoaded',botSettingsList:settings})
    }
    else{
      //------------------------------------------
      // firebaseからbotlistをダウンロード
      dispatch({type:'listLoading'});
      // あとで
      dispatch({type:'listLoaded',botSettingsList:settings})
    }
  }

  function loadFromLocalStorage(){
    bot.load();
    const result = bot.setup();
    if(result !== 'ok'){
      dispatch({type:'ParseError',message:result.message});
      return;
    }
    bot.dump();

    dispatch({type:'ready',id:bot.id});
  }

  function handleDownload(firebase,index){
    const botSettings = state.botSettingsList[index];

    bot.load(botSettings);
    const result = bot.setup();
    if(result !== 'ok'){
      dispatch({type:'ParseError',message:result.message});
      return;
    }
    bot.dump();

    dispatch({type:'ready',id:botSettings.id});

    
  }

  function handleReply(message){
    // メッセージを受け取り返答をログに追記
    return bot.reply(message)
  }


  function handleCompile(){
    // bot.load();
    // let result = bot.parseDictionaries();
    // if(result !== "ok"){
      
    //   dispatch({type:"ParseError",message:result});
    //   return;
    // }

    bot.load();

    // localStorageの辞書をコンパイル
    let result = bot.setup();
    console.log(result);
    if(result !== "ok"){
      dispatch({type:"ParseError",message:result});
      return;
    }
    bot.dump();
    dispatch({type:"ready"});
  }


  return(
    <BiomeBotContext.Provider value={{
      name:bot.name,
      avatarId:bot.avatarId,
      state:state.botState,
      message:state.message,
      botSettingsList:state.botSettingsList,
      handleSetName:n=>dispatch({type:"setName",name:n}),
      handleReply:m=>handleReply(m),
      handleLoadBotSettingsList:(firebase)=>handleLoadBotSettingsList(firebase),
      handleDownload:(firebase,index)=>handleDownload(firebase,index),
      handleLoad:loadFromLocalStorage,
      handleCompile:handleCompile,
    }}>
    {props.children}
    </BiomeBotContext.Provider>
  )
}
