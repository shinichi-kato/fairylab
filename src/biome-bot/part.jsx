// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import {randomInt} from 'mathjs';
// import {echoBot} from './PresetBots.jsx';

const internalRepr = new InternalRepr();

export default class Part{
	constructor(part,state,dict){
		this.state={...state};
		this.replier=function(){};
		this.load(part,dict);


	}

	load(part,dict){
		this.name=part.name;
		this.type=part.type;
		this.availablity = part.availablity;
		this.triggerLevel=part.triggerLevel;
		this.retention=part.retention;
		this.inDict=[];
		this.outDict=[];

		if(dict){
			localStorage.setItem(`bot.sourceDict.${this.name}`,
				JSON.stringify(dict.sourceDicts[this.name]));
			}
		}

	dump(){
		const part={
			name:this.name,
			type:this.type,
			availablity:this.availablity,
			triggerLevel:this.triggerLevel,
			retention:this.retention,
			state:this.state,
		};
		localStorage.setItem(`bot.compiledDict.${this.name}`,
			JSON.stringify({
				inDict:this.inDict.dump(),
				outDict:this.outDict
			})
		);
		return part;
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

		// コメント行(文字列だけの行)削除
		d = d.filter(x=>typeof x !== "string");


		switch(this.type){
			case '@dev/echo':{
				// stateは使わない
				// 辞書は使わない
				this.replier=(message,state)=>{
					return{name:this.name,
					speakerId:this.id,
					avatar:this.avatarId,
					text:message.text,
					score:1
				}};
				break;
			}

			case '@dev/internalRepr':{
				// stateは使わない
				// 辞書は使わない
				this.replier=(message,state)=>{
					return {name:this.name,
					speakerId:this.id,
					avatar:this.avatarId,
					text:internalRepr.from_message(message),
					score:1
				}};
				break;
			}

			case 'sensor' :{
				/* dictは
					[ [["入力1","入力2"...] , ["出力1","出力2"...]] , ...]
					となっている。TextRetrieverには内部表現化したリスト
					[ [入力1を内部表現化したリスト,入力2を内部表現化したリスト...], ...]
					を渡す
				*/
				
				this.inDict=new TextRetriever(d.map(l=>internalRepr.from_inDict(l[0])));
				this.outDict = d.map(l=>l[1]);
				this.replier=(message,state)=>{
					const ir = internalRepr.from_message(message);
					const result = this.inDict.retrieve(ir);
					let cands= [];
					let text = "not found";
					if(result.score !== 0){
						cands = this.outDict[result.index];
						text = cands[randomInt(cands.length)];
					}

					return ({
						name:this.name,
						speakerId:this.id,
						avatar:this.avatarId,
						text:text,
						score:result.score
					});
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
