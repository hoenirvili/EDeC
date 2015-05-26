<?php
class ProductController extends Controller
{
    public function __construct()
    {
        Auth::handleLogin();
        parent::__construct();
    }
    public function index()
    {
        if (!isset($_GET) || !isset($_GET['id']) || !Products::product_exists($_GET['id']))
            header('location:' . URL . 'search');
            $this->view->render('product/index');
    }

}