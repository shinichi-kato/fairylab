import InternalRepr from './internalRepr.jsx';

export default class BiomeBot{


  constructor(){


    this.internalRepr = new InternalRepr();
    this.load();

  }


  load(){
    this.botSettings = JSON.parse(localStorage.getItem('botSettings'));
    const botParts = JSON.parse(localStorage.getItem('botParts'));
    this.parts = [];

    for(let part of botParts){
      //各パートのtypeに応じてrun()を設定
      console.log("botPart,",part);
      switch (part.type){
        case 'internalRepr':{
          this.parts.push({
            run: (message) => {
              const reply={
                name:this.botSettings.name,
                speakerId: this.botSettings.id,
                avatar:this.botSettings.avatarId,
                text:this.internelRepr(message.text),
                // 個々でチャットボットのセリフを生成させるpromise
              };
              return reply;
            }
          })
        }
      }
    }
    console.log("parts",this.parts)
  }

  reply(message){
    return new Promise((resolve,reject)=>{
        for(let part of this.parts){
          const reply = part.run(message);
          if(reply){ resolve(message) }
        }
    })
  }

}
