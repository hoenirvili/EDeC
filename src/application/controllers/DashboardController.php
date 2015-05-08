<?php


class DashboardController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        //if there is a session started with a succesfull log in render the dashboard or don't do anything.. redirect to error page

        $this->view->render("dashboard/index",false);
    }

}