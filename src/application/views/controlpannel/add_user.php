<div class = "admin-wrapper">
	<div class = "container">
		<div class = "row">
			<div class = "col-md-12">
					<form class="form-horizontal">
					<fieldset>

					<legend>Add user</legend>

					<div class="control-group">
					  <label class="control-label" for="textinput">Username</label>
					  <div class="controls">
					    <input id="textinput" name="textinput" type="text" placeholder="Username" class="input-xlarge" required="">
					    <p class="help-block">Please insert your username</p>
					  </div>
					</div>

					<div class="control-group">
					  <label class="control-label" for="pass">Password</label>
					  <div class="controls">
					    <input id="pass" name="pass" type="password" placeholder="Password" class="input-xlarge" required="">
					    <p class="help-block">Password should be at least 6 characters</p>
					  </div>
					</div>

					<div class="control-group">
					  <label class="control-label" for="email">Email</label>
					  <div class="controls">
					    <input id="email" name="email" type="text" placeholder="example@domain.com" class="input-xlarge" required="">
					    <p class="help-block">Please provide your e-mail</p>
					  </div>
					</div>

					<div class="control-group">
					  <label class="control-label" for="useravatar">Avatar</label>
					  <div class="controls">
					    <input id="useravatar" name="useravatar" class="input-file" type="file">
					  </div>
					</div>

					<div class="control-group">
					  <label class="control-label" for="birthdate">Date of birth</label>
					  <div class="controls">
					    <input id="birthdate" name="birthdate" type="text" placeholder="dd/mm/yyyy" class="input-xlarge" required="">
					    
					  </div>
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

					<input type="submit" value="Submit">

					</fieldset>
					</form>

			</div>
		</div>
	</div>
</div>