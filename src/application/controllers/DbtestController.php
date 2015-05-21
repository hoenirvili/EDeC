<?php
/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/20/2015
 * Time: 8:43 PM
 */

class DbtestController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $this->view->render("dbtest/index");
    }
}