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
        Auth::handleAdminLogin();
        parent::__construct();
    }
    function index() {
        $this->view->render('controlpannel/index');
    }

	function add_product() {
        $this->view->render('controlpannel/add_product');
	}

    function add_user() {
        $this->view->render('controlpannel/add_user');
    }


}
