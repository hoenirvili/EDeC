<!--navigation menu-->
<body>
<?php
$this->renderFeedbackMessages();
?>
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
                <a class="navbar-brand" href="<?php URL.'/index'?>"><i class="fa fa-anchor fa-2x"></i><span
                        class="logo-effect">EDeC</span></a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="active">
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="<?php echo URL.'index/#ToAbout'?>">About</a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dashboard<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">Client</li>
                            <li><a href="<?php echo URL.'access'?>">Access</a></li>
                            <li><a href="search">Search</a></li>
                            <li class="dropdown-header">Administrator</li>
                            <li><a href="admin">Control Pannel</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#contact" data-toggle="modal">Contact</a>
                    </li>
                </ul>
            </div> <!--navbar collapse-->
        </div> <!--small container for the navigation bar-->
    </div> <!--container to center all the pices together-->
</div> <!-- the big continaer that includes fixed positon and orientation-->
<!--header container -->
<header class="container-fluid">
    <div class="row header-style">
        <div class="jumbotron text-center">
            <div class="container container-header">
                <h1>Ethic Decisions for Consummers</h1>
                <p>The best way to make a decision is to search and document it</p>
                <a href="<?php echo URL.'access/'?>" class="btn btn-primary btn-lg start-button">Start Up!</a>
                <!--<div class="start-button"><a href="#">Start Now!</a></div>-->
            </div> <!-- container to center all pice in the middle-->
        </div>
    </div>
</header>

<!--main body container -->
<div class="container-fluid">
    <!--first seciton -->
    <div class="row section-row section-one">
        <div class="container">
            <div class="col-md-4 text-center" id="el1">
                <i class="left-icon"></i>
                <h3 class="big">Good idea !</h3>
                <p class="three-paragraph">The words "ethics" and "morals" are frequently used interchangeably.
                    Ethics refer to behavior customary in our culture or society. Ethics may change as a person moves from one society to the next.
                    Morals refer to personal standards of right and wrong. Morals do not change as a person moves from one society to the next</p>
            </div>
            <div class="col-md-4 text-center" id="el2">
                <i class="middle-icon"></i>
                <h3 class="big">Best searching ! </h3>
                <p class="three-paragraph">A typical legal rationale for protecting the consumer is based on the notion of policing
                    market failures and inefficiencies, such as inequalities of bargaining power between a consumer and a business.
                     As of all potential voters are also consumers, consumer protection takes on a clear political significance.</p>
            </div>
            <div class="col-md-4 text-center" id="el3">
                <i class="right-icon"></i>
                <h3 class="big">Weekly statistics !</h3>
                <p class="three-paragraph">Major brands in particular say they are keen to build trust in their products by becoming
                    more environmentally and ethically conscious but are prepared only to invest if they can see it will add to the bottom line.</p>
            </div>
        </div>
    </div> <!--row contianer-->
    <!--second section -->
    <div class="row section-row section-two">
        <div class="container">
            <div class="col-md-12 text-center">
                <i class="idea"></i>
                <p class="paragraph-decoration">Coming up with a great idea for a product to sell online will occasionally strike when you
                    least expect it. Many times though, it’s something you need to be proactively on the lookout for.
                    The internet contains a wealth of ideas and inspiration, but as a new entrepreneur, where do you begin?
                    Aimlessly searching online will only get you so far so we have compiled a list of the best resources to give you direction and get you started.</p>
            </div>
        </div>
    </div><!--row contianer-->
    <!--third section -->
    <div class ="row section-row section-three orange-background" id="ToAbout">
        <div class="container">
            <div class="col-md-12 text-center">
                <i class="about"></i>
                <p class="paragraph-decoration">We are a bounch of people doing a fun assignment for collage.We are
                    young and we don't care about anything.We are still at the begining and we try hard to learn as
                    many things as posible.This is a web to monitor the new products that are in the market and
                    making a lot of review and talk about that products. We include all weekly updates
                    and make a giant pool about what's the best prodcut/products that had been searched last week
                    example
                    .</p>
            </div>
        </div>
    </div>
</div> <!--main continer-->
<!--footer -->
<!--navbar-fixed-bottom -->
<div class="navbar navbar-inverse bottom-footer footer-style navy-background " role="navigation">
    <div class="container-fluid">
        <div class="container">
            <div class="navbar-text pull-right">
                <div class="copy">&copy Copyright 2015</div>
                <div class="copy"> Main developers: </div>
                <p> Giulitti Salvatore Elio</p>
                <p> Dorneanu Anca
                <p> Calara Ionut</p>
                <p> Tutuianu Cornealiu</p>
            </div>
            <div class="navbar-text pull-left">
                <a href="<?php echo URL.'index'?>"><p class="footer-title">Ethical decision for consumers</p></a>
                <a href="https://redit.com/EDeC/"><i class="fa fa-reddit fa-2x"></i>www.redit.com</a>
                <a href="https://github.com/hoeni/rvili/EDeC/"><i class="fa fa-github-square fa-2x"></i>www.github
                    .com/hoenirvili</a>
                <a href="http://www.infoiasi.ro/bin/Main/" class="middle-flag-anchor"><i class="middle-flag"></i>Facultatea de informatica</a>
            </div>
        </div>
    </div><!--small container-->
</div><!--the big container that includes fixed position and orientation-->


<!--POP UP CONTACT ME-->
<div class="modal fade" id="contact" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <form class="form-horizontal" role="form">
                <div class="modal-header">
                    <h4>Contact us !</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="contact-name" class="col-sm-2 control-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="contact-name" placeholder="First &Lans Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contact-email" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="contact-email" placeholder="example@domain.com">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contact-message" class="col-sm-2 control-label">Message</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Send</button>
                    <a class="btn btn-default" data-dismiss="modal">Close</a>
                </div>
            </form>
        </div>
    </div>
</div>
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