import React from 'react';
import { makeStyles,createStyles } from '@material-ui/core/styles';
import UploaderScriptCard from './uploader-script-card.jsx';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => createStyles({
  root: {
    padding: theme.spacing(1)
  }
}));

export default function ScriptUploader(props){
  const classes = useStyles();
  return(
    <Box className={classes.root}>
    <Typography>Botを共有ストレージに保存します</Typography>
    <UploaderScriptCard
      botSettings={props.botSettings}
      handleClose={props.handleClose}
      />
    </Box>
  )
}
