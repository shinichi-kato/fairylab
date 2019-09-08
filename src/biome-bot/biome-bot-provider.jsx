import React, { useState,useEffect,createContext } from 'react';
import BiomeBot from './BiomeBot.jsx';

export const BiomeBotContext = createContext();


export default function BiomeBotProvider(props){
  const [state,setState] = useState('init');
  const [bot,setBot] = useState(new BiomeBot());

  useEffect(()=>{
    let didCancel = false;
    if(!didCancel){
      bot.setup();
    }
    return ()=>{
      didCancel = true;
    }
  },[])

  function handleReply(message){
    // メッセージを受け取り返答をログに追記
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
      avatar:bot.avatarId,
      state:state,
      handleReply:m=>handleReply(m),
      handleDownload:p=>{handleDownload(p)},
      handleCompile:()=>{handleCompile()},
    }}>
    {props.children}
    </BiomeBotContext.Provider>
  )
}
