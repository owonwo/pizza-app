<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName().' Pizza',
        'price' => mt_rand(100, 500) * 0.1,
        'description' => $faker->sentences(1, true),
        'image' => 'https://media1.popsugar-assets.com/files/thumbor/oYivacUQxsjybVn80tgpJo2bahw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/06/10/017/n/1922398/bc378e5c_shutterstock_93720934.jpg',
        'sizes' => 'SM, MD, LG',
    ];
});
