<?php
/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 4/24/2015
 * Time: 3:04 PM
 */

class ErrorController extends Controller {
    function __construct(){
        parent::__construct();
    }
    function index(){
        if(Auth::is_user_logged_in()) {
            $this->view->render("error/index", false,"logged-in");
        }
        else
        {
            $this->view->render("error/index", false,"not-logged-in");
        }
    }
}