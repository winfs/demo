<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Transformers\ArticleTransformer;
use App\Http\Controllers\ApiController;
use App\Repositories\ArticleRepository;


class ArticleController extends ApiController
{
    protected $article;

    public function __construct(ArticleRepository $article)
    {
        $this->article = $article;
    }

    public function index()
    {
        $articles = $this->article->paginate();

        return $this->response->paginator($articles, new ArticleTransformer());
    }
}
