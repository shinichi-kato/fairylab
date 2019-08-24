

import {exampleScript} from './example-script.jsx';

export default class BiomeBot{
  constructor(){
    this.settings = {};
    this.parts = [];
  }


  compilePart(part){
    // 辞書を読んでwv,tfidfを生成
  }

  compile(script){
    // スクリプトを読んでコンパイルする

    // スクリプトのディープコピー
    this.settings = {...script.settings};
    this.parts = script.parts.map(part => ({...part}));

    for(let part of this.parts){

    }
  }

  load(compiledScript){
    // コンパイル済みスクリプトをロード
  }



  reply(userMessage){

  }



}
