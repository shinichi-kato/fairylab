const exampleScript = {
  settings: {
    avatarId: "avatar/user/12panther.svg",
    id: "reflamer-test",
    name: "bot2"  ,
    published: false,
    description: ""
  },
  parts: [
      {
        name: 'reframing',
        type: 'sensor',
        availability: 0.5,
        triggerLevel: 0.04,
        retention: 0.6,
        dictionary: dictionary,
        wv:null,
        tfidf:null,
      },
  ]
};

const dictionary=[
  {
    in : ['こんにちは。','今日は','おはよう'],
    out: ['今日は！','こんにちは！','やあ']
  },
  {
    in : ['引っ込み思案'],
    out: ['進め方が丁寧なんですね']
  },
];
