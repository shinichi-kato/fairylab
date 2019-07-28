FairyLab
====

ブラウザ上で動作するチャットボットを搭載したチャットルームシステム。

## 概要

チャットにはprivateモード(チャットボットとユーザが1対1で会話する)とgroupモード(認証ユーザとその
チャットボットが集まって会話する）があり、ユーザはprivateで教育したチャットボットを連れてgroupでその
成果を試すことができる。
チャットボットは単機能のボットを複数並列で作動させるBiomeBotを利用する。

## test

```
npm run test
npm run build
serve -s build
```

## deployment

```
firebase deploy
```
