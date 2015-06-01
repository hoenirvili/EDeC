<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

/**
 * Configuration for: Base URL
 */
include_once('local.php');
define('APPLICATION_PATH', __DIR__.'/../../application/');
define('CONTROLLER_PATH', APPLICATION_PATH.'controllers/');
define('MODELS_PATH', APPLICATION_PATH.'models/');
define('VIEWS_PATH', APPLICATION_PATH.'views/');
define('PRODUCTION',true);
