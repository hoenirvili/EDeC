<?php
class AccessController extends Controller
{
    //private static $loginSession;
    //private static $regi
    function __construct(){
        parent::__construct();
    }
    public function index(){

        if(Auth::is_user_logged_in()) {
            $this->view->render("access/index", false,"logged-in");
        }
        else
        {
            $this->view->render("access/index", false,"not-logged-in");
        }
    }
    public function login()
    {
        if(isset($_POST['signin']))
        {
            $user = new User();
            if($user->handleLogin()!==false)
            {
                //The user is succesfull loged
                header('Location: '.URL.'search/');
            }
            else
                header('Location: '.URL.'access/');
        }
        else
            //@TODO add error
            header('Location: '.URL.'access/');
    }
    public function register()
    {

        if(isset($_POST['register']))
        {
            $user = new User();
            if($user->handleRegister()!==false)
            {
                // The user is succesfull registered
                header('Location: '.URL.'access/');
            }
            else header('Location: '.URL.'access/');

        }
        else
            //@TODO Add error
            header('Location: '.URL.'access/');
    }

}