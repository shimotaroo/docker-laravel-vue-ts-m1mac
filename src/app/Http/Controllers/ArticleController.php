<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleStoreRequest;
use App\Http\Requests\ArticleUpdateRequest;
use App\Services\ArticleService;

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
     * 記事登録
     *
     * @param ArticleStoreRequest $request
     * @return Response
     */
    public function store (ArticleStoreRequest $request)
    {
        $response = $this->articleService->storeArticle($request);

        // 第二引数にステータスコードを渡すことでレスポンスのstatusプロパティを指定できる
        // 作成なので201
        return response($response, 201);
    }

    /**
     * 詳細画面のため、idに紐づくデータを1件取得
     *
     * @param String $id
     * @return Response
     */
    public function show (string $id)
    {
        $response = $this->articleService->fetchArticleById($id);
        return response($response, 200);
    }

    /**
     * 投稿稿編集処理
     *
     * @param ArticleUpdateRequest $request
     * @param string $id
     * @return Response
     */
    public function update (ArticleUpdateRequest $request, string $id)
    {
        if (!$id) {
            return response(400);
        }

        $targetArticle = $this->articleService->fetchArticleById($id);

        if (!$targetArticle) {
            return response(404);
        }

        $response = $this->articleService->updateArticle($request, $targetArticle);

        if (!$response) {
            return response([
                'result' => 'failed',
                'message' => '編集に失敗しました'
            ], 409);
        }

        return response(null, 204);
    }
}
