<?php


class DashboardController extends Controller
{
    public function __construct()
    {
        Auth::handleLogin();
        parent::__construct();
    }
    public function index()
    {
        if (isset($_POST['submit'])) {
            global $current_user;
            $_GET['user_id']=$current_user->id;
            Users::update_user();
            unset($_GET['user_id']);
        }
        $this->view->render("dashboard/index");
    }
}