<div class = "admin-wrapper">

    <div class = "container">
        <div class = "row">
            <div class = "col-md-6 col-sm-12">
                <div class="inner-wrapper">
                    <form id="add_product" class="form-horizontal" method="POST" action="/controlpannel/add_user/" enctype="multipart/form-data">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add User</legend>

                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" >User Name</label>
                                <div class="controls">
                                    <input id="username" name="username" type="text" placeholder="" class=" form-control" required value="<?php echo inp_val('username'); ?>">

                                </div>
                            </div>
                            </br>
                            <!-- File Button -->
                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;">

                                </div>
                                <div>
                                    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input required type="file" name="user_avatar"></span>
                                </div>
                            </div>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Email</label>
                                <div class="controls">
                                    <input id="pass" name="email" type="text" placeholder="" class=" form-control" value="<?php inp_val('email'); ?>">

                                </div>
                            </div>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Pass</label>
                                <div class="controls">
                                    <input id="pass"  name="new_password" type="password" placeholder="" class=" form-control" value="<?php inp_val('new_password')?>">

                                </div>
                            </div>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label">Type</label>
                                <div class="controls" style="margin-left: 20px;">
                                   <?php inp_val('user_type',1) ?>

                                </div>
                            </div>
                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" >Birthdate</label>
                                <div class="controls">
                                    <input type="text" name="user_birthdate" value="<?php inp_val('user_birthdate'); ?>"/>

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
                                        <label class="control-label" >User <?php echo $preference ?></label>
                                        <div class="controls">

                                            <select multiple aria-multiselectable class="form-control full_ch"   name="user_<?php echo $preference ?>[]"><?php echo inp_val('user_'.$preference); ?></select>
                                        </div>
                                    </div>
                                <?php } ?>


                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" ></label>
                                <div class="controls">
                                    <button type="submit" id="" name="submit" class="btn btn-primary">Add User</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>