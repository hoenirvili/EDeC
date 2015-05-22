<?php
/*
 * This function is used so that when a form is submited we can easily
 * display the data the user sent, and we avoid all warnings.
 */
function inp_val($key, $val = '', $ac = '')
{
    $post = isset($_POST[$key]) ? $_POST[$key] : '';
    global $product;
    if ($product)
        if (isset($product->$key))
            $post = $product->$key;

    if (isset($_POST) && isset($_POST['action']) && $_POST['action'] == $ac) {
        echo $post;
    } elseif (isset($_POST) && $ac == '') {
        if (strncmp($key, 'ch_', 3) === 0) {
            if (is_array($post))
                Characteristics::convert_list_to_select($post);
        } else {
            echo $post;
        }
    } else {
        echo $val;
    }
}