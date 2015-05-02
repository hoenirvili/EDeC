<?php

class AccessController extends Controller
{
    function __construct(){
        parent::__construct();
    }
    public  function index(){
        $this->view->render("access/index",false);
    }
    public function loginMethod()
    {
//        $loginEventUser = @$_POST['singin'];
//        echo 'logat'; // testing
    }
    public function registerMethod()
    {
        /*all register event + inputs */
        $registerEventUser = @$_POST['register'];
        $username = @$_POST['registerUsername'];
        $email = @$_POST['email'];
        $password = @$_POST['registerPassword'];
        $repeatPassword = @$_POST['repeatPassword'];
        $gender = @$_POST['gender'];
        $registerBirthday = @$_POST['birthday'];

        /*now we must do something with them like validating and shit*/
        /*we create first an object to parse ,validate and send the shit to database*/
        $user = new User($registerEventUser);
        /*after every info is parsed they return a boolean indicating if was valid or parsed ok or not*/
        $inputs = SplFixedArray::fromArray(array(
            $user->mainRegisterSubmitEvent(),
            $user->registerUsername($username),
            $user->registerEmail($email),
            $user->registerPassword($password,$repeatPassword),
            $user->registerGender($gender),
            $user->regiterBirthday($registerBirthday),
        ));

        foreach($inputs as  $key => $value)
        {
            if($value === false)
            {
                echo 'Somthing went very wrong , look one more time you pice of shit';
                break;
            }
            else
                $k = 'ok';
        }

        if($k === 'ok') echo 'complete register';

    }

}