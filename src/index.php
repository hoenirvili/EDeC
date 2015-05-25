<?php


// Load application config (error reporting, database credentials etc.)
require 'application/config/config.php';


// The Composer auto-loader (official way to load Composer contents) to load external stuff automatically
if (file_exists('vendor/autoload.php')) {
    require 'vendor/autoload.php';
}

// The auto-loader to load the php-login related internal stuff automatically
require 'application/config/autoload.php';

/*
 * Awfull
try {
    $db = new Database();
}
catch (PDOException $e) {
	print_r($e);
    die('Database connection could not be established.');
}
*/

try
{
    $db= new yajra\Pdo\Oci8(DB_NAME, DB_USER, DB_PASS);
}
catch (PDOException $e) {
    print_r($e);
    die('Database connection could not be established.');
}


$image_sizes = array(
    // The empty image version key defines options for the original image:
    '' => array(
        // Automatically rotate images based on EXIF meta data:
        'auto_orient' => true
    ),
    'large' => array(
        'max_width' => 1200,
        'max_height' => 900,
    ),
    'medium' => array(
        'max_width' => 300,
        'max_height' => 400,
        'crop'=>true
    ),

    'thumbnail' => array(
        'max_width' => 120,
        'max_height' => 120
    ),



);


$app = new Application();