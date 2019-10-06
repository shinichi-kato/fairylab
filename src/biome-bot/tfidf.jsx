import {TinySegmenter} from './internalRepr.jsx';
import nj from './numjs';

const internalRepr = new InternalRepr();

export function generateTfidf(dict){
  // コメント行を除去し、
  // [[入力文字列,入力文字列,...],[出力文字列,出力文字列,...]],
  // [[入力文字列,入力文字列,...],[出力文字列,出力文字列,...]],
  // という形式で格納されたdictを読んでin文字列を検索するためのtfidf行列を返す

  // vocabの生成
  let vocab=new Object();
  for(let i in dict){
    const inStrings = dict[i][0];
    for(let j in inStrings){

      let line=internalRepr.from_inScript(inStrings[j]);
      for(let word of line){
        vocab[word]=true;
      }
    }
  }

  vocab = Object.keys(vocab);

  
}
