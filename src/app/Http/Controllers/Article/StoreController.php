<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleStoreRequest;
use App\Services\ArticleService;

class StoreController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct ()
    {
        $this->articleService = new ArticleService();
    }

    /**
     * 記事登録
     *
     * @param ArticleStoreRequest $request
     * @param Response
     */
    public function store (ArticleStoreRequest $request)
    {
        $response = $this->articleService->storeArticle($request);

        // 第二引数にステータスコードを渡すことでレスポンスのstatusプロパティを指定できる
        // 作成なので201
        return response($response, 201);
    }
}
