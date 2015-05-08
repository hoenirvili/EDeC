<?php
class AccessController extends Controller
{
    public static $regSess;
    public static $logSess;
    function __construct(){
        parent::__construct();
    }
    public function index(){

        $this->view->render("access/index",false);
    }
    public function login()
    {
        if(isset($_POST['singing']))
        {
            $user = new User();
            if($user->handleLogin()!==false)
            {
                //The user is succesfull loged
                header('Location: '.URL.'dashboard/');
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