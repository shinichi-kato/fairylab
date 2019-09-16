import React ,{useContext} from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MemoryIcon from '@material-ui/icons/Memory';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';






import {BiomeBotContext} from './biome-bot-provider.jsx';
const indicatorIcons = {
  "init": <PowerSettingsNewIcon />,
  'listLoading': <CloudDownloadIcon />,
  'listLoaded':  <CloudDoneIcon />,
  'firebaseDisconnected': <CloudOffIcon />,
  'working':  <MemoryIcon/>,
};
// const icon = (state) => {
//   switch(bot.state){
//     case 'init': {
//       <BuildIcon />
//     }
//     case 'listLoading':{
//       <CloudDownloadIcon />
//     }
//     case 'listLoaded': {
//       <CloudDoneIcon />
//     }
//     case 'firebaseDisconnected': {
//       <CloudOffIcon />
//     }
//     case 'working': {
//       <MemoryIcon/>
//     }
//   }
// }

export default function Indicator(props){
  const bot = useContext(BiomeBotContext);

  return(
    <>
    {indicatorIcons[bot.state]}
    </>
  )
}
