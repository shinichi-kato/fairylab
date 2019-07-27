import React, {useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => createStyles({
  card: {
    width: '100%',
    borderRadius: 10,
    height: 400
  },
  textField: {
    size: 20,
  },
  avatar: {
    width: 40,
    height: 40
  }
}));


export default function NameInput(props) {
  const classes = useStyles();

  const [name, setName] = useState(props.name)

  const handleEnterName = event => {
    props.handleChangeName(name);
    props.handleNext();
  }

  const handleChangeName = event => {
      setName(event.target.value);
  }

  return (
    <Card className={classes.card}>
      <form noValidate autoComplete="off">
        <CardContent>
        <TextField
          label={props.label}
          className={classes.textField}
          value={name}
          onChange={handleChangeName}
          margin="normal"
        />

        </CardContent>
        <CardActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary" onClick={handleEnterName}>OK</Button>
        </CardActions>
      </form>
    </Card>
  )
}
