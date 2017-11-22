<?php

namespace App\Libs;

use Goutte\Client;

class WechatPostSpider
{
    protected $url;
    protected $crawler;

    public function __construct(Client $client, $url)
    {
        $this->url = $url;
        $this->crawler = $client->request('GET', $url);
    }

    public function getTitle()
    {
        return trim($this->crawler->filter('title')->text());
    }

    public function getContent()
    {
        return trim($this->crawler->filter('.rich_media_content')->text());
    }

    public function getAuthor()
    {
        return trim($this->crawler->filter('#post-date')->nextAll()->text());
    }

    public function getPostDate()
    {
        return $this->crawler->filter('#post-date')->text();
    }

    public function getUrl()
    {
        return $this->url;
    }
}
