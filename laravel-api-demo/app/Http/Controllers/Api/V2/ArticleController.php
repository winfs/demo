<?php

namespace App\Http\Controllers\Api\V2;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Repositories\ArticleRepository;
use App\Transformers\ArticleTransformer;

class ArticleController extends ApiController
{
    protected $article;

    public function __construct(ArticleRepository $article)
    {
        $this->article = $article;
    }

    public function index()
    {
        $articles = $this->article->all();

        return $this->response->collection($articles, new ArticleTransformer());   
    }
}
