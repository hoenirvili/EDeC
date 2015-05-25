<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Edit your profile</div>
                <div class="panel-body">
                    <?php
                    global $current_user;
                    ?>
                    <form id="edit_user" class="form-horizontal" method="POST" action="/dashboard" enctype="multipart/form-data">
                        <fieldset>
                            <div class="control-group">
                                <label class="control-label" for="product_name">User Name</label>
                                <div class="controls">
                                    <input id="username" name="username" type="text" placeholder="" class=" form-control" required value="<?php echo inp_val('username'); ?>">

                                </div>
                            </div>
                            <br/>
                            <div class="fileinput fileinput-exists" data-provides="fileinput">
                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;">
                                    <img src="<?php echo Media::get_src($current_user->AVATAR,'medium') ?>">
                                </div>
                                <div>
                                    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="user_avatar"></span>
                                </div>
                            </div>
                            <input type="hidden" name="media_id" value="<?php echo $current_user->AVATAR ?>">
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Email</label>
                                <div class="controls">
                                    <input id="pass" name="email" type="text" placeholder="" class=" form-control" value="<?php inp_val('email'); ?>">

                                </div>
                            </div>
                            <br/>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Pass</label>
                                <div class="controls">
                                    <input id="pass" name="new_password" type="password" placeholder="" class=" form-control" value="">
                                <p class="help-block">Only add the value if you wish to change it</p>
                                </div>
                            </div>
                            <br/>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Type</label>
                                <div class="controls" style="margin-left: 20px;">
                                    <?php inp_val('user_type',1) ?>

                                </div>
                            </div>
                            <br/>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" for="product_name">Birthdate</label>
                                <div class="controls">
                                    <input type="text" name="user_birthdate" placeholder="mm/dd/yyyy" value="<?php inp_val('user_birthdate'); ?>"/>

                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" >Gender</label>
                                <div class="controls" style="margin-left: 20px;">
                                    <?php inp_val('gender',1); ?>

                                </div>
                            </div>

                            <?php $preferences=array('loves','hates');
                            if($preferences)
                                foreach($preferences as $preference){ ?>
                                    <!-- Textarea -->
                                    <div class="control-group">
                                        <label class="control-label" for="ch">User <?php echo $preference ?></label>
                                        <div class="controls">

                                            <select multiple aria-multiselectable class="form-control full_ch"   name="user_<?php echo $preference ?>[]"><?php inp_val('user_'.$preference); ?></select>
                                        </div>
                                    </div>
                                <?php } ?>


                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" for=""></label>
                                <div class="controls">
                                    <button type="submit" id="" name="submit" class="btn btn-primary">Update profile</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>


                </div>
            </div>
        </div>
    </div>
</div>
</div>
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