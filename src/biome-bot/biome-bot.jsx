import React, { useState,useEffect,createContext } from 'react';
import BiomeBot from '../biome-bot/BiomeBot.jsx'
export const BiomebotContext = createContext();

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

function reducer(state,action) {
  switch(action.type) {
    case: ''
  }
}

export default function BiomeBotProvider(props){

  const [bot,setBot] = useState(new BiomeBot());
  const logRef =useRef(null);

  useEffect(()=>{
    bot.load();
    bot.setup();
  },[])

  function handleSetLog(log){
    logRef.current
  }
  function handleReply(message){
    // メッセージを受け取り返答をログに追記
  }

  function handleDownload(path){
    // pathで指定されたSettingsをfirebaseからlocalStorageにダウンロードし、
    // parts、dictsもダウンロード
  }

  function handleCompile(){
    // localStorageの辞書をコンパイル
  }



  return(
    <BiomebotContext.Provider value={{
      name:name,
      handleSetLog:l=>handleSetLog(l),
      handleReply:m=>handleReply(m),
      handleDownload:p=>handleDownload(m),
      handleCompile:()=>handleCompile(),
    }}>
    {props.children}
    </BiomebotContext.Provider>
  )
}
