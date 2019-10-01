
export const echoBot={
  name:"Greeting",
  id:"@dev/Echo",
  avatarId:"avatar/bot/crystal/blueCrystal.svg",
  description:"テスト用：挨拶を返すボットです",
  creator: 'system',
  parts: [{
    name:'greeting',
    type:'answerer',
    availability: 0.9,
    triggerLevel: 0,
    retention: 1,
  }],
  sourceDicts: {greeting:[
    [['こんにちは'],['ハロー！']]
  ]},
  compiledDicts: {},

  selfEstate:0,
  memory:{dummy:'dummy'}
};

export const internalReprBot={
  name:"InternalRepr",
  id:"@dev/internalRepr",
  avatarId:"avatar/bot/crystal/blueCrystal.svg",
  description:"テスト用：ユーザのセリフを内部表現に変換します",
  creator: 'system',
  parts: [{
    name:'internalRepr',
    type:'@dev/internalRepr',
    availability: 0.9,
    triggerLevel: 0,
    retention: 1,
  }],
  sourceDicts: {},
  compiledDicts: {},

  selfEstate:0,
  memory:{dummy:'dummy'}
}
