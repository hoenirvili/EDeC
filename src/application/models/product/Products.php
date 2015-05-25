<?php

/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 3:39 PM
 */
class Products
{

    /*
     * Function that handle POST insert
     */
    public static function insert_product()
    {
        global $db;

        if (!isset($_POST)) {
            add_error('There was an issue please contact the administrator.');
        }
        $media_id = 0;
        if (isset($_POST['product_name']))
            $media_id = Media::handle_upload('upload_image');
        if ($media_id) {
            $sql = "BEGIN
                        edec_produse_package.insertProduct(:name,:image);
                    END;";

            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':name' => $_POST['product_name'],
                        ':image' => $media_id
                    )
                );
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            $product_id = $db->lastInsertId('PRODUS_ID_SEQ');
            $ch_categories = Characteristics::get_ch_categories();
            if ($ch_categories)
                foreach ($ch_categories as $ch_category) {
                    if ($_POST['ch_' . $ch_category->ID])
                        foreach ($_POST['ch_' . $ch_category->ID] as $ch) {
                            if (is_numeric($ch) && Characteristics::ch_exists($ch)) {
                                self::add_ch_to_product($product_id, $ch);
                            } else {
                                $id = Characteristics::insert_ch($ch, $ch_category->ID);
                                self::add_ch_to_product($product_id, $id);
                            }
                        }
                }
            add_success("Product succesfully added");
            return $product_id;
        } else {
            return false;
        }
        add_error("Something bad happened");
        return false;
    }

    /*
     * Function used for admin display and pagination
     */

    public static function getTotals()
    {
        global $db;
        if(isset($_GET['s'])&&$_GET['s']!='') {
            $sql = " SELECT COUNT(*) AS C FROM PRODUS WHERE NAME LIKE :s";
        }else{
            $sql = " SELECT COUNT(*) AS C FROM PRODUS ";
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
          FROM (  SELECT P.*
                    FROM PRODUS P WHERE P.NAME LIKE :s
                ORDER BY ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        }else {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM (  SELECT P.*
                    FROM PRODUS P
                ORDER BY ID) inner) outer
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

    public static function delete_product($product_id)
    {
        global $db;
        self::remove_all_product_characteristics($product_id);
        $sql = "DELETE FROM PRODUS WHERE ID = :product_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':product_id' => $product_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }



    public static function update_product()
    {
        global $db;

        if (!isset($_POST)) {
            add_error('There was an issue please contact the administrator.');
        }
        if ($_FILES['upload_image']['size'])
            $media_id = Media::handle_upload('upload_image');
        else
            $media_id = $_POST['media_id'];
        if ($media_id) {
            $sql = "BEGIN
                        edec_produse_package.edit_product(:name,:image,:id);
                    END;";

            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':name' => $_POST['product_name'],
                        ':image' => $media_id,
                        ':id' => $_GET['product_id']
                    )
                );
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            $product_id = $_GET['product_id'];
            $ch_categories = Characteristics::get_ch_categories();
            self::remove_all_product_characteristics($product_id);
            if ($ch_categories)
                foreach ($ch_categories as $ch_category) {
                    if (isset($_POST['ch_' . $ch_category->ID]))
                        foreach ($_POST['ch_' . $ch_category->ID] as $ch) {

                            if (is_numeric($ch) && Characteristics::ch_exists($ch)) {
                                self::add_ch_to_product($product_id, $ch);
                            } else {
                                $id = Characteristics::insert_ch($ch, $ch_category->ID);
                                self::add_ch_to_product($product_id, $id);
                            }
                        }
                }
            add_success("Product succesfully updated");
            return $product_id;
        } else {
            add_error("The image you uploaded is too big");
            return false;
        }
        add_error("Something bad happened");
        return false;
    }

    public static function get_product_row($id)
    {
        global $db;

        $sql = "SELECT * FROM PRODUS WHERE ID = :id";
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
        return $query->fetch(PDO::FETCH_OBJ);
    }

    public static function product_exists($id)
    {
        global $db;

        $sql = "SELECT ID FROM PRODUS WHERE ID = :id";
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

    public static function remove_all_product_characteristics($product_id)
    {
        global $db;

        $sql = "DELETE FROM CARACTERISTICI_PRODUSE WHERE PRODUS_ID = :product_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':product_id' => $product_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    /*
    * Adds an characteristic to a product
    *
    */
    public static function add_ch_to_product($product_id, $ch_id)
    {
        global $db;
        $sql = "BEGIN
                        edec_produse_package.insertCarProd(:v_prod_id,:v_car_id);
                END;";

        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':v_prod_id' => $product_id,
                    ':v_car_id' => $ch_id
                )
            );
        } catch (PDOException $e) {

            db_exception($e);
            return false;
        }
        return $db->lastInsertId('CARACTERISTICI_PRODUSE_SEQ');
    }
}