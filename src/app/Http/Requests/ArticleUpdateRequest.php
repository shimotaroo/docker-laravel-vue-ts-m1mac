<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'category_id' => ['required', 'numeric', 'digits:1'],
            'summary' => ['required', 'string', 'min:30', 'max:300'],
            'url' => ['required', 'active_url'],
        ];
    }

    /**
     * バリデーションメッセージの日本語化
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'title' => 'タイトル',
            'category_id'=> 'カテゴリー',
            'summary' => '概要',
            'url' => 'URL'
        ];
    }
}
