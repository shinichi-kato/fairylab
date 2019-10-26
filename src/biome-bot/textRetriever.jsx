import {zeros,divide,apply,sum,dot,dotMultiply,
  diag,multiply,isPositive,map,norm,randomInt,matrix} from 'mathjs';


export default class TextRetriever{
  constructor(dict){
    if(dict === void 0){
      this.vocab=null;
      this.idf=null;
      this.tfidf=null;
      return;
    }else{
      this.compile(dict);
    }


  }

  readJson(json){
    const j=JSON.parse(json);
    this.vocab = [...j.vocab];
    this.idf = matrix(j.idf);
    this.tfidf = matrix(j.tfidf);
  }

  toJson(){
    return JSON.stringify({
      vocab:this.vocab,
      idf:this.idf.valueOf(),
      tfidf:this.tfidf.valueOf(),
    });
  }

  dump(){
    return {
      vocab:this.vocab,
      idf:this.idf.valueOf(),
      tfidf:this.tfidf.valueOf(),
    };
  }

  compile(dict){
    // vocabの生成
    this.vocab = new Object();

    for(let i=0,l=dict.length; i<l; i++){
      const line = dict[i];
      for(let word of line[0]){
        this.vocab[word] = true;
      }
    }
    this.vocab = Object.keys(this.vocab);

    // """ Term Frequency: 各行内での単語の出現頻度
    //
    //     tf(t,d) = (ある単語tの行d内での出現回数)/(行d内の全ての単語の出現回数の和) """

    // wv
    this.wv = zeros(dict.length,this.vocab.length);
    for (let i=0,l=dict.length; i<l; i++){
      const line = dict[i];
      // line[0]:in_script, line[1]:out_script
      //ここでinternalRepr

      for(let word of line[0]){
          let pos = this.vocab.indexOf(word);
          if(pos !== -1){
            this.wv.set([i,pos],this.wv.get([i,pos])+1);
          }
      }
    }


    // tf = wv / wv.sum(axis=0)
    const inv_wv = apply(this.wv,1,x=>divide(1,sum(x)) );
    const tf = multiply(diag(inv_wv),this.wv );


    // """ Inverse Document Frequency: 各単語が現れる行の数の割合
    //
    //     df(t) = ある単語tが出現する行の数 / 全行数
    //     idf(t) = log(1 +1/ df(t) )  """

    const num_of_columns = tf.size()[0];
    const df = apply(this.wv,0,x=>sum(isPositive(x))/num_of_columns) ;

    this.idf = map(df,x=>Math.log(1+1/x));
    const tfidf = multiply(tf,diag(this.idf));

    // """
    // 正規化
    // すべてのtfidfベクトルの長さを1にする。これによりretrieveでnormの計算を
    // 毎回しないですむ　"""

    const inv_n = apply(tfidf,1,x=>(divide(1,norm(x))));
    this.tfidf = multiply(diag(inv_n),tfidf);
  }




  retrieve(text){
    // tfidf,df,vocabを利用してtextに一番似ているdictの行番号を返す

    // wv
    const wv = zeros(this.vocab.length);

    // line[0]:in_script, line[1]:out_script
    //ここでinternalRepr
    
    for(let word of text){
        let pos = this.vocab.indexOf(word);
        if(pos !== -1){
          wv.set([pos],wv.get([pos])+1);
        }
    }

    if(sum(wv) === 0){
      return { score: 0 };
    }

    // tfidf 計算

    const tf = map(wv,x=>x/sum(wv) );
    const tfidf = dotMultiply(tf,this.idf);
    // 正規化

    const n = norm(tfidf);
    const ntfidf = map(tfidf,x=>x/n)

    // cos類似度計算(正規化されているので内積と同じ)

    const s = apply(this.tfidf,1,x=>dot(x,ntfidf)).valueOf();

    // 最も類似度が高かった行のindexとその類似度を返す。
    // 同点一位が複数あった場合はランダムに一つを選ぶ

    const max = Math.max(...s);
    let cand = [];
    for(let i=0,l=s.length;i<l;i++){
      let score=s[i];
      if(score === max){
        cand.push({index:i,score:score});
      }
    }

    return cand[randomInt(cand.length)];
  }
}
