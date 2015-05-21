<?php
class StatsController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        if(Auth::is_user_logged_in())
            $this->view->render('stats/index', false,"logged-in");
        else
            $this->view->render('stats/index', false,"not-logged-in");
    }

}