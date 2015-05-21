<?php
class StatsController extends Controller
{
    public function __construct()
    {
        /*
         * TODO the stats are publicly available.
         */
        parent::__construct();
    }
    public function index()
    {
        if(Auth::is_user_logged_in())
            $this->view->render('stats/index');
        else
            $this->view->render('stats/index');
    }

}