import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

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
   },
   list: {
     backgroundColor:"#EEEEEE",
     maxHeight: 400,
     overFlow: "auto",
     width: '100%',
   }
}));

export default function UploadDialog(props){
  const classes = useStyles();
  const {account,firestoreRef,userName}=props;
  const [botId,setBotId] = useState(localStorage.getItem('bot.id'));
  const [message,setMessage] = useState("");
  const [published,setPublished] = useState('bot.published',false);
  const [botList,setBotList] = useState([]);

  function handleCheckBotId(e){
    const id = e.target.value;
    props.isScriptExists(id);
    localStorage.setItem('bot.id',id);
    setBotId(id)
  }

  useEffect(()=>{
    props.isScriptExists(botId);
    getMyBotList();
    
  },[]);

  function getMyBotList(){
    firestoreRef.current.collection("bot")
      .where("creator","==",account.email)
      .orderBy("timestamp","desc")
      .get()
      .then(docs=>{
        const myBotList=[];
        docs.forEach(doc=>{
          const data = doc.data();
          myBotList.push({
            id:doc.id,
            avatarId:data.avatarId,
            description:data.description,
            message:data.message,
          });
          
        })
        setBotList(myBotList);
      })
  }


  function handleSetPublished(v){
    localStorage.setItem('bot.published',v);
    setPublished(v);
  }

  const botListItems=botList.map(b=>
    <ListItem button key={b.id} onClick={e=>setBotId(b.id)}>
      <ListItemAvatar>
        <Avatar src={b.avatarId} />
      </ListItemAvatar>
      <ListItemText primary={b.id} secondary={b.message}/>
    </ListItem>

  );

  return (
    <Box className={classes.container}
    display="flex" flexDirection="column">
      <Box>
        <Typography variant="h6">チャットボットのアップロード</Typography>
      </Box>
      <Box>
        <List className={classes.list}>
          {botListItems}
        </List>
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
          {props.uploadState==="ownedByOther" && 
          "同じidが他のユーザにより使われています。idを変えてください。"
          }
          {props.uploadState==="error" &&
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
            label="Memo(必須)"
            value={message}
            onChange={e=>setMessage(e.target.value)}
            />
      </Box> 
      <Box flexGrow={1}>
        <Chip label="公開しない" 
          color={ published ? "default" : "primary" }
          onClick={e=>handleSetPublished(false)}
          />
        <Chip label="公開する"
          color={ published ? "primary"  : "default" }
          onClick={e=>handleSetPublished(true)}
          />
      </Box>
      <Box>
        {props.uploadState==='ownedByUser' && "既存データに上書きします"}
        {props.uploadState}
      </Box>

      <Box>
        <Button className={classes.wideButton}
          size="large"
          variant="contained"
          color="primary"
          disabled={props.uploadState==="ownedByOther" || message===""}
          onClick={e=>{props.handleUploadScript(message)}}>
            アップロード</Button>
      </Box>
      <Box>
        <Button 
        className={classes.wideButton}
        size="large"
        onClick={e=>props.handleToParentPage} >戻る</Button>
      </Box>
    </Box>
  )
}