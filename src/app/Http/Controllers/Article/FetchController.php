<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use Illuminate\Http\Request;

class FetchController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct ()
    {
        $this->articleService = new ArticleService();
        // 認証が不要
        $this->middleware('auth')->except(['fetch']);
    }

    /**
     * 一覧表示のため、全件取得
     */
    public function fetch (Request $request)
    {
        $response = $this->articleService->fetchArticles();

        // 第二引数にステータスコードを渡すことでレスポンスのstatusプロパティを指定できる
        return response($response, 200);
    }
}
