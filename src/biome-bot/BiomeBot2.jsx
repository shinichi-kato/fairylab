// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import Part from './part.jsx';
import {echoBot} from './PresetBots.jsx';

const internalRepr = new InternalRepr();

export default class BiomeBotCore{
  constructor(){
    this.state="init";
    this.load();
  }

  load(data){
    if(data === void 0 ){
      this.name = localStorage.getItem('bot.name') || echoBot.name;
      this.id = localStorage.getItem('bot.id') || echoBot.id;
      this.avatarId = localStorage.getItem('bot.avatarId') || echoBot.avatarId;
      this.creator = localStorage.getItem('bot.creator') || echoBot.creator;
      this.description = localStorage.getItem('bot.description') || echoBot.description;

      const parts = JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts;

      this.parts = parts.map(p=>new Part(p));
    }
    else{
      this.id = data.id;
      this.avatarId = data.avatarId;
      this.creator = data.creator;
      this.description = data.description;
      this.parts = data.parts.map(p=>new Part(p));
    }
  }

  save(){
    localStorage.setItem('bot.name',this.name);
    localStorage.setItem('bot.id',this.id);
    localStorage.setItem('bot.avatarId',this.avatarId);
    localStorage.setItem('bot.creator',this.creator);
    localStorage.setItem('bot.description',this.description);
    localStorage.setItem('bot.parts',JSON.stringify(
      this.parts.map(p=>p.dumpScript())));
  }

  setup(){
    try {
      this.parts.map(p=>
        p.loadSourceDictionary(localStorage.getItem`bot.dict.${p.name}`));
    } catch(e) {
      if (e instanceof SyntaxError){
        return `辞書${e.name}の line:${e.lineNumber} column:${e.columnNumber} に文法エラーがあります`;
      }
      return e.message;
    }
  }

  reply(message){
    return new Promise((resolve,reject) => {
      const ts = new Date();
      for(let i in this.parts){
        const part = this.parts[i];

        // part.availabilityで設定した確率でpartが起動
        if(Math.random() > part.availability ){
          console.log("availability skip");
          continue;
        }

        // 返答のスコアがtriggerLevelを超えたら返答
        
        const reply = part.textRetriever(message.text);
        if(reply.score < part.triggerLevel){
          console.log("triggerLevel=",part.triggerLevel,"score=",reply.score," not enough");
          continue;
        }




  }
}
