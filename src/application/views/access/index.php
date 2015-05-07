<body class="body-background">
  <div class="container">
    <div class="row">
        <!--login pannel -->
        <div class="col-md-4">
            <div class="panel panel-default login-panel">
                <div class="panel-body">
                    <div class="page-header">
                        <h2> Login Page</h2>
                            <?php
                            //if something goes good/wrong from login method controller display it, just login
                                if(User::logSess())
                                    $this->renderFeedbackMessages();
                            ?>
                    </div>
                    <!-- form -->
                    <form id="loginForm" class="form-group" role="form" action="<?php echo URL.'access/login'?>"
                          method="POST">
                        <!-- role form helps improve accessibility for people using screen readers -->
                        <p class="errors" id="error1">Username field empty please fill up with a valid username</p>
                        <p class="errors" id="error3">Empty fields , please fill up the form</p>
                        <!-- Username -->
                        <div class="form-group">
                            <label for="InputUsername" class="control-label" >Username</label>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i>
                                </span>
                                <input type="text" class="form-control" id="username" placeholder="Enter username"
                                       name="loginUsername">

                            </div>
                        </div>
                        <!--Password -->
                        <p class="errors" id="error2">Password field empty please fill up with a valid password</p>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="control-label" >Password</label>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-pencil"></i>
                                </span>
                                <input type="password" class="form-control" id="password" placeholder="Password"
                                       name="loginPassword">
                            </div>
                        </div>

                        <!--checkbox -->
                        <div class="checkbox">
                            <label for="remeberInputPassword">
                                <input type="checkbox" name="remember"> Remeber me
                            </label>
                        </div>
                        <input type="submit" class="btn btn-primary btn-lg singin-button" value="Sing in" name="singing">
                    </form><!--form -->
                </div> <!--pannel body-->
            </div> <!--pannel pannel-deafult login-pannel -->
        </div> <!-- col-md-4 -->

        <!--Register pannel -->

        <div class="col-md-8">
            <div class="panel panel-default register-panel">
                <div class="panel-body">
                    <div class="page-header">
                        <h2>Register Page</h2>
                        <?php
                            //if something goes good/wrong from register method controller display it, just register
                            if(User::regSess())
                                $this->renderFeedbackMessages();

                        ?>
                    </div>
                    <!-- form -->
                    <form id="registerForm" class="form-group" role="form" action="<?php echo URL
                        .'access/register'?>" method="post">
                    <div class="form-group">
                        <label for="username" class="control-label">Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Username"
                               name="registerUsername">
                        <p class="help-block">Username can contain any letters or numbers, without spaces</p>
                    </div>

                    <div class="form-group">
                        <label for="email" class="control-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="example@domain.com"
                               name="email">
                        <p class="help-block">Please provide your E-mail</p>
                    </div>

                    <div class="form-group">
                        <label for="password" class="control-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password"
                               name="registerPassword">
                        <p class="help-block">Password should be at least 6 characters</p>
                    </div>

                    <div class="form-group">
                        <label for="repeatPassword" class="control-label">Repeat password</label>
                        <input type="password" class="form-control" id="repeat-password" placeholder="password" name="repeatRegisterPassword">
                        <p class="help-block">Please confirm password</p>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Gender</label>

                        <div class="radio inline control-label">
                            <label for="male">
                                <input type="radio" name="gender" value="male"> Male
                            </label>

                            <label for="female">
                                <input type="radio" name="gender" value="female">Female
                            </label>

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Date of birth</label>
                        <input type="text" class="form-control" name="birthday" placeholder="dd/mm/yyyy" >
                    </div>
                </div>
                <input type="submit" class="btn btn-primary btn-lg register-button text-center" value="Register" name="register">
                <!--<input type="hidden" value="register" name="action">-->
                </form><!-- form -->
            </div> <!-- panl body -->
        </div> <!-- pannel pannel default -->
    </div> <!-- col-md 8 -->
</div> <!-- row -->
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
</div>
