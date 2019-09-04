import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ApplicationBar(props){
  const classes = useStyles();
  const [anchorEl,setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEdit(){
    handleClose();
    props.handleEdit();
  }

  function handleChat(e){
    handleClose();
    props.handleChat();
  }

  function handleUpload(){
    handleClose();
    props.handleUpload();
  }

  function handleDeleteHomeLog(){
    localStorage.removeItem('homeLog');
  }

  const signedIn = Boolean(props.account.uid);

  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="exit"
            onClick={props.handleExit}>
            <NavigateBefore />
          </IconButton>
          <Typography variant="h6" className={classes.title}>

          </Typography>
          <IconButton edge="end"
            className={classes.menuButton}
            aria-label="home-menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',

                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>チャットボット辞書の編集</MenuItem>
            <MenuItem onClick={handleUpload}
              disabled = {!signedIn}>
              { signedIn ? "アップロード" : "アップロード(要サインイン)"} </MenuItem>
            <MenuItem onClick={handleDeleteHomeLog}>ログの削除</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
