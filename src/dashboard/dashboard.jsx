import React, { useEffect, useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AvatarSelector from './avatar-selector.jsx';
import classes from './dashboard.css';



export default function Dashboard(props){
  const [mode, setMode] = useState(0);

  useEffect(() => {
    // DidMount / DidUpdate
    const user = localStorage.getItem('user');
    if(!user){ setMode('AvatarSelect'); }

  });

  return(
    <div className={classes.flexContainer}>
      <div className={classes.topMenu}><AccountCircle /></div>
      <div className={classes.inputPanel}>
        {mode == 'AvatarSelect' &&
          <AvatarSelector mode={mode} />
        }
      </div>
      <div className={classes.iconsPanel}></div>
      <div className={classes.navigation}></div>
    </div>
  )
}
