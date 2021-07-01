<?php

namespace App\Services;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserService
{
    protected $user;
    /**
     * コンストラクタ
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * ログインユーザーを取得
     */
    public function fetchLoginUser()
    {
        return Auth::user();
    }

    /**
     * ユーザー情報を変更する
     */
    public function updateUser(Request $request, User $authUser)
    {
        try {
            $authUser->name = $request->name;
            $authUser->email = $request->email;
            $authUser->save();
        } catch (\Exception $exception) {
            throw $exception;
        }

        return $authUser;
    }
}
