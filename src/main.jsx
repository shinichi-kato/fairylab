import React, { useContext,useReducer,useEffect } from 'react';
import Box from '@material-ui/core/Box';
import ApplicationBar from './application-bar/application-bar.jsx';
import Dashboard from './dashboard/dashboard.jsx';
import UserSettings from './dashboard/user-settings.jsx';
import BotSettings from './dashboard/bot-settings.jsx';
import ScriptEditor from './script-editor/script-editor.jsx';

import * as firebase from 'firebase/app';
import "firebase/auth";

import {firebaseConfig} from './credentials/firebase-config.jsx';
firebase.initializeApp(firebaseConfig);


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
  userAvatar: localStorage.getItem('userAvatar') || 'blank',

  page: 'Dashboard',
  parentPage: null,
}

const reducer = (state,action) => {
  switch(action.type) {
    case 'Auth' : {
      return {
        ...state,
        account: {...action.user}
      }
    };
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
      }else{
        return {
          ...state,
          account: {...state.account},
          page: action.page,
        }
      }
    }
    case 'ToParentPage' : {
      let page = null;
      switch(state.page) {
        case 'ScriptEditor':
          page = state.parentPage || 'Dashboard';
          break;
        case 'PartEditor' :
          page = 'ScriptEditor';
          break;
        case 'DictionaryEditor' :
          page='PartEditor';
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
            hadleChangeUserSettings={(name,avatar)=>
              dispatch({type:'ChangeUserSettings,userName:name,userAvatar:avatar'})}/>
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
          <ScriptEditor />
        );
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
          handleAuth={(user) => dispatch({type:'Auth',user:user})}
          handleToScriptEditor={()=>dispatch({type:'ChangePage',page:'ScriptEditor'})}
          handleToParentPage={()=>dispatch({type:'ToParentPage'})} />
      </Box>
      <Box flexGrow={1}>
        {mainView(state.page)}
      </Box>
    </Box>
  )
}
