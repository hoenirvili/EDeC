<div class = "admin-wrapper">
	<div class = "container">
		<div class = "row">
			<div class = "col-md-12">
					<form class="form-horizontal">
						<fieldset>
							
							<legend>Add product</legend>

							<div class="control-group">
		  						<label class="control-label" for="textinput">Title</label>
		  						<div class="controls">
		    						<input id="textinput" name="textinput" type="text" placeholder="Product name" class="input-xlarge" required="">
		    						<p class="help-block">Please insert the product name</p>
		  						</div>
							</div>

							<div class="control-group">
							  <label class="control-label" for="avatar">Image</label>
							  <div class="controls">
							    <input id="avatar" name="avatar" class="input-file" type="file">
							  </div>
							</div>

							<div class="control-group">
							  <label class="control-label" for="characteristics">Characteristics</label>
							  <div class="controls">                     
							    <textarea id="characteristics" name="characteristics">Please insert the product characteristics, separated by comas.</textarea>
							  </div>
							</div>

							<input type="submit" value="Submit">

						</fieldset>
					</form>
			</div>
		</div>
	</div>
</div>