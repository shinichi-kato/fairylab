import React ,{ useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    padding:theme.spacing(2,1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export default function AccountDialog(props){
  const classes = useStyles();
  const [email,setEmail] = useState(props.account.email || "");
  const [password,setPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");



  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    props.handleChangeAccount({...props.account,state:'yet'});
    setAnchorEl(null);

  }
  const authState = props.account.state;

  function handleSignIn() {

    if (authState !== "run"){
      props.handleChangeAccount({...props.account,state:'run'});

      props.firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
          props.handleChangeAccount({...props.account,state:'error'})

          if(errorCode === 'auth/user-not-found') {
            setMessage("ユーザが登録されていません");
          }
          else if(errorCode === 'auth/wrong-password') {
            setMessage("パスワードが違います");
          }
          else if(errorCode === 'auth/invalid-email') {
            setMessage("不正なemailアドレスです");
          }
          else{
            setMessage(errorMessage)
          };
    });}

    else if (authState === 'ok'){
        handleClose();
    }
  }

  function handleNewAccount(e){
    props.firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      if(errorCode === 'auth/wrong-password') {
        setMessage("パスワードが違います");
      }
      else{
        setMessage(errorMessage)
      };
    });
  }

  function handleClearLocalStorage(e){
    localStorage.clear();
  }




  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : undefined;


  return(
    <div>
      {props.account.displayName || props.account.email}
      <IconButton
        aria-describedby={id} variant="contained" onClick={handleClick}>
      <AccountCircle />
      </IconButton>
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
       <Paper className={classes.root}>
        <Box display="flex" flexDirection="column">
        <Box>

          <Typography><AccountCircle />サインイン</Typography>
        </Box>
        <Box>
          <TextField
            required
            id="email"
            label="e-mail"
            className={classes.textField}
            margin="normal"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            required
            id="password"
            id="password"
            label="Password"
            className={classes.textField}
            margin="normal"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)} />
          </Box>
          <Box display="inline-box">

            <Button className={classes.button}
              color="primary"
              disabled ={authState === "run"}
              variant="contained"
            onClick={handleSignIn}>
            {authState === 'ok' && 'OK'}
            {(authState === 'yet' || authState === 'error')
              && 'サインイン'}
            {authState === 'run' && '確認中'}
            </Button>
            <Button className={classes.button}
              color="default" onClick={handleClose}>
            Cancel
            </Button>
            <Button className={classes.button}
              color="primary" onClick={handleNewAccount}>
            新規登録
            </Button>
          </Box>
          {message && <Box>{message}</Box>}
          <Box>
            <Button variant="contained" onClick={handleClearLocalStorage}>
            LocalStorageを削除(開発用)
            </Button>
          </Box>
        </Box>
       </Paper>
      </Popover>
   </div>
 );
}
