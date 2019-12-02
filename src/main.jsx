import React, {useReducer,useEffect,useRef,useState,useContext } from 'react';
import Box from '@material-ui/core/Box';
import ApplicationBar from './application-bar/application-bar.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import UserSettings from './dashboard/user-settings.jsx';
import BotDownloader from './dashboard/bot-downloader.jsx';
import BotSettings from './dashboard/bot-settings.jsx';
import ScriptEditor from './script-editor/script-editor.jsx';
import LoginDialog from './dialogs/login-dialog.jsx';
import UploadDialog from './dialogs/upload-dialog.jsx';
import Home from './home/home.jsx';
import Hub from './hub/hub.jsx';

import {BiomeBotContext} from './biome-bot/biome-bot-provider.jsx';


import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import {firebaseConfig} from './credentials/firebase-init.js';
const app=firebase.initializeApp(firebaseConfig);

const initialState = {
  account: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
    emailVerified: null,
    providerData: null,
  },
  accountState: 'init',
  userName: localStorage.getItem('userName') || '',
  userAvatar: localStorage.getItem('userAvatar') || 'avatar/user/blank.svg',

  page: 'Dashboard',
  currentPart: null,
  parentPage: null,
}

const reducer = (state,action) => {
  switch(action.type) {
    case 'Auth' : {
      return {
        ...state,
        account: {...action.user}
      }
    }
    case 'AuthDisconnected' : {
      return {
        ...state,
        account: {
          displayName: null,
          email: null,
          photoURL: null,
          uid: null,
          emailVerified: null,
          providerData: null,
        }
      };
    }
    case 'ChangeUserSettings': {
      localStorage.setItem('userName',action.userName);
      localStorage.setItem('userAvatar',action.userAvatar);
      return {
        ...state,
        account: {...state.account},
        userName:action.userName,
        userAvatar:action.userAvatar
      };
    }

    case 'ChangePage' : {
      if(state.page === 'Hub' || state.page === 'Home' || state.page==='Dashboard'){
        return {
          ...state,
          account: {...state.account},
          page: action.page,
          parentPage: state.page
        };
      }else {
        return {
          ...state,
          account: {...state.account},
          page: action.page,
        }
      }
    }


    case 'ToParentPage' : {
      let page = null;
      let part = null;
      switch(state.page) {
        case 'ScriptEditor':
          page = state.parentPage || 'Dashboard';
          break;
        case 'PartEditor' :
          page = 'ScriptEditor';
          break;
        case 'Dashboard' :
          page=null;
          break;
        default :
          page='Dashboard';
      }
      return {
        ...state,
        account:{...state.account},
        currentPart:part,
        page:page
      }}

      default :
        throw new Error(`invalid action ${action.type} in Main`);
    }

};

export default function Main(){
  const bot = useContext(BiomeBotContext);
  const [state,dispatch] = useReducer(reducer,initialState);

  //----------------------------------------------------
  // firebase / auth

  useEffect(()=>{
    let didCancel = false;
    // 認証状態のチェック
    if(!didCancel){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch({type:'Auth',user:user});
        } else {
          dispatch({type:'AuthDisconnected'});
        }
      });
    }
    return () => {
      didCancel = true;
    }
  },[]);


  // ----------------------------------------------------
  // firestore / hubLog I/O

  const firestoreRef = useRef(null);
  const fsMessagesRef = useRef(null);

  
  useEffect(()=>{
    let didCancel = false;

    if(!didCancel && state.account.uid !== null){
      firestoreRef.current = firebase.firestore(app);
      fsMessagesRef.current = firestoreRef.current.collection("Messages");
      fsMessagesRef.current
          .orderBy('timestamp','desc')
          .limit(12)
          .onSnapshot((query)=>syncHubLog(query));

        return(()=>{
          didCancel = true;
          fsMessagesRef.current
            .orderBy('timestamp','desc')
            .limit(12)
            .onSnapshot(function(){});
        });
      }


  },[state.account]);



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
    fsMessagesRef.current.add({
      uid:state.account.uid,
      name:userName,
      text:message,
      avatar:userAvatar,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }


  //-------------------------------------------------------------
  //  forebase - Uploader / Downloader

  const [loadingState,setLoadingState] = useState(false);

  function isScriptExists(botId){
    // 他のユーザがすでにidを使用している場合書き込みができない。
    // 自分が同じidを使っている場合は上書きされる。

    if(state.account.uid === null) return false;
    if(firestoreRef.current === null) {
      firestoreRef.current = firebase.firestore(app);
    }

    const creator =  state.account.email || state.userName;
    const id = botId || localStorage.getItem('bot.id');
    let isExists = false;
    let ownedBy = "";
    
    firestoreRef.current.collection("bot")
      .where(firebase.firestore.FieldPath.documentId(),"==",id)
      .get()
      .then(docs=>{
        ownedBy = "ownedByOther";
        docs.forEach(doc=>{
          isExists=true;
          if(doc.data().creator===creator){
            ownedBy = "ownedByUser";
          }
        })

        setLoadingState(isExists ? ownedBy : "notExists");
      }).catch(error=>{
        setLoadingState("error");
      })
  }

  function handleUploadScript(message){
    // スクリプトのアップロード
    setLoadingState("UploadStarting");
    if(state.account.uid === null) return;
    if (firestoreRef.current === null) {
      firestoreRef.current = firebase.firestore(app);
    }

    setLoadingState("run");

    if(loadingState==="ownedByOther") {return false}

    const creator =  state.account.email || state.userName;
    const botId = localStorage.getItem('bot.id');

    // not Exists または ownedByUserの場合上書き保存
    firestoreRef.current.collection("bot")
      .doc(botId)
      .set({
        avatarId : localStorage.getItem('bot.avatarId'),
        creator : creator,
        description : localStorage.getItem('bot.description'),
        published: localStorage.getItem('bot.published'),
        parts: JSON.parse(localStorage.getItem('bot.parts')),
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(()=>{
        const parts=JSON.parse(localStorage.getItem('bot.parts')).map(p=>{
          return p.name;
        });
        let batch = firestoreRef.current.batch();
       
        for (let part of parts){
          let dict = localStorage.getItem(`bot.sourceDict.${part}`);
          let ref = firestoreRef.current.collection("dict").doc(`${botId}.${part}`);
          batch.set(ref,{dict:dict,botId:botId});

        }
        batch.commit().then(()=>setLoadingState("success"))
        .catch(error=>setLoadingState(error))
      })
      .catch(error=>{
        setLoadingState(error);
      });
    }
  
  function handleDownloadScript(botId){
    if(botId===null){ return }
    if(state.account.uid === null) return;
    if (firestoreRef.current === null) {
      firestoreRef.current = firebase.firestore(app);
    }

    setLoadingState("startDownload");
    
    firestoreRef.current.collection("bot")
      .doc(botId).get().then(doc=>{
        const data=doc.data();
        localStorage.setItem('bot.id',doc.id);
        localStorage.setItem('bot.avatarId',data.avatarId);
        localStorage.setItem('bot.description',data.description);
        localStorage.setItem('bot.published',data.published);
        localStorage.setItem('bot.parts',JSON.stringify(data.parts));
        return data.parts
      })
      .then(data_parts=>{
        firestoreRef.current.collection("bot")
        .where("botId","==",botId)
        .get()
        .then(parts=>{
          parts.forEach(part=>{
            const data = part.data();
            localStorage.setItem(`bot.sourceDict.${data.name}`,data.dict);
          })
  
        }) 
        bot.handleLoad();
        setLoadingState("downloadSuccess");       

      })
  }

  //------------------------------------------------------------------
  //  body要素のバウンススクロールを無効化

  useEffect(() => {
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

  //-------------------------------------------------------------------

  const mainView = (page) => {
    switch(page){
      case 'Dashboard':
        return (
        <Dashboard
          account={state.account}
          userName={state.userName}
          userAvatar={state.userAvatar}
          handleToUserSettings={()=>dispatch({type:'ChangePage',page:'UserSettings'})}
          handleToBotDownloader={()=>dispatch({type:'ChangePage',page:'BotDownloader'})}
          handleToHome={()=>dispatch({type:'ChangePage',page:'Home'})}
          handleToHub={()=>dispatch({type:'ChangePage',page:'Hub'})}
        />);
      case 'UserSettings':
        return (
          <UserSettings
            userName={state.userName}
            userAvatar={state.userAvatar}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
            handleChangeUserSettings={(name,avatar)=>
              dispatch({type:'ChangeUserSettings',userName:name,userAvatar:avatar})}/>
        )
      case 'BotDownloader':{
        if(firestoreRef.current === null) {
          firestoreRef.current = firebase.firestore(app);
        }
        return(
          <BotDownloader
            loadingState={loadingState}
            account={state.account}
            firebase={firebase}
            firestoreRef ={firestoreRef}
            handleDownloadScript={handleDownloadScript}
            handleToBotSettings={()=>dispatch({type:'ChangePage',page:'BotSettings'})}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );
      }
      case 'BotSettings':{
        return (
          <BotSettings
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        )
      }

      case 'ScriptEditor':
        return(
          <ScriptEditor
            account={state.account}
            firebase={firebase}
            userName={state.userName}
          />
        );
      case 'LoginDialog':
        return(
          <LoginDialog
            mode="login"
            account={state.account}
            firebase={firebase}
            userName={state.userName}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );    
      case 'CreateUserDialog':
        return(
          <LoginDialog
            mode="createUser"
            account={state.account}
            firebase={firebase}
            userName={state.userName}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );    
          
      case 'UploadDialog': {
        if(firestoreRef.current === null) {
          firestoreRef.current = firebase.firestore(app);
        }
        return(
          <UploadDialog
            account={state.account}
            firestoreRef={firestoreRef}
            userName={state.userName}
            loadingState={loadingState}
            isScriptExists={isScriptExists}
            handleUploadScript={handleUploadScript}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );
      }
        
        
      case 'Home':
        return(
          <Home
            account={state.account}
            userName={state.userName}
            userAvatar={state.userAvatar}
          />);
      case 'Hub':
        return(
          <Hub
            hubLog={hubLog}
            handleWriteUserMessage={handleWriteUserMessage}
            account={state.account}
            userName={state.userName}
            userAvatar={state.userAvatar}
          />);
      default :
        return(
          <div>invalid page {page}</div>
        );
    };
  }



  return (
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">
      <Box >

        <ApplicationBar
          page={state.page}
          parentPage={state.parentPage}
          account={state.account}
          userName={state.userName}
          loadingState={loadingState}
          handleAuth={(user) => dispatch({type:'Auth',user:user})}
          handleToScriptEditor={()=>dispatch({type:'ChangePage',page:'ScriptEditor'})}
          handleToUploadDialog={()=>dispatch({type:'ChangePage',page:'UploadDialog'})}
          handleToLoginDialog={mode=>dispatch({type:'ChangePage',page:'LoginDialog'})}
          handleToParentPage={()=>dispatch({type:'ToParentPage'})}
          />
      </Box>
      <Box flexGrow={1}>
        {mainView(state.page)}
      </Box>
    </Box>
  )
}
