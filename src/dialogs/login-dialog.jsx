import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
     height:'calc( 100vh - 64px )',
     overflowY:'scroll',
     overscrollBehavior:'auto',
     WebkitOverflowScrolling:'touch',
     padding: 6
   },
   textField: {
     width: "100%",
   },
   wideButton: {
    width: "100%",
    padding: 16,
    },
}));


export default function LoginDialog(props){
  const classes=useStyles();
  const {account,firebase,userName,mode}=props;
  const [email,setEmail] = useState(account.email);
  const [password,setPassword] = useState("");
  const [authState,setAuthState] = useState(null);
  const [errorMessage,setErrorMessage] = useState("");

  const formFilled = (email!=="" && password !== "");
  const readyToLogin = mode==='login' || formFilled
  
  function handleSignIn(e){
    if(authState==='confirmed') {
      props.handleToParentPage();
    }
    setAuthState('run');
    firebase.signInWithEmailAndPassword(email,password)
    .then(()=>{
      setAuthState("confirmed");
    })
    .catch(error=>{
      setAuthState("error");
      const errorCode = error.code;
      switch(errorCode){
        case 'auth/user-not-found' :
          setErrorMessage("ユーザが登録されていません");
          break;
        case 'auth/wrong-password' :
          setErrorMessage("パスワードが違います");
          break;
        case 'auth/invalid-email' :
          setErrorMessage("不正なemailアドレスです");
          break;
        default:
          setErrorMessage(error.message);
      }
    });
  }

  function handleCreateUser(){
    setAuthState('run');
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error=>{
      setErrorMessage(error.message);
    });
    props.handleToParentPage();

  }

  return (
    <Box className={classes.container}
      display="flex" flexDirection="column"
    >
      <Box>
        <Typography variant="h5">{mode==='login' ? "ログイン" : "新規ユーザ登録" }</Typography>
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
          onChange={(e)=>setEmail(e.target.value)}
        />
      </Box>
      <Box >
        <TextField
          required
          id="password"
          label="Password"
          className={classes.textField}
          margin="normal"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h4">
        {authState==='confirmed' && "ログイン完了！"}
        </Typography>
        
      </Box>
      <Box>
      <Typography color="error">
          {errorMessage}
        </Typography>
        <Button onClick={handleSignIn}
          variant="contained"
          color="primary"
          size="large"
          disabled={formFilled || authState==="run"}
          className={classes.wideButton}>
            {authState==="run" ? "実行中..." : "ログイン" }
        </Button>
      </Box>
      <Box>
        <Button
        size="large"
        disabled={!formFilled}
        className={classes.wideButton}
        onClick={e=>{handleCreateUser()}}
        >
          新規登録
        </Button>
      </Box>
      <Box>
        <Button color="default" 
          className={classes.wideButton}
          size="large"
          onClick={e=>{props.handleToParentPage()}} >
          {authState==="confirmed"? "OK" : "キャンセル"}
        </Button>
      </Box>
    </Box>
  )
}