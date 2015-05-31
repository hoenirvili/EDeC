<?php

function transform_sql_obj_to_assoc($result, $key, $val="")
{
    if($val!=""){
        $ret = array();
        foreach ($result as $r) {
            $ret[$r->$key] = $r->$val;
        }
        return $ret;
    }
    else
    {
        $ret = array();
        foreach ($result as $r) {
            $ret[] = $r->$key;
        }
        return $ret;
    }
}


function isAssoc($arr)
{
    return array_keys($arr) !== range(0, count($arr) - 1);
}

function date_to_db($datestring)
{
    return date('d-M-Y',strtotime($datestring));
}
function db_to_date($datestring)
{
    return date('m/d/Y',strtotime($datestring));
}

function db_exception($e)
{
    printr($e);
    $code=$e->getCode();
    if($code> 20000&&$code< 20999) {
        add_error($e->getUserError());
    }
    else {
       if(PRODUCTION)
       {
           add_error('There was a problem with the system, please contact an administrator');
       }
        else
        {
            printr($e);
        }
    }
    return false;
}

function retrieve($table, $id, $col)
{
    global $db;
    $sql = $db->prepare("SELECT $col
                                   FROM   $table
                                   WHERE  (id=:id)");
    $sql->execute(array(
        ':id' => $id
    ));
    $sql = $sql->fetch(PDO::FETCH_OBJ);
    if ($sql) {
        return $sql->$col;
    } else {
        return NULL;
    }
}

function strip_html_tags( $text )
{
    $text = preg_replace(
        array(
            // Remove invisible content
            '@<head[^>]*?>.*?</head>@siu',
            '@<style[^>]*?>.*?</style>@siu',
            '@<script[^>]*?.*?</script>@siu',
            '@<object[^>]*?.*?</object>@siu',
            '@<embed[^>]*?.*?</embed>@siu',
            '@<applet[^>]*?.*?</applet>@siu',
            '@<noframes[^>]*?.*?</noframes>@siu',
            '@<noscript[^>]*?.*?</noscript>@siu',
            '@<noembed[^>]*?.*?</noembed>@siu',
            // Add line breaks before and after blocks
            '@</?((address)|(blockquote)|(center)|(del))@iu',
            '@</?((div)|(h[1-9])|(ins)|(isindex)|(p)|(pre))@iu',
            '@</?((dir)|(dl)|(dt)|(dd)|(li)|(menu)|(ol)|(ul))@iu',
            '@</?((table)|(th)|(td)|(caption))@iu',
            '@</?((form)|(button)|(fieldset)|(legend)|(input))@iu',
            '@</?((label)|(select)|(optgroup)|(option)|(textarea))@iu',
            '@</?((frameset)|(frame)|(iframe))@iu',
        ),
        array(
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            "\n\$0", "\n\$0", "\n\$0", "\n\$0", "\n\$0", "\n\$0",
            "\n\$0", "\n\$0",
        ),
        $text );
    return strip_tags( $text );
}


function retrieveU($id, $col)
{
    global $db;
    $sql = $db->prepare("SELECT $col
                                   FROM   users
                                   WHERE  (user_id=:id)");
    $sql->execute(array(
        ':id' => $id
    ));
    $sql = $sql->fetch(PDO::FETCH_OBJ);
    if ($sql) {
        return $sql->$col;
    } else {
        return NULL;
    }
}



function fetchRow($table, $col, $equalto)
{
    global $db;
    $sql = $db->prepare("SELECT *
                                   FROM   $table
                                   WHERE  (" . $col . "=:id)");
    $sql->execute(array(
        ':id' => $equalto
    ));
    $sql=$sql->fetch(PDO::FETCH_OBJ);
    if ($sql) {
        return $sql;
    } else {
        return NULL;
    }
}

function fetchRows($table, $col, $equalto)
{
    global $db;
    $sql = $db->prepare("SELECT *
                                   FROM   $table
                                   WHERE  (" . $col . "=:id)");
    $sql->execute(array(
        ':id' => $equalto
    ));
    $sql=$sql->fetchAll(PDO::FETCH_OBJ);
    if ($sql) {
        return $sql;
    } else {
        return NULL;
    }
}



function delete_record($id, $table)
{
    global $db;
    $data = array(
        ':id' => $id
    );
    $sql  = $db->prepare("DELETE
                                   FROM   " . $table . "
                                   WHERE  (id=:id) ");
    $sql->execute($data);
}


?>