<!--POP UP CONTACT ME-->
<div class="modal fade" id="contact" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <form class="form-horizontal" role="form" method="post" action="/thanks">
                <div class="modal-header">
                    <h4>Contact us !</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="contact-name" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                            <input type="text" name="name" class="form-control" id="contact-name" placeholder="First &Last Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contact-email" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                            <input name="email" type="email" class="form-control" id="contact-email"
                                   placeholder="example@domain.com">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contact-message" class="col-sm-2 control-label">Message</label>

                        <div class="col-sm-10">
                            <textarea class="form-control" name="message" rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary contactButton">Send</button>
                    <a class="btn btn-default contactButton" data-dismiss="modal">Close</a>
                </div>
            </form>
        </div>
    </div>
</div>