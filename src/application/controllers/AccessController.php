<?php
class AccessController extends Controller
{
    //private static $loginSession;
    //private static $regi
    function __construct(){
        parent::__construct();
    }

    public function index(){

        if(isset($_POST['signin']))
        {
            Access::login();
        }elseif(isset($_POST['register']))
        {
            Access::registerNewUser();
        }

        if(Auth::is_user_logged_in()) {
           header('location:'.URL.'dashboard');
            exit;
        }
        else
        {

            $this->view->render("access/index");
        }
    }

    public function logout()
    {
        Access::logout();
        header('Location:'.URL.'access');
    }

}