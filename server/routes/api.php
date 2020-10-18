<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'AuthController@login')->name('login');

Route::post('/register', 'AuthController@register');

Route::get('/products', 'ProductController@index');

Route::
    get('/orders', 'UserController@orders')
    ->middleware(['auth:sanctum']);

Route::any('{url?}/{sub_url?}', function () {
    return response()->json(['message' => 'Not Found'], 404);
})->name('api.404.fallback');
