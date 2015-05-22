<?php

class AjaxController extends Controller
{

    function __construct()
    {
        parent::__construct();
        // this controller should only be visible/usable by logged in users, so we put login-check here
        Auth::handleLogin();
    }

    function get_characteristics()
    {
        global $db;
        $searched=$_GET['query'];
        $category_id=$_GET['category_id'];
        echo json_encode(Characteristics::grab_characteristics($searched,$category_id));

    }



}