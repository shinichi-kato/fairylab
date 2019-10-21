// BiomeBot.jsx
import InternalRepr from './internalRepr.jsx';
import TextRetriever from './textRetriever.jsx';
import Part from './part.jsx';
import {echoBot} from './PresetBots.jsx';

const internelRepr = new InternalRepr();

/* BiomeBotのコア

 */

export default class BiomeBotCore{
	constructor(dict){

		this.state={};
		/* try restore previous state if exists.
		otherwise load a dict  */
		this.revive() || this.load(dict);
	}

	revive(){
		// ボットの内部状態を含めてlocalStorageから復旧
		const state = localStorage.getItem('bot.state') ;
		if(!state){
			return false;
		}
		this.name = localStorage.getItem('bot.name');
		this.id = localStoage.getItem('bot.id');
		this.avatarId = localStorage.getItem('bot.avatarId') || echoBot.avatarId;
		this.state = JSON.parse(state);
		const parts = JSON.parse(localStorage.getItem('bot.parts')) || echoBot.parts;

		this.parts = parts.map(p=>new Part(p,state));
		return true;
	}

	freeze(){
		// ボットの内部状態を含めてlocalStorageに保存。
		// revive()で復旧
		localStorage.setItem('bot.name',this.name);
		localStorage.setItem('bot.id',this.id);
		localStorage.setItem('bot.avatarId',this.avatarId);

		const states = 
		localStorage.setItem('bot.state',JSON.stringify(this.state));
		const parts = this.parts.map(p=>p.freeze());
		localStorage.setItem('bot.parts',JSON.stringify(parts));
	}

	load(dict){
		/*dictからデータを読み込む */ 
		this.name=dict.name;
		this.id = dict.id;
		this.avatarId = dict.avatarId;
		this.state = {};
		this.parts = dict.parts.map(p=>new Part(p));
	}

	parseDictionaries(){
		const results = this.parts.reduce(
			(result,p)=>result+p.parseDictionary());
		
		return results;
	}

	setup(){
		for (let p of this.parts){
			if(p.setup() === false){
				return false;
			}
		}
	}

	reply(message){
		return new Promise((resolve,reject)=>{
			const ts = new Date();
			for(let i in this.parts){
				let p = this.parts[i];
				// availability check
				if(Math.random() > p.availability){
					console.log("availability skip");
					continue;
				}
				
				// triggerLevel check
				const [reply,state] = p.replier(message,this.state);
				if(reply.score< p.triggerLevel){
					console.log(`triggerLevel(${reply.score}) insufficient`);
					continue;
				}

				reply['timestamp']=ts.getTime();
				this.state={...this.state,state};

				//retention check
				if(Math.random() < p.retention){
					//このパートを最後尾に
					const me = {...p};
					this.parts.slice(i,1);
					this.parts.push(me)
				}
				resolve(reply);
			}

			// どのpartもreply失敗
			resolve({
				name:this.name,
				speakerId:this.id,
				avatar:this.avatarId,
				text:"BiomeBot not respond",
				timestamp:ts.getTime(),
				score:1
			});
		});
	}

}