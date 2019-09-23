import React , {useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import ExtensionIcon from '@material-ui/icons/ExtensionOutlined';
import HearingIcon from '@material-ui/icons/Hearing';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const icons={
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

export default function PartCard(props){
  const {part} = props;
  const classes=useStyles();
  const subheader=
    `稼働率:${part.availability} トリガーレベル:${part.triggerLevel} 維持率:${part.retention}`;

  const icon=icons[part.type];

  return(
    <Card className={classes.card} key={part.dictionary}>
      <CardHeader
        avatar={
          <Avatar style={{backgroundColor:icon.backgroundColor}}>{icon.icon}</Avatar>
        }
        title={part.type}
        subheader={subheader}
        action={
          <>
            <IconButton
              onClick={e=>props.handleDown()}>
              <ExpandMoreIcon />
            </IconButton>
            <IconButton
              onClick={e=>props.handleUp()}>
              <ExpandLessIcon />
            </IconButton>
          </>
        }
      />
      <CardActions>
      {part.dictionary}
      <IconButton
        onClick={e=>props.handleEdit()}
      ><EditIcon /></IconButton>
      </CardActions>
    </Card>

  )
}
