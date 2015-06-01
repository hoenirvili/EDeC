<?php
global $product;
$product_id=$_GET['product_id'];
$product=new Product($product_id);
?>

<div class = "admin-wrapper">

    <div class = "container">
        <div class = "row">
            <div class = "col-md-6 col-sm-12">
                <div class="inner-wrapper">
                    <form id="add_product" class="form-horizontal" method="POST" action="/controlpannel/edit_product?product_id=<?php echo $product_id; ?>" enctype="multipart/form-data">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Edit <?php echo $product->NAME; ?></legend>

                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" #clndr>Product name</label>
                                <div class="controls">
                                    <input id="product_name" name="product_name" type="text" placeholder="" class=" form-control" required value="<?php echo inp_val('product_name'); ?>">

                                </div>
                            </div>
                            <br/>
                                <div class="fileinput fileinput-exists" data-provides="fileinput">
                                    <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;">
                                        <img src="<?php echo Media::get_src($product->product_image,'medium') ?>">
                                    </div>
                                    <div>
                                        <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="upload_image"></span>
                                    </div>
                                </div>
                            <input type="hidden" name="media_id" value="<?php echo $product->product_image ?>">
                            <?php $ch_categories=Characteristics::get_ch_categories();
                            if($ch_categories)
                                foreach($ch_categories as $ch_category){ ?>
                                    <!-- Textarea -->
                                    <div class="control-group">
                                        <label class="control-label" #clndr>Characteristics From : <?php echo $ch_category->NUME ?></label>
                                        <div class="controls">

                                            <select multiple aria-multiselectable class="form-control ch" data-category_id="<?php echo $ch_category->ID ?>"  name="ch_<?php echo $ch_category->ID ?>[]"><?php echo inp_val('ch_'.$ch_category->ID); ?></select>
                                            <p class="help-block">Delimit new values using ;</p>
                                        </div>
                                    </div>
                                <?php } ?>

                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" #clndr></label>
                                <div class="controls">
                                    <button type="submit" id="" name="submit" class="btn btn-primary">Update product</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>