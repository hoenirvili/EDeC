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
    public static function get_ch_categories()
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

    /*
     * Function used for admin display and pagination
     */
    public static function getTotals()
    {
        global $db;
        if(isset($_GET['s'])&&$_GET['s']!='') {
            $sql = "SELECT COUNT(*) AS C FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID  WHERE CA.NAME LIKE :s";
        }else{
            $sql = "SELECT COUNT(*) AS C FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID";
        }
        $query = $db->prepare($sql);
        try {
            if(isset($_GET['s'])&&$_GET['s']!='') {
                $query->execute(array(
                    ':s'=>'%'.$_GET['s'].'%'
                ));
            }else{
                $query->execute();
            }
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }

        return $query->fetch(PDO::FETCH_OBJ)->C;
    }

    /*
     * Function used for admin display
     */
    public static function fetchAll($page = 1, $per_page = 10)
    {
        global $db;
        $upper_limit = $per_page * $page;
        $lower_limit = $upper_limit - $per_page;
        if(isset($_GET['s'])&&$_GET['s']!='')
        {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM (  SELECT CA.ID,CA.NAME AS CARACTERISTICA, CC.NUME AS CATEGORIE
                    FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID WHERE CA.NAME LIKE :s ORDER BY CA.ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        }else {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM ( SELECT CA.ID, CA.NAME AS CARACTERISTICA, CC.NUME AS CATEGORIE
                    FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID ORDER BY CA.ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        }
        $query = $db->prepare($sql);
        try {
            if(isset($_GET['s'])&&$_GET['s']!='') {
                $query->execute(
                    array(
                        ':lower_limit' => $lower_limit,
                        ':upper_limit' => $upper_limit,
                        ':s'=>'%'.$_GET['s'].'%'
                    )
                );
            }else
            {
                $query->execute(
                    array(
                        ':lower_limit' => $lower_limit,
                        ':upper_limit' => $upper_limit

                    )
                );
            }
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $query->fetchAll(PDO::FETCH_OBJ);
    }


    public static function grab_ch($query,$category_id)
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
            /*
            $sth->execute(array(
                ':lowercase' => '%'.$lowercase.'%',
                ':uppercase' => '%'.$uppercase.'%',
                ':capitalized' => '%'.$capitalized.'%',
                ':category_id'=>$category_id
            ));
            */
            /* This is faster
            */
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
    public static function ch_exists($id)
    {
        global $db;

            $sql="SELECT ID FROM CARACTERISTICA WHERE ID = :id";
            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':id' => $id
                    )
                );

            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            return $query->fetch(PDO::FETCH_OBJ)->ID;

    }

    public static function retrieve_product_ch($product_id)
    {
        $product_ch=array();
        $ch_categories=self::get_ch_categories();
        if($ch_categories)
            foreach($ch_categories as $ch_category){
                $product_ch['ch_'.$ch_category->ID]=self::retrieve_product_ch_by_category($product_id,$ch_category->ID);
            }
        return $product_ch;
    }

    public static function retrieve_product_ch_by_category($product_id,$category_id)
    {
        global $db;
        $sql = "SELECT CP.CARACTERISTICA_ID FROM CARACTERISTICI_PRODUSE CP LEFT JOIN CARACTERISTICA CR ON CR.ID = CP.CARACTERISTICA_ID WHERE CP.PRODUS_ID=:product_id AND CR.CATEGORIE_CARACTERISTICI_ID=:category_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':product_id' => $product_id,
                    ':category_id' => $category_id
                )
            );

        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return transform_sql_obj_to_assoc($query->fetchAll(PDO::FETCH_OBJ),'CARACTERISTICA_ID');
    }

    public static function insert_ch($name,$category_id)
    {
        global $db;
        $sql = "BEGIN
                        edec_caracteristici_package.insertCaracteristica(:c_name,:c_cat);
                END;";

        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':c_name' => $name,
                    ':c_cat' => $category_id
                )
            );

        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $db->lastInsertId('CARACTERISTICA_ID_SEQ');
    }

    public static function get_ch_name($id)
    {
        $row=fetchRow('CARACTERISTICA','ID',$id);
        if($row)
        return $row->NAME;
        return false;
    }



    /*
     * Caracteristics are stored as numeric ids, but when displayed to user they need to be made selects
     */

    public static function convert_list_to_select(array $associative_stored)
    {
        foreach($associative_stored as $name)
        {
            if(is_numeric($name)){
                $ch=self::get_ch_name($name);
                if($ch)
            echo '<option selected value="'.$name.'">'.$ch.'</option>';
            }else
            echo '<option selected value="'.$name.'">'.$name.'</option>';
        }
    }

}