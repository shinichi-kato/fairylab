import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeletePartDialogBody(props){
    return(
      <>
      <DialogTitle id="dialog-title">{props.part.name}を削除します</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          削除すると復元できません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={(e)=>props.handleExecuteDelete()} color="primary">
          OK
        </Button>
      </DialogActions>
      </>
    )
}

export default function DeletePartDialog(props) {


  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      >
        <DeletePartDialogBody
          part={props.part}
          handleClose={props.handleClose}
          handleExecuteDelete={props.handleExecuteDelete} />

    </Dialog>

  )
}
