import React , {useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {partIcons} from './part-icons.jsx';


export default function TypeSelectorDialog(props){
  const {handleChangeType,handleClose}=props;

  const typeItems=Object.keys(partIcons).map(t=>
    <MenuItem
      onClick={e=>handleChangeType(t)}
      >
      <ListItemIcon>
      <Avatar style={{backgroundColor:partIcons[t].backgroundColor}}>
      {partIcons[t].icon}
      </Avatar>
      </ListItemIcon>
      <ListItemText>
      {t}
      </ListItemText>
    </MenuItem>
  )
  return(
    <Menu
      id="type-selector-dialog"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={handleClose}
    >
    <>
    {typeItems}
    </>
    </Menu>



  )
}
