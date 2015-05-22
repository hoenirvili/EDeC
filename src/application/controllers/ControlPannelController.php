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
        $product_id=0;
        if(isset($_POST['submit']))
        {
           $product_id=Products::insert_product();
        }
        if($product_id)
        {
            header('location:'.URL.'controlpannel/edit_product?product_id='.$product_id);
        }
        else
        {

            $this->view->render('controlpannel/add_product');
        }
	}
    function edit_product() {
        if(!isset($_GET)||!isset($_GET['product_id'])||!Products::product_exists($_GET['product_id']))
            header('location:'.URL.'controlpannel/products');

        if(isset($_POST['submit']))
        {
            Products::update_product();
        }
        $this->view->render('controlpannel/edit_product');
    }
    function products() {
        $this->view->render('controlpannel/products');
    }

    function characteristics() {
        $this->view->render('controlpannel/characteristics');
    }

    function delete_product() {
        if(!isset($_GET)||!isset($_GET['product_id'])||!Products::product_exists($_GET['product_id']))
            header('location:'.URL.'controlpannel/products');
        Products::delete_product($_GET['product_id']);
        add_success('Product Succefully deleted');
            header('location:'.URL.'controlpannel/products');
    }

    function add_user() {
        $this->view->render('controlpannel/add_user');
    }


}
