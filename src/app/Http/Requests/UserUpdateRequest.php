<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserUpdateRequest extends FormRequest
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
        // usersテーブルの主キーがidじゃなかったら、第4引数に主キーのカラム名を入れて以下のようにする
        // $uniqueEmail = 'unique:users,email,'. Auth::id(), 'id';
        $uniqueEmail = 'unique:users,email,'. Auth::id();
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', $uniqueEmail],
        ];
    }
}
