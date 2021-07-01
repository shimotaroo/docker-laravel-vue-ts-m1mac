<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
|--------------------------------------------------------------------------
| 認証
|--------------------------------------------------------------------------
*/

// 会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');
// ログイン
Route::post('/login', 'Auth\LoginController@login')->name('login');
// ログアウト
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

/*
|--------------------------------------------------------------------------
| 画面遷移制御
|--------------------------------------------------------------------------
*/

// ログインユーザーを取得
// ログインしていない場合 Auth::user() は null を返すが、HTTP レスポンスに変換されるときに null は空文字に変わります。
// HTTP メッセージはただの文字列なので null や false などのプログラミング言語的な表現は存在しない。
Route::get('/fetchLoginUser', fn() => Auth::user())->name('user');

/*
|--------------------------------------------------------------------------
| 記事（一覧表示、投稿、詳細、編集、削除）
|--------------------------------------------------------------------------
*/

Route::get('/articles', 'ArticleController@fetch')->name('article.fetch');
Route::post('/article/store', 'ArticleController@store')->name('article.store');
Route::get('/article/{id}', 'ArticleController@show')->name('article.show');
Route::put('/article/{id}', 'ArticleController@update')->name('article.update');
Route::delete('/article/{id}', 'ArticleController@delete')->name('article.delete');

/*
|--------------------------------------------------------------------------
| ユーザー
|--------------------------------------------------------------------------
*/

Route::put('/user', 'UserController@update')->name('user.update');
