<?php
/**
 * Created by PhpStorm.
 * User: Cornelius
 * Date: 26.05.2015
 * Time: 17:13
 */

class Statistics {
    public static function get_most_loved(){

        global $db;

        $stats=array("mere"=>100,"pere"=>60);

        $sql = "SELECT * FROM USERS WHERE ID>:id";

        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':id' => 2
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
       // $query->fetchAll(PDO::FETCH_OBJ);

        return $query->fetchAll(PDO::FETCH_OBJ);

    }

}