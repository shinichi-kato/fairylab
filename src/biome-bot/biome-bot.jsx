import {TinySegmenter} from './tinesegmenter.js';
import nj from './numjs';

import {exampleScript} from './example-script.jsx';

export default class BiomeBot{
  constructor(){
    this.settings = {};
    this.parts = [];
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
