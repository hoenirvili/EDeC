<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                &copy; EDeC 2015. All right reserved.
            </div>
            <div class="col-md-6">
                <span class="pull-right">Making decisions responsibly.</span>
            </div>
        </div>
    </div>
</footer>

<!--JQuery-->
<script src="<?php echo URL ?>html/js/jquery/jquery-1.11.2.js"></script>
<script src="<?php echo URL ?>html/js/jquery/jquery-2.1.3.js"></script>
<!--bootstrap javascript -->
<script src="<?php echo URL ?>html/css/bootstrap-3.3.4/js/bootstrap.js"></script>
<!--form validation plugin -->
<script src="<?php echo URL ?>html/js/formValidation/formValidation.js"></script>
<script src="<?php echo URL ?>html/js/formValidation/bootstrap.js"></script>
<script src="<?php echo URL ?>html/plugins/jquery.bxslider.min.js"></script>
<script src="<?php echo URL ?>html/plugins/selectize/dist/js/standalone/selectize.js"></script>
<script src="<?php echo URL ?>html/plugins/jasny-bootstrap/js/jasny-bootstrap.js"></script>
<script src="<?php echo URL ?>html/plugins/jquery-highlight/jquery.highlight.js"></script>
<script src="<?php echo URL ?>html/plugins/chartist/dist/chartist.js"></script>
<script src="<?php echo URL ?>html/plugins/videojs/dist/video.js"></script>
<?php if (PRODUCTION) { ?>
    <script src="<?php echo URL ?>html/js/main.js"></script>
<?php } else { ?>
    <script src="<?php echo URL ?>html/js/index.js"></script>
    <script src="<?php echo URL ?>html/js/access.js"></script>
    <script src="<?php echo URL ?>html/js/search.js"></script>
    <script src="<?php echo URL ?>html/js/product.js"></script>
    <script src="<?php echo URL ?>html/js/stats.js"></script>
    <script src="<?php echo URL ?>html/js/controlpanel.js"></script>
<?php } ?>
<noscript>
    For full functionality of this site it is necessary to enable JavaScript.Here are the
    <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web
        browser</a>.
</noscript>
</body>
</html>
