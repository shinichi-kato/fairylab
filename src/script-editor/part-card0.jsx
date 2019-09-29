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

import {partIcons} from './part-icons.jsx';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));



export default function PartCard(props){
  const {part} = props;
  const classes=useStyles();
  const [open,setOpen] = useState(null);
  const id = open ? 'part-editor' : undefined;

  const params=
    `稼働率:${part.availability} トリガーレベル:${part.triggerLevel} 維持率:${part.retention}`;

  const icon=partIcons[part.type];


  return(
    <Card className={classes.card} key={part.dictionary}>
      <CardHeader
        avatar={
          <Avatar style={{backgroundColor:icon.backgroundColor}}>{icon.icon}</Avatar>
        }
        title={part.name}
        subheader={part.type}
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
      {params}
      <IconButton
        aria-describedby={id}
        onClick={e=>setOpen(true)}
      ><EditIcon /></IconButton>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 72,left:4}}
        open={open}
        onClose={setOpen(false)}
        >
        <PartEditor
          part={part}
          handleChangePart={}/>
      </Popover>

      </CardActions>

    </Card>

  )
}
