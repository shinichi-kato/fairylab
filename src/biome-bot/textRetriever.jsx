import {TinySegmenter} from './internalRepr.jsx';
import {zeros,get,index,divide,apply,sum,
  diag,multiply,isPositive,map,norm} from 'mathjs';


const internalRepr = new InternalRepr();

export function generateTfidf(dict){
  // コメント行を除去し、
  // [[入力文字列,入力文字列,...],[出力文字列,出力文字列,...]],
  // [[入力文字列,入力文字列,...],[出力文字列,出力文字列,...]],
  // という形式で格納されたdictを読んでin文字列を検索するためのtfidf行列とvocabを返す

  // vocabの生成
  let vocab=new Object();
  for(let i in inDict){
    const inStrings = inDict[i][0];
    for(let j in inStrings){

      let line=internalRepr.from_inScript(inStrings[j]);
      for(let word of line){
        vocab[word]=true;
      }
    }
  }

  vocab = Object.keys(vocab);

  // """ Term Frequency: 各行内での単語の出現頻度
  //
  //     tf(t,d) = (ある単語tの行d内での出現回数)/(行d内の全ての単語の出現回数の和) """

  // wv
  const wv = zeros(dict.length,vocab.length);
  for (let i=0,l=dict.length; i<l; i++){
    const line = dict[i];
    // line[0]:in_script, line[1]:out_script
    //ここでinternalRepr

    for(let word of line[0]){
        let pos = vocab.indexOf(word);
        if(pos !== -1){
          wv.set([i,pos],wv.get([i,pos])+1);
        }
    }
  }


  // tf = wv / wv.sum(axis=0)
  const inv_wv = apply(wv,1,x=>divide(1,sum(x)) );
  const tf = multiply(diag(inv_wv),wv );


  // """ Inverse Document Frequency: 各単語が現れる行の数の割合
  //
  //     df(t) = ある単語tが出現する行の数 / 全行数
  //     idf(t) = log(1 +1/ df(t) )  """

  const num_of_columns = tf.size()[0];
  const df = apply(wv,0,x=>sum(isPositive(x))/num_of_columns) ;

  const idf = map(df,x=>Math.log(1+1/x));
  const tfidf = multiply(tf,diag(idf));

  // """
  // 正規化
  // すべてのtfidfベクトルの長さを1にする。これによりretrieveでnormの計算を
  // 毎回しないですむ　"""

  const inv_norm = apply(tfidf,1,x=>(divide(1,norm(x))));
  const ntfidf = multiply(diag(inv_norm),tfidf);

  return {
    vocab:vocab,
    tfidf:ntfidf,
  };
}
