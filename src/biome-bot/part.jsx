// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import {randomInt} from 'mathjs';
import {echoBot} from './PresetBots.jsx';

const internalRepr = new InternalRepr();

export default class Part{
	constructor(dict,state){
		this.state={...state};
		this.load(dict);

	}
	
	load(dict){
		this.name=dict.name;
		this.type=dict.type;
		this.availablity = dict.availablity;
		this.triggerLevel=dict.triggerLevel;
		this.retention=dict.retention;
		this.inDict=[];
		this.outDict=[];
	}

	freeze(){
		const part={
			name:this.name,
			type:this.type,
			availablity:this.availablity,
			triggerLevel:this.triggerLevel,
			retention:this.retention,
		};
		localStorage.setItem(`dict.compiledDict.${this.name}`,
			JSON.stringify({
				inDict:this.inDict.freeze(),
				outDict:this.outDict
			})
		);
		return [part,this.state];
	}

	setup(){
		// compiledDictがあればそれをロード
		let d = localStorage.getItem(`bot.compiledDict.${this.name}`);
		if(d){
			d = JSON.parse(d);
		}

		// なければsourceDictを読んでコンパイル
		d = localStorage.getItem(`bot.sourceDict.${this.name}`);
		if(d){
			try {
			  d = JSON.parse(d);
			} catch(e) {
			  if (e instanceof SyntaxError){
				return `辞書${this.name}の line:${e.lineNumber} column:${e.columnNumber} に文法エラーがあります`;
			  }
			  return e.message;
			}
		}

		switch(this.type){
			case '@dev/echo':{
				// stateは使わない
				// 辞書は使わない
				this.replier=(message,state)=>({
					name:this.name,
					speakerId:this.id,
					avatar:this.avatarId,
					text:message.text,
					score:1
				});
				break;
			}

			case '@dev/internalRepr':{
				// stateは使わない
				// 辞書は使わない
				this.replier=(message,state)=>({
					name:this.name,
					speakerId:this.id,
					avatar:this.avatarId,
					text:internalRepr.from_message(message),
					score:1
				});
				break;
			}

			case 'sensor' :{
				this.inDict=new TextRetriever(d);
				this.outDict = d.map(l=>l[1]);
				this.replier=(message,state)=>{
					const result = this.inDict.retrieve(message);
					const cands = this.outDict[result.index];
					
					return {
						name:this.name,
						speakerId:this.id,
						avatar:this.avatarId,	
						text:cands[randomInt(cands.length)],
						score:result.score				
					};
				};
				break;
			}
			default:{
				this.replier=(message,state)=>({
					name:this.name,
					speakerId:this.id,
					avatar:this.avatarId,
					text:`type ${this.type} は使用できません`,
					score:1
				});
			}
		}

		return 'ok';
	}
	/* [reply,state] = replier(message,state)
		replierはstateを受け取り、内部でstateの書き換えが
		発生したらそれを戻り値で親のstateに反映させる。
	*/

}
