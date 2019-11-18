import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import useLocalStorage from 'react-use-localstorage';



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
}));

export default function UploadDialog(props){
  const classes = useStyles();
  const {account,firebase,userName}=props;
  const [botId,setBotId] = useLocalStorage('bot.id',"");
  const [message,setMessage] = useState("");
  const [published,setPublished] = useLocalStorage('bot.published');

  function handleCheckBotId(e){
    const id = e.target.value;
    props.isScriptExists(id);
    setBotId(id)
  }

  useEffect(()=>{
    props.isScriptExists(botId);
  },[]);

  return (
    <Box className={classes.container}
    display="flex" flexDirection="column">
      <Box>
        <Typography variant="h6">チャットボットのアップロード</Typography>
      </Box>
      <Box>
        <TextField
          className={classes.textField}
          variant="filled"
          required
          id="id"
          margin="normal"
          label="id(型式)"
          value={botId}
          onChange={handleCheckBotId}
          />
        <Typography variant="subtext" color="error">
          {props.uploadState==="exists" && 
          "同じidが他のユーザにより使われています。idを変えてください。"
          }
          {props.uploadState!=="error" &&
          "firebase読み込みエラー"
          }
        </Typography>
      </Box>
      <Box>
        <TextField
            className={classes.textField}
            variant="filled"
            required
            id="message"
            margin="normal"
            label="Memo"
            value={message}
            onChange={e=>setMessage(e.target.value)}
            />
      </Box> 
      <Box flexGrow={1}>
        <Chip label="公開しない" 
          color={ published ? "default" : "primary" }
          onClock={()=>setPublished(false)}
          />
        <Chip label="公開する"
          color={ published ? "primary"  : "default" }
          onClock={()=>setPublished(true)}
          />
      </Box>

      <Box>
        <Button className={classes.wideButton}
          disabled={props.uploadState!=="notExists"}
          onClick={()=>props.handleUploadScript(message)}>アップロード</Button>
      </Box>
      <Box>
        <Button onClick={e=>props.handleToParentPage} >キャンセル</Button>
      </Box>
    </Box>
  )
}