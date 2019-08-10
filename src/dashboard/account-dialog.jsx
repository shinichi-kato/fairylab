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

}));

export default function AccountDialog(props){
  const classes = useStyles();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [mode,setMode] = useState("SignIn");
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSignIn() {
      props.firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  function handleNewAccount(){
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

  const open = Boolean(anchorEl);
  const id = open ? 'account-popover' : undefined;

  return(
    <div>
      サインインしてください
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
            <Button color="primary" variant="contained"
            onClick={handleSignIn}>
            サインイン
            </Button>
            <Button color="default" onClick={handleClose}>
            Cancel
            </Button>
            <Button color="primary">
            新規登録
            </Button>
          </Box>
        </Box>
       </Paper>
      </Popover>
   </div>
 );
}

// <TextField
//   required
//   id="email"
//   label="Your E-Mail"
//   className={classes.textField}
//   margin="normal"
//   variant="email"
//   value={email}
//   onChange={e=>setEmail(e.target.value)}
//   />
// <TextField
//   required
//   id="password"
//   id="password"
//   label="Password"
//   className={classes.textField}
//   margin="normal"
//   variant="password"
//   value={password}
//   onChange={e=>setPassword(e.target.value)} />
//
//  <Box display="inline-box">
//    <Button color="primary">
//    サインイン
//    </Button>
//    <Button>
//    Cancel
//    </Button>
//    <Button>
//    新規登録
//    </Button>
//  </Box>
