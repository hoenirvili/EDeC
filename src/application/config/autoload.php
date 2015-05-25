<?php

$classes = array(
    'models/core/Application',
    'models/core/Database',
    'models/core/Session',
    'models/media/Media',
    'models/core/Access',
    'models/core/Auth',
    'models/product/Searcher',
    'models/core/View',
    'models/media/UploadHandler',
    'controllers/Controller',
    'models/product/Characteristics',
    'models/product/Characteristic',
    'models/product/Products',
    'models/product/Product',
    'models/decorators/AdminLister',
    'models/decorators/Pagination',
    'models/decorators/BootstrapPagination',
    'models/user/Users',
    'models/user/User'
);
//$classes=array_merge($classes_main, $classes_user);
foreach ($classes as $class)
    require_once APPLICATION_PATH . $class . ".php";

include('init.php');