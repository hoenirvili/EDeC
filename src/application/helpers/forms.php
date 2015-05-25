<?php
/*
 * This function is used so that when a form is submited we can easily
 * display the data the user sent, and we avoid all warnings.
 */
function inp_val($key, $r = '')
{
    $post = isset($_POST[$key]) ? $_POST[$key] : '';
    global $product;
    if ($product)
        if (isset($product->$key))
            $post = $product->$key;

    global $characteristic;
    if ($characteristic)
        if (isset($characteristic->$key))
            $post = $characteristic->$key;

    global $current_user;
    if ($current_user)
        if (isset($current_user->$key))
            $post = $current_user->$key;

    global $user;
    if ($user)
        if (isset($user->$key))
            $post = $user->$key;

    if (strncmp($key, 'ch_', 3) === 0) {
        if (is_array($post))
            Characteristics::convert_list_to_select($post);
        elseif ($key == 'ch_category') {
            Characteristics::convert_category_list_to_select($post);
        } else {
            echo $post;
        }
    }
    elseif ($key=='user_loves'||$key=='user_hates') {
        if (is_array($post))
        Characteristics::convert_list_to_select($post);
        else
            echo '';
    }elseif($key=='user_birthdate')
    {
        echo db_to_date($post);
    }
    elseif ($r != '') {
        if($key=='gender')
        {
            Users::gender_input($post);
        }elseif($key=='user_type')
        {
            Users::user_type_input($post);
        }
    } else {
        echo $post;
    }
    echo '';
}