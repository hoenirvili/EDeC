<?php


class SearchController extends Controller
{
    public function __construct()
    {
        Auth::handleLogin();
        parent::__construct();
    }
    public function index()
    {
        $this->view->render("search/index");
    }

}