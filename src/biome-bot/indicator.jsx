import React ,{useContext} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MemoryIcon from '@material-ui/icons/Memory';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import BugReportIcon from '@material-ui/icons/BugReport';






import {BiomeBotContext} from './biome-bot-provider.jsx';
const indicatorIcons = {
  "init": <PowerSettingsNewIcon />,
  'listLoading': <CloudDownloadIcon />,
  'listLoaded':  <CloudDoneIcon />,
  'firebaseDisconnected': <CloudOffIcon />,
  'working':  <MemoryIcon/>,
  'ready': <PersonPinCircleIcon />,
  'ParseError': <BugReportIcon />
};

export default function Indicator(props){
  const bot = useContext(BiomeBotContext);

  return(
    <Tooltip title={bot.message} open={bot.state==='ParseError'}>
      {indicatorIcons[bot.botState]}
    </Tooltip>
  )
}
