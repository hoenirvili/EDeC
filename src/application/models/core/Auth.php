<?php

/**
 * Class Auth
 * Simply checks if user is logged in. In the app, several controllers use Auth::handleLogin() to
 * check if user if user is logged in, useful to show controllers/methods only to logged-in users.
 */
class Auth {

    public static function is_user_logged_in()
    {
        if ( ! isset( $_SESSION['user_logged_in'] ) ) {
        return false;
        }
        else
            return true;
    }

    public static function handleLogin() {
        // initialize the session
        Session::init();

        // if user is still not logged in, then destroy session, handle user as "not logged in" and
        // redirect user to login page
        if ( ! isset( $_SESSION['user_logged_in'] ) ) {
            Session::destroy();
            header( 'location: ' . URL );
            // to prevent fetching views via cURL (which "ignores" the header-redirect above) we leave the application
            // the hard way, via exit().
            exit();
        } else {
        }
    }

    public static function handleAdminLogin() {
        Session::init();

        // if user is not an admin, destroy and exit
        if ( ! isset( $_SESSION['user_logged_in'] ) || ! self::is_user_type( "WEDD_ADMIN" ) ) {
            Session::destroy();
            header( 'location: ' . URL );
            // to prevent fetching views via cURL (which "ignores" the header-redirect above) we leave the application
            // the hard way, via exit().
            exit();
        } else {
        }
    }

    public static function get_user_type() {
        $user_type = false;
        switch ( $_SESSION['user_account_type'] ) {
            case 1:
                $user_type = 'user';
                break;
            case 2:
                $user_type = 'admin';
                break;
        }

        return $user_type;
    }

    public static function is_user_type( $string ) {

        $is_user = self::get_user_type() == $string ? true : false;

        return $is_user;
    }
}
