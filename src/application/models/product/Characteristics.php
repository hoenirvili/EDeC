<?php

/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 12:40 PM
 */
class Characteristics
{

    /*
     * Returns an array of categories as objects
     */
    public static function get_ch_categories()
    {
        global $db;
        $sth = $db->prepare("SELECT * FROM CATEGORIE_CARACTERISTICI");
        try {
            $sth->execute();
        } catch (PDOException $e) {
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
        if (isset($_GET['s']) && $_GET['s'] != '') {
            $sql = "SELECT COUNT(*) AS C FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID  WHERE CA.NAME LIKE :s";
        } else {
            $sql = "SELECT COUNT(*) AS C FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID";
        }
        $query = $db->prepare($sql);
        try {
            if (isset($_GET['s']) && $_GET['s'] != '') {
                $query->execute(array(
                    ':s' => '%' . $_GET['s'] . '%'
                ));
            } else {
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
        if (isset($_GET['s']) && $_GET['s'] != '') {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM (  SELECT CA.ID,CA.NAME AS CARACTERISTICA, CC.NUME AS CATEGORIE
                    FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID WHERE CA.NAME LIKE :s ORDER BY CA.ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        } else {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM ( SELECT CA.ID, CA.NAME AS CARACTERISTICA, CC.NUME AS CATEGORIE
                    FROM CARACTERISTICA CA JOIN CATEGORIE_CARACTERISTICI CC ON CC.ID = CA.CATEGORIE_CARACTERISTICI_ID ORDER BY CA.ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        }
        $query = $db->prepare($sql);
        try {
            if (isset($_GET['s']) && $_GET['s'] != '') {
                $query->execute(
                    array(
                        ':lower_limit' => $lower_limit,
                        ':upper_limit' => $upper_limit,
                        ':s' => '%' . $_GET['s'] . '%'
                    )
                );
            } else {
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

    public static function grab_ch($query, $category_id)
    {
        global $db;
        /*
         * Convert to all lowercase, all uppercase and capitalized
         */
        $lowercase = strtolower($query);
        $uppercase = strtoupper($query);
        $capitalized = ucfirst($lowercase);
        if($category_id) {
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
                    ':lowercase' => $lowercase . '%',
                    ':uppercase' => $uppercase . '%',
                    ':capitalized' => $capitalized . '%',
                    ':category_id' => $category_id
                ));
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
        }
        else
        {
            $sth = $db->prepare("SELECT id,name
                                   FROM   CARACTERISTICA C
                                   WHERE  ((C.NAME LIKE :lowercase) OR (C.NAME LIKE :uppercase) OR (C.NAME LIKE :capitalized)) AND ROWNUM <= 20");

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
                    ':lowercase' => $lowercase . '%',
                    ':uppercase' => $uppercase . '%',
                    ':capitalized' => $capitalized . '%',
                ));
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
        }
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function get_category_name($categ_id)
    {
        global $db;
        $sth = $db->prepare("SELECT NUME FROM CATEGORIE_CARACTERISTICI WHERE ID=:id");
        try {
            $sth->execute(array(
                ':id' => $categ_id
            ));
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $sth->fetch(PDO::FETCH_OBJ)->NUME;
    }

    public static function ch_exists($id)
    {
        global $db;

        $sql = "SELECT ID FROM CARACTERISTICA WHERE ID = :id";
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

    public static function retrieve_user_ch($user_id)
    {
        $user_ch = array();
        $preferences=array('loves','hates');
        if($preferences)
            foreach($preferences as $preference){
                $user_ch['user_' . $preference] = self::retrieve_user_ch_by_preference($user_id, $preference);
            }
        return $user_ch;
    }

    public static function retrieve_user_ch_by_preference($user_id,$preference)
    {
        global $db;
        if($preference=='loves') {
            $sql = "SELECT * FROM EDEC.USER_LOVES UL WHERE UL.USER_ID=:user_id";
        }
        else
        {
            $sql = "SELECT * FROM EDEC.USER_hates UL WHERE UL.USER_ID=:user_id";
        }
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':user_id' => $user_id,
                )
            );
        } catch (PDOException $e) {

            db_exception($e);
            return false;
        }
        return transform_sql_obj_to_assoc($query->fetchAll(PDO::FETCH_OBJ), 'CARACTERISTICA_ID');
    }

    public static function retrieve_product_ch($product_id)
    {
        $product_ch = array();
        $ch_categories = self::get_ch_categories();
        if ($ch_categories)
            foreach ($ch_categories as $ch_category) {
                $product_ch['ch_' . $ch_category->ID] = self::retrieve_product_ch_by_category($product_id, $ch_category->ID);
            }
        return $product_ch;
    }

    public static function retrieve_product_ch_by_category($product_id, $category_id)
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
        return transform_sql_obj_to_assoc($query->fetchAll(PDO::FETCH_OBJ), 'CARACTERISTICA_ID');
    }

    public static function insert_ch($name, $category_id)
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

    public static function update_characteristic()
    {
        global $db;
        $sql = "BEGIN
                        edec_caracteristici_package.edit_caracteristica(:new_name ,:new_category ,:v_caracteristica_id);
                END;";

        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':new_name' => $_POST['ch_name'],
                    ':new_category' => $_POST['ch_category'],
                    ':v_caracteristica_id' =>$_GET['characteristic_id']
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        add_success("Characteristic succesfully updated");
        return true;
    }

    public static function delete_ch_from_products($ch_id)
    {
        global $db;
        $sql = "DELETE FROM EDEC.CARACTERISTICI_PRODUSE WHERE CARACTERISTICA_ID = :characteristic_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':characteristic_id' => $ch_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function delete_ch_from_user_loves($ch_id)
    {
        global $db;
        $sql = "DELETE FROM EDEC.USER_LOVES WHERE CARACTERISTICA_ID = :characteristic_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':characteristic_id' => $ch_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function delete_ch_from_user_hates($ch_id)
    {
        global $db;
        $sql = "DELETE FROM EDEC.USER_HATES WHERE CARACTERISTICA_ID = :characteristic_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':characteristic_id' => $ch_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function delete_ch($id)
    {
        global $db;
        self::delete_ch_from_products($id);
        self::delete_ch_from_user_loves($id);
        self::delete_ch_from_user_hates($id);
        $sql = "DELETE FROM CARACTERISTICA WHERE ID = :characteristic_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':characteristic_id' => $id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function get_ch_row($id)
    {
        $row = fetchRow('CARACTERISTICA', 'ID', $id);
        if ($row)
            return $row;
        return false;
    }

    public static function get_ch_name($id)
    {
        $row = fetchRow('CARACTERISTICA', 'ID', $id);
        if ($row)
            return $row->NAME;
        return false;
    }

    /*
     * Caracteristics are stored as numeric ids, but when displayed to user they need to be made selects
     */

    public static function convert_list_to_select(array $associative_stored)
    {
        foreach ($associative_stored as $name) {
            if (is_numeric($name)) {
                $ch = self::get_ch_name($name);
                if ($ch)
                    echo '<option selected value="' . $name . '">' . $ch . '</option>';
            } else
                echo '<option selected value="' . $name . '">' . $name . '</option>';
        }
    }

    public static function convert_category_list_to_select($selected)
    {
        $associative_stored = transform_sql_obj_to_assoc(self::get_ch_categories(), 'ID', 'NUME');
        printr($associative_stored);
        foreach ($associative_stored as $key => $val) {
            if ($selected == $key) {
                echo '<option selected value="' . $key . '">' . $val . '</option>';
            } else
                echo '<option value="' . $key . '">' . $val . '</option>';
        }
    }
    public static function list_ch_button($user,$ch_product_id,$ch_category_id)
    {
            /**
             * we must take every product user loves in a object and compare it if the product
             * characteristics matches with the user pref to insert the like template
             * and we must make sure that the pref one corresponds to a sort of category.
             * and vice versa on every product that user hates
             */
        $flag =0;
        $unware_ch = array
        (
            "object" => null,
            "flags" =>array(1 =>0,
                            2 =>0)
        );

        foreach ($user->preferences['user_loves'] as $love_id)
        {
                $love_object = Characteristics::get_ch_row($love_id);
                if( $love_object->ID === $ch_product_id)
                {
                    echo '<div><span>' . Characteristics::get_ch_name($ch_product_id) .'</span>';
                    echo '<a title="Already in your love preferences" href="#" class=" btn btn-sm  btn-disabled button-menu-manage pull-right">';
                    echo '<span class="glyphicon glyphicon-thumbs-up"></span>';
                    echo '</a></div>';
                    $flag = 1;
                }
        }

        /**
         *  If we find a ch that is not loved by user we insert in our remender list
         * with a coresponding flag
         * point
         */
        if( $flag === 0)
        {
            $unware_ch["object"] = Characteristics::get_ch_row($ch_product_id);
            $unware_ch["flags"][1] = 1;
        }

        foreach($user->preferences['user_hates'] as $hate_id)
        {
            $hate_object = Characteristics::get_ch_row($hate_id);
            if($hate_object->ID === $ch_product_id)
            {
                echo '<div><span>' . Characteristics::get_ch_name($ch_product_id) .'</span>';
                echo '<a href="#" title="Already in your hate preferences" class=" btn btn-sm  btn-disabled button-menu-manage pull-right clearfix" style="">';
                echo '<span class="glyphicon glyphicon-thumbs-down"></span>';
                echo '</a></div>';
                $flag = 1;
            }

        }

        /**
         * If we find a ch that is not hated by user we insert in our reminder list
         * with a coresponding flag point
         */
        if( $flag === 0) $unware_ch["flags"][2] = 1;

        /**
         * If the ch product is not finded in the love/hate list we need to test if the product is in the same
         * category and echo the template of that specific ch product
         */
        if(($unware_ch["flags"][1] === 1) && ($unware_ch["flags"][2] === 1) && $unware_ch["object"] !=null)
          {
                if($unware_ch["object"]->CATEGORIE_CARACTERISTICI_ID === $ch_category_id )
                {
                    echo '<div><span>' . Characteristics::get_ch_name($ch_product_id) .'</span>';
                    echo '<a data-chid="'.$ch_product_id.'" href="#" class="add-ch btn btn-sm btn-success pull-right button-menu-manage cleafix"><span class="glyphicon glyphicon-ok"></span></a>';
                    echo '<a data-chid="'.$ch_product_id.'" href="#" class="remove-ch btn btn-sm  btn-warning pull-right button-menu-manage cearfix"><span class="glyphicon glyphicon-remove"></span></a></div>';
                }
          }
    }
}