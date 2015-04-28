<?php


// Load application config (error reporting, database credentials etc.)
require 'application/config/config.php';


// The Composer auto-loader (official way to load Composer contents) to load external stuff automatically
/*if (file_exists('vendor/autoload.php')) {
    require 'vendor/autoload.php';
}
*/
// The auto-loader to load the php-login related internal stuff automatically
require 'application/config/autoload.php';

try {
    $db = new Database();
}
catch (PDOException $e) {
    die('Database connection could not be established.');
}


$app = new Application();
