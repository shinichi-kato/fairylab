import React ,{useContext} from 'react';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MemoryIcon from '@material-ui/icons/Memory';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';






import {BiomeBotContext} from './biome-bot-provider.jsx';
const indicatorIcons = {
  "init": <PowerSettingsNewIcon />,
  'listLoading': <CloudDownloadIcon />,
  'listLoaded':  <CloudDoneIcon />,
  'firebaseDisconnected': <CloudOffIcon />,
  'working':  <MemoryIcon/>,
  'ready': <PersonPinCircleIcon />,
};

export default function Indicator(props){
  const bot = useContext(BiomeBotContext);

  return(
    <>
    {indicatorIcons[bot.state]}
    </>
  )
}
