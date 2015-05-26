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

        $sql = "DECLARE
                    V_H_STAT_ARRAY HATE_STATISTICS_ARRAY:=HATE_STATISTICS_ARRAY();
                BEGIN
                    EDEC_UTILS_PACKAGE.GET_HATE_STATS(V_H_STAT_ARRAY);

                END;";

        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':no_stats' => 10
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