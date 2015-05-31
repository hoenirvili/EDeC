<body>
    <div class="container" id="products-search">
        <div class="row">
         <h2>&nbsp;</h2>

            <form action="" method="GET">
             <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <!--search -->
                    <input type="text" name="s" class="  search-query form-control" value="<?php if(isset($_GET['s'])) echo $_GET['s']; ?>" placeholder="Search" />
                        <span class="input-group-btn">
                            <button class="btn btn-primary search-engine" type="submit">
                                <span class=" glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                </div><!--col md 12-->
            </div><!--custom search input-->

            </form>
            <?php
            if(isset($_GET['s'])){
                Searcher::list_products(Searcher::fetch_best_match($_GET['s']));
            }else {
                Searcher::list_products(Searcher::fetch_best_match());
            }?>

        </div> <!--row-->
    </div> <!--container-->