<?php
class User
{
        private $event; private $status;
        private $gender;
        function __construct($logRegEvent){
            $this->event =$logRegEvent;
            $this->status = isset($this->event);
        }
        public function mainRegisterSubmitEvent()
        {
          if($this->status === false)
              return false;
          else return true;
        }
        public function registerUsername($username)
        {

           return true;
        }
        public function registerEmail($email)
        {
            return true;
        }
        public function registerPassword($password,$repeatPassword)
        {

            return true;
        }
        public function registerGender($gender)
        {
            $genderSet = isset($gender);
            $validGen = strtoupper($gender);
            /*if it's set the gender */
            if ($genderSet)
            {
                /*if he/she selected male*/
                if (strncmp($validGen, "MALE", 4))
                {
                    $this->gender = "male";
                    return true;
                }
                /*if he/she selected female*/
                else if (strncmp($validGen, "FEMALE", 6))
                {
                    $this->gender = "female";
                    return true;
                }
            }
            else return false; // the gender is not set and this sucks
        }
        public function regiterBirthday($registerBirthday)
        {
            return true;
        }

}