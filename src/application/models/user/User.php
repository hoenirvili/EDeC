<?php
class User
{
    public $id;
    public $ID;
    public $user_id;
    public $USERNAME;
    public $username;
    public $user_name;
    public $user_image;
    public $user_avatar;
    public $avatar;
    public $tip;
    public $TIP;
    public $user_type;
    public $email;
    public $EMAIL;
    public $user_birthdate;
    public $DATA_NASTERII;
    public $data_nasterii;
    public $gender;
    public $sex;
    public $SEX;
    public $preferences;
    public function __construct($id)
    {
        if(!$this->user_exists($id))
        {
            throw new Exception('User doesn\'t exist');
        }
        else
        {
            $this->id=$id;
            $this->populate_user();
        }

    }

    public function __get($name)
    {
        if (array_key_exists($name, $this->preferences)) {
            return $this->preferences[$name];
        }
        return NULL;
    }

    public function __isset($name)
    {
        if (array_key_exists($name, $this->preferences)) {
            return true;
        }
        return false;
    }

    private function get_user($id)
    {
        if(self::user_exists($id)) {
            return Users::get_user_row($id);
        }
        else
        {
            throw new Exception('User doesn\'t exist');
        }

    }
    public function populate_user()
    {
        $user=$this->get_user($this->id);
        $this->user_id=$this->id=$this->ID=$user->ID;
        $this->USERNAME=$this->user_name=$this->username=$user->USERNAME;
        $this->AVATAR=$this->user_avatar=$this->user_image=$user->AVATAR;
        $this->TIP=$this->user_type=$this->tip=$user->TIP;
        $this->EMAIL=$this->email=$user->EMAIL;
        $this->DATA_NASTERII=$this->user_birthdate=$this->data_nasterii=$user->DATA_NASTERII;
        $this->gender=$this->sex=$this->SEX=$user->SEX;
        $this->preferences=$this->populate_user_characteristics();

    }

    public function populate_user_characteristics()
    {
        return Characteristics::retrieve_user_ch($this->id);
    }

    private function user_exists($id)
    {
        return Users::user_exists($id);
    }

}