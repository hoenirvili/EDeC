


<?php

$stats_love_features_org=Statistics::getMostLovedFeaturesByCategory(5,'ORGANIZATII');
$stats_love_features_cities=Statistics::getMostLovedFeaturesByCategory(5,'CITIES');
$stats_love_features_foods=Statistics::getMostLovedFeaturesByCategory(5,'ALIMENTE');
$stats_love_features_chemicals=Statistics::getMostLovedFeaturesByCategory(5,'CHEMICALS');

$stats_hate_features_org=Statistics::getMostHatedFeaturesByCategory(5,'ORGANIZATIONS');
$stats_hate_features_cities=Statistics::getMostHatedFeaturesByCategory(5,'ORASE');
$stats_hate_features_foods=Statistics::getMostHatedFeaturesByCategory(5,'FOOD SUBSTANCES');
$stats_hate_features_chemicals=Statistics::getMostHatedFeaturesByCategory(5,'CHIMICALE');

$stats_love_features=Statistics::getMostLovedFeatures(5);
$stats_hate_features=Statistics::getMostHatedFeatures(5);
$stats_hate_products=Statistics::getMostHatedProducts(5);
$stats_love_products=Statistics::getMostLovedProducts(5);

//printr($stats_love_features_org);
//printr($stats_love_features_cities);
//printr($stats_love_features_foods);
//printr($stats_love_features_chemicals);

//printr($stats_hate_features_org);
//printr($stats_hate_features_cities);
//printr($stats_hate_features_foods);
//printr($stats_hate_features_chemicals);
//printr($stats_love_features);
/*printr($stats_love_features);
printr($stats_hate_features);

printr($stats_hate_products);
printr($stats_love_products);*/

?>

<div class="container">
    <br/>
    <br/>

    <div class="jumbotron"><h1>
            Statistics
        </h1></div></header>

    <div class="row">
        <div class="col-md-6">
            <h3>Most loved characteristics</h3>
                <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_features))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_features))); ?>" id="MostLovedCaract"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated characteristics</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_features))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_features))); ?>" id="MostHatedCaract"></div>

        </div>
    </div>
    <hr/>
    <div class="row">
        <div class="col-md-6">
            <h3>Most loved products</h3>
                <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_products))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_products))); ?>" id="MostLovedProducts"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated products</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_products))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_products))); ?>" id="MostHatedProducts"></div>

        </div>
    </div>

    <hr/>
    <div class="row">
        <div class="col-md-6">
            <h3>Most loved Organizations</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_features_org))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_features_org))); ?>" id="MostLovedOrganizations"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated Organizations</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_features_org))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_features_org))); ?>" id="MostHatedOrganizations"></div>

        </div>
    </div>

    <hr/>
    <div class="row">
        <div class="col-md-6">
            <h3>Most loved Cities</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_features_cities))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_features_cities))); ?>" id="MostLovedCities"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated Cities</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_features_cities))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_features_cities))); ?>" id="MostHatedCities"></div>

        </div>
    </div>
    <hr/>
    <div class="row">
        <div class="col-md-6">
            <h3>Most loved Edible</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_features_foods))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_features_foods))); ?>" id="MostLovedEdible"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated Edible</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_features_foods))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_features_foods))); ?>" id="MostHatedEdible"></div>

        </div>
    </div>

    <hr/>
    <div class="row">
        <div class="col-md-6">
            <h3>Most loved Non Edible</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_love_features_chemicals))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_love_features_chemicals))); ?>" id="MostLovedChemicals"></div>

        </div>
        <div class="col-md-6">
            <h3>Most hated Non Edible</h3>
            <div class="ct-perfect-fifth ct-chart" data-labels="<?php echo htmlentities(json_encode(array_keys($stats_hate_features_chemicals))); ?>" data-values="<?php echo htmlentities(json_encode(array_values($stats_hate_features_chemicals))); ?>" id="MostHatedChemicals"></div>

        </div>
    </div>
</div>

