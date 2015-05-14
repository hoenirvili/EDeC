<body class="background-control-pannel">
    <div class="container-fluid display-table">
        <div class="row display-table-row">
            <!--side menu-->
            <div class="col-md-2 display-table-cell valign-top" id="side-menu">
                <h1>Navitaion</h1>
                <ul>
                    <!--DASHBOARD-->
                    <li class="link">
                        <a href="<?php echo 'URL' . 'index/' ?>">
                            <span class="glyphicon glyphicon-th" aria-hidden="true"></span>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <!--ARTICLE-->
                    <li class="link">
                        <a href="#collapse-post" data-toggle="collapse" aria-controls="collapse-post">
                            <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                            <span>Article</span>
                            <span class="label label-success pull-right">28</span>
                        </a>
                        <ul class="collapse collapseable" id="collapse-post">
                            <li><a href="new-article.html">Create New</a></li>
                            <li><a href="new-article.html">View Article</a></li>
                        </ul>
                    </li>


                    <!--Comments-->
                    <li class="link">
                        <a href="#collapse-comments" data-toggle="collapse" aria-controls="collapse-comments">
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            <span>Comments</span>
                        </a>
                        <ul class="collapse collapseable" id="collapse-comments">
                            <li>
                                <a href="approved.html">Approved
                                <span class="label label-success pull-right" aria-hidden="true">10</span>
                                </a>
                            </li>
                            <li>
                                <a href="approved.html">Unnaproved
                                    <span class="label label-warning pull-right" aria-hidden="true">6</span>
                                </a>
                            </li>

                        </ul>
                    </li>


                    <!--COMMENTERS -->
                    <li class="link">
                        <a href="<?php echo 'URL' . 'index/' ?>">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span>Commenters</span>
                        </a>
                    </li>
                    <!--Tags-->
                    <li class="link">
                        <a href="<?php echo 'URL' . 'index/' ?>">
                            <span class="glyphicon glyphicon-tags" aria-hidden="true"></span>
                            <span>Tags</span>
                        </a>
                    </li>
                    <!--Settings -->
                    <li class="link">
                        <a href="#collapse-settings" data-toggle="collapse" aria-controls="collapse-post">
                            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            <span>Settings</span>
                        </a>
                        <ul class="collapse collapseable" id="collapse-settings">
                            <li><a href="details.php">Profile</a></li>
                            <li><a href="avatar.php">Avatar</a></li>
                            <li><a href="Security">Security</a></li>
                        </ul>
                    </li>


                </ul>
            </div> <!--col-md-2 left side pannel-->
            <!--main cntent area-->
            <div class="col-md-10 display-table-cell valign-top">
               <!--headr-->
                <div class="row">
                    <header id="nav-header" class="clearfix">

                        <div class="col-md-5">
                            <input type="text" id="header-search-field" placeholder="Search for something">
                        </div>
                        <div class="col-md-7">
                            <ul class="pull-right">
                                <li id="welcome">Welcome to your administration area</li>
                                <li class="fixed-width">
                                    <a href="#">
                                        <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
                                        <span class="label label-warning">3</span>
                                    </a>
                                </li>
                                <li class="fixed-width">
                                    <a href="#">
                                        <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                        <span class="label label-success">4</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" class="logout">
                                        <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                                        log out
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </header>
                </div>
                <!--footer -->
                <div class="row">
                    <footer id="admin-footer" class="clearfix">
                        <div class="pull-left"><b>Copyright </b>&copy; 2015</div>
                        <div class="pull-right">admin system</div>
                    </footer>
                </div>
            </div><!--col-md-10 main content area-->
        </div>
    </div><!--container fluid-->
    <!--pop UP-->
    <!-- Loading animation svg -->
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="util-pie">
        <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
        <path d="M0 50A50 50 0 0 1 50 0L50 50L0 50" fill="#0073eb" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="0.8s" repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M50 0A50 50 0 0 1 100 50L50 50L50 0" fill="#00ff27" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.6s" repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M100 50A50 50 0 0 1 50 100L50 50L100 50" fill="#ff9400" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2.4s" repeatCount="indefinite"></animateTransform>
        </path>
        <path d="M50 100A50 50 0 0 1 0 50L50 50L50 100" fill="#ff3c00" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3.2s" repeatCount="indefinite"></animateTransform>
        </path>
    </svg>