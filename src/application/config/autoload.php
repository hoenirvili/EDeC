<?php
// classes initial setup
include('init.php');

$classes = array(
    'models/core/Application',
    'models/core/Database',
    'models/core/Session',
    'models/core/View',
    'controllers/Controller',
);
//$classes=array_merge($classes_main, $classes_user);
foreach ($classes as $class)
    require_once APPLICATION_PATH . $class . ".php";
