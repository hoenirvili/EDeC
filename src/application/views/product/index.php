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
                          echo '<span class="label label-info">'. Characteristics::get_category_name
                              ($ch_category->ID) .'</span>';
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
                                //var_dump($ch);
                                Characteristics::list_ch_button($current_user,$ch, $ch_category->ID);
                            }
                        else 'Something went wrong please conntact the administrator of the page';
                      }

                    ?>
                    </div>
                </div><!--jumbotron wrapper-->
                <a href="#" class="pull-right missing-ingredient"> Report missing ingredient</a>
            </div><!--col-md-8-->
        </div><!--row-->
    </div><!--container-->




    <!--comment end-->
    <!--pop UP-->
    <!-- Loading animation svg -->
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
         class="util-pie">
        <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
        <path d="M0 50A50 50 0 0 1 50 0L50 50L0 50" fill="#0073eb" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="0.8s"
                              repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M50 0A50 50 0 0 1 100 50L50 50L50 0" fill="#00ff27" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.6s"
                              repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M100 50A50 50 0 0 1 50 100L50 50L100 50" fill="#ff9400" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2.4s"
                              repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M50 100A50 50 0 0 1 0 50L50 50L50 100" fill="#ff3c00" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3.2s"
                              repeatCount="indefinite"></animateTransform>
        </path>
    </svg>
