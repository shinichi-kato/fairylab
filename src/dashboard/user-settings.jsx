import React , {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
  card: {
    width: '100%',
    borderRadius: 10,
  },
  avatarButton: {
    margin: theme.spacing(0),
  },
  avatar: {
    width: 40,
    height: 40
  }
}));

export default function UserSettings(props){
  const classes=useStyles();
  const [userName,setUserName] = useState(props.userName);
  const [userAvatar,setUserAvatar] = useState(props.userAvatar);


  function handleSelectAvatar(event,img){
    setUserAvatar(avatarsDir+img);
  }
  function handleChangeName(name){
    setUserName(name);
  }

  function handleChangeUserSettings(){
    props.handleChangeUserSettings(userName,userAvatar);
    props.handleToParentPage();
  }

  const avatarItems = avatarPaths.map((img) =>
    <IconButton className={classes.avatarButton} aria-label={img} key={img}
      onClick={(e) => handleSelectAvatar(e,img)}>
      <Avatar src={avatarsDir+img} className={classes.avatar} />
    </IconButton>
  )

  return (
    <form noValidate autoComplete="off">
    <Box
      flexDirection="column"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignContent="stretch"
      alignItems="stretch"
      height="100%">

      <Box>
        <Typography>Avatar </Typography>
      </Box>
      <Box>
        {avatarItems}
      </Box>
      <Box flexGrow={1}>
        <TextField
          label={props.label}
          className={classes.textField}
          value={userName}
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
          type="submit"
          onClick={e=>handleChangeUserSettings}>
          OK
        </Button>
      </Box>
    </Box>
    </form>
  )
}
