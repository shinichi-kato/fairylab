// BiomeBot.jsx
import Part from './part.jsx';
import {echoBot} from './PresetBots.jsx';


/* BiomeBotのコア

 */

export default class BiomeBot{
	constructor(dict){

		this.state={queue:[]};
		/* try restore previous state if exists.
		otherwise load a dict  */
		this.load(dict);
	}

	download(dict){
		// 新しくdictからbiomebotのデータをロードする。
		// 既存のcompiledDictは消去する
		this.id = dict.id;
		this.avatarId = dict.avatarId;
		this.state = {avatar:"",queue:[]};
		this.parts = dict.parts.map(p=>new Part(p,this.state,dict));
	}
	// }

	dump(){
		// ボットの内部状態を含めてlocalStorageに保存。
		// revive()で復旧
		localStorage.setItem('bot.name',this.name);
		localStorage.setItem('bot.id',this.id);
		localStorage.setItem('bot.avatarId',this.avatarId);

		const states =
		localStorage.setItem('bot.state',JSON.stringify(this.state));
		const parts = this.parts.map(p=>p.dump());
		localStorage.setItem('bot.parts',JSON.stringify(parts));
	}

	load(dict){
		// dictが渡されない場合はlocalstorageから読み込む
		if(!dict){
			const state = localStorage.getItem('bot.state') ;
		
			this.name = localStorage.getItem('bot.name');
			this.id = localStorage.getItem('bot.id');
			this.avatarId = localStorage.getItem('bot.avatarId') || echoBot.avatarId;
			this.state = {avatar:"",queue:[]};
			const parts = JSON.parse(localStorage.getItem('bot.parts'));
			this.parts = parts.map(p=>new Part(p,state));
		}
		else{
			this.id = dict.id;
			this.avatarId = dict.avatarId;
			this.state = {avatar:"",queue:[]};
			this.parts = dict.parts.map(p=>new Part(p,this.state,dict));
		}
		this.setup();

	}

	parseDictionaries(){
		const results = this.parts.reduce(
			(result,p)=>result+p.parseDictionary());

		return results;
	}

	setup(){
		for (let p of this.parts){
			const result = p.setup();
			if(result !== 'ok'){
				return result;
			}
		}
		return 'ok';
	}

	reply(message){
		return new Promise((resolve,reject)=>{
			const ts = new Date();
			let text = "BiomeBot not respond";

			// queueがあればshiftしてreplyとする
			if(this.state.queue.length !==0){
				text = this.state.queue.shift();	
			}
			else
			{
				for(let i in this.parts){
					let p = this.parts[i];
					// availability check
					if(Math.random() > p.availability){
						console.log("availability skip");
						continue;
					}
	
					// triggerLevel check
					const reply = p.replier(message,this.state);
					if(reply.score< p.triggerLevel){
						console.log(`triggerLevel(${reply.score}) insufficient`);
						continue;
					}
	
					reply['timestamp']=ts.getTime();
	
					//retention check
					if(Math.random() < p.retention){
						//このパートを最後尾に
						const me = {...p};
						this.parts.slice(i,1);
						this.parts.push(me)
					}
					reply.name=this.name
					reply.avatar=this.avatarId+this.state.avatar;
					
					// 改行\nがあったらqueueに送る
					if(reply.text.indexOf('\n') !== -1){
						const replies = reply.text.split('\n');
						reply.text = replies.shift();
						this.state.queue.push(replies);
					}

					resolve(reply);
				}
	
	
			}

			// どのpartもreplyしない
			resolve({
				name:this.name,
				speakerId:this.id,
				avatar:this.avatarId,
				text:text,
				timestamp:ts.getTime(),
				score:1
			});
		});
	}

}
