<?php

/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 9:21 PM
 */
class AdminLister
{

    public $per_page = 20;
    public $resources;
    public $columns;
    public $add_link;
    public $pagination_link;
    public $edit_link;
    public $delete_link;
    public $total;

    public function __construct($resources = null)
    {
        $this->resources = $resources;
    }

    public function display_data()
    {
        $this->display_before_table();
        $this->display_table();
        $this->display_pagination();
    }

    public function display_before_table()
    {
        echo '<br/><hr/><div class="container-fluid">';
        echo '<div class="row-fluid">';
        echo '<div class="col-md-4 col-sm-12">';
        $this->display_add_new();
        echo '</div>';
        echo '<div class="col-md-8 col-sm-12">';
        $this->display_search();
        echo '</div><br/><div class="clearfix"></div><br/>';
        echo '</div>';
        echo '</div>';
    }

    public function get_search_action_url()
    {
        if (isset($_GET['page']) && $_GET['page'] != '') {
            return $this->pagination_link . '?page=' . $_GET['page'];
        } else {
            return $this->pagination_link;
        }
    }

    public function get_searched_value()
    {
        if (isset($_GET['s']) && $_GET['s'] != '') {
               return $_GET['s'];
        }
        else
            return '';
    }

    public function display_search()
    {
        echo '<form role="search" method="GET" action="'.$this->get_search_action_url().'" class="search">';
                echo '<div class="input-group">
                        <input type="text" class="form-control" value="'.$this->get_searched_value().'" placeholder="Search" name="s">
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                        </div>
                     </div>';
        echo '</form>';
    }

    public function display_add_new()
    {
        echo '<a class="btn btn-primary" href="' . $this->add_link . '">Add new</a>';
    }

    public function display_table()
    {
        echo '<table class="table table-striped table-bordered table-condensed">';
        $this->display_header();
        $this->display_body();
        echo '</table>';
    }

    public function display_body()
    {
        echo '<tbody>';
        $this->display_rows();
        echo '</tbody>';
    }

    public function display_rows()
    {
        foreach ($this->resources as $resource)
            echo '<tr>' . $this->display_row($resource) . '</tr>';
    }

    public function display_row($resource)
    {
        foreach ($this->columns as $column) {
            echo '<td>' . $resource->$column . '</td>';
        }
        echo '<td><a class="btn btn-default" href="' . $this->edit_link . $resource->ID . '">Edit</a></td>';
        echo '<td><a class="btn btn-default" href="' . $this->delete_link . $resource->ID . '">Delete</a></td>';
    }

    public function get_current_page()
    {
        if (isset($_GET['page']))
            $page = $_GET['page'];
        else
            $page = 1;
        return $page;
    }

    public function display_pagination()
    {
        $pg = new BootstrapPagination();
        $pg->pagenumber = $this->get_current_page();
        $pg->pagesize = $this->per_page;
        $pg->totalrecords = $this->total;
        $pg->showfirst = true;
        $pg->showlast = true;
        $pg->paginationcss = "pagination-large";
        $pg->paginationstyle = 1; // 1: advance, 0: normal
        if (isset($_GET['s']) && $_GET['s'] != '') {
            $pg->defaultUrl = $this->pagination_link.'?s=' . $_GET['s'];
        } else {
            $pg->defaultUrl = $this->pagination_link;
        }
        if (isset($_GET['s']) && $_GET['s'] != '') {
            $pg->paginationUrl = $this->pagination_link . '?page=[p]&s=' . $_GET['s'];
        } else {
            $pg->paginationUrl = $this->pagination_link . '?page=[p]';
        }
        echo $pg->process();
    }

    public function display_header()
    {
        echo '<thead><tr>';
        foreach ($this->columns as $column) {
            echo '<td>' . $column . '</td>';
        }
        echo '<td>Edit</td>';
        echo '<td>Delete</td>';
        echo '</tr></thead>';
    }
}