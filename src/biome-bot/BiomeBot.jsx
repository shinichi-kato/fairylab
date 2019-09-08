// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';

const echoBot={
  name:"Echo",
  id:"@dev/echo",
  avatarId:"blank",
  description:"ユーザのセリフをそのまま返すエコーです",
  parts: [{
    name:'echo',
    type:'@dev/echo',
    availability: 0.9,
    triggerLevel: 0,
    retention: 1,
    dictionary: "",
  }],
  sourceDicts: [],
  compiledDicts: [],

  selfEstate:0,
  memory:{dummy:'dummy'}
};


export default class BiomeBotCore{
  constructor(){
    this.internalRepr = new InternalRepr();
    this.state = "init";
    this.load();
  }

  load(){
    this.name = localStorage.getItem('bot.name') || echoBot.name;
    this.id = localStorage.getItem('bot.id') || echoBot.id;
    this.avatarId = localStorage.getItem('bot.avatarId') || echoBot.avatarId;
    this.description = localStorage.getItem('bot.description') || echoBot.description;
    this.parts = JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts;
    this.sourceDicts = JSON.parse(localStorage.getItem('bot.sourceDicts')) || echoBot.sourceDicts;
    this.compiledDicts = JSON.parse(localStorage.getItem('bot.compiledDicts')) || echoBot.compiledDict;
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
      console.log("reply to ",message)
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
