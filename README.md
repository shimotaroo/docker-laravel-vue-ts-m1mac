# Laravel + Vue.js（TypeScript）のDocker環境構築（M1 Mac対応）

## version

- Laravel : 6.x
- Vue.js : 2.6.12
- TypeScript : 3.9.9

## clone

```
$ git clone https://github.com/shimotaroo/docker-laravel-vue-ts-m1mac.git
$ cd docker-laravel-vue-ts-m1mac
```
## .env作成

- `.env.example`をコピーして`.env`を作成して各項目に値を定義する。
- `docker-compose config`で`.env`に設定した環境変数が`docker-compose.yml`にセットされているか確認する。

## Build & Up

```
$ docker-compose up -d --build
```

## コンテナ起動状態を確認

```
$ docker-compose ps
```

3つのコンテナが`Up`になっていたら正常に起動している。

## src/.env作成

```
$ cd src
$ cp .env.example .env
```

## Package Install

appコンテナに入る

```
$ docker-compose exec app bash
```

以降は全てappコンテナ内で実行

```
composer install
php artisan key:generate
npm install
```

- Vue-Router（3.5.1）
- Vuex（3.6.2）
- Vuetify（2.5.0）

もインストールされる。

## TSのビルド

appコンテナ内で実行

```
npm run dev
```

以下のような出力になればコンパイル成功。

```
 DONE  Compiled successfully in 7762ms                                              7:01:05 AM

     Asset      Size   Chunks             Chunk Names
/js/app.js  1.86 MiB  /js/app  [emitted]  /js/app
```

## browerSync起動

appコンテナ内で実行

```
npm run watch
```

※`docker-compose.yml`の以下の記載が無いとエラーになる

```yml
    ports:
      - ${APP_PORT}:3000

```

## Docker Compose Command

```
イメージをビルド
$ docker-compose build

コンテナ起動
$ docker-compose up -d

イメージをビルド＋コンテナ起動
$ docker-compose up -d --build

コンテナ終了（削除）
$ docker-compose down

コンテナ再起動
$ docker-compose restart
```