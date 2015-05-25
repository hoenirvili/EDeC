<div class="admin-wrapper">

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <?php
                $Lister=new AdminLister();
                $Lister->per_page=30;
                $Lister->columns=array('ID','USERNAME','EMAIL','TIP','DATA_NASTERII','SEX');
                $Lister->resources=Users::fetchAll($Lister->get_current_page(),$Lister->per_page);
                $Lister->add_link=URL.'controlpannel/add_user';
                $Lister->edit_link=URL.'controlpannel/edit_user?user_id=';
                $Lister->delete_link=URL.'controlpannel/delete_user?user_id=';
                $Lister->pagination_link=URL.'controlpannel/users';
                $Lister->total=Users::getTotals();
                $Lister->display_data();

                ?>
            </div>
        </div>
    </div>
</div>