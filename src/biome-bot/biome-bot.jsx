import React, { useState,useEffect,createContext } from 'react';
import BiomeBot from './BiomeBot.jsx';

export const BiomeBotContext = createContext();

// const echoBot={
//   name:"Echo",
//   id:"@dev/echo",
//   avatarId:"blank",
//   description:"ユーザのセリフをそのまま返すエコーです",
//   parts: [{
//     name:'echo',
//     type:'dev/echo',
//     availability: 0.9,
//     triggerLevel: 0,
//     retention: 1,
//     dictionary: "",
//   }],
//   sourceDicts: [],
//   compiledDicts: [],
// };
//
// const initialState = {
//   state:'init',
//   settings:{
//     name: localStorage.getItem('bot.name') || echoBot.name,
//     id: localStorage.getItem('bot.id') || echoBot.id,
//     avatarId: localStorage.getItem('bot.avatarId') || echoBot.avatarId,
//     description: localStorage.getItem('bot.description') || echoBot.description,
//   },
//   parts: JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts,
//   sourceDicts: JSON.parse(localStorage.getItem('bot.sourceDicts')) || [],
//   compiledDicts: JSON.parse(localStorage.getItem('bot.compiledDicts')) || [],
// };



export default function BiomeBotProvider(props){
  const [state,setState] = useState('init');
  const [bot,setBot] = useState(new BiomeBot());

  useEffect(()=>{
    bot.setup();
  },[])

  function handleReply(message){
    // メッセージを受け取り返答をログに追記
    console.log("handleReply",message)
    return bot.reply(message)
  }

  function handleDownload(path){
    // pathで指定されたSettingsをfirebaseからlocalStorageにダウンロードし、
    // parts、dictsもダウンロード

  }

  function handleCompile(){
    // localStorageの辞書をコンパイル
  }



  return(
    <BiomeBotContext.Provider value={{
      name:bot.name,
      state:state,
      handleReply:m=>handleReply(m),
      handleDownload:p=>{handleDownload(p)},
      handleCompile:()=>{handleCompile()},
    }}>
    {props.children}
    </BiomeBotContext.Provider>
  )
}
