import React ,{useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EditIcon from '@material-ui/icons/Edit';

import PartEditor from './part-editor.jsx';

import {partIcons} from './part-icons.jsx';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const initialState={
  expanded: false,
  anchorEl: null,
  deleteDialogOpen: false,
}

function reducer(state,action){
  switch(action.type){
    case 'OpenEditor':{
      return{
        expanded: true,
        anchorEl: null,
        deleteDialogOpen: false,
      }
    }
    case 'CloseEditor':{
      return {
        expanded: false,
        anchorEl: false,
        deleteDialogOpen: false,
      }
    }
    case 'OpenTypeSelector': {
      return{
        expanded: true,
        anchorEl: action.event.currentTarget,
        deleteDialogOpen: false,
      }
    }
    case 'CloseTypeSelector':{
      return {
        expanded: true,
        anchorEl: false,
        deleteDialogOpen: false,
      }
    }
    case 'OpenDeleteDialog':{
      return {
        expanded: true,
        anchorEl: false,
        deleteDialogOpen: true,
      }
    }
    case 'CloseDeleteDialog':{
      return {
        expanded: true,
        anchorEl: false,
        deleteDialogOpen: false,
      }
    }
    default:
      throw new Error(`invalid action ${action.type}`);
  }
}


export default function PartCard(props){
  const {part} = props;
  const classes=useStyles();
  const [state,dispatch] = useReducer(reducer,initialState);
  // collapseでeditorを開く
  // editorの中でdialogをopenする

  const params=
    `稼働率:${part.availability} トリガーレベル:${part.triggerLevel} 維持率:${part.retention}`;
  const icon=partIcons[part.type];

  function handleChangePart(part){
    props.handleChangePart(part);
    dispatch({type:'CloseEditor'})
  }


  return(
    <Card className={classes.card} key={part.name}>
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
      {!state.expanded &&
        <CardActions>
          {params}
          <IconButton
            onClick={()=>dispatch({type:'OpenEditor'})}>
            <EditIcon />
          </IconButton>
        </CardActions>
      }
      <Collapse in={state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <PartEditor
            part={part}
            handleChangePart={handleChangePart}
            handleClose={()=>dispatch({type:'CloseEditor'})}
            anchorEl={state.anchorEl}
            handleOpenTypeSelector={e=>dispatch({type:'OpenTypeSelector',event:e})}
            handleCloseTypeSelector={()=>dispatch({type:'CloseTypeSelector'})}
            deleteDialogOpen={state.deleteDialogOpen}
            handleOpenDeleteDialog={()=>dispatch({type:'OpenDeleteDialog'})}
            handleCloseDeleteDialog={()=>dispatch({type:'CloseDeleteDialog'})}
            handleExecuteDelete={props.handleExecuteDelete}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}
