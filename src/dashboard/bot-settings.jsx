import React ,{useEffect,useState,useContext} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import {BiomeBotContext} from '../biome-bot/biome-bot-provider.jsx';

const useStyles = makeStyles(theme => createStyles({
	root: {
		padding: theme.spacing(2),
	},
	avatarButton: {
		margin: theme.spacing(0),
	},
	
	avatar: {
		padding: theme.spacing(2),
		width: 100,
		height: 100,
	},
	textinput: {
		size: 40,
	},
	wideButton: {
		width: "100%",
	},

  }));

export default function BotSettings(props){
	const bot = useContext(BiomeBotContext);
	const [name,setName] = useState(bot.name);
	const classes = useStyles();

	function handleSetName(){
		bot.handleSetName(name);
		props.handleToParentPage();
	}
	return(
	<Box display="flex" flexDirection="column" alignItems="stretch"
		className={classes.root}
	>
		<Box alignSelf="center">
			<Avatar 
			className={classes.avatar}
			src={bot.avatarId}
			/>

		</Box>
		<Box flexGrow={1} alignSelf="center">

			<TextField
				className={classes.textinput}
				variant="filled"
				id="name"
				required
				value={name}
				label="チャットボットの名前"
				onChange={e=>setName(e.target.value)}
				margin="normal"
			/>
		</Box>
		<Box>
			<Button className={classes.wideButton}
			size="large"
			variant="contained"
			color="primary"
			disabled={name===""}
			onClick={e=>handleSetName()}>
			OK
			</Button>
		</Box>
			

	</Box>	
	)
}