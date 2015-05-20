<?php

/**
 * Class Index
 * The index controller
 */
class ControlPannelController extends Controller {
    /**
     * Construct this object by extending the basic Controller class
     */
    function __construct() {
        parent::__construct();
    }
    function index() {

        $this->view->render('controlpannel/index', false);

    }

	function add_product() {

		if(Auth::is_user_logged_in())
        $this->view->render('controlpannel/add_product', false,"logged-in");
        else
        $this->view->render('controlpannel/add_product', false,"logged-in");

    	/*
		TODO update this when login complete
    	*/
	}

    function add_user() {

        if(Auth::is_user_logged_in())
        $this->view->render('controlpannel/add_user', false,"logged-in");
        else
        $this->view->render('controlpannel/add_user', false,"logged-in");

        /*
        TODO update this when login complete
        */

    }


}
