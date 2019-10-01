import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import BiomeBotProvider from './biome-bot/biome-bot-provider.jsx';
import Main from './main.jsx';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#0D47A1' },
    secondary: { main: '#BF360C' },
    background: { default: '#ffe032'}
  },

});

function App() {
  return (
    <ThemeProvider theme={theme} >
      <BiomeBotProvider>
        <Main />
      </BiomeBotProvider>
    </ThemeProvider>
  );
}

export default App;
