<!--navigation menu-->
<body><?php $this->renderFeedbackMessages(); ?>
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!--logo -->
                <a class="navbar-brand" href="<?php echo URL ?>"><span
                        class="logo-effect">EDeC</span></a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="active">
                        <a href="<?php echo URL . 'index/' ?>">Home</a>
                    </li>
                    <li>
                        <a href="#" id="about">About</a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dashboard<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">Client</li>
                            <li><a href="<?php echo URL . 'access' ?>">Access</a></li>
                            <li><a href="search">Search</a></li>
                            <li class="dropdown-header">Administrator</li>
                            <li><a href="<?php echo URL . 'controlpannel' ?>">Control Pannel</a></li>
                        </ul>
                    </li>
                    <li>
                    <li><a href="<?php echo URL . 'access' ?>">Register</a></li>
                    </li>
                    <li>
                        <a href="#contact" data-toggle="modal">Contact</a>
                    </li>
                </ul>
            </div>
            <!--navbar collapse-->
        </div>
        <!--small container for the navigation bar-->
    </div>
    <!--container to center all the pices together-->
</div>