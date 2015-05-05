<?php

class AccessController extends Controller
{
    private static $registerCheck;
    private static $loginCheck;
    function __construct(){
        parent::__construct();
    }
    public  function index(){
        $this->view->render("access/index",false);
    }
    public function login()
    {
        $this->loginCheck = 0;
        if(isset($_POST['login']))
        {
            $this->loginCheck = 1;
            $user = new User();
            if($user->handleLogin()!==false)
            {
                //The user is succesfull loged
                header('Location: '.URL.'index/');
            }
            else
                header('Location: '.URL.'access/');
        }
    }
    public function register()
    {
       AccessController::$registerCheck = 0;
        if(isset($_POST['register']))
        {
            AccessController::$registerCheck = 1;
            $user = new User();
            if($user->handleRegister()!==false)
            {
                // The user is succesfull registered
                header('Location: '.URL.'access/');

            }
            else{
                header('Location: '.URL.'access/');
            }
        }
        else
            //@TODO Add error
            header('Location: '.URL.'access/');
    }
    public static function retRegAcces()
    {
        return AccessController::$registerCheck;
    }
    public static function retLogAcces()
    {
        return AccessController::$loginCheck;
    }

}