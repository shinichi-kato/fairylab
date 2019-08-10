import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './dashboard/dashboard.jsx';
import Home from './home/home.jsx';
import Hub from './hub/hub.jsx';

import * as firebase from 'firebase/app';
import "firebase/auth";

import firebaseConfig from './credentials/firebase-config.jsx';
firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFB300' },
    secondary: { main: '#26C6DA' },
    background: { default: '#ffe032'}
  },

});


function App() {
  const [mode, setMode] = useState("Dashboard");

  return (
    <ThemeProvider theme={theme}>
      { mode === "Dashboard" &&
        <Dashboard
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
