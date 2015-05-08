<?php


class Session {
    public static function init() {
        // if no session exist, start the session
        if (session_id() == '') {
            session_start();
            $currentCookieParams = session_get_cookie_params();
            $sidvalue = session_id();
            setcookie(
                'PHPSESSID',//name
                $sidvalue,//value
                0,//expires at end of session
                $currentCookieParams['path'],//path
                $currentCookieParams['domain'],//domain
                false, //secure
                true
            );
        }
    }
    public static function set($key, $value) {
        $_SESSION[$key] = $value;
    }

    public static function get($key) {
        if (isset($_SESSION[$key])) {
            return $_SESSION[$key];
        }
    }

    public static function destroy() {
            session_destroy();
    }


}
