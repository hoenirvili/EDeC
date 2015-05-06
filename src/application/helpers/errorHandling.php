<?php


function add_error($msg)
{
    $_SESSION["feedback_negative"][]=$msg;
}

function add_success($msg)
{
    $_SESSION["feedback_positive"][]=$msg;
}

function printr($mixed)
{
    echo '<pre>';
        print_r($mixed);
    echo '</pre>';
}
