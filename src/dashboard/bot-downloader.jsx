import React ,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
	},
	list: {
		backgroundColor:"#EEEEEE",
		maxHeight: 400,
		overFlow: "auto",
		width: '100%',
	},
	avatar: {
		width: 100,
		height: 100
	},
	wideButton: {
		width: "100%",
	},
	innerbox: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	}
}));



export default function BotDownloader(props){
	const classes = useStyles();
	const {account,firestoreRef,firebase,loadingState} = props;
	const [sortBy,setSortBy] = useState("new");
	const [botList,setBotList] = useState([]);
	const [botId,setBotId] = useState(null);



	

	useEffect(()=>{
		getBotList();
	},[sortBy]);

	function getBotList(){
		const db = firestoreRef.current.collection("bot");


		switch(sortBy) {
			case 'new':{
				db.orderBy("timestamp","desc")
				.get()
				.then(docs=>{
					const l=[];
					docs.forEach(doc=>{
						const data = doc.data();
						l.push({
							id:doc.id,
							avatarId:data.avatarId,
							description:data.description,
							// timestamp:data.timestamp
						});
					});
					setBotList(l);
				})
				break;
			}
			case 'name':{
				db.orderBy(firebase.firestore.FieldPath.documentId(),"desc")
				.limit(30)
				.get()
				.then(docs=>{
					const l=[];
					docs.forEach(doc=>{
						const data = doc.data();
						l.push({
							id:doc.id,
							avatarId:data.avatarId,
							description:data.description,
							timestamp:data.timestamp.toDate().toString()
						});
					});
					setBotList(l);
				})
				break;
			}
			case 'my': {
				db.where("creator","==",account.email)
				.orderBy("timestamp","desc")
				.get()
				.then(docs=>{
					const l=[];
					docs.forEach(doc=>{
						const data = doc.data();
						l.push({
							id:doc.id,
							avatarId:data.avatarId,
							description:data.description,
							timestamp:data.timestamp.toDate().toString(),
							message:data.message,
						});
					});
					setBotList(l);
				})
				break;
			}
			default:
				throw new Error("invalid mode");
		}		
	}

	function handleClickEngage(e){
		if(loadingState==='downloadSuccess'){
			props.handleToBotSettings();
		}
		else{
			props.handleDownloadScript(botId);
		}
		
	}

	const botListItems=botList.map(b=>
    <ListItem button key={b.id} onClick={e=>setBotId(b.id)}>
      <ListItemAvatar>
        <Avatar src={b.avatarId} />
      </ListItemAvatar>
      <ListItemText primary={b.id} secondary={b.timestamp}/>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>

	);
	


	let currentDescription="";
	let currentAvatar="/avatar/bot/blank.svg";
	for(let b of botList){
		if(b.id===botId){
			currentDescription=b.description;
			currentAvatar=b.avatarId;
			break;
		}
	}

	return (
		<Box display="flex" flexDirection="column">
			<Box>
				<ButtonGroup fullWidth aria-label="full width outlined button group">
					<Button
						onClick={e=>setSortBy("new")}
					><UpdateIcon/>新着</Button>
					<Button
						onClick={e=>setSortBy("name")}
					><SortByAlphaIcon/>名前順</Button>
					<Button
						onClick={e=>setSortBy("my")}
					><AccountCircleIcon/>Myボット</Button>
				</ButtonGroup>
			</Box>
			<Box>
				<List className={classes.list}>
						{botListItems}
        		</List>
			</Box>
			<Box display="flex" flexDirection="row">
				<Box className={classes.innerbox}>
				<Avatar
					className={classes.avatar}
					src={currentAvatar} />
				</Box>
				<Box className={classes.innerbox}>
					<Typography>{currentDescription}</Typography>
				</Box>
			</Box>
			<Box flexGrow={1}>
				{loadingState}
			</Box>
			<Box>
				<Button className={classes.wideButton}
				size="large"
				variant="contained"
				color="primary"
				disabled={botId===null || loadingState==='startDownload'}
				onClick={handleClickEngage}>
				{loadingState==='downloadSuccess' ?
					"OK"
				:	
					<><GetAppIcon/>ダウンロード</>
				}
				</Button>
			</Box>
			
			<Box>
				<Button 
				className={classes.wideButton}
				size="large"
				onClick={e=>{props.handleToParentPage()}} >戻る</Button>
			</Box>
		</Box> 
	)
}