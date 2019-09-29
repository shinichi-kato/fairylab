import React  from 'react';
import ExtensionIcon from '@material-ui/icons/Extension';
import HearingIcon from '@material-ui/icons/Hearing';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const partIcons={
  '@dev/internalRepr':{
    icon:<ExtensionIcon/>,
    backgroundColor: '#999999',
  },
  '@dev/echo':{
    icon:<ExtensionIcon/>,
    backgroundColor: '#999999',
  },
  sensor: {
    icon:<HearingIcon/>,
    backgroundColor: '#f44336', //red[500]
  },
  answerer:{
    icon:<RecordVoiceOverIcon/>,
    backgroundColor: '#9c27b0', //purple[500]
  },
  questioner:{
    icon:<RecordVoiceOverIcon/>,
    backgroundColor: '#3f51b5', //indigo[500],
  },
  enactor:{
    icon:<DirectionsWalkIcon/>,
    backgroundColor: '#03a9f4', //lightBlue[500],
  },
  namer:{
    icon:<AssignmentIcon/>,
    backgroundColor: '#009688', //terl[500],
  },
};
