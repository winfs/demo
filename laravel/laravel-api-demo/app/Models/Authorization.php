<?php

namespace App\Models;

use Carbon\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class Authorization
{
    protected $token;

    public function __construct($token = null)
    {
        $this->token = $token;
    }

    public function getPayload()
    {
        return JWTAuth::setToken($this->token)->getPayload();
    }

    public function toArray()
    {
        $payload = $this->getPayload();

        // get expired time
        $expiredAt = Carbon::createFromTimestamp($payload->get('exp'))->toDateTimeString();

        // refresh expired time
        $refreshExpiredAt = Carbon::createFromTimestamp($payload->get('iat'))
            ->addMinutes(config('jwt.refresh_ttl'))
            ->toDateTimeString();

        return [
            'token' => $this->token,
            'expired_at' => $expiredAt,
            'refresh_expired_at' => $refreshExpiredAt,
        ];
    }
}
