FairyLab
====

ブラウザ上で動作するチャットボットを搭載したチャットルームシステム。

## 概要

チャットにはprivateモード(チャットボットとユーザが1対1で会話する)とgroupモード(認証ユーザとその
チャットボットが集まって会話する）があり、ユーザはprivateで教育したチャットボットを連れてgroupでその
成果を試すことができる。
チャットボットは単機能のボットを複数並列で作動させるBiomeBotを利用する。

## test

javascript部分のみのテスト
```
npm run test
npm run build
serve -s build
```

firebase込のテスト
```
npm run test
npm run build
firebase serve
```

## deployment

```
firebase deploy
```

## TODO

稼働率を変更したら文字列型に変わりtoFixが実行できない
scriptEditorのパート追加ボタンの位置がずれる
