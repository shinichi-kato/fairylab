import React, { useContext,useState } from 'react';
import Button from '@material-ui/core/Button';
import {BiomeBotContext} from '../biome-bot/biome-bot.jsx';

export default function Dashboard(props){
  const bot = useContext(BiomeBotContext);
  const [text,setText] = useState(null);
  function test(){
    console.log("dashboard.test")
      bot.handleReply({text:"text()による返答送信"})
        .then(msg => setText(msg.text))
  }
  return(
    <>
    <Button onClick={e=>{test()}}>
    button
    </Button>
    text={text}
    </>
  )
}
