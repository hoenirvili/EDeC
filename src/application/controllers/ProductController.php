<?php
class ProductController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        if(Auth::is_user_logged_in())
            $this->view->render('product/index', false,"logged-in");
        else
            $this->view->render('product/index', false,"not-logged-in");
    }

}