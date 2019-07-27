import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Dashboard from './dashboard/dashboard.jsx';

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
          handleToHome={() => setMode('Home')}
          handleToHub={() => setMode('Hub')}
        />
      }
    </ThemeProvider>
  );
}

export default App;
