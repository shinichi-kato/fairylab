// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import {echoBot} from './PresetBots.jsx';



export default class Part{
  constructor(dict){
    if(dict === void 0){
      this.name=null;
      this.type=null';
      this.availability= 0;
      this.triggerLevel= 0;
      this.retention= 1;
      this.textRetriever=null;
    }
    else{
      loadScript(dict)
    }
  }

  loadScript(dict){
    this.name=dict.name;
    this.type=dict.type;
    this.availability=dict.availability;
    this.triggerLevel=dict.triggerLevel;
    this.retention=dict.retention;
  }

  dumpScript(){
    return {
      name:this.name,
      type:this.type,
      availability:this.availability,
      triggerLevel:this.triggerLevel,
      retention:this.retention,
    };
  }

  loadSourceDictionary(dict){
    if (dict.length===0) {
      return;
    }
    const d = JSON.parse(dict)
      .filter(n=>Object.prototype.toString.call(n)!=='[object String]')
      .map(line=>(
        [internalRepr.from_inScript(line[0]),line[1]]
      ));
    this.textretriever = new TextRetriever(d);
  }





  }


}
