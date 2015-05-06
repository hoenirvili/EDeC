<?php

class AccessController extends Controller
{
    function __construct(){
        parent::__construct();
        /*nothing has been submited and echo back */
        User::$loginSessHandler = 0;
        User::$registerSessHandler = 0;
    }
    public  function index(){

        $this->view->render("access/index",false);
    }
    public function login()
    {
        if(isset($_POST['login']))
        {
            $user = new User();
            User::$loginSessHandler = 1; // problem
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

        if(isset($_POST['register']))
        {
            $user = new User();
            User::$registerSessHandler = 1; //problem
            if($user->handleRegister()!==false)
            {
                // The user is succesfull registered
                header('Location: '.URL.'dashboard/');
            }
            else{
                var_dump(User::$registerSessHandler);
                header('Location: '.URL.'access/');
            }
        }
        else
            //@TODO Add error
            header('Location: '.URL.'access/');
    }

}