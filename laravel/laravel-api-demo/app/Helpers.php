<?php

if (!function_exists('dingo_route')) {
    /**
     * 根据别名获得url.
     *
     * @param string $version
     * @param string $name
     * @param string $params
     *
     * @return string
     */
    function dingo_route($version, $name, $params = [])
    {
         return app('Dingo\Api\Routing\UrlGenerator')
             ->version($version)
             ->route($name, $params);
    }
}
