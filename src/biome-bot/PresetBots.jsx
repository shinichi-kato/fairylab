
export const echoBot={
  id:"@dev/Echo",
  avatarId:"avatar/bot/crystal/blueCrystal.svg",
  description:"テスト用：ユーザのセリフをそのまま返します",
  creator: 'system',
  parts: [{
    name:'echo',
    type:'@dev/echo',
    availablity: 0.9,
    triggerLevel: 0,
    retention: 1,
  }],
  sourceDicts:{},
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
    availablity: 0.9,
    triggerLevel: 0,
    retention: 1,
  }],
  sourceDicts:{},
  selfEstate:0,
  memory:{dummy:'dummy'}
}

export const reflamerBot={
  id:"reflamer",
  avatarId:"avatar/bot/crystal/blueCrystal.svg",
  description:"リフレーミングのテスト用",
  creator:"skato",
  parts:[{
    name:'reflamer',
    type:'sensor',
    availablity:0.95,
    triggerLevel:0,
    retention: 1,
  }],
  sourceDicts:{
    reflamer:[
      "リフレーミングパート",
      [["こんにちは","今日は","今晩は","こんばんは"],
      ["こんにちは！","今日もお疲れ様です"]],
      [["ばいばい","さようなら"],["ばいば〜い"]],
      [["怒りっぽいと言われた"],["そうだったんですか。。。\n情熱的なんですね。"]],
    ]
  },
  selfEstate:0,
  memory:{dummy:'dummy'}
  
}
