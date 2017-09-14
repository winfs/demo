<?php

namespace App\Repositories;

use App\User;

class UserRepository
{
    use Repository;

    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }
}
