// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import {echoBot} from './PresetBots.jsx';


export default class Part{
	constructor(dict,state){
		this.state={...state};
		load(dict);

	}
	
	load(dict){
		this.name=dict.name;
		this.availablity = dict.availablity;
		this.triggerLevel=dict.triggerLevel;
		this.retention=dict.retention;
		this.inDict=[];
		this.outDict=[];
	}

	freeze(){
		const part={
			name:this.name,
			availablity:this.availablity;
			triggerLevel:this.triggerLevel;
			retention:this.retention;
		};
		localStorage.setItem(`dict.compiledDict.${this.name}`,
			JSON.stringify({
				inDict:this.textRetriever.freeze(),
				outDict:this.outDict
			});
		);
		return [part,this.state];
	}

	setup(){
		// compiledDictがあればそれをロード
		let d = localStorage.getItem(`bot.compiledDict.${this.name}`);
		if(d){
			d = JSON.parse(d);
			this.inDict = textRetriever(d.inDict);
			this.outDict = d.outDict;
			return true;
		}

		// なければsourceDictを読んでコンパイル
		d = localStorage.getItem(`bot.sourceDict.${this.name}`);
		if(d){
			try{
				d = JSON.parse(d)
			}
			catch(e) {
				if (e instanceof SyntaxError){
					
				}
			}
		}
	}
	/* [reply,state] = replier(message,state)
		replierはstateを受け取り、内部でstateの書き換えが
		発生したらそれを戻り値で親のstateに反映させる。
	*/

}
