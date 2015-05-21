<?php

class AjaxController extends Controller
{

    function __construct()
    {
        parent::__construct();
        // this controller should only be visible/usable by logged in users, so we put login-check here
        Auth::handleLogin();
    }

    function get_characteristics()
    {
        global $db;
        $searched=$_GET['query'];
        $sth = $db->prepare("SELECT id,name
                                   FROM   CARACTERISTICA C
                                   WHERE  (C.NAME LIKE :searched) AND ROWNUM <= 20");
        try {
            $sth->execute(array(
                ':searched' => $searched.'%'
            ));
        }catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        $results=$sth->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);

    }



}