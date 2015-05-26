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
        var $nr=5;

        $sql = "
                BEGIN
                  :return_cursor :=  EDEC_UTILS_PACKAGE.GET_HATE_STATS(:number);
                END;";
        // Strip special characters to avoid ORA-06550 and PLS-00103 errors.
        $sql = strip_special_characters($sql);
        // Parse a query through the connection.
        $query = oci_parse($db,$sql);
        // Declare a return cursor for the connection.
        $rc = oci_new_cursor($db);
        // Bind PHP variables to the OCI output variable.
        oci_bind_by_name($db,':return_cursor',$rc,-1,OCI_B_CURSOR);
        // Bind PHP variables to the OCI input variable
        oci_bind_by_name($db,':number',$nr);

        try {
            // Execute the PL/SQL statement GET_HATE_STATS; reference cursor.
            oci_execute($query);
            oci_execute($rc);
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }

       //$query->fetch(PDO::FETCH_OBJ);

        return $rc;

    }

}