<?php

/**
 * Access Model
 *
 * Handles the user's login / logout / registration stuff
 */
class Access
{



    /**
     * Login process (for DEFAULT user accounts).
     * @return bool success state
     */
    public static function login()
    {
        global $db;
        // we do negative-first checks here
        if (!isset($_POST['loginUsername']) OR empty($_POST['loginUsername'])) {
            add_error('Username should not be empty');
            return false;
        }
        if (!isset($_POST['loginPassword']) OR empty($_POST['loginPassword'])) {
            add_error('Password should not be empty');
            return false;
        }

        // get user's data
        // (we check if the password fits the password_hash via password_verify() some lines below)
        $sth = $db->prepare("SELECT *
                                   FROM   users
                                   WHERE  (username = :username)");
        // DEFAULT is the marker for "normal" accounts (that have a password etc.)
        // There are other types of accounts that don't have passwords etc. (FACEBOOK)
        try {
            $sth->execute(array(
                ':username' => $_POST['loginUsername']
            ));
        }
        catch (PDOException $e) {
            db_exception($e);
            return false;
        }
        $count = $sth->fetch(PDO::FETCH_OBJ);
        // if there's NOT one result
        if (!$count) {
            add_error('The username doesn\'t exist.');
            return false;
        }

        // fetch one row (we only have one result)
        $result = $count;


        // check if hash of provided password matches the hash in the database
        if (md5($_POST['loginPassword']) == $result->PASS) {


            // login process, write the user data into session
            Session::init();
            Session::set('user_logged_in', true);
            Session::set('user_id', $result->ID);
            Session::set('user_account_type', $result->TIP);


            add_success('Successfully logged in. ');
            // return true to make clear the login was successful
            return true;

        } else {
            add_error('The password you entered is incorrect.');
            return false;
        }

        // default return
        return false;
    }


    /**
     * Log out process, deletes session
     */
    public static function logout()
    {
        // delete the session
        Session::destroy();
    }



    /**
     * handles the entire registration process
     * @return boolean Gives back the success status of the registration
     */
    public static function registerNewUser()
    {
        global $db;
        // perform all necessary form checks
        /*we presume that everything it's valid */
        $arrayOfCheckers = SplFixedArray::fromArray(array(0, 0, 0, 0, 0));
        /*if the user completed all the inputs*/
        if (isset($_POST['registerUsername']) &&
            isset($_POST['email']) &&
            isset($_POST['registerPassword']) &&
            isset($_POST['repeatRegisterPassword']) &&
            isset($_POST['gender']) &&
            isset($_POST['birthday']) && (
                $_POST['registerUsername'] != "" &&
                $_POST['email'] != "" &&
                $_POST['registerPassword'] != "" &&
                $_POST['repeatRegisterPassword'] != "" &&
                $_POST['birthday'] != "")
        ) {
            if ($_POST['registerPassword'] != $_POST['repeatRegisterPassword']) {
                add_error('Passwords fields have to match');
                return false;
            }
            $media_id=Media::handle_upload('upload_avatr');
            if($media_id) {
                $user_password_hash = md5($_POST['registerPassword']);
                $sql = "  BEGIN
                        edec_users_package.insertUser(:username,:password,:email,:avatar,:tip,:birth_date,:sex);
                    END;";

                $query = $db->prepare($sql);
                try {
                    $query->execute(
                        array(
                            ':username' => $_POST['registerUsername'],
                            ':password' => $user_password_hash,
                            ':email' => $_POST['email'],
                            ':avatar' => $media_id,
                            ':tip' => 1,
                            ':birth_date' => date_to_db($_POST['birthday']),
                            ':sex' => $_POST['gender']
                        )
                    );

                } catch (PDOException $e) {
                    db_exception($e);
                    return false;
                }
                add_success('You have succesfully registered. Please login. ');
                return true;
            }
            else {
                return false;
            }
        } else {
            add_error('Make sure that you have added all the required information');
            return false;
        }
        // default return, returns only true of really successful (see above)
        return false;
    }


}