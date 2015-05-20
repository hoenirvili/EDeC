<?php


class DashboardController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $this->view->render("dashboard/index",false);
    }
}