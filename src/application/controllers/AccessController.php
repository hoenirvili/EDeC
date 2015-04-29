<?php
    class AccessController extends Controller
    {
        function __construct()
        {
            parent::__construct();
        }

        function index()
        {

            $this->view->render('access/index', false);

        }

    }