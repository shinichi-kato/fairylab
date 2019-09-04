import React, { useState,useEffect,useRef } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


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



const initialState = {
  account:{
    displayName: null,
    email: null,
    photoURL: null,
    isAnonymous: null,
    uid: null,
    emailVerified: null,
    providerData: null,
  },
  accountState:'yet',

  mode: 'Dashboard',
}};



const reducer = (state,action) => {
  swtich(action.type){
    case : "AutoSignIn" : {
      return {
        ...state,
        account:{...action.account},
        mode: 'Dashboard'
      };
    }
    case ; "PromptSignIn": {
      return {
        ...state,
        mode: 'PromptSignIn'
      };
    }
  }
};

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);

  //-------------------------------------------------------------------
  // firabase/auth

  useEffect(()=>{    // 認証状態のチェック
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({type:'AutoSignIn',account:{...user}});
      else{
        dispatch({type:'PromptSignIn'});
      }
    });
  },[])

  // --------------------------------------------------------------------------
  // firebase / firestore　への接続

  const [message,setMessage] = useState({
    text:"",
    uid:null,
    avatarId:null,
  });


  // --------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme} >
      <BiomeBot>
      <ApplicationBar />
      { state.mode === 'Dashboard' &&
        <Dashboard />
      }
      </BiomeBot>
    </ThemeProvider>
  );
}

export default App;
