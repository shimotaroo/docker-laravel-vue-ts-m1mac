<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleService
{
    /**
     * コンストラクタ
     */
    public function __construct()
    {
        $this->article = new Article();
    }

    /**
     * 一覧表示のため、全件取得
     *
     * @param Request $request
     * @return Article
     */
    public function fetchArticles ()
    {
        try {
            $articles = $this->article->with(['user'])
                ->orderBy('created_at', 'desc')
                ->paginate(5);
        } catch (\Exception $exception) {
            throw $exception;
        }

        return $articles;
    }

    /**
     * 記事投稿
     *
     * @param Request $request
     * @return Article
     */
    public function storeArticle (Request $request)
    {
        // トランザクションはつけない（1つのテーブルに対する処理のため）
        try {
            $this->article->fill($request->all());
            $this->article->user_id = Auth::id();
            $this->article->save();
        } catch (\Exception $exception) {
            throw $exception;
        }

        // 登録したArticleモデルのオブジェクトを返す
        return $this->article;
    }
}
