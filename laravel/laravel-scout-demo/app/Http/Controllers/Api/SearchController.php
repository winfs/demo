<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $error = ['error' => 'No results found, please try with different keywords.'];

        if (!$request->has('q')) {
            return $error;
        }

        $products = Product::search($request->input('q'))->get();

        return $products->count() ? $products : $error;
    }
}
