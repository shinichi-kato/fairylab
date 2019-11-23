import React, {useReducer,useEffect,useRef,useState } from 'react';
import Box from '@material-ui/core/Box';
import ApplicationBar from './application-bar/application-bar.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import UserSettings from './dashboard/user-settings.jsx';
import BotSettings from './dashboard/bot-settings.jsx';
import ScriptEditor from './script-editor/script-editor.jsx';
import LoginDialog from './dialogs/login-dialog.jsx';
import UploadDialog from './dialogs/upload-dialog.jsx';
import Home from './home/home.jsx';
import Hub from './hub/hub.jsx';

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
      console.log("auth:",action.user)
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

  const [uploadState,setUploadState] = useState(false);

  function isScriptExists(botId){
    // 他のユーザがすでにidを使用している

    if(state.account.uid === null) return false;
    if(firestoreRef.current === null) {
      firestoreRef.current = firebase.firestore(app);
    }

    const creator =  state.account.email || state.userName;
    const id = botId || localStorage.getItem('bot.id');
    
    firestoreRef.current.collection("bot")
      .where("botId","==",id)
      .get()
      .then(docs=>{
        let isExists = false;
        docs.forEach(doc=>{
          if(doc.creator===creator){
            isExists = true;
          }
        })
        setUploadState(isExists ? "exists" : "notExists");
      }).catch(error=>{
        console.log(error);
        setUploadState("error");
      })
  }

  function handleUploadScript(message){
    // スクリプトのアップロード
    // 辞書はこの関数では扱わない。
    setUploadState("UploadStarting");
    if(state.account.uid === null) return;
    if (firestoreRef.current === null) {
      firestoreRef.current = firebase.firestore(app);
    }

    if(uploadState==="exists") {return false}

    const creator =  state.account.email || state.userName;

    setUploadState("run");
    firestoreRef.current.collection("bot")
      .add({
        botId:localStorage.getItem('bot.id'),
        avatarId : localStorage.getItem('bot.avatarId'),
        creator : creator,
        description : localStorage.getItem('bot.description'),
        published: localStorage.getItem('bot.published'),
        parts: JSON.parse(localStorage.getItem('bot.parts')),
        message: message,
      })
      .then(()=>{
        setUploadState("success");
      })
      .catch(error=>{
        setUploadState(error);
      });

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
          handleToBotSettings={()=>dispatch({type:'ChangePage',page:'BotSettings'})}
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
      case 'BotSettings':
        return(
          <BotSettings
            account={state.account}
            firebase ={firebase}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );
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
          
      case 'UploadDialog':
        return(
          <UploadDialog
            account={state.account}
            firebase={firebase}
            userName={state.userName}
            uploadState={uploadState}
            isScriptExists={isScriptExists}
            handleUploadScript={handleUploadScript}
            handleToParentPage={()=>dispatch({type:'ChangePage',page:'Dashboard'})}
          />
        );
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
          uploadState={uploadState}
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
