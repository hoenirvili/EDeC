<div class="container">
    <pre>
        <?php

        /* testing package call */
        global $db;
        $sql="
        BEGIN
                edec_users_package.insertUser(:username,:password,:email,:avatar,:tip,:birth_date,:sex);
                END;

        ";
        $query = $db->prepare($sql);
        try{
            $ex=$query->execute(
            array(
                ':username'=>'test1',
                ':password'=>'123123123asdasdasd0',
                ':email'=>'ionut.plati@gmail.com',
                ':avatar'=>8,
                ':tip'=>1,
                ':birth_date'=>'10-OCT-1993',
                ':sex'=>'M'
            )
        );
        } catch (PDOException $e) {
            printr($e);
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

 ?>
    </pre>


</div>
