<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Useful Admin Links</div>
                <div class="panel-body">
                    <div class="well" style="width:300px; padding: 8px 0;">
                        <ul class="nav nav-list">
                            <li><label class="nav-header">Products</label>
                                <ul class="nav nav-list tree">
                                    <li><a href="<?php echo URL . 'controlpannel/products' ?>">View Products</a></li>
                                    <li><a href="<?php echo URL . 'controlpannel/add_product' ?>">Add Product</a></li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                            <li><label class="nav-header">Users</label>
                                <ul class="nav nav-list tree">
                                    <li><a href="<?php echo URL . 'controlpannel/users' ?>">View Users</a></li>
                                    <li><a href="<?php echo URL . 'controlpannel/add_user' ?>">Add User</a></li>
                                </ul>
                            </li>
                            <li class="divider"></li>
                            <li><label class="nav-header">Characteristics</label>
                                <ul class="nav nav-list tree">
                                    <li><a href="<?php echo URL . 'controlpannel/characteristics' ?>">View
                                            Characteristics</a></li>
                                    <li><a href="<?php echo URL . 'controlpannel/add_characteristic' ?>">Add
                                            Characteristic</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
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