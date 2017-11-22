<?php

namespace App\Http\Controllers;

use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Dingo\Api\Exception\ResourceException;

class ApiController extends Controller
{
    use Helpers;

    // 返回错误的响应
    protected function responseError($validator, $message)
    {
        // github like error messages
        // if you don't like this you can use code bellow
        //
        // throw new ValidationHttpException($validator->errors());

        /*
        $result = [];
        $messages = $validator->errors()->toArray();

        if ($messages) {
            foreach ($messages as $field => $errors) {
                foreach ($errors as $error) {
                    $result[] = [
                        'field' => $field,
                        'code'  => $error,
                    ];
                }
            }
        }
        */

        throw new ResourceException($message, $validator->errors());
    }
}
