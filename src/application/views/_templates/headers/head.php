<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!--css bootstrap , formvalidation font-awsome-->
    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/bootstrap-3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/bootstrap-3.3.4/css/bootstrap-theme.min.css">
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" media="all" rel="stylesheet" type="text/css" > -->
    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/font-awesome-4.3.0/css/font-awesome.css">
    <link rel="stylesheet" href="<?php echo URL ?>html/css/formValidation/formValidation.css" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Montserrat:700' rel='stylesheet' type='text/css'>
    <!--main style -->
    <?php
    if (PRODUCTION) { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/main.css">
    <?php } else { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/index.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/access.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/error.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/search.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/media-queries.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/product.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/css/controlpannel.css">
        <link rel="stylesheet" href="test/css" href="<?php echo URL ?>html/css/stats.css">
    <?php } ?>
    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/plugins/jquery.bxslider.css">

    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/plugins/selectize/dist/css/selectize.bootstrap3.css">
    <link rel="stylesheet" type="text/css" href="<?php echo URL ?>html/plugins/selectize/dist/css/selectize.default.css">
    <title>Ethic Decisions for Consummers</title>
    <!-- pop for people who disabled javascript -->
    <noscript>
        For full functionality of this site it is necessary to enable JavaScript.
        Here are the <a href="http://www.enable-javascript.com/" target="_blank">
            instructions how to enable JavaScript in your web browser</a>.
    </noscript>
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

