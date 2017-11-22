<?php

namespace App\Transformers;

use App\Article;
use League\Fractal\TransformerAbstract;

class ArticleTransformer extends TransformerAbstract
{
    public function transform(Article $article)
    {
        return [
            'id'      => $article['id'],
            'title'   => $article['title'],
            'content' => $article['content'],
        ];
    }
}
