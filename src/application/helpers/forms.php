<?php
/*
 * This function is used so that when a form is submited we can easily
 * display the data the user sent, and we avoid all warnings.
 */
function inp_val($post, $val = '', $ac = '')
{
    $post = isset($_POST[$post]) ? $_POST[$post] : '';
    if (isset($_POST) && isset($_POST['action']) && $_POST['action'] == $ac) {
        echo $post;
    } elseif (isset($_POST) && $ac == '') {
        echo $post;
    } else {
        echo $val;
    }
}