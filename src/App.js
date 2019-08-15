import React, { useState,useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './dashboard/dashboard.jsx';
import Home from './home/home.jsx';
import Hub from './hub/hub.jsx';

import * as firebase from 'firebase/app';
import "firebase/auth";

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
  const [account,setAccount] = useState({...accountDisconnected  });

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setAccount({...user,state:'ok'});
      } else {
        setAccount({...accountDisconnected,state:'yet'})// User is signed out.
        // ...
      }
    });
  },[]);

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
  });


  return (
    <ThemeProvider theme={theme}>
      { mode === "Dashboard" &&
        <Dashboard
          account={account}
          handleChangeAccount={a=>setAccount(a)}
          firebase={firebase}
          handleToHome={() => setMode('Home')}
          handleToHub={() => setMode('Hub')}
        />
      }
      { mode === "Home" &&
        <Home
          handleExit={() => setMode('Dashboard')}
        />
      }
      { mode === "Hub" &&
        <Hub
          handleExit={() => setMode('Dashboard')}
        />
      }
    </ThemeProvider>
  );
}

export default App;
