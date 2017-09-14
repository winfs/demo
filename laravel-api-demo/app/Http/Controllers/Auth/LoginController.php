<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\Authorization;

class LoginController extends ApiController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    public function login(Request $request)
    {
        $validator = $this->validator($request->all());
        if ($validator->fails()) {
            $this->responseError($validator, 'validator fail');
        }

        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return $this->response->errorUnauthorized('invalid credentials');
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return $this->response->errorInternal('could not create token');
        }

        // all good so return the token
        $authorization = new Authorization($token);
        return $this->response->array($authorization->toArray());
    }

    public function refresh()
    {
        $newToken = JWTAuth::parseToken()->refresh();

        $authorization = new Authorization($newToken);
        return $this->response->array($authorization->toArray());
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
    }
}
