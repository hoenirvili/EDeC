<?php

class AjaxController extends Controller
{


    function __construct()
    {
        parent::__construct();
        // this controller should only be visible/usable by logged in users, so we put login-check here
        Auth::handleLogin();
    }

    function get_ch()
    {
        $searched=$_GET['query'];
        if(isset($_GET['category_id']))
        $category_id=$_GET['category_id'];
        else
        {
            $category_id=0;
        }
        echo json_encode(Characteristics::grab_ch($searched,$category_id));

    }

    function add_to_loves()
    {
        global $current_user;
        Users::add_ch_to_user($current_user->id,$_POST['ch_id'],'loves');
        echo json_encode(array('status'=>1));
    }

    function add_to_hates()
    {
        global $current_user;
        Users::add_ch_to_user($current_user->id,$_POST['ch_id'],'hates');
        echo json_encode(array('status'=>1));
    }



}