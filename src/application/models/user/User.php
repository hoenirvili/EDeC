<?php

class User
{
    function __construct()
    {

    }

    public function handleRegister()
    {
        $error = 0;
        if (isset($_POST['registerUsername'])) {
            if (!$this->validateUsername($_POST['registerUsername']))
                add_error("Username wasn't correct");
            $error = 1;
        } else {
            add_error("Username shouldn't be empty");
            $error = 1;
        }
        ////


        if($error)
           return 0;
        else
            $this->saveUserFromPost($_POST);
        return 1;
    }


    public function validateUsername($var)
    {
        if ($var == 'test1')
            return 1;
        else
            return 0;
    }

    public function saveUserFromPost($post)
    {
        // adaugam in baza de date
    }


}