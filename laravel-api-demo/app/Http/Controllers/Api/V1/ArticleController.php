<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Repositories\ArticleRepository;
use App\Transformers\ArticleTransformer;

/**
 * User resource representation.
 *
 * @Resource("Articles", uri="/articles")
 */
class ArticleController extends ApiController
{
    protected $article;

    public function __construct(ArticleRepository $article)
    {
        $this->article = $article;
    }

    /**
     * Show all users
     *
     * Get a JSON representation of all the registered users.
     *
     * @Get("/")
     * @Versions({"v1"})
     * @Request({"username": "foo", "password": "bar"})
     * @Response(200, body={"id": 10, "username": "foo"})
     * @Parameters({
     *     @Parameter("page", description="The page of results to view.", default=1),
     *     @Parameter("limit", description="The amount of results per page.", default=10)
     * })
     */
    public function index()
    {
        $articles = $this->article->paginate();

        return $this->response->paginator($articles, new ArticleTransformer());
    }
}
