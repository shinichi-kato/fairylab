import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '95%',
    margin: 'auto',
  },
  leftBalloon : {
    position: 'relative',
    padding: 4,
    borderRadius: 10,
    margin: "4px auto 4px 10px",
    width: '50%',
    background:  '#D9D7FF',
    '&:after':{
      content:'""',
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '15px 15px 15px 0',
      borderColor: '#D9D7FF transparent',
      display: 'block',
      width: 0,
      zIndex:1,
      left:-15,
      top:'50%'
    }
  }
}));

const dummy = [
  {
    name:'user',
    id: 'mailaddress',
    avatar:'avatar/user/1boy.svg',
    text:'こんにちは！',
    timestamp:[2019,7,9,12,12,22]
  },
  {
    name:'bot',
    id:'bot@mailadress',
    avatar:'avatar/user/8dino.svg',
    text:'やあ！',
    timestamp:[2019,7,9,12,12,22]
  }
];


export default function ChatViewer(props){
  const classes = useStyles();

  const log = useState(localStorage.getItem('log') || dummy);
  return(
      <Box className={classes.leftBalloon}>
        左からの吹き出し
      </Box>

  );
}
