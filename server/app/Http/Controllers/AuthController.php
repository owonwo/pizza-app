<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends ApiController
{
    public function register()
    {
        $validator = $this->validator([
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed',
            'phone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors(), 'Validation Failed');
        }

        $user = User::create($validator->getData());

        return response()->json([
            'message' => 'User created successfully',
            'access_token' => $this->createUserToken($user),
        ], 201);
    }

    public function createUserToken(User $user)
    {
        return $user->createToken('USER_AUTH')->plainTextToken;
    }

    public function login()
    {
        $validator = $this->validator([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator->errors(), 'Some fields are missing.');
        }

        $passed = auth('web')->attempt([
               'email' => request('email'),
               'password' => request('password'),
           ]);

        if (!$passed) {
            return response()->json(['error' => 'Unauthorised', 'message' => 'Invalid username or password'], 401);
        }

        $user = auth()->user();

        return response()->json([
            'access_token' => $this->createUserToken($user),
            ]);
    }
}
