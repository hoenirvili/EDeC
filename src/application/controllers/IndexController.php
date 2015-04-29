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

        $this->view->render('homepage/index', false);

    }

}
