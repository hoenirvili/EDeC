<?php

/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 3:39 PM
 */
class Users
{

    /*
     * Function that handle POST insert
     */
    public static function insert_user()
    {
        global $db;

        if (!isset($_POST)) {
            add_error('There was an issue please contact the administrator.');
        }
        $media_id = 0;
        if (isset($_POST['username']))
            $media_id = Media::handle_upload('user_avatar');
        if ($media_id) {
            $sql = "BEGIN
                        edec_users_package.insertUser(:v_username,:v_pass,:v_email,:v_avatar,:v_tip,:v_data_nasterii,:v_sex);
                    END;";

            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':v_username' => strip_html_tags($_POST['username']),
                        ':v_pass' => md5($_POST['new_password']),
                        ':v_email' => strip_html_tags($_POST['email']),
                        ':v_avatar' => strip_html_tags($media_id),
                        ':v_tip' => strip_html_tags($_POST['user_type']),
                        ':v_data_nasterii' => date_to_db($_POST['user_birthdate']),
                        ':v_sex' => strip_html_tags($_POST['gender']),
                    )
                );
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            $user_id = $db->lastInsertId('USERS_ID_SEQ');
            $preferences = array('loves', 'hates');
            if ($preferences)
                foreach ($preferences as $preference) {
                    if ($_POST['user_' . $preference])
                        foreach ($_POST['user_' . $preference] as $ch) {
                            if (is_numeric($ch) && Characteristics::ch_exists($ch)) {
                                self::add_ch_to_user($user_id, $ch, $preference);
                            } else {
                            }
                        }
                }
            add_success("User succesfully added");
            return $user_id;
        } else {
            add_error("Please upload an avatar");
            return false;
        }
        add_error("Something bad happened");
        return false;
    }

    public static function update_user()
    {
        global $db,$current_user;

        if (!isset($_POST)) {
            add_error('There was an issue please contact the administrator.');
        }

        if ($_FILES['user_avatar']['size'])
            $media_id = Media::handle_upload('user_avatar');
        else
            $media_id = $_POST['media_id'];

        if (isset($_POST['new_pass'])) {
            $pass = md5($_POST['new_pass']);
        } else {
            $pass = self::get_user_md_pass($_GET['user_id']);
        }
        if($current_user->tip>1) {
            $user_type = strip_html_tags($_POST['user_type']);
        }
        else
        {
            $user_type=1;
        }
        if ($media_id) {
            $sql = "BEGIN
                        edec_users_package.edit_user(:v_user_id,:new_username,:new_pass,:new_email,:new_avatar,:new_type,:new_birthdate,:new_sex);
                    END;";
            $query = $db->prepare($sql);
            try {
                $query->execute(
                    array(
                        ':v_user_id' => strip_html_tags($_GET['user_id']),
                        ':new_username' => strip_html_tags($_POST['username']),
                        ':new_pass' => strip_html_tags($pass),
                        ':new_email' => strip_html_tags($_POST['email']),
                        ':new_avatar' => strip_html_tags($media_id),
                        ':new_type' => $user_type,
                        ':new_birthdate' => strip_html_tags(date_to_db($_POST['user_birthdate'])),
                        ':new_sex' => strip_html_tags($_POST['gender']),
                    )
                );
            } catch (PDOException $e) {
                db_exception($e);
                return false;
            }
            $user_id = $_GET['user_id'];
            self::remove_all_user_characteristics($user_id);
            $preferences = array('loves', 'hates');
            if ($preferences)
                foreach ($preferences as $preference) {
                    if(isset($_POST['user_' . $preference]))
                        foreach ($_POST['user_' . $preference] as $ch) {
                            if (is_numeric($ch) && Characteristics::ch_exists($ch)) {
                                self::add_ch_to_user($user_id, $ch, $preference);
                            } else {
                            }
                        }
                }
            add_success("User succesfully updated");
            return $user_id;
        } else {
            return false;
        }
        add_error("Something bad happened");
        return false;
    }

    public static function get_user_md_pass($user_id)
    {
        global $db;
        $sth = $db->prepare("SELECT *
                                   FROM   USERS
                                   WHERE  (ID = :user_id)");
        try {
            $sth->execute(array(
                ':user_id' => $user_id
            ));
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return $sth->fetch(PDO::FETCH_OBJ)->PASS;
    }

    /*
     * Function used for admin display and pagination
     */

    public static function getTotals()
    {
        global $db;
        if (isset($_GET['s']) && $_GET['s'] != '') {
            $sql = " SELECT COUNT(*) AS C FROM USERS WHERE USERNAME LIKE :s";
        } else {
            $sql = " SELECT COUNT(*) AS C FROM USERS ";
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
          FROM (  SELECT U.*
                    FROM USERS U WHERE U.USERNAME LIKE :s
                ORDER BY ID) inner) outer
 WHERE outer.rn >= :lower_limit AND outer.rn <= :upper_limit";
        } else {
            $sql = "SELECT outer.*
  FROM (SELECT ROWNUM rn, inner.*
          FROM (  SELECT U.*
                    FROM USERS U
                ORDER BY ID) inner) outer
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

    public static function delete_user($user_id)
    {
        global $db;
        self::remove_all_user_characteristics($user_id);
        $sql = "DELETE FROM USERS WHERE ID = :user_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':user_id' => $user_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function get_user_row($id)
    {
        global $db;

        $sql = "SELECT * FROM USERS WHERE ID = :id";
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

    public static function user_exists($id)
    {
        global $db;

        $sql = "SELECT ID FROM USERS WHERE ID = :id";
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

    public static function remove_all_user_characteristics($user_id)
    {
        global $db;

        $sql = "DELETE FROM USER_LOVES WHERE USER_ID = :user_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':user_id' => $user_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        $sql = "DELETE FROM USER_HATES WHERE USER_ID = :user_id";
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':user_id' => $user_id
                )
            );
        } catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        return true;
    }

    public static function gender_input($selected)
    {
        echo '<div class="form-group">';
        if ($selected == 'F') {
            echo '<label class="radio-inline"><input type="radio" name="gender" value="M">Male</label>';
            echo '<label class="radio-inline"><input type="radio" checked name="gender" value="F">Female</label>';
        } else {
            echo '<label class="radio-inline"><input type="radio" checked name="gender" value="M">Male</label>';
            echo '<label class="radio-inline"><input type="radio" name="gender" value="F">Female</label>';
        }
        echo '</div>';
    }

    public static function user_type_input($selected)
    {
        echo '<div class="form-group">';
        if ($selected == 2) {
            echo '<label class="radio-inline"><input type="radio" name="user_type" value="1">User</label>';
            echo '<label class="radio-inline"><input type="radio" checked name="user_type" value="2">Admin</label>';
        } else {
            echo '<label class="radio-inline"><input type="radio" checked name="user_type" value="1">User</label>';
            echo '<label class="radio-inline"><input type="radio" name="user_type" value="2">Admin</label>';
        }
        echo '</div>';
    }

    /*
    * Adds an characteristic to a user preference
    *
    */
    public static function add_ch_to_user($user_id, $ch_id, $preference)
    {
        global $db;
        if ($preference == 'loves') {
            $sql = "BEGIN
                        edec_users_package.insertLove(:user_id,:carac_id);
                END;";
        } else {
            $sql = "BEGIN
                        edec_users_package.insertHate(:user_id,:carac_id);
                END;";
        }
        $query = $db->prepare($sql);
        try {
            $query->execute(
                array(
                    ':user_id' => $user_id,
                    ':carac_id' => $ch_id
                )
            );
        } catch (PDOException $e) {

            db_exception($e);
            return false;
        }
    }

    public static function send_email_to_admin()
    {
        if (isset($_POST)&&isset($_POST['message'])&&isset($_POST['name'])&&isset($_POST['email'])) {
        $mail = new PHPMailer;
        $mail->IsSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                 // Specify main and backup server
        $mail->Port = 587;                                    // Set the SMTP port
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'edec.bot@gmail.com';                // SMTP username
        $mail->Password = 'admin#522';                  // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
        $mail->From = 'edec.bot@gmail.com';
        $mail->FromName = 'Edec';
        $mail->AddAddress('ionut.calara@gmail.com', 'Calara Ionut');  // Add a recipient

        $mail->IsHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'New contact from '.$_POST['name']. ' -> '.$_POST['email'];
        $mail->Body = $_POST['message'];
        $mail->AltBody =$_POST['message'];
        $mail->Send();
        }
    }
}