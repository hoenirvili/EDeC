<?php
/**
 * Created by PhpStorm.
 * User: Cornelius
 * Date: 26.05.2015
 * Time: 17:13
 */

class Statistics {

    public static function getMostHated(){

        global $db;

      //  $db = oci_connect('edec', 'admin#522', 'localhost/XE');
      //  if (!$db) {
      //      $e = oci_error();
      //      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
      //  }

        $stmt = "
                BEGIN
                    :return_cursor := EDEC_UTILS_PACKAGE.GET_HATE_STATS(:number_of_stats);
                END;";

        $sql = oci_parse ($db,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db);// Declare a return cursor for the connection.

        $number_of_stats = 10;
        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,'return_cursor',$ret_crs,-1,OCI_B_CURSOR);

        try {
            oci_execute($sql);
            oci_execute($ret_crs);
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        $result=array();
        while($row = oci_fetch_assoc($ret_crs)) {
            $name=null;
            $number=null;
            foreach ($row as $v_name => $v_value){
                if($v_name=='NAME')
                    $name=$v_value;
                if($v_name=='Number')
                    $number=$v_value;
            }

           $result[$name]=$number;
        }

        return $result  ;

    }


}