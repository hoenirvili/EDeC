<?php
/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 5:28 PM
 */

class Product {

    public $id;
    public $ID;
    public $product_id;
    public $NAME;
    public $product_name;
    public $product_image;
    public $IMAGE;
    public $characteristics;
    public $ch;
    public function __construct($id)
    {
        if(!$this->product_exists($id))
        {
            throw new Exception('Product doesn\'t exist');
        }
        else
        {
            $this->id=$id;
            $this->populate_product();
        }

    }

    public function __get($name)
    {
        if (array_key_exists($name, $this->ch)) {
            return $this->ch[$name];
        }
        return NULL;
    }

    public function __isset($name)
    {

        if (array_key_exists($name, $this->ch)) {
            return true;
        }
        return false;
    }

    private function get_product($id)
    {
        if(self::product_exists($id)) {
           return Products::get_product_row($id);
        }
        else
        {
            throw new Exception('Product doesn\'t exist');
        }

    }
    public function populate_product()
    {
        $product=$this->get_product($this->id);
        $this->product_id=$this->ID=$product->ID;
        $this->NAME=$this->product_name=$product->NAME;
        $this->IMAGE=$this->product_image=$product->IMAGE;
        $this->characteristics=$this->ch=$this->populate_ch();

    }

    public function populate_ch()
    {
        return Characteristics::retrieve_product_ch($this->id);
    }

    private function product_exists($id)
    {
        return Products::product_exists($id);
    }

}