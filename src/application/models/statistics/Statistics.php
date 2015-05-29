<?php
/**
 * Created by PhpStorm.
 * User: Cornelius Tutulica
 * Date: 26.05.2015
 * Time: 17:13
 */

class Statistics {

    public static function getMostHatedFeatures($number_of_stats){

        global $db;

        $stmt = "
                BEGIN
                    :return_cursor := EDEC_CARACTERISTICI_PACKAGE.GET_HATE_STATS(:number_of_stats);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);//bind the value
        oci_bind_by_name($sql,':return_cursor',$ret_crs,-1,OCI_B_CURSOR);//bind the cursor

        try {
            oci_execute($sql);
            oci_execute($ret_crs);
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        $result=array();
        while($row = oci_fetch_assoc($ret_crs)) {//rows from cursor
            $name=null;
            $number=null;
            foreach ($row as $v_name => $v_value){//columns from cursor
                if($v_name=='NAME')
                    $name=$v_value;
                if($v_name=='NR')
                    $number=$v_value;
            }
           $result[$name]=$number;
        }

        return $result;

    }

    public static function getMostLovedFeatures($number_of_stats){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_CARACTERISTICI_PACKAGE.GET_LOVE_STATS(:number_of_stats);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

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
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }

    public static function getMostHatedFeaturesByCategory($number_of_stats,$category){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_CARACTERISTICI_PACKAGE.GET_HATE_STATS(:number_of_stats,:category_name);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,':category_name',$category);
        oci_bind_by_name($sql,':return_cursor',$ret_crs,-1,OCI_B_CURSOR);

        try {
            oci_execute($sql);
            oci_execute($ret_crs);
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        //catch app error ?!
        $result=array();
        while($row = oci_fetch_assoc($ret_crs)) {
            $name=null;
            $number=null;
            foreach ($row as $v_name => $v_value){
                if($v_name=='NAME')
                    $name=$v_value;
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }
        return $result;
    }

    public static function getMostLovedFeaturesByCategory($number_of_stats,$category){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_CARACTERISTICI_PACKAGE.GET_LOVE_STATS(:number_of_stats,:category_name);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,':category_name',$category);
        oci_bind_by_name($sql,'return_cursor',$ret_crs,-1,OCI_B_CURSOR);

        try {
            oci_execute($sql);
            oci_execute($ret_crs);
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        //catch app error ?!
        $result=array();
        while($row = oci_fetch_assoc($ret_crs)) {
            $name=null;
            $number=null;
            foreach ($row as $v_name => $v_value){
                if($v_name=='NAME')
                    $name=$v_value;
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }

    public static function getMostHatedProducts($number_of_stats){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_PRODUSE_PACKAGE.GET_HATE_STATS(:number_of_stats);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,':return_cursor',$ret_crs,-1,OCI_B_CURSOR);

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
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }

    public static function getMostLovedProducts($number_of_stats){

        global $db;

        $stmt = "
                BEGIN
                    :return_cursor := EDEC_PRODUSE_PACKAGE.GET_LOVE_STATS(:number_of_stats);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

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
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }


    public static function getMostHatedProductsWFeature($number_of_stats,$feature){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_PRODUSE_PACKAGE.GET_HATE_STATS_WITH_CAR(:number_of_stats,:feature);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,':feature',$feature);
        oci_bind_by_name($sql,':return_cursor',$ret_crs,-1,OCI_B_CURSOR);

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
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }

    public static function getMostLovedProductsWFeature($number_of_stats,$feature){

        global $db;
        $stmt = "
                BEGIN
                    :return_cursor := EDEC_PRODUSE_PACKAGE.GET_LOVE_STATS_WITH_CAR(:number_of_stats,:feature);
                END;";

        $sql = oci_parse ($db->_dbh,$stmt);// Parse a query through the connection.

        $ret_crs = oci_new_cursor($db->_dbh);// Declare a return cursor for the connection.

        oci_bind_by_name($sql,':number_of_stats',$number_of_stats);
        oci_bind_by_name($sql,':feature',$feature);
        oci_bind_by_name($sql,':return_cursor',$ret_crs,-1,OCI_B_CURSOR);

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
                if($v_name=='NR')
                    $number=$v_value;
            }

            $result[$name]=$number;
        }

        return $result;
    }
}