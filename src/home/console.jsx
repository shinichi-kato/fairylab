import React ,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export default function Console(props) {
  const classes = useStyles();
  const [text,setText] = useState("");

  const handleChangeText = e => {
    setText(e.target.value)
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={text}
        onChange={handleChangeText}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="send">
        <Send />
      </IconButton>
    </Paper>
  );
}
