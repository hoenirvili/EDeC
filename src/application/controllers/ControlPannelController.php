<?php

/**
 * Class Index
 * The index controller
 */
class ControlPannelController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    function __construct()
    {
        Auth::handleAdminLogin();
        parent::__construct();
    }

    function index()
    {
        $this->view->render('controlpannel/index');
    }

    function products()
    {
        $this->view->render('controlpannel/products');
    }

    function add_product()
    {
        $product_id = 0;
        if (isset($_POST['submit'])) {
            $product_id = Products::insert_product();
        }
        if ($product_id) {
            header('location:' . URL . 'controlpannel/edit_product?product_id=' . $product_id);
        } else {

            $this->view->render('controlpannel/add_product');
        }
    }

    function edit_product()
    {
        if (!isset($_GET) || !isset($_GET['product_id']) || !Products::product_exists($_GET['product_id']))
            header('location:' . URL . 'controlpannel/products');

        if (isset($_POST['submit'])) {
            Products::update_product();
        }
        $this->view->render('controlpannel/edit_product');
    }

    function delete_product()
    {
        if (!isset($_GET) || !isset($_GET['product_id']) || !Products::product_exists($_GET['product_id']))
            header('location:' . URL . 'controlpannel/products');
        Products::delete_product($_GET['product_id']);
        add_success('Product Succefully deleted');
        header('location:' . URL . 'controlpannel/products');
    }

    function characteristics()
    {
        $this->view->render('controlpannel/characteristics');
    }

    function add_characteristic()
    {
        $ch_id = 0;
        if (isset($_POST['submit'])) {
            $ch_id = Characteristics::insert_ch($_POST['ch_name'], $_POST['ch_category']);
            add_success("Characteristic succesfully added");
        }
        if ($ch_id) {
            header('location:' . URL . 'controlpannel/edit_characteristic?characteristic_id=' . $ch_id);
        } else {

            $this->view->render('controlpannel/add_characteristic');
        }
    }

    function edit_characteristic()
    {
        if (!isset($_GET) || !isset($_GET['characteristic_id']) || !Characteristics::ch_exists($_GET['characteristic_id']))
            header('location:' . URL . 'controlpannel/characteristics');

        if (isset($_POST['submit'])) {
            Characteristics::update_characteristic();
        }
        $this->view->render('controlpannel/edit_characteristic');
    }

    function delete_characteristic()
    {
        if (!isset($_GET) || !isset($_GET['characteristic_id']) || !Products::product_exists($_GET['characteristic_id']))
            header('location:' . URL . 'controlpannel/characteristics');
        Characteristics::delete_ch($_GET['characteristic_id']);
        add_success('Characteristics succefully deleted');
        header('location:' . URL . 'controlpannel/characteristics');
    }

    function users()
    {
        $this->view->render('controlpannel/users');
    }

    function add_user()
    {
        $user_id=0;
        if (isset($_POST['submit'])) {
            $user_id = Users::insert_user();
        }
        if ($user_id) {
            header('location:' . URL . 'controlpannel/edit_user?user_id=' . $user_id);
        } else {

            $this->view->render('controlpannel/add_user');
        }
    }

    function edit_user()
    {
        if (!isset($_GET) || !isset($_GET['user_id']) || !Users::user_exists($_GET['user_id']))
            header('location:' . URL . 'controlpannel/users');

        if (isset($_POST['submit'])) {
            Users::update_user();
        }
        $this->view->render('controlpannel/edit_user');
    }

    function delete_user()
    {
        if (!isset($_GET) || !isset($_GET['user_id']) || !USers::user_exists($_GET['user_id']))
            header('location:' . URL . 'controlpannel/users');
        Users::remove_all_user_characteristics($_GET['user_id']);
        Users::delete_user($_GET['user_id']);
        add_success('User Succefully deleted');
        header('location:' . URL . 'controlpannel/users');
    }
}
