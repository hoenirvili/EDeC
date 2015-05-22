
<div class="admin-wrapper">

    <div class="container">
        <div class="row">
            <div class="col-md-12">
            <?php
                $Lister=new AdminLister();
                $Lister->per_page=10;
                $Lister->columns=array('ID','NAME');
                $Lister->resources=Products::fetchAll($Lister->get_current_page(),$Lister->per_page);
                $Lister->add_link=URL.'controlpannel/add_product';
                $Lister->edit_link=URL.'controlpannel/edit_product?product_id=';
                $Lister->delete_link=URL.'controlpannel/delete_product?product_id=';
                $Lister->pagination_link=URL.'controlpannel/products';
                $Lister->total=Products::getTotals();
                $Lister->display_data();

            ?>
            </div>
        </div>
    </div>
</div>