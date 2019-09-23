import React, {useReducer,createContext } from 'react';
import BiomeBot from './BiomeBot.jsx';
import {echoBot,internalReprBot} from './PresetBots.jsx';

export const BiomeBotContext = createContext();

const bot = new BiomeBot();



const initialState = {
  state: localStorage.getItem('bot.id') ? 'ready' : 'init',
  id: localStorage.getItem('bot.id') || null,
  botSettingsList : [echoBot,internalReprBot],
};

function reducer (state,action){
  switch(action.type){
    case 'ready':{

      return {
        state: 'ready',
        id: action.id,
        botSettingsList: state.botSettingsList.map(node=>{
          return {...node,parts:[...node.parts]}
        })
      }
    }
    case 'listLoading':{
      return {
        state:'listLoading',
        id: state.id,
        botSettingsList: [],
      }
    }

    case 'listLoaded': {
      let state='listLoaded';
      let id= state.id;
      if(bot.id !== null && bot.name !== null){
        // ボット設定済みの状態でリストをロード→キャンセルした場合
        state='ready';
        id=bot.id;
      }
      return {
        state:state,
        id: id,
        botSettingsList: action.botSettingsList.map(node=>{
          return {...node,parts:[...node.parts]}
        })};
    }

    case 'firebaseDisconnected': {
      return {
        state: 'disconnented',
        id: state.id,
        botSettingsList: state.botSettingsList.map(node=>{
          return {...node,parts:[...node.parts]}
        })
      }
    }

    case 'setName':{
      return {
        ...state,
        botSettingsList: state.botSettingsList.map(node=>{
          return {...node,parts:[...node.parts]}
        })
      }
    }
    default:
      throw new Error('invalid action ${action} in BiomeBotProvider')
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

    const settings=[echoBot,internalReprBot];
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

  function handleDownload(firebase,index){
    const botSettings = state.botSettingsList[index];

    bot.load(botSettings);
    if(botSettings.id.startsWith('@dev')){
      bot.setup();
      bot.save();
      dispatch({type:'ready',id:botSettings.id});
      return;
    }
    if (!firebase) {
      dispatch({type:'firebaseDisconnected'})
      return
    }
    // botSettingsList[index]をbotに書き込む。
    // partsに従って辞書をダウンロードする
    dispatch({type:'dicLoading'});

    // ここで辞書ファイルをfetch()

    // bot.loadDictionaries()
    //   .then(res=>res.json())
    //   .then(result=>{
    //     dispatch({type:'dicLoaded',res:res})})
    //   .then(()=>{
    //     dispatch({type:'compiling'});
    //     bot.compile()})
    //   .then(()=>{
    //     dispatch({type:'ready'})}
    //   )
  }

  function handleReply(message){
    // メッセージを受け取り返答をログに追記
    return bot.reply(message)
  }


  function handleCompile(){
    // localStorageの辞書をコンパイル
  }


  return(
    <BiomeBotContext.Provider value={{
      name:bot.name,
      avatarId:bot.avatarId,
      state:state.state,
      botSettingsList:state.botSettingsList,
      handleSetName:n=>{dispatch({type:"setName",name:n})},
      handleReply:m=>handleReply(m),
      handleLoadBotSettingsList:(firebase)=>handleLoadBotSettingsList(firebase),
      handleDownload:(firebase,index)=>handleDownload(firebase,index),
      handleCompile:()=>handleCompile(),
    }}>
    {props.children}
    </BiomeBotContext.Provider>
  )
}
