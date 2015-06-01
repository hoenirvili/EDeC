<?php
/**
 * This is the mega array that stores the current user that is currently logged in
 * And in this we know all the info that we need to extract and modify for
 * different operations
 */
global $current_user;
$product=new Product($_GET['id']);

// See edit product to get values; For characteristics we need a list on categories, and each of them would have an ajax action that ads them to the user preferences. We will also
?>
<div class="container main-wrapper-product-content ">
        <div class="row">
            <div class="col-md-4">
                <div class="box-image-wrapper ">
                   <img src="<?php echo Media::get_src($product->IMAGE,'large') ?>" alt="<?php echo $product->product_name; ?>" class="img-responsive img-rounded">
                </div>

            </div><!--col-md-4-->

            <div class="col-md-8">
                <div class="jumbotron-wrapper">
                    <h1><?php echo $product->product_name; ?></h1>
                    <div class="jumbotron product-jumbotron">
                      <?php
                      $ch_categories = Characteristics::get_ch_categories();
                      if ($ch_categories)
                      foreach ($ch_categories as $ch_category) {
                          /**
                           * Now here we display the chategory of a product that can have
                           * Special things lika beloging to a sort of an orgranization
                           * that user can loves hates or not added yet to her list
                           */
                          echo '<hr/><h3>'. Characteristics::get_category_name($ch_category->ID) .'</h3><hr/>';
                          echo '<br>';
                          /**
                           * If our product has sort of components per that chategory
                           * we must iterate and test if the username has it added or not or if he want to add it to
                           * his list
                           */
                        if ($product->ch['ch_' . $ch_category->ID] != null)
                            foreach($product->ch['ch_' . $ch_category->ID] as $ch)
                            {
                                /**
                                 * We least all different option for user
                                 * add product to fav
                                 * echo product that he/she likes
                                 * echo product that he/she donse't like
                                 */
                                Characteristics::list_ch_button($current_user,$ch, $ch_category->ID);
                            }
                        else 'Something went wrong please conntact the administrator of the page';
                      }

                    ?>
                    </div>
                </div><!--jumbotron wrapper-->
            </div><!--col-md-8-->
        </div><!--row-->
    </div><!--container-->