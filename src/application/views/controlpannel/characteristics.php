<div class="admin-wrapper">

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <?php
                $Lister=new AdminLister();
                $Lister->per_page=30;
                $Lister->columns=array('ID','CARACTERISTICA','CATEGORIE');
                $Lister->resources=Characteristics::fetchAll($Lister->get_current_page(),$Lister->per_page);
                $Lister->add_link=URL.'controlpannel/add_characteristic';
                $Lister->edit_link=URL.'controlpannel/edit_characteristic?characteristic_id=';
                $Lister->delete_link=URL.'controlpannel/delete_characteristic?characteristic_id=';
                $Lister->pagination_link=URL.'controlpannel/characteristics';
                $Lister->total=Characteristics::getTotals();
                $Lister->display_data();

                ?>
            </div>
        </div>
    </div>
</div>