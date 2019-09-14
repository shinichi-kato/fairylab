
export const echoBot={
  name:"Echo",
  id:"@dev/echo",
  avatarId:"crystal/buleCrystal.svg",
  description:"テスト用：ユーザのセリフをそのまま返すエコーです",
  creator: 'system',
  parts: [{
    name:'echo',
    type:'@dev/echo',
    availability: 0.9,
    triggerLevel: 0,
    retention: 1,
    dictionary: "",
  }],
  sourceDicts: [],
  compiledDicts: [],

  selfEstate:0,
  memory:{dummy:'dummy'}
};

export const internalReprBot={
  name:"InternalRepr",
  id:"@dev/internalRepr",
  avatarId:"crystal/buleCrystal.svg",
  description:"テスト用：ユーザのセリフを内部表現に変換します",
  creator: 'system',
  parts: [{
    name:'internalRepr',
    type:'@dev/internalRepr',
    availability: 0.9,
    triggerLevel: 0,
    retention: 1,
    dictionary: "",
  }],
  sourceDicts: [],
  compiledDicts: [],

  selfEstate:0,
  memory:{dummy:'dummy'}
}