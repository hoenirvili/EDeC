<?PHP

global $db;
//$searched=$_POST['query'];
$searched='ICA';
$sth = $db->prepare("SELECT id,name
                                   FROM   CARACTERISTICA C
                                   WHERE  (C.NAME LIKE :searched)");
// DEFAULT is the marker for "normal" accounts (that have a password etc.)
// There are other types of accounts that don't have passwords etc. (FACEBOOK)
try {
    $sth->execute(array(
        ':searched' => $searched.'%'
    ));
}catch (PDOException $e) {
    db_exception($e);
    return false;
}
$results=$sth->fetchAll();
echo json_encode($results);
?>