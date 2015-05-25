<?php

/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/25/2015
 * Time: 10:03 PM
 */
class Searcher
{

    public static function fetch_best_match($query = '')
    {
        global $db, $current_user;
        if ($query == '') {
            $sql = "SELECT CP.PRODUS_ID ,count(*) as frequency FROM EDEC.USER_LOVES UL RIGHT JOIN EDEC.CARACTERISTICI_PRODUSE CP ON UL.CARACTERISTICA_ID=CP.CARACTERISTICA_ID WHERE UL.USER_ID=:user_id AND CP.PRODUS_ID NOT IN (SELECT CAP.PRODUS_ID FROM EDEC.USER_HATES UH RIGHT JOIN EDEC.CARACTERISTICI_PRODUSE CAP ON UH.CARACTERISTICA_ID=CAP.CARACTERISTICA_ID WHERE UH.USER_ID=:user_id_h) GROUP BY CP.PRODUS_ID ORDER BY frequency DESC";

            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':user_id' => $current_user->ID,
                        ':user_id_h' => $current_user->ID,
                    )
                );
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            return $query->fetchAll(PDO::FETCH_OBJ);
        }
    }

    public static function list_products($results)
    {
        self::open_row();
        foreach ($results as $k => $result) {
            if ($k % 4 == 0) {
                self::close_row();
                self::open_row();
            }
            self::display_product($result->PRODUS_ID);
        }
        self::close_row();
    }

    public static function display_product($product_id)
    {
        $product = new Product($product_id);
        echo '<div class="col-md-3">
                       <div class="product">';
        echo '           <a href="' . URL . 'product/?id=' . $product_id . '" class="img-box-wrapper">';
        echo '              <span class="label label-info lable-product-format">';
        echo '              <p class="text-center">' . $product->product_name . '</p>';
        echo '              </span>';
        echo '              <img src="' . Media::get_src($product->product_image, 'medium') . '" class="img-responsive img-rounded">';
        echo '            </a>
                       </div>
              </div>';
    }

    public static function open_row()
    {
        echo '<div class="container"><div class="row">';
    }

    public static function close_row()
    {
        echo '</div></div>';
    }
}