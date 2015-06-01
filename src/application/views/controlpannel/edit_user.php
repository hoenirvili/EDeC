<?php
global $user;
$user_id=$_GET['user_id'];
$user=new User($user_id);
?>
<div class = "admin-wrapper">

    <div class = "container">
        <div class = "row">
            <div class = "col-md-6 col-sm-12">
                <div class="inner-wrapper">
                    <form id="edit_user" class="form-horizontal" method="POST" action="/controlpannel/edit_user?user_id=<?php echo $user_id; ?>" enctype="multipart/form-data">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add User</legend>

                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" #clndr>User Name</label>
                                <div class="controls">
                                    <input id="username" name="username" type="text" placeholder="" class=" form-control" required value="<?php echo inp_val('username'); ?>">

                                </div>
                            </div>
                            <br/>
                            <div class="fileinput fileinput-exists" data-provides="fileinput">
                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;">
                                    <img src="<?php echo Media::get_src($user->AVATAR,'medium') ?>">
                                </div>
                                <div>
                                    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="user_avatar"></span>
                                </div>
                            </div>
                            <input type="hidden" name="media_id" value="<?php echo $user->AVATAR ?>">
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
                                <label class="control-label" #clndr>Birthdate</label>
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
                                        <label class="control-label" #clndr>User <?php echo $preference ?></label>
                                        <div class="controls">

                                            <select multiple aria-multiselectable class="form-control full_ch"   name="user_<?php echo $preference ?>[]"><?php inp_val('user_'.$preference); ?></select>
                                        </div>
                                    </div>
                                <?php } ?>


                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" #clndr></label>
                                <div class="controls">
                                    <button type="submit" id="" name="submit" class="btn btn-primary">Update User</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
<br/><br/>