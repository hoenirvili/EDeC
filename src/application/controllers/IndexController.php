<?php

/**
 * Class Index
 * The index controller
 */
class IndexController extends Controller {
    /**
     * Construct this object by extending the basic Controller class
     */
    function __construct() {
        parent::__construct();
    }
    function index() {

        if(Auth::is_user_logged_in())
        $this->view->render('homepage/index', false,"logged-in");
        else
        $this->view->render('homepage/index', false,"not-logged-in");
    }

}
