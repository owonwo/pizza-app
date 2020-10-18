<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function orders()
    {
        $user = auth()->user();

        return $user->orders()->paginate(30);
    }
}
