


<?php

//$stats_love_features_org=Statistics::getMostLovedFeaturesByCategory(4,'ORGANIZATII');
//$stats_love_features_cities=Statistics::getMostLovedFeaturesByCategory(4,'CITIES');
//$stats_love_features_foods=Statistics::getMostLovedFeaturesByCategory(4,'ALIMENTE');
$stats_love_features_chemicals=Statistics::getMostLovedFeaturesByCategory(4,'CHEMICALS');

$stats_hate_features_org=Statistics::getMostHatedFeaturesByCategory(4,'ORGANIZATIONS');
//$stats_hate_features_cities=Statistics::getMostHatedFeaturesByCategory(4,'ORASE');
//$stats_hate_features_foods=Statistics::getMostHatedFeaturesByCategory(4,'FOOD SUBSTANCES');
//$stats_hate_features_chemicals=Statistics::getMostHatedFeaturesByCategory(4,'CHIMICALE');

$stats_love_features=Statistics::getMostLovedFeatures(10);
$stats_hate_features=Statistics::getMostHatedFeatures(10);

$stats_hate_products=Statistics::getMostHatedProducts(5);
$stats_love_products=Statistics::getMostLovedProducts(5);

//printr($stats_love_features_org);
//printr($stats_love_features_cities);
//printr($stats_love_features_foods);
printr($stats_love_features_chemicals);

printr($stats_hate_features_org);
//printr($stats_hate_features_cities);
//printr($stats_hate_features_foods);
//printr($stats_hate_features_chemicals);

printr($stats_love_features);
printr($stats_hate_features);

printr($stats_hate_products);
printr($stats_love_products);

?>


<!--Most loved caracteristics-->
<div class="container box">
   <div class="row">
       <div class="col-md-4"></div>
       <div class="col-md-4 mlc">
            <div class="header-title-canvas">
                <h1>Most loved caracteristics</h1>
            </div>
            <canvas id="MostLovedCaract" width="400" height="400"></canvas>
       </div>
       <div class="col-md-4"></div>
   </div> <!--row-->
</div> <!--container-->


<!-- Most hated caracteristics -->
<div class="container">
    <div class="row">
        <div class="col-md-4"></div>

        <div class="col-md-4 mhc">
            <div class="header-title-canvas">
                <h1>Most hated caracteristics</h1>
            </div>
           <canvas id="MostHatedCaract" width="400" height="400"></canvas>
        </div>

        <div class="col-md-4"></div>
    </div><!--row-->
</div><!--container-->