<div class = "admin-wrapper">

	<div class = "container">
		<div class = "row">
			<div class = "col-md-6 col-sm-12">
                <div class="inner-wrapper">
                    <form class="form-horizontal">
                        <fieldset>

                            <!-- Form Name -->
                            <legend>Add Product</legend>

                            <!-- Text input-->
                            <div class="control-group">
                                <label class="control-label" for="product_name">Product name</label>
                                <div class="controls">
                                    <input id="product_name" name="product_name" type="text" placeholder="" class=" form-control" required="">

                                </div>
                            </div>

                            <!-- File Button -->
                            <div class="control-group">
                                <label class="control-label" for="product_image">Add product image</label>
                                <div class="input-group">
								<span class="input-group-addon">
								<i class="glyphicon glyphicon-file"></i>
								</span>
								<span class="btn btn-default btn-file">
								Browse <input type="file" class="form-control" id="image_upload" name="upload_image" required>
								</span>
                                </div>
                            </div>

                            <!-- Textarea -->
                            <div class="control-group">
                                <label class="control-label" for="caracteristics">Characteristics</label>
                                <div class="controls">
                                    <textarea class="form-control" id="caracteristics" name="caracteristics"></textarea>
                                </div>
                            </div>

                            <!-- Button -->
                            <div class="control-group">
                                <label class="control-label" for=""></label>
                                <div class="controls">
                                    <button id="" name="" class="btn btn-primary">Add product</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>

                </div>
			</div>
		</div>
	</div>
</div>