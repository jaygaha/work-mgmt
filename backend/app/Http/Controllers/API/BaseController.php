<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    /**
     * Response back to API with data, message and status code
     */
    public function sendResponse($result, $message, $httpStatus = 200)
    {
    	$response = [
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, $httpStatus);
    }
}
