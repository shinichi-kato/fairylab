import React , {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const RE_FILENAME=/[\w-]+\.svg$/;

const avatarsDir = 'avatar/user/';
const avatarPaths = [
  '0person.svg',
  '1boy.svg',
  '2girl.svg',
  '3girl.svg',
  '4boy.svg',
  '5girl.svg',
  '6corgi.svg',
  '7cow.svg',
  '8dino.svg',
  '9eleph.svg',
  '10fish.svg',
  '11ladybird.svg',
  '12panther.svg',
  '13lion.svg',
  '14panda.svg',
  '15unico.svg',
];



const useStyles = makeStyles(theme => createStyles({
  root: {
    padding: theme.spacing(2),
  },
  avatarButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  avatar: {
    margin: 10,
    width: 44,
    height: 44
  },
  currentAvatar: {
    margin: 2,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.main,
  },
  textinput: {
    width: '80%',
  }
}));

export default function UserSettings(props){
  const classes=useStyles();
  const [userName,setUserName] = useState(props.userName);
  const [userAvatar,setUserAvatar] =
    useState(props.userAvatar.match(RE_FILENAME) || avatarPaths[0]);


  function handleSelectAvatar(img){
    setUserAvatar(img);
  }

  function handleChangeName(event){
    setUserName(event.target.value);
  }

  function handleChangeUserSettings(event){
    props.handleChangeUserSettings(userName,avatarsDir+userAvatar);
    props.handleToParentPage();
  }

  const avatarItems = avatarPaths.map((img) =>
    <IconButton className={classes.avatarButton} aria-label={img} key={img}
      onClick={(e) => handleSelectAvatar(img)}>
      <Avatar
        src={avatarsDir+img}
        className={
          img === userAvatar ? classes.currentAvatar : classes.avatar}
      />
    </IconButton>
  );

  return (
    <form noValidate autoComplete="off" className={classes.root}>
    <Box
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">

      <Box>
        <Typography variant="h5">Avatar</Typography>
      </Box>
      <Box>
        {avatarItems}
      </Box>
      <Box>
        <Typography variant="h5">User Name</Typography>
      </Box>
      <Box flexGrow={1}>

        <TextField
          className={classes.textinput}
          value={userName}
          placeHolder="ユーザの名前"
          onChange={handleChangeName}
          margin="normal"
        />
      </Box>
      <Box>
        <Button
          onClick={props.handleToParentPage}>
          Cancel
        </Button>
        <Button
          disabled={!userName || userName.length === 0 || !userAvatar || userAvatar.length ===0}
          color="primary"
          variant="contained"
          type="submit"
          onClick={(e)=>handleChangeUserSettings(e)}>
          OK
        </Button>
      </Box>
    </Box>
    </form>
  )
}
