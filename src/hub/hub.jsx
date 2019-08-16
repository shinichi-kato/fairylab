import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import ApplicationBar from './application-bar.jsx';
import ChatViewer from './chat-viewer.jsx';
import Console from './console.jsx';



const useStyles = makeStyles(theme => ({
  container: {
   height:'calc( 100vh - 64px )',
   overflowY:'scroll',
   overscrollBehavior:'auto',
   WebkitOverflowScrolling:'touch'
 }
}));


export default function Hub(props){


  const userAvatar = localStorage.getItem('userAvatar');
  const userName  = localStorage.getItem('userName');
  const botId = localStorage.getItem('botId');
  const botName = localStorage.getItem('botName');
  const botAvatar  = localStorage.getItem('botAvatar');

  const [position,setPosition] = useState(0);

  useEffect(() => {
    // body要素はfixedであるが、にもかかわらずスクロールを検出した場合は
    // スマホ端末でソフトキーボードが出現したときと消えたとき。
    // これらに対応してチャットログを表示する<Box>のりサイズを行う
    //
    const handler = (event) => {
      // 新しい高さを計算して・・・のつもりだが、inputに値を書き込むことで
      // 画面が再描画されて同じ効果になってる・・・      かもしれない
      setPosition(window.scrollY);

    }
    window.addEventListener("scroll",handler);

    return () => {
      window.removeEventListener("scroll",handler);
    }
  });






  return(
      <Box display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        justifyContent="flex-start"
        alignContent="stretch"
        alignItems="stretch"
        height="100%" >
        <Box order={0}>
          <ApplicationBar
            handleExit= {props.handleExit}
          />
        </Box>

        <Box order={0} flexGrow={1}>
          <ChatViewer
            account={props.account}
            log={props.hubLog} />
        </Box>
        <Box order={0}>
          <Console handleWriteUserMessage={(message)=>
            props.handleWriteUserMessage(message,userName,userAvatar)}/>
        </Box>
      </Box>
  );
}
