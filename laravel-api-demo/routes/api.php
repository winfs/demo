<?php

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

$api = app('Dingo\Api\Routing\Router');

$api->version(['v1', 'v2'], function($api) {
    $api->group(['namespace' => 'App\Http\Controllers\Auth'], function($api) {
        // 注册
        $api->post('register', 'RegisterController@register');
        // 登录
        $api->post('login', 'LoginController@login');

        // 刷新token
        $api->group(['middleware' => 'api.auth'], function($api) {
            $api->post('refresh', 'LoginController@refresh');
        });
    });
});

$api->version('v1', function($api) {
    $api->group(['namespace' => 'App\Http\Controllers\Api\V1'], function($api) {
        $api->get('articles', 'ArticleController@index');

        // 需要jwt验证后才能使用的API
        $api->group(['middleware' => 'api.auth'], function($api) {
            // User
            $api->resource('users', 'UserController', ['except' => [
                'create', 'edit'
            ]]);
        });
    });
});
