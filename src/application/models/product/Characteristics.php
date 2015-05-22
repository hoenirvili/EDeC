<?php
/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 12:40 PM
 */

class Characteristics {

    /*
     * Returns an array of categories as objects
     */
    public static function get_characteristics_categories()
    {
        global $db;
        $sth = $db->prepare("SELECT * FROM CATEGORIE_CARACTERISTICI");
        try {
            $sth->execute();
        }catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $sth->fetchAll(PDO::FETCH_OBJ);

    }

    public static function grab_characteristics($query,$category_id)
    {
        global $db;
        /*
         * Convert to all lowercase, all uppercase and capitalized
         */
        $lowercase=strtolower($query);
        $uppercase=strtoupper($query);
        $capitalized=ucfirst($lowercase);
        $sth = $db->prepare("SELECT id,name
                                   FROM   CARACTERISTICA C
                                   WHERE  ((C.NAME LIKE :lowercase) OR (C.NAME LIKE :uppercase) OR (C.NAME LIKE :capitalized)) AND CATEGORIE_CARACTERISTICI_ID=:category_id AND ROWNUM <= 20");
        try {
            $sth->execute(array(
                ':lowercase' => $lowercase.'%',
                ':uppercase' => $uppercase.'%',
                ':capitalized' => $capitalized.'%',
                ':category_id'=>$category_id
            ));
        }catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

}