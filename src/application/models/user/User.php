<?php

class User
{
    function __construct()
    {
    }

      public function handleRegister()
      {
          /*we presume that everything it's valid */
          $arrayOfCheckers = SplFixedArray::fromArray(array(0,0,0,0,0));

          /*if the user completed all the forms */
          if( isset($_POST['registerUsername']) &&
              isset($_POST['email']) &&
              isset($_POST['registerPassword']) &&
              isset($_POST['repeatRegisterPassword']) &&
              isset($_POST['gender']) &&
              isset($_POST['birthday']))
          {
              if(!$this->validateUsername($_POST['registerUsername'])) //if it fails
                $arrayOfCheckers[0] = 1;
              if(!$this->validateEmail($_POST['email']))
                $arrayOfCheckers[1] = 1;
              if(!$this->validPassword($_POST['registerPassword']))
                $arrayOfCheckers[2] = 1;
              if(!$this->validRepeatPassword($_POST['repeatRegisterPassword']))
                  $arrayOfCheckers[3] = 1;
              if(!$this->validBirthday($_POST['birthday']))
                  $arrayOfCheckers[4] = 1;

              /*we suspect that everything is ok by default */
              $error = 0;
              /*we iiterate all of error is something get's wrong we handle it like MEN */
              foreach($arrayOfCheckers as $key => $value )
              {
                    switch($key)
                    {
                        case 0:
                            if($value) {
                                $error = 1;
                                add_error("Incorrect username or already registered");
                                break;
                            }
                        case 1:
                            if($value) {
                                $error = 1;
                                add_error("Invalid email or already registerd");
                                break;
                            }
                        case 2:
                            if($value) {
                                $error = 1;
                                add_error("Invalid password ");
                                break;
                            }
                        case 3:
                            if($value) {
                                $error = 1;
                                add_error("The password shold match");
                                break;
                            }
                        case 4:
                            if($value){
                                $error = 1;
                                add_error("Please enter a valid date");
                                break;
                            }
                    }
              }
              /*if everything it's ok*/
              if(!$error)
              {
                  // saveUserFromPost($post);
                  add_success("Registered !");

              }

          }
          else
              /*you bastard :))*/
              add_error("Plase complete all the forms nigga");

      }
//    public function handleRegister()
//    {
//        $error = 0;
//        if (isset($_POST['registerUsername']))
//            if (!$this->validateUsername($_POST['registerUsername'])) {
//                add_error("Username already registred");
//                $error = 1;
//            } else {
//                add_error("Username shouldn't be empty");
//                $error = 1;
//            }
//
//        if ($error)
//            return 0;
//        else
//            $this->saveUserFromPost($_POST);
//        return 1;
//
//        if (isset($_POST['email']))
//        {
//            if (!$this->validateEmail($_POST['email']))
//            {
//                add_error("Email already used");
//            }
//
//            $error = 1;
//        }
//        else
//        {
//            add_error("Please complete the email field");
//            $error = 1;
//        }
//    }


    public function validateUsername($username)
    {
        if ($username == 'test')
            return 1;
        else
            return 0;
    }

    public function validateEmail($email)
    {
        if ($email == 'test@test.com')
            return 1;
        else
            return 0;
    }

    public function validPassword($password)
    {
        if($password === 'test')
            return 1;
        else
            return 0;
    }
    public function validRepeatPassword($repeatPassword)
    {
        if($repeatPassword === 'test')
            return 1;
        else
            return 0;
    }
    public function validBirthday($birthday)
    {
        if($birthday === 'test')
            return 1;
        else
            return 0;
    }
    public function saveUserFromPost($post)
    {
        // adaugam in baza de date
    }

}