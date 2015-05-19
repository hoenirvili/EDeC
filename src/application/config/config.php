<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

/**
 * Configuration for: Base URL
 */
include_once('local.php');
define('APPLICATION_PATH', 'application/');
define('CONTROLLER_PATH', 'application/controllers/');
define('MODELS_PATH', 'application/models/');
define('VIEWS_PATH', 'application/views/');
define('PRODUCTION',false);
