import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UploaderScriptCard from './uploader-script-card.jsx';
import Typography from '@material-ui/core/Typography';


export default function ScriptUploader(props){
  return(
    <>
    <Typography>Botを共有ストレージに保存します</Typography>
    <UploaderScriptCard
      botSettings={props.botSettings}
      handleClose={props.handleClose}
      />
    </>
  )
}
