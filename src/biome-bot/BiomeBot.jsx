// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import {echoBot} from './PresetBots.jsx';

export default class BiomeBotCore{
  constructor(){
    this.internalRepr = new InternalRepr();
    this.state = "init";
    this.load();
  }

  load(data){
    if(data === void 0 ){
      this.name = localStorage.getItem('bot.name') || echoBot.name;
      this.id = localStorage.getItem('bot.id') || echoBot.id;
      this.avatarId = localStorage.getItem('bot.avatarId') || echoBot.avatarId;
      this.description = localStorage.getItem('bot.description') || echoBot.description;
      this.parts = JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts;
      this.sourceDicts = JSON.parse(localStorage.getItem('bot.sourceDicts')) || echoBot.sourceDicts;
      this.compiledDicts = JSON.parse(localStorage.getItem('bot.compiledDicts')) || echoBot.compiledDict;
    }
    else{
      this.name = data.name;
      this.id = data.id;
      this.avatarId = data.avatarId;
      this.description = data.description;
      this.parts = [...data.parts];
      this.sourceDicts = {...data.sourceDicts};
      this.compiledDicts = new Object();
    }
  }

  save(){
    localStorage.setItem('bot.name',this.name);
    localStorage.setItem('bot.id',this.id);
    localStorage.setItem('bot.avatarId',this.avatarId);
    localStorage.setItem('bot.description',this.description);
    localStorage.setItem('bot.parts',JSON.stringify(this.parts));
    localStorage.setItem('bot.sourceDicts',JSON.stringify(this.sourceDicts));
    localStorage.setItem('bot.compiledDicts',JSON.stringify(this.compiledDicts));
  }

  loadDictionaries(dicts){
      // {name:[],name2:[],...}という形式で格納された辞書をthisにコピー
    }

  setup(){
    // partsの内容に従ってrun関数を生成
    for(let i in this.parts){


      switch(this.parts[i].type){
        case '@dev/echo':{
          this.parts[i].replier=(message)=>{return{
            name:this.name,
            speakerId:this.id,
            avatar:this.avatarId,
            text:message.text,
            score:1
            }};
          }

        }}
      this.state = "ready"
    }


    reply(message){
      return new Promise((resolve,reject) => {
        for(let i in this.parts){
          const part = this.parts[i];

          if(Math.random() > part.availability ) continue;

          const reply = part.replier(message);

          if(reply.score < part.triggerLevel) continue;

          if(Math.random() < part.retention){
            //現在のパートを最後尾に
            const me = {...part}
            this.parts.slice(i,1);
            this.parts.push(me)
          }
          resolve(reply);
        }
        reject("BiomeBot reply error");
      });
    }

}
