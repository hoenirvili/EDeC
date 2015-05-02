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
        $this->view->render("error/index",false);
    }
}