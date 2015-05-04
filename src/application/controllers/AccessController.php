<?php

class AccessController extends Controller
{
    function __construct(){
        parent::__construct();
    }
    public  function index(){
        $this->view->render("access/index",false);
    }
    public function login()
    {
//        $loginEventUser = @$_POST['singin'];
//        echo 'logat'; // testing
    }
    public function register()
    {
        if(isset($_POST['register']))
        {
            $user = new User();
            if($user->handleRegister()!==false)
            {
                // The user is succesfull loged
                header('Location: '.URL.'access/');
            }
            else
                header('Location: '.URL.'access/');

        }
        else
            //@TODO Add error
            header('Location: '.URL.'access/');
    }

}