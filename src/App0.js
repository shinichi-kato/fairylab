import React, { useState,useEffect,useRef } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './dashboard/dashboard.jsx';
import Home from './home/home.jsx';
import Hub from './hub/hub.jsx';

import BiomeBot from './biome-bot/biome-bot.jsx';

import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import {firebaseConfig} from './credentials/firebase-config.jsx';
firebase.initializeApp(firebaseConfig);




const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFB300' },
    secondary: { main: '#26C6DA' },
    background: { default: '#ffe032'}
  },

});

const accountDisconnected={
  displayName:null,
  email:null,
  photoURL:null,
  isAnonymous:null,
  uid:null,
  emailVerified:null,
  providerData:null,
  state:'yet',  //　追加のプロパティ：確認中の間true。account-dialog.jsxで利用
};

function App() {
  const [mode, setMode] = useState("Dashboard");

  //-------------------------------------------------------------------
  // firabase/auth

  const [account,setAccount] = useState({...accountDisconnected  });
  useEffect(()=>{
    // 認証状態のチェック
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setAccount({...user,state:'ok'});
      } else {
        setAccount({...accountDisconnected,state:'yet'})// User is signed out.
        // ...
      }
    });
  },[]);


  // --------------------------------------------------------------------------
  // firebase / firestore　への接続


  const firestoreRef = useRef(null);
  const fsMessageRef = useRef(null);

  useEffect(() => {
    if(account.uid !== null){
      firestoreRef.current = firebase.firestore();
      fsMessageRef.current = firestoreRef.current.collection("Messages");
      fsMessageRef.current
          .orderBy('timestamp','desc')
          .limit(12)
          .onSnapshot((query)=>syncHubLog(query));

        return(()=>{
          fsMessageRef.current
            .orderBy('timestamp','desc')
            .limit(12)
            .onSnapshot(function(){});
        });
      }


  },[account]);


  const [hubLog,setHubLog] = useState([]);

  function syncHubLog(query){
    const messages = query.docs.map(doc => {
      const data=doc.data();
      const ts=new Date(data.timestamp.seconds*1000);
      return {...data,timestamp:ts,id:doc.id}
    });
    setHubLog(messages.reverse());
  }


  function handleWriteUserMessage(message,userName,userAvatar){
    fsMessageRef.current.add({
      uid:account.uid,
      name:userName,
      text:message,
      avatar:userAvatar,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }


  //---------------------------------------------------------------
  // firebase / storageからのチャットボット辞書のダウンロード

  const [dictionary,setDictionary] = useState({});
  const [chatbot,setChatbot] = useState(new BiomeBot());

  function handleDownloadDictionaries(paths){
    // 複数の辞書をダウンロードしてlocalStorageに格納→biomeボットの生成
    chatbot.load();
  }

  function handleUpdate(){
    chatbot.load();
  }
  //------------------------------------------------------------------

  useEffect(() => {
    // body要素のバウンススクロールを無効化
    const handler = (event) => {
      if (handler.event.touches[0].target.tagName.toLowerCase() === "body"){
        event.preventDefault();
      }
    }

    window.addEventListener("touchstart",handler);
    window.addEventListener("touchmove",handler);
    window.addEventListener("touchend",handler);

    return () => {
      window.removeEventListener("touchstart",handler);
      window.removeEventListener("touchmove",handler);
      window.removeEventListener("touchend",handler);
    }
  },[]);
  function handleChangeAccount(a) { setAccount(a) }
  function handleToHome(){ setMode('Home') }
  function handleToHub(){ setMode('Hub') }
  function handleToDashboard(){ setMode('Dashboard') }


  return (
    <ThemeProvider theme={theme} >
      { mode === "Dashboard" &&
        <Dashboard
          account={account}
          handleChangeAccount={handleChangeAccount}
          firebase={firebase}
          chatbot={chatbot}
          firestoreRef={firestoreRef}
          handleToHome={handleToHome}
          handleToHub={handleToHub}
        />
      }
      { mode === "Home" &&
        <Home
          account={account}
          firebase={firebase}
          chatbot={chatbot}
          handleExit={handleToDashboard}
        />
      }
      { mode === "Hub" &&
        <Hub
          account={account}
          hubLog={hubLog}
          handleWriteUserMessage={handleWriteUserMessage}
          handleExit={handleToDashboard}
        />
      }
    </ThemeProvider>
  );
}

export default App;
