<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php if (of_get_option('fullwidth')) { ?> class="fullwidth"<?php } ?>>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="http://malsup.github.com/jquery.form.js"></script>       <title><?php
            /*
             * Print the <title> tag based on what is being viewed.
             */
            global $page, $paged, $woocommerce;
            if (is_home() || is_front_page()) {
                echo of_get_option('hometitle');
                echo ' ';
            } else {
                wp_title('|', true, 'right');
            }
            // Add the blog name.
            bloginfo('name');
            // Add the blog description for the home/front page.
            $site_description = get_bloginfo('description', 'display');
            if ($site_description && ( is_home() || is_front_page() ))
                echo " | $site_description";
            // Add a page number if necessary:
            if ($paged >= 2 || $page >= 2)
                echo ' | ' . sprintf(__('Page %s', 'oblivion'), max($paged, $page));
            ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="<?php echo of_get_option('metadesc'); ?>">
        <meta name="keywords" content="<?php echo of_get_option('keywords'); ?>">
        <link rel="shortcut icon" href="<?php echo of_get_option('favicon'); ?>" />
        <?php include_once 'css/fonts.php'; ?>
        <?php include_once 'css/colours.php'; ?>
<?php wp_head(); ?>
        <script src="https://maps.googleapis.com/maps/api/js" ></script>
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/cufon-yui.js" ></script>
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/Downcome_400.font.js" ></script>
        <link type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css" rel="stylesheet"> 
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() ?>/js/excanvas.js"></script> 
        <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() ?>/js/jquery.signature.css" />
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/jquery.signature.min.js"></script>
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/actein.js"></script>
    </head>
    <body <?php body_class(); ?>>
        <script>
            var marker_icon = '<?php echo get_stylesheet_directory_uri() ?>/img/marker.png';
        </script>
        <div id="main_wrapper">
            <div class="container logo">
                <?php if (of_get_option('logo') != "") { ?>
                    <a class="brand" href="<?php echo site_url(); ?>"> <img src="<?php echo of_get_option('logo'); ?>" alt="logo"  /> </a>
<?php } ?>
                <div id="languages">
                </div>
            </div>
            <!-- NAVBAR
            ================================================== -->
            <div class="navbar navbar-inverse <?php if (of_get_option('fullwidth')) {
    
} else { ?>container<?php } ?>">
                <div class="navbar-inner<?php if (of_get_option('fullwidth')) { ?> container<?php } ?>">
                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="nav-collapse collapse">
                        <?php wp_nav_menu(array('theme_location' => 'header-menu', 'depth' => 0, 'sort_column' => 'menu_order', 'items_wrap' => '<ul  class="nav">%3$s</ul>')); ?>
                        <!-- If woocommerce -->
<?php if ($woocommerce) {
    if (is_woocommerce()) { ?>
                                <div class="cart-outer">
                                    <div class="cart-menu-wrap">
                                        <div class="cart-menu">
                                            <a class="cart-contents" href="<?php echo $woocommerce->cart->get_cart_url(); ?>"><div class="cart-icon-wrap"><i class="icon-shopping-cart"></i> <div class="cart-wrap"><span><?php echo $woocommerce->cart->cart_contents_count; ?> </span></div> </div></a>
                                        </div>
                                    </div>
                                    <div class="cart-notification">
                                        <span class="item-name"></span> <?php echo __('was successfully added to your cart.'); ?>
                                    </div>
                                    <?php
                                    // Check for WooCommerce 2.0 and display the cart widget
                                    if (version_compare(WOOCOMMERCE_VERSION, "2.0.0") >= 0) {
                                        the_widget('WC_Widget_Cart', 'title= ');
                                    } else {
                                        the_widget('WooCommerce_Widget_Cart', 'title= ');
                                    }
                                    ?>
                                </div>
                            <?php }
                        } ?>
                        <!-- Endif woocommerce -->
<?php dynamic_sidebar('languages') ?>
<?php if (of_get_option('login_menu')) { ?>
                            <a href="<?php echo get_permalink(1201) ?>" class="account"><img src="<?php echo get_template_directory_uri(); ?>/img/account.png"></a>
<?php } ?>
                            
                            <a style="margin-top: 17px;" href="<?php echo get_permalink(1199) ?>" class="account"><img src="<?php echo get_template_directory_uri(); ?>/img/cart.png"></a>
                            
                        <form method="get" id="header-searchform" action="<?php echo esc_url(site_url('/')); ?>">
                            <input type="text" autocomplete="off" value="" name="s" id="header-s">
                            <input type="submit" id="header-searchsubmit" value="Search">
                            <input type="hidden" name="post_type[]" value="portfolio" />
                            <input type="hidden" name="post_type[]" value="post" />
                            <input type="hidden" name="post_type[]" value="page" />
                        </form>
                    </div><!--/.nav-collapse -->
                </div><!-- /.navbar-inner -->
            </div><!-- /.navbar -->
            <div id="myModalL" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">?</button>
<?php
if (is_user_logged_in()) {
    global $current_user;
    ?>
                        <h3><?php _e('Welcome', 'oblivion'); ?></h3>
                    </div>
                    <div class="modal-body">
                        <div id="LoginWithAjax">
                            <?php
                            global $current_user;
                            global $user_level;
                            global $wpmu_version;
                            get_currentuserinfo();
                            ?>
                            <table cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="avatar" id="LoginWithAjax_Avatar">
    <?php echo get_avatar($current_user->ID, $size = '50'); ?>
                                        <div class="logged-info">
    <?php $current_user = wp_get_current_user(); ?>
    <?php _e('Logged in as ', 'oblivion'); ?><strong><?php echo $current_user->display_name; ?></strong>
                                            </br>
                                            <a href="<?php echo get_edit_user_link(); ?>"><?php _e("Edit your profile", 'oblivion'); ?> </a>
                                        </div>
                                    </td>
                                    <td>
                                        <a id="wp-logout" class="button-small reg-btn" href="<?php echo wp_logout_url(get_permalink()) ?>"><?php echo strtolower(__('Log Out', 'oblivion')) ?></a><br />
                                    </td>
                                </tr>
                            </table>
                        </div>
    <?php
} else {
    ?>
                        <h3>Login</h3>
                    </div>
                    <div class="modal-body">
                        <div id="LoginWithAjax" class="default"><?php //ID must be here, and if this is a template, class name should be that of template directory  ?>
                            <span id="LoginWithAjax_Status"></span>
                            <form name="LoginWithAjax_Form" id="LoginWithAjax_Form" action="<?php echo site_url() ?>/wp-login.php?callback=?&template=" method="post">
                                <table width='100%' cellspacing="0" cellpadding="0">
                                    <tr id="LoginWithAjax_Username">
                                        <td class="username_input">
                                            <input type="text" name="log" placeholder="Username" id="lwa_user_login" class="input" value="" />
                                        </td>
                                    </tr>
                                    <tr id="LoginWithAjax_Password">
                                        <td class="password_input">
                                            <input type="password" placeholder="Password" name="pwd" id="lwa_user_pass" class="input" value="" />
                                        </td>
                                    </tr>
                                    <tr><td colspan="2"><?php do_action('login_form'); ?></td></tr>
                                    <tr id="LoginWithAjax_Submit">
                                        <td id="LoginWithAjax_SubmitButton">
                                            <input name="rememberme" type="checkbox" id="lwa_rememberme" value="forever" /> <label ><?php _e('Remember Me', 'oblivion') ?></label>
                                            <a id="LoginWithAjax_Links_Remember"href="<?php echo site_url('wp-login.php?action=lostpassword', 'login') ?>" title="<?php _e('Password Lost and Found', 'oblivion') ?>"><?php _e('Lost your password?', 'oblivion') ?></a>
                                            <br /><br />
                                            <input type="submit"  class="button-small"  name="wp-submit" id="lwa_wp-submit" value="<?php _e('Log In', 'oblivion'); ?>" tabindex="100" />
                                            <a class="reg-btn button-small" href="<?php echo site_url('/wp-login.php?action=register'); ?>">Register</a>
                                            <input type="hidden" name="redirect_to" value="http://<?php echo $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'] ?>" />
                                            <input type="hidden" name="testcookie" value="1" />
                                            <input type="hidden" name="lwa_profile_link" value="<?php echo $lwa_data['profile_link'] ?>" />
                                        </td>
                                    </tr>
                                </table>
                            </form>
                            <form name="LoginWithAjax_Remember" id="LoginWithAjax_Remember" action="<?php echo site_url(); ?>/wp-login.php?callback=?&template=" method="post">
                                <table width='100%' cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td>
                                            <strong><?php _e("Forgotten Password", 'oblivion'); ?></strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="forgot-pass-email">
                                            <?php $msg = __("Enter username or email", 'oblivion'); ?>
                                            <input type="text" name="user_login" id="lwa_user_remember" value="<?php echo $msg ?>" onfocus="if (this.value == '<?php echo $msg ?>') {
                                        this.value = '';
                                    }" onblur="if (this.value == '') {
                                                this.value = '<?php echo $msg ?>'
                                            }" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="submit" class="button-green button-small"  value="<?php _e("Get New Password", 'oblivion'); ?>" />
                                            <a href="#" id="LoginWithAjax_Links_Remember_Cancel"><?php _e("Cancel", 'oblivion'); ?></a>
                                            <input type="hidden" name="login-with-ajax" value="remember" />
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
<?php } ?>
                </div>
            </div>
            <!-- Marketing messaging and featurettes
            ================================================== -->
            <!-- Wrap the rest of the page in another container to center all the content. -->
<?php if (is_front_page() or is_page_template('tmp-home.php') or is_page_template('tmp-home-left.php') or is_page_template('tmp-home-right.php') or is_page_template('tmp-home-news.php')) {
    
} elseif (is_search()) { ?>
                <h1 class="title_wrapper container">
                    <div class="span12">
                        <div class="span6"><h1><?php _e('Search: ', 'oblivion'); ?> <?php echo get_search_query(); ?></h1></div>
                        <div class="breadcrumbs"><strong><?php oblivion_breadcrumbs(); ?></strong></div>
                    </div>
                </h1>
                                <?php } else { ?>
                <div class="title_wrapper <?php if (of_get_option('fullwidth')) {
                                    
                                } else { ?>container<?php } ?>">
    <?php if (of_get_option('fullwidth')) { ?><div class="container"><?php } ?>
                        <div class="span12">
                            <div class="span6">
                                <h1><?php
                        if (is_plugin_active('woocommerce/woocommerce.php')) {
                            if (is_shop()) {
                                echo get_the_title(woocommerce_get_page_id('shop'));
                            } else {
                                if (is_tag()) {
                                    _e("Tag: ", 'oblivion');
                                    echo wp_title('', true, 'left');
                                } elseif (is_category()) {
                                    _e("Category: ", 'oblivion');
                                    echo wp_title('', true, 'left');
                                } elseif (is_author()) {
                                    _e("Author: ", 'oblivion');
                                    echo wp_title('', true, 'left');
                                } elseif (is_archive()) {
                                    _e("Archive: ", 'oblivion');
                                    echo wp_title('', true, 'left');
                                } else {
                                    echo wp_title('', true, 'left');
                                }
                            }
                        } else {
                            if (is_tag()) {
                                _e("Tag: ", 'oblivion');
                                echo wp_title('', true, 'left');
                            } elseif (is_category()) {
                                _e("Category: ", 'oblivion');
                                echo wp_title('', true, 'left');
                            } elseif (is_author()) {
                                _e("Author: ", 'oblivion');
                                echo wp_title('', true, 'left');
                            } elseif (is_archive()) {
                                _e("Archive: ", 'oblivion');
                                echo wp_title('', true, 'left');
                            } else {
                                echo wp_title('', true, 'left');
                            }
                        }
                        ?>
                                </h1>
                            </div>
                            <div class="breadcrumbs"><strong><?php oblivion_breadcrumbs(); ?></strong></div>
                        </div>
    <?php if (of_get_option('fullwidth')) { ?></div><?php } ?>
                </div>
<?php } ?>
