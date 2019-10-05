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
      this.creator = localStorage.getItem('bot.creator') || echoBot.creator;
      this.description = localStorage.getItem('bot.description') || echoBot.description;
      this.parts = JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts;
      this.sourceDicts = new Object();
      for(let i in this.parts){
        const name = this.parts[i].name;
        this.sourceDicts[name] =
          localStorage.getItem(`bot.dict.${name}`) || [];
      }
    }
    else{
      this.id = data.id;
      this.avatarId = data.avatarId;
      this.creator = data.creator;
      this.description = data.description;
      this.parts = [...data.parts];
      this.sourceDicts= new Object();
      // 個々でロードしてないのはどうする
    }
    this.setup();
  }

  save(){
    localStorage.setItem('bot.name',this.name);
    localStorage.setItem('bot.id',this.id);
    localStorage.setItem('bot.avatarId',this.avatarId);
    localStorage.setItem('bot.creator',this.creator);
    localStorage.setItem('bot.description',this.description);
    localStorage.setItem('bot.parts',JSON.stringify(this.parts));
    for(let i in this.parts){
      const name=this.parts[i].name;
      localStorage.setItem(`bot.dict.${name}`,this.sourceDicts[name]);
    }
  }

  parseDictionaries(){
    this.dicts = new Object();
    for(let i in this.parts){
      const name=this.parts[i].name;
      try {
        this.dicts[name] = JSON.parse(this.sourceDicts[name]);
      } catch(e) {
        if (e instanceof SyntaxError){
          return `辞書${name}の line:${e.lineNumber} column:${e.columnNumber} に文法エラーがあります`;
        }
        return e.message;
      }
    }
    return true;
  }

  compile(){

  }

  setup(){
    // partsの内容に従ってrun関数を生成
    for(let i in this.parts){

      switch(this.parts[i].type){
        case '@dev/echo':{

          this.parts[i].replier=(message)=>{return({
            name:this.name,
            speakerId:this.id,
            avatar:this.avatarId,
            text:message.text,
            score:1
            })};
            break;
        }
        case '@dev/internalRepr':{
          this.parts[i].replier=(message)=>{return ({
            name:this.name,
            speakerId:this.id,
            avatar:this.avatarId,
            text:this.internalRepr.from_message(message).join("/"),
            score:1
          })}
          break;
        }

        case 'sensor': 
        case 'answerer': {
          this.parts[i].replier=(message)=>{return ({
            name:this.name,
            speakerId:this.id,
            avatar:this.avatarId,
            text:"--まだ利用できません--",
            score:1
          })}
          break;
        }

        default:
          throw new Error(`invalid type ${this.parts[i].type} in BiomeBot`)

        }
      }
      this.state = "ready"
    }


    reply(message){
      return new Promise((resolve,reject) => {
        const ts = new Date();
        for(let i in this.parts){
          const part = this.parts[i];

          if(Math.random() > part.availability ){
            // part.availabilityで設定した確率でpartが起動
            console.log("availability skip");
            continue;
          }

          const reply = part.replier(message);
          reply['timestamp']=ts.getTime();

          if(reply.score < part.triggerLevel){
            console.log("triggerLevel=",part.triggerLevel,"score=",reply.score," not enough");
            continue;
          }

          if(Math.random() < part.retention){
            //現在のパートを最後尾に
            const me = {...part}
            this.parts.slice(i,1);
            this.parts.push(me)
          }
          resolve(reply);
        }
        resolve({
          name:this.name,
          speakerId:this.id,
          avatar:this.avatarId,
          text:null,
          timestamp:ts.getTime(),
          score:1
        });
      });
    }


}
