<?php
class ThanksController extends Controller
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
        if(isset($_POST))
        {
            Users::send_email_to_admin();
        }
          $this->view->render('thanks/index');
    }

}