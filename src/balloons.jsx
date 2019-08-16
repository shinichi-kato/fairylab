import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '95%',
    margin: 'auto',
  },

  avatar: {
    width: 40,
    height: 40
  },
  leftBalloon : {
    position: 'relative',
    padding: theme.spacing(1),
    borderRadius: 10,
    margin: "6px auto 6px 20px",
    background:  '#D9D7FF',
    display: 'inline-block',
    '&:after':{
      content:'""',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '8px 15px 8px 0',
      borderColor: 'transparent #D9D7FF',
      display: 'block',
      width: 0,
      zIndex:1,
      marginTop:-8,
      left: -15,
      bottom:16
    },
  },
  rightBalloon : {
    position: 'relative',
    padding: theme.spacing(1),
    borderRadius: 10,
    margin: "6px 20px 6px auto",
    background:  '#D9D7FF',
    display: 'inline-block',
    '&:after':{
      content:'""',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '8px 0 8px 15px',
      borderColor: 'transparent #D9D7FF',
      display: 'block',
      width: 0,
      zIndex:1,
      marginTop:-8,
      right: -15,
      bottom: 16,
      }
  }
}));




export function LeftBalloon(props){
  const classes = useStyles();
  const speech = props.speech;
  const timestampStr = speech.timestamp.join('-');
  return (
    <Box key={speech.id}
      display="flex"
      flexDirection="row"
      alignItems="flex-end">
      <Box >
        <Avatar src={speech.avatar} className={classes.avatar} />
      </Box>
      <Box className={classes.leftBalloon}>
        <Typography variant="subtitle2">{speech.name}</Typography>
        <Typography>{speech.text}</Typography>
        <Typography variant="subtitle">{timestampStr}</Typography>
      </Box>
    </Box>
  )
}

export function RightBalloon(props){
  const classes = useStyles();
  const speech = props.speech;
  const timestampStr = speech.timestamp.join('-');
  return (
    <Box key={speech.id}
      display="flex"
      flexDirection="row"
      alignItems="flex-end">
      <Box className={classes.rightBalloon}>
        <Typography variant="subtitle2">{speech.name}</Typography>
        <Typography>{speech.text}</Typography>
        <Typography variant="subtitle">{timestampStr}</Typography>
      </Box>
      <Box >
        <Avatar src={speech.avatar} className={classes.avatar} />
      </Box>
    </Box>
  )

}
