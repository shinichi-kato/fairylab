import React ,{useState,useReducer,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';

import MoreVert from '@material-ui/icons/MoreVert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Warning from '@material-ui/icons/Warning';

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
    width: "80%",
  }
}));


const initialState = {
  eMail: null,
  password:null,
  authState:null,
  errorMessage:null,
};

const reducer = (state,action) => {
  switch(action.type) {
    case 'ChangeEMail' : {
      return {
        ...state,
        eMail:action.eMail,
      };
    }
    case 'ChangePassword' : {
      return {
        ...state,
        password: action.password
      };
    }
    case 'Auth': {
      return {
        ...state,
        eMail:action.eMail || state.eMail,
        errorMessage:action.errorMessage || null,
        authState:action.authState
      };
    }
    default :
      throw new Error(`invalid action ${action.type} in AppMenuDialog`)
  }
};

function AppMenuDialog(props){
  const classes = useStyles();
  const {id,anchorEl,open,handleClose,account,firebase} = props;
  const [state,dispatch] = useReducer(reducer,initialState);
  const [expanded,setExpanded] = useState(null);

  function handleExpandClick(e){
    setExpanded(!expanded);
  }

  function handleSignIn(e){
    if(state.authState==='confirmed'){
      handleClose();
    }
      dispatch({type:"Auth",authState:"run"});
      firebase.signInWithEmailAndPassword(state.eMail, state.password)
        .then(()=>{
          dispatch({type:"Auth",authState:"confirmed"})
        })
        .catch(function(error) {
          const errorCode = error.code;
          let errorMessage = "";
          switch (errorCode) {
            case 'auth/user-not-found' :
              errorMessage="ユーザが登録されていません";
              break;
            case 'auth/wrong-password' :
              errorMessage="パスワードが違います";
              break;
            case 'auth/invalid-email' :
              errorMessage="不正なemailアドレスです";
              break;
            default:
              errorMessage=error.message;
          }
          dispatch({
            type:"Auth",
            authState:"error",
            errorMessage:errorMessage
          });
        });
    }

  function handleToScriptEditor(e){
    props.handleToScriptEditor();
    handleClose();
  }

  //------------------------------------------------------
  // accountの状態が変わったらAuthに反映

  useEffect(() => {
    let didCancel = false;
    if(!didCancel){
      if(account.uid){
        dispatch({
          type:"Auth",
          eMail: account.email,
          authState:"ready",
      })}
      else{
        dispatch({
          type:"Auth",
          authState:false
        })
      }
    }
    return () => {
      didCancel = true;
    }
  },[account.uid]);

  return(
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
          <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12}>
              <Button onClick={handleExpandClick} color="inherit">
                <AccountCircle />
                {account.displayName || account.email || "未ログイン"}
                <ExpandLess

                  className={expanded ? classes.expand : classes.expandOpen}
                  aria-expanded={expanded}
                  aria-label="show more" />
              </Button>

            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <TextField
                  required
                  id="email"
                  label="e-mail"
                  className={classes.textField}
                  margin="normal"
                  type="email"
                  value={state.eMail}
                  onChange={(e)=>dispatch({type:'ChangeEMail',eMail:e.target.value})}
                />

                <TextField
                  required
                  id="password"
                  label="Password"
                  className={classes.textField}
                  margin="normal"
                  type="password"
                  value={state.password}
                  onChange={e=>dispatch({type:'ChangePassword',password:e.target.value})} />
                <Button
                  disabled={state.authState==="run"}
                  variant="contained"
                  color="primary"
                  className={classes.wideButton}
                  onClick={handleSignIn}>

                  {account.uid ?
                    (state.authState==="confirmed" ? "ok" : "ログイン")
                     : "新規登録"}
                </Button>
                {state.authState === "error" &&

                  <Typography variant="caption">
                  <Warning color="error"/>
                  {state.errorMessage}
                  </Typography>
                }
            </Collapse>
            </Grid>
            <Grid item xs={12}>
            <Button className={classes.wideButton}
              onClick={handleToScriptEditor}>
              スクリプトの編集
            </Button>
            </Grid>
            <Grid item xs={12}>
            <Button className={classes.wideButton}
              onClick={e=>localStorage.clear()}>
              localStorage消去
            </Button>
            </Grid>
            <Grid item xs={12}>
            <Button className={classes.wideButton}
              onClick={e=>window.location.reload(true)}>
              再描画
            </Button>
            </Grid>
          </Grid>
         </Paper>
       </Popover>
     )
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
        handleClose={handleClose}
        account={props.account}
        firebase={props.firebase}
        handleAuth={props.handleAuth}
        handleToScriptEditor={props.handleToScriptEditor}
      />
    </>
  )
}
