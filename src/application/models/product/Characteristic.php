<?php
/**
 * Created by PhpStorm.
 * User: Ionut
 * Date: 5/22/2015
 * Time: 5:28 PM
 */

class Characteristic {

    public $id;
    public $ID;
    public $NAME;
    public $NUME;
    public $name;
    public $ch_name;
    public $ch_category;
    public $CATEGORY;
    public $category;
    public $category_name;


    public function __construct($id)
    {
        if(!$this->ch_exists($id))
        {
            throw new Exception('Characteristic doesn\'t exist');
        }
        else
        {
            $this->id=$id;
            $this->populate_ch();
        }

    }


    private function get_ch($id)
    {
        if(self::ch_exists($id)) {
            return Characteristics::get_ch_row($id);
        }
        else
        {
            throw new Exception('Characteristic doesn\'t exist');
        }

    }
    public function populate_ch()
    {
        $ch=$this->get_ch($this->id);
        $this->ID=$this->id=$ch->ID;
        $this->NAME=$this->NUME=$this->name=$this->ch_name=$ch->NAME;
        $this->CATEGORY=$this->category=$this->ch_category=$ch->CATEGORIE_CARACTERISTICI_ID;
        $this->category_name=Characteristics::get_category_name($this->category);

    }


    private function ch_exists($id)
    {
        return Characteristics::ch_exists($id);
    }

}