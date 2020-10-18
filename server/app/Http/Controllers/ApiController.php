<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function message($message = 'No Message', $status = 200)
    {
        return response()->json(compact('message'), $status);
    }

    public function validationError($errors, $message = '')
    {
        $message = $message ?: 'Validation Failed';

        return response()->json(compact('message', 'errors'), 422);
    }

    public function validator(array $rules, array $messages = [], array $customAttributes = [])
    {
        return Validator::make(request()->all(), $rules, $messages, $customAttributes);
    }

    public function fallback()
    {
        return response()->json(['message' => 'Invalid URL.'], 404);
    }
}
