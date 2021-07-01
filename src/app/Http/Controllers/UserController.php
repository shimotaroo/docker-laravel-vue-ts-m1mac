<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;
    /**
     * コンストラクタ
     */
    public function __construct (UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * ユーザー情報変更
     *
     * @oaram UserUpdateRequest $request
     */
    public function update (UserUpdateRequest $request)
    {
        // ログインユーザーを取得
        $authUser = $this->userService->fetchLoginUser();
        // 更新処理
        $response = $this->userService->updateUser($request, $authUser);

        return response($response, 200);
    }
}
