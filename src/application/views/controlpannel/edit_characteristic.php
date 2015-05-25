<?php
global $characteristic;
$characteristic_id=$_GET['characteristic_id'];
$characteristic=new Characteristic($characteristic_id);
?>
<div class = "admin-wrapper">

    <div class = "container">
        <div class = "row">
            <div class = "col-md-6 col-sm-12">
                <div class="inner-wrapper">
                    <form id="add_product" class="form-horizontal" method="POST" action="/controlpannel/edit_characteristic?characteristic_id=<?php echo $characteristic_id; ?>">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add Characteristic</legend>

                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" for="product_name">Characteristic Name</label>
                                <div class="controls">
                                    <input id="characteristic_name" name="ch_name" type="text" placeholder="" class=" form-control" required value="<?php echo inp_val('ch_name'); ?>">

                                </div>
                            </div>
                            <br/>
                            <div class="control-group">
                                <label class="control-label" for="ch">Category</label>
                                <div class="controls">

                                    <select class="form-control" name="ch_category">
                                        <?php echo inp_val('ch_category'); ?>
                                    </select>
                                </div>
                            </div>

                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" for=""></label>
                                <div class="controls">
                                    <button type="submit" id="" name="submit" class="btn btn-primary">Update Characteristic</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>