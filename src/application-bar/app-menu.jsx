import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


import MoreVert from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Warning from '@material-ui/icons/Warning';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';

import {version} from '../../package.json';

const useStyles = makeStyles(theme => ({
  root: {
    padding:theme.spacing(1,0.5),
    width: 320,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%",
  },
  button: {
    margin: theme.spacing(1),
  },
  expand: {
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  wideButton: {
    width: "100%",
  }
}));

function AppMenuDialog(props){
  const classes = useStyles();
  const {id,anchorEl,open,handleClose,account,firebase} = props;        

  const loggedIn=account.email !== null;
  console.log("email=",account.email)

  function handleToScriptEditor(e){
    props.handleToScriptEditor();
    handleClose();
    }  
    
  function handleToUploadDialog(e){
    props.handleToUploadDialog();
    handleClose();
  } 
  
  function handleToLoginDialog(e){
    props.handleToLoginDialog();
    handleClose();
  }

  function handleLogout(e){

  }
 

  return (
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <Paper className={classes.root} >
        <Box display="flex" flexDirection="column">
          <Box>
            {loggedIn ?
              <Typography variant="h6">
                <AccountCircle/>{account.email}
              </Typography>
              :
              <>
                <Typography variant="h6">
                  <Warning color="error"/>ログインしていません</Typography>
                <Typography variant="subtext">アップロード,ダウンロード,Hubを利用するにはログインしてください。</Typography>
              </>
            }
          </Box>
          <Box>
            <Button onClick={()=>handleToLoginDialog('login')} 
              className={classes.wideButton}
              disabled={loggedIn}
              variant="contained">
              ログイン
            </Button>
          </Box>
          <Box>
            <Button onClick={()=>handleToLoginDialog('createUser')}
              disabled={loggedIn}
              className={classes.wideButton}
            >
              新規ユーザ登録
            </Button>
          </Box>
          <Box>
            <Button  
              onClick={handleLogout}
              className={classes.wideButton}
              disabled={!loggedIn}
              >
              ログアウト
            </Button>
          </Box>
          <Box>
            <Button onClick={handleToScriptEditor}  
              className={classes.wideButton}
              >
              スクリプトの編集
            </Button>
          </Box>
          <Box>
            <Button onClick={handleToUploadDialog}
              disabled={!loggedIn}
              color="inherit"
              >
              <CloudUploadIcon/>スクリプトのアップロード
            </Button>
          </Box>
          <Box>
            {version}
          </Box>
        </Box>
      </Paper>
    </Popover>
  );
}

export default function AppMenu(props){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;
  
    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose(){
      setAnchorEl(null);
    }

    return (
        <>
          <IconButton
            aria-describedby={id} variant="contained" onClick={handleClick}>
          <MoreVert />
          </IconButton>
          <AppMenuDialog
            id={id}
            open={open}
            anchorEl={anchorEl}
            account={props.account}
            firebase={props.firebase}
            handleClose={handleClose}
            handleToScriptEditor={props.handleToScriptEditor}
            handleToLoginDialog={props.handleToLoginDialog}
            handleToUploadDialog={props.handleToUploadDialog}
            />
        </>
    );
}