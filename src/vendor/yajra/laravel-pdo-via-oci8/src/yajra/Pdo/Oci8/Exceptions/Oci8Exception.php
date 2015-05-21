<?php namespace yajra\Pdo\Oci8\Exceptions;

use PDOException;

class Oci8Exception extends PDOException {

    public $user_error="";
    public function __construct($message=null, $code=null,$user_error=null) {
        $this->message = $message;
        $this->code = $code;
        $this->user_error = $user_error;
    }
    public function getUserError()
    {
        return $this->user_error;
    }
}
