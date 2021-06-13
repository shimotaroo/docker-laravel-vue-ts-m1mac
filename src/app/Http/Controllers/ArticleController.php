<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct ()
    {
        $this->articleService = new ArticleService();
        // 認証不要なメソッドを定義
        $this->middleware('auth')->except(['fetch', 'show']);
    }

    /**
     * 一覧表示のため、全件取得
     */
    public function fetch ()
    {
        $response = $this->articleService->fetchArticles();

        // 第二引数にステータスコードを渡すことでレスポンスのstatusプロパティを指定できる
        return response($response, 200);
    }

    /**
     * 詳細画面のため、idに紐づくデータを1件取得
     *
     * @param String $id
     */
    public function show (string $id)
    {
        $response = $this->articleService->fetchArticleById($id);
        return response($response, 200);
    }
}
