
export const echoBot={
  id:"@dev/Echo",
  avatarId:"avatar/bot/crystal/blueCrystal.svg",
  description:"テスト用：ユーザのセリフをそのまま返します",
  creator: 'system',
  parts: [{
    name:'echo',
    type:'@dev/echo',
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
