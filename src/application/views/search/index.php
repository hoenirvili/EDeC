<body>
    <div class="container">
        <div class="row">
         <h2>&nbsp;</h2>
             <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <!--search -->
                    <input type="text" name="s" class="  search-query form-control" placeholder="Search" />
                        <span class="input-group-btn">
                            <button class="btn btn-primary search-engine" type="submit">
                                <span class=" glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </form>
                </div><!--col md 12-->
            </div><!--custom search input-->
            <?php Searcher::list_products(Searcher::fetch_best_match()); ?>

        </div> <!--row-->
    </div> <!--container-->