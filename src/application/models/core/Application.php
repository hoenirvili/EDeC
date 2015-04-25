<?php

/**
 * Class Application
 * The heart of the app
 */

function set_page_name()
{
    global $current_page;
    $request_path = $_SERVER['REQUEST_URI'];
    $path = explode("/", $request_path); // splitting the path
    $last = end($path);
    if(strlen($last)==0)
    {
        $last="homepage";
    }
    $current_page=$last;

}
set_page_name();
function is_page($var)
{
    global $current_page;
    return ($var==$current_page);
}



class Application {
    /** @var null The controller part of the URL */
    public $url_controller;
    /** @var null The method part (of the above controller) of the URL */
    public $url_action;
    /** @var null Parameter one of the URL */
    private $url_parameter_1;
    /** @var null Parameter two of the URL */
    private $url_parameter_2;
    /** @var null Parameter three of the URL */
    private $url_parameter_3;

    /**
     * Starts the Application
     * Takes the parts of the URL and loads the according controller & method and passes the parameter arguments to it
     */
    public function __construct() {


        $this->splitUrl();

        // check for controller: is the url_controller NOT empty ?
        if ($this->url_controller) {
            // check for controller: does such a controller exist ?
            if (file_exists(CONTROLLER_PATH . $this->url_controller . '.php')) {
                // if so, then load this file and create this controller
                // example: if controller would be "car", then this line would translate into: $this->car = new car();
                require CONTROLLER_PATH . $this->url_controller . '.php';
                $this->url_controller = new $this->url_controller();

                // check for method: does such a method exist in the controller ?
                if ($this->url_action) {
                    if (method_exists($this->url_controller, $this->url_action)) {

                        // call the method and pass the arguments to it
                        if (isset($this->url_parameter_3)) {
                            $this->url_controller->{$this->url_action}($this->url_parameter_1, $this->url_parameter_2, $this->url_parameter_3);

                        } elseif (isset($this->url_parameter_2)) {
                            $this->url_controller->{$this->url_action}($this->url_parameter_1, $this->url_parameter_2);
                        } elseif (isset($this->url_parameter_1)) {
                            $this->url_controller->{$this->url_action}($this->url_parameter_1);
                        } else {
                            // if no parameters given, just call the method without arguments
                            $this->url_controller->{$this->url_action}();
                        }
                        $current_page=$this->url_action;
                    } else {
                        // redirect user to error page (there's a controller for that)
                        header('location: ' . URL . 'error/index');
                    }
                } else {
                    // default/fallback: call the index() method of a selected controller
                    $this->url_controller->index();
                }
                // obviously mistyped controller name, therefore show 404
            } else {
                // redirect user to error page (there's a controller for that)
                header('location: ' . URL . 'error/index');
            }
            // if url_controller is empty, simply show the main page (index/index)
        } else {
            // invalid URL, so simply show home/index
            require CONTROLLER_PATH . 'IndexController.php';
            $controller = new IndexController();
            $controller->index();
        }

    }

    /**
     * Gets and splits the URL
     */
    private function splitUrl() {
        if (isset($_GET['url'])) {

            // split URL
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            $this->url_controller = (isset($url[0]) ? $url[0] : null);
            $this->url_action     = (isset($url[1]) ? $url[1] : null);
            if (isset($_POST['action'])) {
                $this->url_action = $_POST['action'];
            }
            $this->url_parameter_1 = (isset($url[2]) ? $url[2] : null);
            $this->url_parameter_2 = (isset($url[3]) ? $url[3] : null);
            $this->url_parameter_3 = (isset($url[4]) ? $url[4] : null);
            $this->url_controller = ucwords($this->url_controller) . 'Controller';
        } else {
            if (isset($_POST['action'])) {
                $this->url_controller = 'index';
                $this->url_action     = $_POST['action'];
                $this->url_controller = ucwords($this->url_controller) . 'Controller';
            }
        }
    }
}