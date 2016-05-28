<?php
//translatable theme
load_theme_textdomain('oblivion', get_template_directory() . '/langs');
?>
<?php
/* include important files */
require_once ('themeOptions/functions.php');
require_once ('smartmetabox/SmartMetaBox.php');
require_once ('post_templates.php');
require_once ('bootstrap-carousel.php');
require_once ('pricetable/pricetable.php');
require_once ('widgets/portfoliowidget/portfoliowdg.php');
require_once('widgets/latest_twitter/latest_twitter_widget.php');
require_once('themeOptions/rating.php');
require_once('chat/wp-wall.php');
require_once('widgets/rating/popular-widget.php');
require_once ( 'heart/love/heart-love.php' );
require_once ( 'functions/multiple-post-thumbnails/multi-post-thumbnails.php' );
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

/* add page builder */
add_action('after_setup_theme', 'oblivion_page_builder');

function oblivion_page_builder() {
    include_once(get_template_directory() . '/pagebuilder/page-builder.php');
}

/* register sidebars */
add_action('after_setup_theme', 'oblivion_register_sidebars');

function oblivion_register_sidebars() {
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => __('Home sidebar', 'oblivion'),
            'id' => 'one',
            'description' => __('Widgets in this area will be shown in the home page.', 'oblivion'),
            'before_widget' => '<div class="widget">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',));
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => __('General sidebar', 'oblivion'),
            'id' => 'two',
            'description' => __('General sidebar for use with page builder.', 'oblivion'),
            'before_widget' => '<div class="widget">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',));
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => __('Blog sidebar', 'oblivion'),
            'id' => 'three',
            'description' => __('Widgets in this area will be shown in the blog sidebar.', 'oblivion'),
            'before_widget' => '<div class="widget">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',));
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => __('Footer area widgets', 'oblivion'),
            'id' => 'four',
            'description' => __('Widgets in this area will be shown in the footer.', 'oblivion'),
            'before_widget' => '<div class="footer_widget span3">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',));
}

if (is_plugin_active('woocommerce/woocommerce.php')) {
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => 'WooCommerce Sidebar',
            'id' => 'woo',
            'description' => __('Widgets in this area will be shown in the WooCommerce sidebar.', 'oblivion'),
            'before_widget' => '<div id="%1$s" class="widget widgetSidebar %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>'));
}
if (is_plugin_active('buddypress/bp-loader.php')) {
    if (function_exists('register_sidebar'))
        register_sidebar(array(
            'name' => 'BuddyPress Sidebar',
            'id' => 'buddypress',
            'description' => __('Widgets in this area will be shown in the BuddyPress sidebar.', 'oblivion'),
            'before_widget' => '<div id="%1$s" class="widget widgetSidebar %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<div class="title-wrapper"><h3 class="widget-title">',
            'after_title' => '</h3><div class="clear"></div></div>',));
}


register_sidebar(array(
    'name' => __('Pages sidebar', 'oblivion'),
    'id' => 'pages-sidebar',
    'description' => __('Pages sidebar.', 'oblivion'),
    'before_widget' => '<div class="widget">',
    'after_widget' => '</div>',
    'before_title' => '<h3>',
    'after_title' => '</h3>',));

register_sidebar(array(
    'name' => __('Languages', 'oblivion'),
    'id' => 'languages',
    'description' => __('Languages.', 'oblivion'),
    'before_widget' => '',
    'after_widget' => '',
    'before_title' => '',
    'after_title' => '',));

/* add custom menu support */
add_theme_support('menus');
add_action('admin_menu', 'oblivion_create_menu');

function oblivion_create_menu() {
    $themeicon1 = get_template_directory_uri() . "/img/favicon.png";
    add_menu_page("Theme Options", "Theme Options", 'edit_theme_options', 'options-framework', 'optionsframework_page', $themeicon1, 1800);
}

add_action('after_setup_theme', 'oblivion_theme_tweak');

function oblivion_theme_tweak() {


// When this theme is activated send the user to the theme options
    if (is_admin() && isset($_GET['activated'])) {
// Call action that sets
        add_action('admin_head', 'gp_setup');
// Do redirect
        header('Location: ' . admin_url() . 'themes.php?page=options-framework');
    }


    /* register theme location menu */
    add_action('init', 'register_my_menus');

    function register_my_menus() {
        register_nav_menus(
                array(
                    'header-menu' => __('Header Menu', 'oblivion'),
                )
        );
    }

}

/* Breadcrumbs */

function oblivion_breadcrumbs_inner() {

    function oblivion_pg() {
        $pages = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => 'tmp-blog-right.php'
        ));
        foreach ($pages as $page) {
            return $page->post_name;
        }
    }

    function oblivion_pg1() {
        $pages = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => 'tmp-blog-isotope.php'
        ));
        foreach ($pages as $page) {
            return $page->post_name;
        }
    }

    function oblivion_pg2() {
        $pages = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => 'tmp-blog-full.php'
        ));
        foreach ($pages as $page) {
            return $page->post_name;
        }
    }

    function oblivion_pg3() {
        $pages = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => 'tmp-blog-left.php'
        ));
        foreach ($pages as $page) {
            return $page->post_name;
        }
    }

    function oblivion_get_page_id($name) {
        global $wpdb;
        /* get page id using custom query */
        $page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE ( post_name = '" . $name . "' or post_title = '" . $name . "' ) and post_status = 'publish' and post_type='page' ");
        return $page_id;
    }

    function oblivion_get_page_permalink($name) {
        $page_id = oblivion_get_page_id($name);
        return get_permalink($page_id);
    }

    if (!is_home()) {
        echo '<a href="';
        echo home_url();
        echo '">';
        echo __('Home', 'oblivion');
        echo "</a> / ";

        //added by shark breadcrumb for blog
        if (basename(get_page_template()) == "tmp-blog-right.php") {
            echo '<a href="';
            echo oblivion_pg();
            echo '">';
            echo __('Blog', 'oblivion');
            echo "</a> / ";
        } elseif (basename(get_page_template()) == "tmp-blog-left.php") {
            echo '<a href="';
            echo oblivion_pg3();
            echo '">';
            echo __('Blog', 'oblivion');
            echo "</a> / ";
        } elseif (basename(get_page_template()) == "tmp-blog-isotope.php") {
            echo '<a href="';
            echo oblivion_pg1();
            echo '">';
            echo __('Blog', 'oblivion');
            echo "</a> / ";
        } elseif (basename(get_page_template()) == "tmp-blog-full.php") {
            echo '<a href="';
            echo oblivion_pg2();
            echo '">';
            echo __('Blog', 'oblivion');
            echo "</a> / ";
        }

        if (is_single()) {
            if (get_post_type(get_the_ID()) == 'portfolio') {
                if (!of_get_option('portfolio_breadcrumbs')) {
                    $breadcrumb = "Portfolio";
                } else {
                    $breadcrumb = of_get_option('portfolio_breadcrumbs');
                };
                echo __($breadcrumb, 'oblivion');
                if (is_single()) {
                    echo " / ";
                    the_title();
                }
            } else {
                echo '<a href="';
                if (oblivion_pg() != null) {
                    echo oblivion_get_page_permalink('' . oblivion_pg());
                } elseif (oblivion_pg1() != null) {
                    echo oblivion_get_page_permalink('' . oblivion_pg1());
                } elseif (oblivion_pg2() != null) {
                    echo oblivion_get_page_permalink('' . oblivion_pg2());
                } elseif (oblivion_pg3() != null) {
                    echo oblivion_get_page_permalink('' . oblivion_pg3());
                }
                echo '">';
                echo __('Blog', 'oblivion');
                echo "</a> ";
                if (is_single()) {
                    echo " / ";
                    the_title();
                }
            }
        } elseif (is_category()) {
            echo __('Category: ', 'oblivion');
            echo single_cat_title();
        } elseif (is_404()) {
            echo '404';
        } elseif (is_search()) {
            echo __('Search: ', 'oblivion');
            echo get_search_query();
        } elseif (is_author()) {

            $curauth = (get_query_var('author_name')) ? get_user_by('slug', get_query_var('author_name')) : get_userdata(get_query_var('author'));
            _e('Author: ', 'oblivion');
            echo $curauth->user_nicename;
        } elseif (is_page()) {
            echo the_title();
        } elseif (is_tag()) {
            echo __('Tag: ', 'oblivion');
            echo GetTagName(get_query_var('tag_id'));
        } elseif (is_archive()) {
            echo __('Archive', 'oblivion');
        }
    }
}

function oblivion_breadcrumbs() {

    if (function_exists('is_bbpress')) {
        if (is_bbpress()) {
            bbp_breadcrumb();
        } else {
            oblivion_breadcrumbs_inner();
        }
    } else {
        oblivion_breadcrumbs_inner();
    }
}

/* custom excerpt lenght */
add_filter('excerpt_length', 'custom_excerpt_length', 999);

function custom_excerpt_length($length) {
    return 55;
}

add_filter('excerpt_length', 'custom_excerpt_length_pro', 999);

function custom_excerpt_length_pro($length) {
    return 40;
}

/* pagination */

function kriesi_pagination($pages = '', $range = 1) {
    $showitems = ($range * 1) + 1;
    $general_show_page = of_get_option('general_post_show');
    global $paged;
    global $paginate;
    if (empty($paged))
        $paged = 1;
    if ($pages == '') {
        global $wp_query;
        $pages = $wp_query->max_num_pages;
        if (!$pages) {
            $pages = 1;
        }
    }
    if (1 != $pages) {
        $url = get_template_directory_uri();
        $leftpager = '&laquo;';
        $rightpager = '&raquo;';
        if ($paged > 2 && $paged > $range + 1 && $showitems < $pages)
            $paginate.= "";
        if ($paged > 1)
            $paginate.= "<a class='page-selector' href='" . get_pagenum_link($paged - 1) . "'>" . $leftpager . "</a>";
        for ($i = 1; $i <= $pages; $i++) {
            if (1 != $pages && (!($i >= $paged + $range + 1 || $i <= $paged - $range - 1) || $pages <= $showitems )) {
                $paginate.= ($paged == $i) ? "<li class='active'><a href='" . get_pagenum_link($i) . "'>" . $i . "</a></li>" : "<li><a href='" . get_pagenum_link($i) . "' class='inactive' >" . $i . "</a></li>";
            }
        }
        if ($paged < $pages)
            $paginate.= "<li><a class='page-selector' href='" . get_pagenum_link($paged + 1) . "' >" . $rightpager . "</a></li>";
    }
    return $paginate;
}

/* add featured image support */
add_theme_support('post-thumbnails');
if (function_exists('add_image_size')) {
    set_post_thumbnail_size(287, 222, true);
    set_post_thumbnail_size(305, 305, true);
}


/*
 * Include the TGM_Plugin_Activation class.
 */
require_once dirname(__FILE__) . '/pluginactivation.php';
add_action('tgmpa_register', 'oblivion_my_theme_register_required_plugins');
/*
 * Register the required plugins for this theme.
 *
 * In this example, we register two plugins - one included with the TGMPA library
 * and one from the .org repo.
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */

function oblivion_my_theme_register_required_plugins() {
    /**
     * Array of plugin arrays. Required keys are name and slug.
     * If the source is NOT from the .org repo, then source is also required.
     */
    $plugins = array(
        // This is an example of how to include a plugin pre-packaged with a theme
        array(
            'name' => 'Paralax slider', // The plugin name
            'slug' => 'layerslider', // The plugin slug (typically the folder name)
            'source' => 'http://skywarriorthemes.com/plugins/layerslider.zip', // The plugin source
            'required' => false, // If false, the plugin is only 'recommended' instead of required
            'version' => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url' => '', // If set, overrides default API URL and points to an external URL
        ), array(
            'name' => 'Isotope gallery', // The plugin name
            'slug' => 'sk_isotope_gallery', // The plugin slug (typically the folder name)
            'source' => 'http://skywarriorthemes.com/plugins/sk_isotope_gallery.zip', // The plugin source
            'required' => false, // If false, the plugin is only 'recommended' instead of required
            'version' => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url' => '', // If set, overrides default API URL and points to an external URL
        ), array(
            'name' => 'BBpress', // The plugin name
            'slug' => 'bbpress', // The plugin slug (typically the folder name)
            'source' => 'http://skywarriorthemes.com/plugins/bbpress.zip', // The plugin source
            'required' => false, // If false, the plugin is only 'recommended' instead of required
            'version' => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url' => '', // If set, overrides default API URL and points to an external URL
        ), array(
            'name' => 'WooCommerce', // The plugin name
            'slug' => 'woocommerce', // The plugin slug (typically the folder name)
            'source' => 'http://skywarriorthemes.com/plugins/woocommerce.zip', // The plugin source
            'required' => false, // If false, the plugin is only 'recommended' instead of required
            'version' => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation' => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url' => '', // If set, overrides default API URL and points to an external URL
        ),
    );
    // Change this to your theme text domain, used for internationalising strings
    $theme_text_domain = 'oblivion';
    /**
     * Array of configuration settings. Amend each line as needed.
     * If you want the default strings to be available under your own theme domain,
     * leave the strings uncommented.
     * Some of the strings are added into a sprintf, so see the comments at the
     * end of each line for what each argument will be.
     */
    $config = array(
        'domain' => $theme_text_domain, // Text domain - likely want to be the same as your theme.
        'default_path' => '', // Default absolute path to pre-packaged plugins
        'parent_menu_slug' => 'themes.php', // Default parent menu slug
        'parent_url_slug' => 'themes.php', // Default parent URL slug
        'menu' => 'install-required-plugins', // Menu slug
        'has_notices' => true, // Show admin notices or not
        'is_automatic' => true, // Automatically activate plugins after installation or not
        'message' => '', // Message to output right before the plugins table
        'strings' => array(
            'page_title' => __('Install Required Plugins', 'oblivion'),
            'menu_title' => __('Install Plugins', 'oblivion'),
            'installing' => __('Installing Plugin: %s', 'oblivion'), // %1$s = plugin name
            'oops' => __('Something went wrong with the plugin API.', 'oblivion'),
            'notice_can_install_required' => _n_noop('This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.'), // %1$s = plugin name(s)
            'notice_can_install_recommended' => _n_noop('This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.'), // %1$s = plugin name(s)
            'notice_cannot_install' => _n_noop('Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.'), // %1$s = plugin name(s)
            'notice_can_activate_required' => _n_noop('The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.'), // %1$s = plugin name(s)
            'notice_can_activate_recommended' => _n_noop('The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.'), // %1$s = plugin name(s)
            'notice_cannot_activate' => _n_noop('Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.'), // %1$s = plugin name(s)
            'notice_ask_to_update' => _n_noop('The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.'), // %1$s = plugin name(s)
            'notice_cannot_update' => _n_noop('Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.'), // %1$s = plugin name(s)
            'install_link' => _n_noop('Begin installing plugin', 'Begin installing plugins'),
            'activate_link' => _n_noop('Activate installed plugin', 'Activate installed plugins'),
            'return' => __('Return to Required Plugins Installer', 'oblivion'),
            'plugin_activated' => __('Plugin activated successfully.', 'oblivion'),
            'complete' => __('All plugins installed and activated successfully. %s', 'oblivion'), // %1$s = dashboard link
            'nag_type' => 'updated' // Determines admin notice type - can only be 'updated' or 'error'
        )
    );
    tgmpa($plugins, $config);
}

/* theme styles */
add_action('wp_enqueue_scripts', 'oblivion_mytheme_style');

function oblivion_mytheme_style() {
    wp_enqueue_style('oblivion_mytheme_style-style', get_bloginfo('stylesheet_url'), array(), '20130401');
}

add_action('wp_enqueue_scripts', 'oblivion_external_styles');

function oblivion_external_styles() {
    wp_register_style('custom-style', 'http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800,400italic,600italic,700italic', array(), '20130401');
    wp_enqueue_style('custom-style');
    wp_register_style('custom-style1', get_template_directory_uri() . '/css/jquery.fancybox.css', array(), '20130401');
    wp_enqueue_style('custom-style1');
    wp_register_style('custom-style2', get_template_directory_uri() . '/chat/wp-wall.css', array(), '20130401');
    wp_enqueue_style('custom-style2');
    wp_register_style('pricetable1', get_template_directory_uri() . '/pricetable/css/pricetable.css', array(), '20130401');
    wp_enqueue_style('pricetable1');
}

/* theme scripts */
add_action('wp_enqueue_scripts', 'oblivion_my_scripts');

function oblivion_my_scripts() {
    wp_register_script('bootstrap1', get_template_directory_uri() . '/js/bootstrap-transition.js', '', '', true);
    wp_enqueue_script('bootstrap1');
    wp_register_script('bootstrap2', get_template_directory_uri() . '/js/bootstrap-tooltip.js', '', '', true);
    wp_enqueue_script('bootstrap2');
    wp_register_script('bootstrap3', get_template_directory_uri() . '/js/bootstrap-button.js', '', '', true);
    wp_enqueue_script('bootstrap3');
    wp_register_script('bootstrap4', get_template_directory_uri() . '/js/bootstrap-carousel.js', '', '', true);
    wp_enqueue_script('bootstrap4');
    wp_register_script('bootstrap5', get_template_directory_uri() . '/js/bootstrap-collapse.js', '', '', true);
    wp_enqueue_script('bootstrap5');
    wp_register_script('bootstrap6', get_template_directory_uri() . '/js/bootstrap-modal.js', '', '', true);
    wp_enqueue_script('bootstrap6');

    if (of_get_option('scrollbar') == 1) {
        wp_register_script('custom_js8', get_template_directory_uri() . '/js/theme.min.js', '', '', true);
        wp_enqueue_script('custom_js8');
    }

    wp_register_script('easing', get_template_directory_uri() . '/js/easing.js', '', '', true);
    wp_enqueue_script('easing');
    wp_register_script('main', get_template_directory_uri() . '/js/main.js', '', '', true);
    wp_enqueue_script('main');
    wp_register_script('fancybox', get_template_directory_uri() . '/js/jquery.fancybox.js', '', '', true);
    wp_enqueue_script('fancybox');
    wp_register_script('totop', get_template_directory_uri() . '/js/jquery.ui.totop.js', '', '', true);
    wp_enqueue_script('totop');
    wp_register_script('custom_js1', get_template_directory_uri() . '/js/jquery.validate.min.js', '', '', true);
    wp_enqueue_script('custom_js1');
    wp_register_script('custom_js2', get_template_directory_uri() . '/js/jquery-ui-1.10.3.custom.min.js', '', '', true);
    wp_enqueue_script('custom_js2');
    wp_register_script('custom_js3', get_template_directory_uri() . '/js/jquery.carouFredSel-6.2.1-packed.js', '', '', true);
    wp_enqueue_script('custom_js3');
    wp_register_script('custom_js6', get_template_directory_uri() . '/js/appear.js', '', '', true);
    wp_enqueue_script('custom_js6');
    wp_register_script('custom_js4', get_template_directory_uri() . '/js/parallax.js', '', '', true);
    wp_enqueue_script('custom_js4');
    wp_register_script('custom_js5', get_template_directory_uri() . '/js/global.js', '', '', true);
    wp_enqueue_script('custom_js5');
    wp_register_script('imagescale', get_template_directory_uri() . '/js/imagescale.js', '', '', true);
    wp_enqueue_script('imagescale');
    wp_register_script('transit', get_template_directory_uri() . '/js/transit.js', '', '', true);
    wp_enqueue_script('transit');


    wp_register_script('ajaxcomments', get_template_directory_uri() . '/js/ajaxcomments.js', '', '', true);
    wp_enqueue_script('ajaxcomments');
    wp_localize_script('ajaxcomments', 'oblivion_script_vars', array(
        'success' => __('Thanks for your comment. We appreciate your response.', 'oblivion'),
        'error' => __('Please wait a while before posting your next comment!', 'oblivion'),
        'info' => __('Processing...', 'oblivion'),
        'error2' => __('You might have left one of the fields blank, or be posting too quickly!', 'oblivion')
            )
    );
}

/* admin sctipts */
add_action('admin_enqueue_scripts', 'oblivion_scripts_admin');

function oblivion_scripts_admin() {
    wp_register_script('custom_js55', get_template_directory_uri() . '/js/simple-slider.js');
    wp_enqueue_script('custom_js55');
    wp_register_script('custom_js66', get_template_directory_uri() . '/js/jquery.elastic.source.js');
    wp_enqueue_script('custom_js66');
    wp_register_script('custom_js77', get_template_directory_uri() . '/ckeditor/ckeditor.js');
    wp_enqueue_script('custom_js77');
    wp_register_script('custom99', get_template_directory_uri() . '/js/bootstrap-tooltip.js', '', '', true);
    wp_enqueue_script('custom99');
}

/* admin styles */
add_action('admin_init', 'oblivion_styles_admin');

function oblivion_styles_admin() {
    wp_register_style('custom-style11', get_template_directory_uri() . '/css/simple-slider.css', array(), '20130401');
    wp_enqueue_style('custom-style11');
    wp_register_style('custom-style22', get_template_directory_uri() . '/css/simple-slider-volume.css', array(), '20130401');
    wp_enqueue_style('custom-style22');
    wp_register_style('custom-style44', get_template_directory_uri() . '/css/font-awesome.css', array(), '20130401');
    wp_enqueue_style('custom-style44');
    wp_register_style('custom-style55', get_template_directory_uri() . '/css/admin.css', array(), '20130401');
    wp_enqueue_style('custom-style55');
}

/* add last item in footer sidebar class */
add_filter('dynamic_sidebar_params', 'oblivion_widget_first_last_classes');

function oblivion_widget_first_last_classes($params) {
    global $my_widget_num; // Global a counter array
    $this_id = $params[0]['id']; // Get the id for the current sidebar we're processing
    $arr_registered_widgets = wp_get_sidebars_widgets(); // Get an array of ALL registered widgets
    if (!$my_widget_num) {// If the counter array doesn't exist, create it
        $my_widget_num = array();
    }
    if (!isset($arr_registered_widgets[$this_id]) || !is_array($arr_registered_widgets[$this_id])) { // Check if the current sidebar has no widgets
        return $params; // No widgets in this sidebar... bail early.
    }
    if (isset($my_widget_num[$this_id])) { // See if the counter array has an entry for this sidebar
        $my_widget_num[$this_id] ++;
    } else { // If not, create it starting with 1
        $my_widget_num[$this_id] = 1;
    }
    $class = 'class="widget-' . $my_widget_num[$this_id] . ' '; // Add a widget number class for additional styling options
    if ($my_widget_num[$this_id] == 1) { // If this is the first widget
        $class .= 'first ';
    } elseif ($my_widget_num[$this_id] == count($arr_registered_widgets[$this_id])) { // If this is the last widget
        $class .= 'last ';
    }
    $params[0]['before_widget'] = str_replace('class="', $class, $params[0]['before_widget']); // Insert our new classes into "before widget"
    return $params;
}

/* custom comments */

function custom_comments($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    $GLOBALS['comment_depth'] = $depth;
    ?>
    <li class="comment">
        <div class="wcontainer"><?php commenter_avatar() ?>
            <?php if ($comment->comment_approved == '0') _e("\t\t\t\t\t<span class='unapproved'>Your comment is awaiting moderation.</span>\n", 'oblivion') ?>
            <div class="comment-body">
                <div class="comment-author"><?php commenter_link() ?></div>
                <i><small><?php comment_time('M j, Y @ G:i a'); ?></small> </i><br />
                <?php comment_text() ?>
                <?php comment_reply_link(array_merge($args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
            </div>
            <div class="clear"></div>
        </div>
    </li>
    <?php
}

/* custom pings */

function custom_pings($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;
    ?>
    <div class="project-comment row">
        <div class="comment-author"><?php
            printf(__('By %1$s on %2$s at %3$s', 'oblivion'), get_comment_author_link(), get_comment_date(), get_comment_time());
            edit_comment_link(__('Edit', 'oblivion'), ' <span class="meta-sep">|</span> <span class="edit-link">', '</span>');
            ?></div>
        <?php if ($comment->comment_approved == '0') _e('\t\t\t\t\t<span class="unapproved">Your trackback is awaiting moderation.</span>\n', 'oblivion') ?>
        <div class="comment-content span6">
            <?php comment_text() ?>
        </div>
    </div>
    <?php
}

/* Produces an avatar image with the hCard-compliant photo class */

function commenter_link() {
    $commenter = get_comment_author_link();
    if (preg_match('/<a[^>]* class=[^>]+>/', $commenter)) {
        $commenter = preg_replace('/(<a[^>]* class=[\'"]?)/', '\\1url ', $commenter);
    } else {
        $commenter = preg_replace('/(<a )/', '\\1class="url "/', $commenter);
    }
    echo ' <span class="comment-info">' . $commenter . '</span>';
}

/* Commenter avatar */

function commenter_avatar() {
    $avatar_email = get_comment_author_email();
    $avatar = str_replace("class='avatar", "class='photo avatar", get_avatar($avatar_email, 80));
    echo $avatar;
}

/* register portfolio post types */
add_action('init', 'oblivion_portfolio_register');

function oblivion_portfolio_register() {
    $labels = array(
        'name' => _x('My Portfolio', 'post type general name', 'oblivion'),
        'singular_name' => _x('Portfolio Item', 'post type singular name', 'oblivion'),
        'add_new' => _x('Add New', 'portfolio item', 'oblivion'),
        'add_new_item' => __('Add New Portfolio Item', 'oblivion'),
        'edit_item' => __('Edit Portfolio Item', 'oblivion'),
        'new_item' => __('New Portfolio Item', 'oblivion'),
        'view_item' => __('View Portfolio Item', 'oblivion'),
        'search_items' => __('Search Portfolio', 'oblivion'),
        'not_found' => __('Nothing found', 'oblivion'),
        'not_found_in_trash' => __('Nothing found in Trash', 'oblivion'),
        'parent_item_colon' => ''
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'menu_icon' => get_template_directory_uri() . '/img/portfolio.png',
        'rewrite' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => null,
        'supports' => array('title', 'editor', 'thumbnail'),
        'taxonomies' => array('post_tag')
    );
    register_post_type('portfolio', $args);
}

/* register portfolio categories */
add_action('init', 'oblivion_custom_taxonomies', 0);

function oblivion_custom_taxonomies() {
    // Add new "Locations" taxonomy to Posts
    register_taxonomy('portfolio-category', 'portfolio', array(
        // Hierarchical taxonomy (like categories)
        'hierarchical' => true,
        // This array of options controls the labels displayed in the WordPress Admin UI
        'labels' => array(
            'name' => _x('Categories', 'taxonomy general name', 'oblivion'),
            'singular_name' => _x('Category', 'taxonomy singular name', 'oblivion'),
            'search_items' => __('Search Category', 'oblivion'),
            'all_items' => __('All Categories', 'oblivion'),
            'parent_item' => __('Parent Category', 'oblivion'),
            'parent_item_colon' => __('Parent Category:', 'oblivion'),
            'edit_item' => __('Edit Category', 'oblivion'),
            'update_item' => __('Update Category', 'oblivion'),
            'add_new_item' => __('Add New Category', 'oblivion'),
            'new_item_name' => __('New Category Name', 'oblivion'),
            'menu_name' => __('Categories', 'oblivion'),
        ),
        // Control the slugs used for this taxonomy
        'rewrite' => array(
            'slug' => 'categories', // This controls the base slug that will display before each term
            'with_front' => false, // Don't display the category base before "/locations/"
            'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
        ),
    ));
}

/* custom admin columns for custom post type portfolio */
add_filter('manage_edit-portfolio_columns', 'oblivion_add_new_portfolio_columns');

function oblivion_add_new_portfolio_columns($portfolio_columns) {
    $columns = array(
        "cb" => "<input type=\"checkbox\" />",
        "title" => _("Title", 'oblivion'),
        "author" => _("Author", 'oblivion'),
        "slug" => _("URL Slug", 'oblivion'),
        "custtype-type" => _("Categories", 'oblivion'),
        "date" => _("Date", 'oblivion'),
    );
    return $columns;
}

add_action("manage_posts_custom_column", "oblivion_custtype_custom_columns", 10, 2);

function oblivion_custtype_custom_columns($column, $id) {
    global $wpdb;
    global $post;
    switch ($column) {
        case 'custtype-type':
            $terms = get_the_terms($post->ID, 'portfolio-category');
            if ($terms) {
                foreach ($terms as $term) {
                    echo $term->name;
                    echo ', ';
                }
            }
            break;
        case 'slug':
            $text = basename(get_post_permalink($id));
            echo $text;
            break;
        default:
            break;
    } // end switch
}

/* custom admin columns for custom post type taxonomies */
add_filter('manage_edit-portfolio-category_columns', 'oblivion_portfolio_category_columns', 2);
add_action('manage_portfolio-category_custom_column', 'oblivion_portfolio_category_custom_columns', 2, 3);

function oblivion_portfolio_category_columns($defaults) {
    $defaults['portfolio-category_ids'] = __('Category ID', 'oblivion');
    return $defaults;
}

function oblivion_portfolio_category_custom_columns($value, $column_name, $id) {
    if ($column_name == 'portfolio-category_ids') {
        return (int) $id;
    }
}

/* add smartmetaboxes */
add_action('add_meta_boxes', 'oblivion_my_custom_box');
add_action('save_post', 'saving_my_data');

function oblivion_my_custom_box() {
    add_meta_box('my_box', 'Sidebar text', 'my_wp_editor', 'portfolio', 'normal', 'high');
}

function my_wp_editor($post) {
    $field_value = get_post_meta($post->ID, '_smartmeta_my-awesome-field', false);
    if (!isset($field_value[0])) {
        wp_editor('', '_smartmeta_my-awesome-field');
    } else {
        wp_editor($field_value[0], '_smartmeta_my-awesome-field');
    }
}

function saving_my_data($post_id) {
    if (isset($_POST['_smartmeta_my-awesome-field'])) {
        update_post_meta($post_id, '_smartmeta_my-awesome-field', $_POST['_smartmeta_my-awesome-field']);
    }
}

add_smart_meta_box('my-meta-box2', array(
    'title' => __('Project link', 'oblivion'), // the title of the meta box
    'pages' => array('portfolio'), // post types on which you want the metabox to appear
    'context' => 'normal', // meta box context (see above)
    'priority' => 'high', // meta box priority (see above)
    'fields' => array(// array describing our fields
        array(
            'name' => __('Enable project link', 'oblivion'),
            'id' => 'my-awesome-field5',
            'type' => 'checkbox',),
        array(
            'name' => __('Put the project link in here', 'oblivion'),
            'id' => 'my-awesome-field2',
            'type' => 'text',
        ), array(
            'name' => __('Put the project button name in here', 'oblivion'),
            'id' => 'my-awesome-field4',
            'type' => 'text',)
)));
add_smart_meta_box('my-meta-box3', array(
    'title' => __('Video link', 'oblivion'), // the title of the meta box
    'pages' => array('portfolio'), // post types on which you want the metabox to appear
    'context' => 'normal', // meta box context (see above)
    'priority' => 'high', // meta box priority (see above)
    'fields' => array(// array describing our fields
        array(
            'name' => __('Put your portfolio embed video here', 'oblivion'),
            'id' => 'my-awesome-field3',
            'type' => 'textarea',
        ),)));
add_smart_meta_box('my-meta-box6', array(
    'title' => __('Client', 'oblivion'), // the title of the meta box
    'pages' => array('portfolio'), // post types on which you want the metabox to appear
    'context' => 'normal', // meta box context (see above)
    'priority' => 'low', // meta box priority (see above)
    'fields' => array(// array describing our fields
        array(
            'name' => __('Put client name here', 'oblivion'),
            'id' => 'my-awesome-field6',
            'type' => 'textarea',
        ),)));


/* prevent headers alread sent */
add_action('init', 'do_output_buffer');

function do_output_buffer() {
    ob_start();
}

/**
 * Returns an array of system fonts
 * Feel free to edit this, update the font fallbacks, etc.
 */
function options_typography_get_os_fonts() {
    // OS Font Defaults
    $os_faces = array(
        'Arial, sans-serif' => 'Arial',
        '"Avant Garde", sans-serif' => 'Avant Garde',
        'Cambria, Georgia, serif' => 'Cambria',
        'Copse, sans-serif' => 'Copse',
        'Garamond, "Hoefler Text", Times New Roman, Times, serif' => 'Garamond',
        'Georgia, serif' => 'Georgia',
        '"Helvetica Neue", Helvetica, sans-serif' => 'Helvetica Neue',
        'Tahoma, Geneva, sans-serif' => 'Tahoma'
    );
    return $os_faces;
}

/**
 * Returns a select list of Google fonts
 * Feel free to edit this, update the fallbacks, etc.
 */
function options_typography_get_google_fonts() {
    // Google Font Defaults
    $google_faces = array(
        'Arvo, serif' => 'Arvo',
        'Copse, sans-serif' => 'Copse',
        'Droid Sans, sans-serif' => 'Droid Sans',
        'Droid Serif, serif' => 'Droid Serif',
        'Lobster, cursive' => 'Lobster',
        'Nobile, sans-serif' => 'Nobile',
        'Open Sans, sans-serif' => 'Open Sans',
        'Oswald, sans-serif' => 'Oswald',
        'Pacifico, cursive' => 'Pacifico',
        'Rokkitt, serif' => 'Rokkit',
        'PT Sans, sans-serif' => 'PT Sans',
        'Quattrocento, serif' => 'Quattrocento',
        'Raleway, cursive' => 'Raleway',
        'Ubuntu, sans-serif' => 'Ubuntu',
        'Yanone Kaffeesatz, sans-serif' => 'Yanone Kaffeesatz'
    );
    return $google_faces;
}

/**
 * Checks font options to see if a Google font is selected.
 * If so, options_typography_enqueue_google_font is called to enqueue the font.
 * Ensures that each Google font is only enqueued once.
 */
if (!function_exists('options_typography_google_fonts')) {

    function options_typography_google_fonts() {
        $all_google_fonts = array_keys(options_typography_get_google_fonts());
        // Define all the options that possibly have a unique Google font
        $google_font = of_get_option('google_font', 'Rokkitt, serif');
        $google_mixed = of_get_option('google_mixed', false);
        $google_mixed_2 = of_get_option('google_mixed_2', 'Arvo, serif');
        // Get the font face for each option and put it in an array
        $selected_fonts = array(
            $google_font['face'],
            $google_mixed['face'],
            $google_mixed_2['face']);
        // Remove any duplicates in the list
        $selected_fonts = array_unique($selected_fonts);
        // Check each of the unique fonts against the defined Google fonts
        // If it is a Google font, go ahead and call the function to enqueue it
        foreach ($selected_fonts as $font) {
            if (in_array($font, $all_google_fonts)) {
                options_typography_enqueue_google_font($font);
            }
        }
    }

}
add_action('wp_enqueue_scripts', 'options_typography_google_fonts');

/**
 * Enqueues the Google $font that is passed
 */
function options_typography_enqueue_google_font($font) {
    $font = explode(',', $font);
    $font = $font[0];
    // Certain Google fonts need slight tweaks in order to load properly
    // Like our friend "Raleway"
    if ($font == 'Raleway')
        $font = 'Raleway:100';
    $font = str_replace(" ", "+", $font);
    wp_enqueue_style("options_typography_$font", "http://fonts.googleapis.com/css?family=$font", false, null, 'all');
}

/*
 * Outputs the selected option panel styles inline into the <head>
 */

function options_typography_styles() {
    $output = '';
    $input = '';
    if (of_get_option('google_font')) {
        $input = of_get_option('google_font');
        $output .= options_typography_font_styles(of_get_option('google_font'), '.google-font');
    }
    if ($output != '') {
        echo $output;
    }
}

function options_typography_styles2() {
    $output = '';
    $input = '';
    if (of_get_option('google_mixed_2')) {
        $input = of_get_option('google_mixed_2');
        $output .= options_typography_font_styles(of_get_option('google_mixed_2'), '.google_mixed_2');
    }
    if ($output != '') {
        echo $output;
    }
}

/*
 * Returns a typography option in a format that can be outputted as inline CSS
 */

function options_typography_font_styles($option) {
    $output = '';
    $output .= ' color:' . $option['color'] . '; ';
    $output .= 'font-family:' . $option['face'] . '; ';
    $output .= "\n";
    return $output;
}

/* Styling for the custom post type icon */
add_action('admin_head', 'wpt_portfolio_icons');

function wpt_portfolio_icons() {
    ?>
    <style type="text/css" media="screen">
        #icon-edit.icon32-posts-portfolio {background: url(<?php echo get_template_directory_uri(); ?>/img/portfolio_big.jpg) no-repeat;}
    </style>
    <?php
}

/* remove gallery from portfolio */
add_filter('the_content', 'oblivion_remove_gallery_from_portfolio');

function oblivion_remove_gallery_from_portfolio($content = null) {
    global $post;
    if ($post->post_type == 'portfolio') {
        $pattern = get_shortcode_regex();
        preg_match('/' . $pattern . '/s', $content, $matches);
        if (isset($matches[2]) && is_array($matches) && $matches[2] == 'gallery') {
            //shortcode is being used
            $content = str_replace($matches['0'], '', $content);
        }
    }
    return $content;
}

/* remove slider from home */
add_filter('the_content', 'oblivion_remove_slider_from_home');

function oblivion_remove_slider_from_home($content = null) {
    global $post;
    if (is_page_template('tmp-home.php')) {
        $pattern = get_shortcode_regex();
        preg_match('/' . $pattern . '/s', $content, $matches);
        if (isset($matches[2]) && is_array($matches) && $matches[2] == 'layerslider') {
            //shortcode is being used
            $content = str_replace($matches['0'], '', $content);
        }
    }
    return $content;
}

/* get tag name */

function GetTagName($meta) {
    if (is_string($meta) || (is_numeric($meta) && !is_double($meta)) || is_int($meta)) {
        if (is_numeric($meta))
            $meta = (int) $meta;
        if (is_int($meta))
            $TagSlug = get_term_by('id', $meta, 'post_tag');
        else
            $TagSlug = get_term_by('slug', $meta, 'post_tag');
        return $TagSlug->name;
    }
}

/* image resize */

function aq_resize($url, $width = null, $height = null, $crop = null, $single = true, $upscale = false) {

    // Validate inputs.
    if (!$url || (!$width && !$height ))
        return false;

    // Caipt'n, ready to hook.
    if (true === $upscale)
        add_filter('image_resize_dimensions', 'aq_upscale', 10, 6);

    // Define upload path & dir.
    $upload_info = wp_upload_dir();
    $upload_dir = $upload_info['basedir'];
    $upload_url = $upload_info['baseurl'];

    $http_prefix = "http://";
    $https_prefix = "https://";

    /* if the $url scheme differs from $upload_url scheme, make them match
      if the schemes differe, images don't show up. */
    if (!strncmp($url, $https_prefix, strlen($https_prefix))) { //if url begins with https:// make $upload_url begin with https:// as well
        $upload_url = str_replace($http_prefix, $https_prefix, $upload_url);
    } elseif (!strncmp($url, $http_prefix, strlen($http_prefix))) { //if url begins with http:// make $upload_url begin with http:// as well
        $upload_url = str_replace($https_prefix, $http_prefix, $upload_url);
    }


    // Check if $img_url is local.
    if (false === strpos($url, $upload_url))
        return false;

    // Define path of image.
    $rel_path = str_replace($upload_url, '', $url);
    $img_path = $upload_dir . $rel_path;

    // Check if img path exists, and is an image indeed.
    if (!file_exists($img_path) or ! getimagesize($img_path))
        return false;

    // Get image info.
    $info = pathinfo($img_path);
    $ext = $info['extension'];
    list( $orig_w, $orig_h ) = getimagesize($img_path);

    // Get image size after cropping.
    $dims = image_resize_dimensions($orig_w, $orig_h, $width, $height, $crop);
    $dst_w = $dims[4];
    $dst_h = $dims[5];

    // Return the original image only if it exactly fits the needed measures.
    if (!$dims && ( ( ( null === $height && $orig_w == $width ) xor ( null === $width && $orig_h == $height ) ) xor ( $height == $orig_h && $width == $orig_w ) )) {
        $img_url = $url;
        $dst_w = $orig_w;
        $dst_h = $orig_h;
    } else {
        // Use this to check if cropped image already exists, so we can return that instead.
        $suffix = "{$dst_w}x{$dst_h}";
        $dst_rel_path = str_replace('.' . $ext, '', $rel_path);
        $destfilename = "{$upload_dir}{$dst_rel_path}-{$suffix}.{$ext}";

        if (!$dims || ( true == $crop && false == $upscale && ( $dst_w < $width || $dst_h < $height ) )) {
            // Can't resize, so return false saying that the action to do could not be processed as planned.
            return false;
        }
        // Else check if cache exists.
        elseif (file_exists($destfilename) && getimagesize($destfilename)) {
            $img_url = "{$upload_url}{$dst_rel_path}-{$suffix}.{$ext}";
        }
        // Else, we resize the image and return the new resized image url.
        else {

            // Note: This pre-3.5 fallback check will edited out in subsequent version.
            if (function_exists('wp_get_image_editor')) {

                $editor = wp_get_image_editor($img_path);

                if (is_wp_error($editor) || is_wp_error($editor->resize($width, $height, $crop)))
                    return false;

                $resized_file = $editor->save();

                if (!is_wp_error($resized_file)) {
                    $resized_rel_path = str_replace($upload_dir, '', $resized_file['path']);
                    $img_url = $upload_url . $resized_rel_path;
                } else {
                    return false;
                }
            } else {

                $resized_img_path = wp_get_image_editor($img_path, $width, $height, $crop); // Fallback foo.
                if (!is_wp_error($resized_img_path)) {
                    $resized_rel_path = str_replace($upload_dir, '', $resized_img_path);
                    $img_url = $upload_url . $resized_rel_path;
                } else {
                    return false;
                }
            }
        }
    }

    // Okay, leave the ship.
    if (true === $upscale)
        remove_filter('image_resize_dimensions', 'aq_upscale');

    // Return the output.
    if ($single) {
        // str return.
        $image = $img_url;
    } else {
        // array return.
        $image = array(
            0 => $img_url,
            1 => $dst_w,
            2 => $dst_h
        );
    }

    return $image;
}

function aq_upscale($default, $orig_w, $orig_h, $dest_w, $dest_h, $crop) {
    if (!$crop)
        return null; // Let the wordpress default function handle this.

















        
// Here is the point we allow to use larger image size than the original one.
    $aspect_ratio = $orig_w / $orig_h;
    $new_w = $dest_w;
    $new_h = $dest_h;

    if (!$new_w) {
        $new_w = intval($new_h * $aspect_ratio);
    }

    if (!$new_h) {
        $new_h = intval($new_w / $aspect_ratio);
    }

    $size_ratio = max($new_w / $orig_w, $new_h / $orig_h);

    $crop_w = round($new_w / $size_ratio);
    $crop_h = round($new_h / $size_ratio);

    $s_x = floor(( $orig_w - $crop_w ) / 2);
    $s_y = floor(( $orig_h - $crop_h ) / 2);

    return array(0, 0, (int) $s_x, (int) $s_y, (int) $new_w, (int) $new_h, (int) $crop_w, (int) $crop_h);
}

//remove empty p from shortcodes


function simonbattersby_shortcode_format($content) {
    $content = preg_replace('/(<p>)\s*(<div)/', '<div', $content);
    $content = preg_replace('/(<\/div>)\s*(<\/p>)/', '</div>', $content);
    $content = preg_replace('/(<p>)\s*(<br)/', '<div', $content);
    $content = preg_replace('/(<\/br>)\s*(<\/p>)/', '</div>', $content);
    return $content;
}

add_filter('the_content', 'simonbattersby_shortcode_format', 11);
//add video input field
add_smart_meta_box('my-meta-box77', array(
    'title' => __('Video url', 'oblivion'), // the title of the meta box
    'pages' => array('post'),
    'context' => 'normal', // meta box context (see above)
    'priority' => 'high', // meta box priority (see above)
    'fields' => array(// array describing our fields
        array(
            'name' => __('Put your embed video URL here', 'oblivion'),
            'id' => 'my-awesome-field77',
            'type' => 'textarea',
        ),)));


//woocommerce
add_theme_support('woocommerce');
add_filter('add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment');

function woocommerce_header_add_to_cart_fragment($fragments) {
    global $woocommerce;

    ob_start();
    ?>
    <a class="cart-contents" href="<?php echo $woocommerce->cart->get_cart_url(); ?>"><div class="cart-icon-wrap"><i class="icon-shopping-cart"></i> <div class="cart-wrap"><span><?php echo $woocommerce->cart->cart_contents_count; ?> </span></div> </div></a>
    <?php
    $fragments['a.cart-contents'] = ob_get_clean();

    return $fragments;
}

//ajax comments
add_action('comment_post', 'oblivion_ajaxify_comments', 20, 2);

function oblivion_ajaxify_comments($comment_ID, $comment_status) {
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        switch ($comment_status) {
            case "0":
                wp_notify_moderator($comment_ID);
            case "1": //Approved comment
                echo "success";
                $commentdata = & get_comment($comment_ID, ARRAY_A);
                $post = & get_post($commentdata['comment_post_ID']);
                wp_notify_postauthor($comment_ID, $commentdata['comment_type']);
                break;
            default:
                echo "error";
        }
        exit;
    }
}

//multiple featured images
if (class_exists('MultiPostThumbnails')) {
    new MultiPostThumbnails(
            array(
        'label' => 'Header Image',
        'id' => 'header-image-portfolio',
        'post_type' => 'portfolio'
            )
    );

    new MultiPostThumbnails(
            array(
        'label' => 'Header Image',
        'id' => 'header-image',
        'post_type' => 'page'
            )
    );

    new MultiPostThumbnails(
            array(
        'label' => 'Header Image',
        'id' => 'header-image-post',
        'post_type' => 'post'
            )
    );
}

function theme_url() {
    return get_template_directory_uri();
}

add_shortcode('theme_url', 'theme_url');


add_shortcode('next_events', function() {
    ob_start();
    ?>
    <div class="wcontainer" style="margin-top:0px;">
        <p class="fancy-font">SEE WHERE THE NEXT BATTLE IS GONNA HAPPEN<!-- OR FEEL FREE TO SEARCH--></p>
        <!--<form action="" action="" id="home-search"><input type="submit"  value="search" /><input type="text"  placeholder="Search" class="search mt-3" /><input type="text" placeholder="Near..." class="near" />
            <div class="clear-fix"></div>
        </form>-->
        <div class="clear-fix"></div>
        <!--<p class="fancy-font">Show Advanced Search</p>-->
        <?php
        /* most recent 3 results */
        $products = get_posts(array(
            'posts_per_page' => -1,
            'post_type' => 'product',
            'orderby' => 'meta_value',
            'meta_key' => 'actein_date',
            'order' => 'asc'
        ));
        ?>
        <div id="search-map" style="margin-bottom:10px;">

        </div>
        <div class="" id="results">
            <?php
            $shown = 0;
            foreach ($products as $product):
                $metas = get_post_meta($product->ID);
                $p = new WC_Product($product->ID);


                if ($p->get_stock_quantity() <= 0) {
                    continue;
                }
                $time = strtotime(get_post_meta($product->ID, 'actein_date_end', true) . ' 23:59:59');


                if (time() > $time) {
                    continue;
                    ;
                }
                $shown++;
                /* something for place */
                $position = get_field('position_on_map', $product->ID);
                ?>
                <div class="one-result">
                    <div class="row-b" rel="<?php echo get_permalink($product->ID) ?>">

                        <div class="col-xs-5 with-font"><?php echo date('F, j Y', $time) ?></div>
                        <div class="col-xs-7 text-right"><?php echo get_field('place_name', $product->ID) ?></div>
                        <div class="clear-fix"></div>

                    </div>
                </div>
                <?php
                if ($shown >= 3) {
                    continue;
                }
            endforeach
            ?>
        </div>

    <?php if (isset($position) && isset($position['lat'])) : ?>
            <input id="lat" value="<?php echo $position['lat'] ?>" type="hidden" />
            <input id="lng" value="<?php echo $position['lng'] ?>" type="hidden" />
    <?php endif ?>
    </div>
    <?php
    return ob_get_clean();
});

add_filter('add_to_cart_redirect', 'redirect_to_checkout');

function redirect_to_checkout() {
    global $woocommerce;
    $checkout_url = $woocommerce->cart->get_checkout_url();
    return $checkout_url;
}

add_shortcode('of_get_option', function($args) {
    if (isset($args['key'])) {
        return get_option($args['key']);
    }
});

function genderField($selected) {
    if (is_array($selected)) {
        $selected = array_pop($selected);
    }

    if (!$selected) {
        $selected = 'male';
    }
    ?>
    <div class='row one-field-row'>
        <div class='span3'><label for="gender">Gender</label></div>
        <div class='span9'>
            <input type='radio' <?php if ($selected == 'male'): ?>checked='checked'<?php endif ?> name='gender' value='male' /> Male
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='radio' <?php if ($selected == 'female'): ?>checked='checked'<?php endif ?>  name='gender' value='female' /> Female
        </div>
    </div>
    <?php
}

function one_field($label, $name, $mandatory = false, $placeholder = '', $value = '') {
    if (is_array($value)) {
        $value = array_pop($value);
    }

    $type = 'text';
    if ($name == 'email' || $name == 'parent_email') {
        $type = 'email';
    }

    $additional = '';
    if ($name == 'zip_code' || $name == 'parent_zip_code') {
        $additional = 'pattern="[0-9]{1,7}" title="only numbers are allowed."';
    }

    ob_start();
    ?>
    <div class='row one-field-row'>
        <div class='span3'><label for="<?php echo $name ?>"><?php echo $label ?></label></div>
        <div class='span9'>
            <input <?php echo $additional ?> <?php if ($mandatory): ?>required<?php endif ?> type="<?php echo $type ?>" name="<?php echo $name ?>" id="<?php echo $name ?>" value="<?php echo $value ?>" placeholder="<?php echo $placeholder ?>" />
            <?php if ($name == 'birth_date'): ?>

    <?php endif ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

function phone_field($label, $name, $mandatory = false, $placeholder = '', $user_id = false) {
    if (is_array($value)) {
        $value = array_pop($value);
    }

    $country = 'US';
    $phone = '';
    if (isset($_POST['country-' . $name])) {
        $country = $_POST['country-' . $name];
        $phone = $_POST['phone-' . $name];
    }
    if ($user_id) {
        $country = get_user_meta($user_id, 'country-' . $name, true);
        $phone = get_user_meta($user_id, 'phone-' . $name, true);
    }


    ob_start();
    ?>
    <div class='row one-field-row one-phone-row'>
        <div class='span3'><label for="<?php echo $name ?>"><?php echo $label ?></label></div>
        <div class='span9'>            
            <select name="country-<?php echo $name ?>" id="country-<?php echo $name ?>">
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia, Plurinational State of</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">Congo, the Democratic Republic of the</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Côte d'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and McDonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">Korea, Democratic People's Republic of</option>
                <option value="KR">Korea, Republic of</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Réunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthélemy</option>
                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin (French part)</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten (Dutch part)</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia and the South Sandwich Islands</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela, Bolivarian Republic of</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.S.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
            </select>
            <script>
                (function ($)
                {
                    $(document).ready(function ()
                    {
                        $('#country-<?php echo $name ?>').val('<?php echo $country ?>')
                    });
                })(jQuery);
            </script>

            <input pattern="[0-9]{8,24}" title="At least 8 numbers, only numbers are allowed." <?php if ($mandatory): ?>required<?php endif ?> name="phone-<?php echo $name ?>" value="<?php echo $phone ?>" type="text" class="form-control bfh-phone" data-country="countries_phone_<?php echo $name ?>">
            <div class="clear-fix"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

add_action('pre_get_posts', 'users_own_attachments');

function users_own_attachments($wp_query_obj) {

    global $current_user, $pagenow;

    if (!is_a($current_user, 'WP_User'))
        return;

    if (!in_array($pagenow, array('upload.php', 'admin-ajax.php')))
        return;

    if (!current_user_can('delete_pages'))
        $wp_query_obj->set('author', $current_user->ID);

    return;
}

$user = wp_get_current_user();


if ($user->ID > 0 && $user->roles[0] != 'administrator') {
    add_filter('show_admin_bar', '__return_false');
}


add_action('init', function() {
    wp_enqueue_script('jquery-ui-datepicker');
});
function theme_scripts() {
    wp_enqueue_style('country', get_template_directory_uri() . '/bootstrap_helpers/css/bootstrap-formhelpers.min.css', array(), filemtime(get_template_directory() . '/bootstrap_helpers/css/bootstrap-formhelpers.min.css'));
    wp_enqueue_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array(), filemtime(get_template_directory() . '/js/bootstrap.min.js'));
//    wp_enqueue_script('country', get_template_directory_uri() . '/bootstrap_helpers/js/bootstrap-formhelpers.js', array(), filemtime(get_template_directory() . '/bootstrap_helpers/js/bootstrap-formhelpers.js'));
}

function calculateTheAge($date) {
    $from = new DateTime($date);
    $to = new DateTime('today');
    $age = $from->diff($to)->y;
    return $age;
}

function checkAllFields() {
    $check = array(
        'user_name',
        'email',
        'soldier_name',
        'first_name',
        'last_name',
        'gender',
        'birth_date',
        'phone-mobile',
        'street_address',
        'zip_code',
        'town',
    );

    $age = calculateTheAge($_POST['birth_date']);


    $parent_field = array('parent_street_address',
        'parent_zip_code',
        'parent_town',
        'phone-parent_mobile', 'parent_first_name',
        'parent_last_name');

    if ($age < 18) {
  //      $check = array_merge($check, $parent_field);
    }


    foreach ($check as $ch) {
        if (!isset($_POST[$ch]) || trim($_POST[$ch]) == '') {

            return false;
        }
    }
    return true && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
}

function checkPassword($password) {
    $r1 = '/[A-Z]/';
    $r3 = '/[!@#$%^&*()\-_=+{};:,<.>]/';
    return preg_match($r1, $password) && preg_match($r3, $password) && mb_strlen($password, 'utf8') >= 8;
}

add_action('wp_enqueue_scripts', 'theme_scripts');

date_default_timezone_set('Europe/Warsaw');

add_filter('woocommerce_product_add_to_cart_text', 'woo_archive_custom_cart_button_text');    // 2.1 +
add_filter('woocommerce_product_single_add_to_cart_text', 'woo_archive_custom_cart_button_text');

function woo_archive_custom_cart_button_text() {

    return __('SIGN UP!', 'woocommerce');
}

function get_users_by_timeslot($timeslot, $pid,$unique = true) {
    /* get orders, which has this product */

    $users = array();

    global $wpdb;
    $pref = $wpdb->prefix;
    $query = 'SELECT order_id FROM ' . $pref . 'woocommerce_order_items WHERE order_item_id in (SELECT order_item_id FROM ' . $pref . 'woocommerce_order_itemmeta WHERE meta_key="_product_id" and meta_value="' . mysql_real_escape_string($pid) . '")';
    $orders = $wpdb->get_results($query);
    echo $wpdb->last_error;
    $count_timeslots = 0;
    /* now check if this was the particular timeslot */
    foreach ($orders as $order) {
        $order_id = $order->order_id;
        $order = new WC_Order($order->order_id);

        if ($order) {
            $days = get_post_meta($order_id, 'days', true);
            if (!is_array($days)) {
                $days = array();
            }
            $items = $order->get_items();

            foreach ($items as $item) {
                $qty = 0;
                $product_id = 0;

                foreach ($item['item_meta_array'] as $it) {
                    if ($it->key == '_qty') {
                        $qty = $it->value;
                    } elseif ($it->key == '_product_id') {
                        $product_id = $it->value;
                    }
                }

                if ($product_id == $pid && $qty > 0) {
                    /* check timeslot ? */
                    foreach ($days as $day) {
                        if ($day == $timeslot) {
                            $count_timeslots+=$qty;
                            $users[] = $order->user_id;
                        }
                    }
                }
            }
        }
    }
    
    if($unique)
    {
        $users = array_unique($users);
    }
    else
    {
        return $count_timeslots;
    }
    
    $final_users = array();

    foreach ($users as $user) {
        $firstname = get_user_meta($user, 'first_name', true);
        $lastname = get_user_meta($user, 'last_name', true);

        $final_users[] = '<a href="/user-edit.php?user_id=' . $user . '">' . $firstname . ' ' . $lastname . '</a>';
    }

    return $final_users;
}

function is_private_show($product_id, $timeslot) {
    $is_p = get_field('is_private', $product_id);
    if ($is_p) {
        return true;
    }

    $buyout = get_post_meta($product_id, 'timeslot_' . $timeslot . '_buyout', true);

    if ($buyout && trim($buyout) > 0) {

        return true;
    }



    return false;
}

function reduceStock($order_id) {
    $order = new WC_Order($order_id);
    $days = get_post_meta($order_id, 'days', true);
    $buyout = get_post_meta($order_id, 'buyout', true);

    if (!is_array($days)) {
        $days = array();
    }
    $items = $order->get_items();
    $i = 0;
    foreach ($items as $item) {
        $qty = 0;
        $product_id = 0;


        foreach ($item['item_meta_array'] as $it) {

            if ($it->key == '_qty') {
                $qty = $it->value;
            } elseif ($it->key == '_product_id') {
                $product_id = $it->value;
            }
        }

        if (isset($days[$i])) {
            $current = get_post_meta($product_id, 'timeslot_' . $days[$i], true);
            $new = $current - $qty;
            update_post_meta($product_id, 'timeslot_' . $days[$i], $new);
        }

        if ($buyout && trim($buyout) != '') {
            update_post_meta($product_id, 'timeslot_' . $days[$i] . '_buyout', true);
        }

        $stock = get_post_meta($product_id, '_stock', true);
        $stock-=$qty;
        /* update_post_meta($product_id, '_stock', $stock); */

        $i++;
    }
}

//reduceStock(1694);
//reduceStock(1418);

add_action('woocommerce_thankyou', 'custom_woocommerce_auto_complete_order');
add_action('woocommerce_order_status_completed', function($order_id) {
    reduceStock($order_id);
});

function custom_woocommerce_auto_complete_order($order_id) {
    if (!$order_id) {
        return;
    }

    $order = wc_get_order($order_id);
    $order->update_status('completed');
}

function slots_per_day($post) {
    require_once dirname(__FILE__) . '/tmpl/slots_per_day.php';
}

function reduceSlotsBy($post_id, $difference) {
    $start = get_post_meta($post_id, 'actein_date', true);
    $end = get_post_meta($post_id, 'actein_date_end', true);

    if ($start && $end) {

        $s = strtotime($start);
        $e = strtotime($end);
        $day = 3600 * 24;
        for ($i = $s; $i <= $e; $i+=$day) {

            $sum_inventory = 0;
            $time_from = get_post_meta($post_id, 'from_' . $i, true);
            $time_until = get_post_meta($post_id, 'until_' . $i, true);

            $interval = get_post_meta($post_id, 'actein_duration', true) * 60;
            $time_first = strtotime(date('Y-m-d', $i) . ' ' . $time_from);
            $time_last = strtotime(date('Y-m-d', $i) . ' ' . $time_until);

            $max_players = get_post_meta($post_id, 'max_players', true);
            $slots_this_day = 0;

            for ($a = $time_first; $a <= $time_last - $interval; $a+=$interval) {
                $current = get_post_meta($post_id, 'timeslot_' . $a, true);
                $new = $current + $difference;
                update_post_meta($post_id, 'timeslot_' . $a, $new);
            }
            $sum_inventory+=$new;
        }
    }
    update_post_meta($post_id, '_stock', $sum_inventory);
}

function moveUserData($user_id) {
    update_user_meta($user_id, 'billing_first_name', $_POST['first_name']);
    update_user_meta($user_id, 'billing_last_name', $_POST['last_name']);
    update_user_meta($user_id, 'billing_phone', $_POST['phone-mobile']);
    update_user_meta($user_id, 'billing_address_1', $_POST['street_address']);
    update_user_meta($user_id, 'billing_postcode', $_POST['zip_code']);
    update_user_meta($user_id, 'billing_city', $_POST['town']);
}

function save_slots($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (isset($_POST['post_type']) && $_POST['post_type'] == 'product') {
        if (!current_user_can('edit_page', $post_id)) {
            return;
        }
        $inventory = 0;
        foreach ($_POST as $key => $value) {

            if ($key == 'max_players') {
                $old = get_post_meta($post_id, $key, true);

                if ($old != $value) {
                    $difference = $value - $old;

                    reduceSlotsBy($post_id, $difference);
                    /* reduce slots */
                }
            }

            update_post_meta($post_id, $key, $value);
            if (substr($key, 0, 5) == 'slot_') {
                $inventory+=$value;
            }
        }

        update_post_meta($post_id, '_stock', $inventory);
        update_post_meta($post_id, '_manage_stock', 'yes');
    }
}

function prepare_admin() {
    add_action('save_post', 'save_slots');
    add_meta_box('slots', 'Slots per day', 'slots_per_day', 'product', 'normal', 'high');
}

add_action('admin_init', 'prepare_admin');

add_action('woocommerce_add_cart_item_data', function($cart_item_data) {

    if (isset($_GET['timeslot'])) {
        $cart_item_data['day'] = $_GET['timeslot'];
    }
    if (isset($_POST['buyout'])) {
        $cart_item_data['buyout'] = 'yes';
    }

    return $cart_item_data;
}, 1);

function filter_name($title, $cart_item, $cart_item_key) {
    $sufix = '';
    if (isset($cart_item['buyout'])) {
        $sufix = ' <b>Lockout</b> ';
    }
  
    if (isset($cart_item['day'])) {
        if (strpos($title, '</a') > 0) {
            $title = str_replace('/"', '/?day=' . date('d-m-Y H:i', $cart_item['day']) . '"', $title);
            $title = str_replace('</a', '(' . date('d-m-Y', $cart_item['day']).' '.getTimeslotTimeRange($cart_item['product_id'],$cart_item['day']).' '. $sufix . ')</a', $title);
        } else {
            $title.=' (' . date('d-m-Y H:i', $cart_item['day']).' '.getTimeslotTimeRange($cart_item['product_id'],$cart_item['day']).' ' . $sufix . ')';
        }
    }

    return $title;
}

add_filter('woocommerce_cart_item_name', 'filter_name', 10, 3);
////add_filter('woocommerce_order_item_name','filter_name',10,3);

/* observer here */

add_action('init', function() {
    global $woocommerce;
    if (is_object($woocommerce->cart)) {
        $c = $woocommerce->cart->get_cart();
        foreach ($c as $key => $value) {

            if (isset($value['day'])) {
                $checkDay = $value['day'];
                $max = get_post_meta($value['product_id'], 'timeslot_' . $checkDay, true);

                if ($value['quantity'] > $max) {
                    $woocommerce->cart->set_quantity($key, $max);
                }
            }

            /* if (!$this->canDisplayProduct($value['product_id']) || get_option('block_all') == 'yes') {
              $woocommerce->cart->set_quantity($key, 0);
              } */
        }
    }
});

add_action('woocommerce_checkout_update_order_meta', 'add_field_to_order');

function add_field_to_order($order_id) {
    /* var_dump(WC_Cart::get_cart()); */
    global $woocommerce;
    $c = $woocommerce->cart->get_cart();
    $days = array();
    foreach ($c as $key => $value) {
        if (isset($value['day'])) {
            $days[] = $value['day'];
        }
        if (isset($value['buyout'])) {

            update_post_meta($order_id, 'buyout', true);
        }
    }

    update_post_meta($order_id, 'days', $days);
}

class BackendPanel {

    public function adminMenu() {

        add_menu_page('Demographics', 'Demographics', 'manage_options', 'demographics', array($this, 'demographics'));
    }

    public function demographics() {
        /* get all users who are NOT admins */
        $allUsers = get_users();

        $users = array();
        $zips = array();
        $ages = array(
            '13-17' => 0,
            '18-22' => 0,
            '23-27' => 0,
            '28-32' => 0,
            '32-up' => 0
        );
        $number_of_users = 0;
        $male = 0;
        $female = 0;
        $orders = get_posts(array(
            'post_type' => 'shop_order',
            'posts_per_page' => -1
        ));

        $number_of_orders = array();
        $number_of_orders_avg = 0;
        $number_of_orders_total = 0;
        foreach ($allUsers as $user) {
            if ($user->roles[0] == 'administrator') {
                continue;
            }

            $date_of_birth = get_user_meta($user->ID, 'birth_date', true);
            if (!$date_of_birth) {
                continue;
            }
            $age = date_diff(date_create($date_of_birth), date_create('today'))->y;
            ;
            if ($age < 13) {
                continue;
            }
            $zip = get_user_meta($user->ID, 'zip_code', true);
            if (!$zip) {
                continue;
            }

            $name = get_user_meta($user->ID, 'first_name', true);

            $letter = strtolower($name[strlen($name) - 1]);

            if (trim($name) == '') {
                continue;
            }

            $zip_truncated = substr($zip, 0, 2);

            /* ALL DATA FROM HERE ARE GOOD */
            $gender = get_user_meta($user->ID, 'gender', true);
            if ($gender == 'female') {
                $female++;
            } else {
                $male++;
            }

            $number_of_users++;
            if (!isset($zips[$zip_truncated])) {
                $zips[$zip_truncated] = 0;
            };
            $zips[$zip_truncated] ++;
            if ($age > 32) {
                $ages['32-up'] ++;
            } elseif ($age >= 28) {
                $ages['28-32'] ++;
            } elseif ($age >= 23) {
                $ages['23-27'] ++;
            } elseif ($age >= 18) {
                $ages['18-22'] ++;
            } elseif ($age >= 13) {
                $ages['13-17'] ++;
            }

            /* how many times user playd = how many orders completed */
            $orders = get_posts(array(
                'post_type' => 'shop_order',
                'posts_per_page' => -1,
                'meta_query' => array(
                    array(
                        'key' => '_customer_user',
                        'value' => $user->ID
                    )
                )
            ));

            $number = count($orders);
            if (!isset($number_of_orders[$number])) {
                $number_of_orders[$number] = 0;
            };
            $number_of_orders[$number] ++;
            $number_of_orders_total++;

            $number_of_orders_avg+=$number;
        }
        ksort($number_of_orders);

        require_once dirname(__FILE__) . '/tmpl/demographics.php';
    }

}

function prepare_backendpanel_plugin() {
    $backendPanel = new BackendPanel();
    add_action('admin_menu', array($backendPanel, 'adminMenu'));
}

add_action('init', 'prepare_backendpanel_plugin');

add_shortcode('of_get_option', function($args) {

    if (isset($args['key'])) {
        return of_get_option($args['key']);
    }
});

add_filter('widget_text', 'do_shortcode');

function reset_pass_url() {
    $siteURL = get_option('siteurl');
    return "{$siteURL}/wp-login.php?action=lostpassword";
}

add_filter('lostpassword_url', 'reset_pass_url', 11, 0);

function numediaweb_custom_user_profile_fields($user) {
    ?>
    <style>
        #additional-data
        {
            padding: 20px;
            background: #fff;
        }        

        .one-data-player
        {
            margin-bottom: 10px;
            margin-top: 10px;
        }

        .one-data-player span
        {
            display: inline-block;
            vertical-align: top;
            width: 100%;
            max-width: 150px;
            font-weight: bold;
        }

    </style>
    <div id="additional-data">
        <h3>Player's Data</h3>
        <div class='one-data-player'>
            <span>Soldier Name</span>
    <?php echo get_user_meta($user->ID, 'soldier_name', true) ?>
        </div>
        <div class='one-data-player'>
            <span>First Name</span>
    <?php echo get_user_meta($user->ID, 'first_name', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Last Name</span>
    <?php echo get_user_meta($user->ID, 'last_name', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Street Address</span>
    <?php echo get_user_meta($user->ID, 'street_address', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Zip Code</span>
    <?php echo get_user_meta($user->ID, 'zip_code', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Town</span>
    <?php echo get_user_meta($user->ID, 'town', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Gender</span>
    <?php echo get_user_meta($user->ID, 'gender', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Birthdate</span>
    <?php echo get_user_meta($user->ID, 'birth_date', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Mobile</span>  
    <?php echo get_user_meta($user->ID, 'country-mobile', true) ?>
    <?php echo get_user_meta($user->ID, 'phone-mobile', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Photo</span>  
    <?php
    $photo = get_user_meta($user->ID, 'picture', true);
    ?>
            <?php
            if (trim($photo) != '') {
                ?><img src="<?php echo get_home_url() ?>/wp-content/uploads/photos/<?php echo $photo ?>" alt="" /><?php
            } else {
                echo 'Not uploaded';
            }
            ?>
        </div>

        <h3>Parent or responsible contact</h3>
        <div class='one-data-player'>
            <span>First Name</span>
            <?php echo get_user_meta($user->ID, 'parent_first_name', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Last Name</span>
    <?php echo get_user_meta($user->ID, 'parent_last_name', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Street Address</span>
    <?php echo get_user_meta($user->ID, 'parent_street_address', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Zip Code</span>
    <?php echo get_user_meta($user->ID, 'parent_zip_code', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Town</span>
    <?php echo get_user_meta($user->ID, 'parent_town', true) ?>
        </div>
        <div class='one-data-player'>
            <span>Mobile</span>
    <?php echo get_user_meta($user->ID, 'country-parent_mobile', true) ?>
    <?php echo get_user_meta($user->ID, 'phone-parent_mobile', true) ?>
        </div>
        <h3>Agreement</h3>
    <?php
    $bday = get_user_meta($user->ID, 'birth_date', true);

    function getAge2($then) {
        $then = date('Ymd', strtotime($then));
        $diff = date('Ymd') - $then;
        return substr($diff, 0, -4);
    }

    $age = getAge2($bday);
    $agreement = get_user_meta($user->ID, 'agreement', true);

    if (trim($agreement) == '') {
        ?>
            <p><span>Agreement not signed</span></p>
            <?php
        } else {
            ?>
            <link type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/south-street/jquery-ui.css" rel="stylesheet"> 
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() ?>/js/excanvas.js"></script> 
        <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri() ?>/js/jquery.signature.css" />
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/jquery.signature.min.js"></script>
        <script src="<?php echo get_stylesheet_directory_uri() ?>/js/actein.js"></script>
            <div id="signature"></div>
            <textarea id="signatureJSON" name="signatureJSON" style="display:none;"><?php echo get_user_meta($user->ID,'agreement',true) ?></textarea>
            <script>
               (function($)
               {
                   $(document).ready(function()
                   {
                       $('#signature').signature('draw', $('#signatureJSON').val());
                   })
               })(jQuery);
               </script>
            <?php
        }
        ?>
        <div class='one-data-player'>
            <span>Age</span> <?php echo $age ?>
        </div>
        <?php if ($age < 18): ?>

        <?php endif ?>

    </div>
    <?php
}

add_action('show_user_profile', 'numediaweb_custom_user_profile_fields');
add_action('edit_user_profile', 'numediaweb_custom_user_profile_fields');

function wpse_lost_password_redirect() {
    wp_redirect(get_permalink(1201));
    exit;
}

add_action('password_reset', 'wpse_lost_password_redirect');

function qr() {
    
}

add_action('init', function() {
    if (isset($_GET['qr'])) {
        $PNG_TEMP_DIR = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'tmp' . DIRECTORY_SEPARATOR;
        $PNG_WEB_DIR = dirname(__FILE__) . '/tmp/';

        require_once dirname(__FILE__) . '/phpqrcode/qrlib.php';
        $data = urldecode($_GET['qr']);
        $errorCorrectionLevel = 'L';
        $matrixPointSize = 8;

        $filename = $PNG_TEMP_DIR . 'test' . md5($data . '|' . $errorCorrectionLevel . '|' . $matrixPointSize) . '.png';

        QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
        header('Content-type: image/png');
        echo file_get_contents($filename);
        die();
    }
});

add_action('woocommerce_before_calculate_totals', 'add_custom_price');

function add_custom_price($cart_object) {
   
    foreach ($cart_object->cart_contents as $key => $value) {
        if (isset($value['day'])) {
            $price = get_post_meta($value['product_id'], 'price_' . $value['day'], true);

            if ($price > 0) {
                $value['data']->price = $price;
            }
          
            if(isset($value['buyout']) && $value['buyout']=='yes')
            {
                $price = get_post_meta($value['product_id'], 'price_lockout_slot', true);
                $value['data']->price = $price;
              
            }
            
            
        }
    }
   
}

add_action('init', function() {
    register_post_type('locations', array(
        'labels' => array('name' => __('Locations'), 'singular_name' => __('Locations')),
        'public' => true,
        'has_archive' => true,
        'hierarchical' => true,
        'exclude_from_search' => true,
        'show_in_nav_menus' => true,
        'menu_position' => 5,
        'supports' => array('title')
    ));

    /* set in session default location */

    if (!isset($_SESSION['location'])) {
        $location = get_posts(array(
            'posts_per_page' => -1,
            'post_type' => 'locations'
        ));
        if (!empty($location)) {
            $_SESSION['location'] = $location[0]->ID;
        }
    }

    if (isset($_POST['change_location'])) {
        $_SESSION['location'] = $_POST['change_location'];
    }
});

add_action('init', 'myStartSession', 1);
add_action('wp_logout', 'myEndSession');
add_action('wp_login', 'myEndSession');

function myStartSession() {
    if (!session_id()) {
        session_start();
    }
}

function myEndSession() {
    session_destroy();
}

function getProductType($product_id) {
    $category = wp_get_post_terms($product_id, 'product_cat');
    if (!empty($category)) {
        echo $category[0]->name;
    } else {
        return false;
    }
}

function isLessThen24HLeft($timeslot) {
    $diff = $timeslot - time();
    $day = 3600 * 24;
    return $diff < $day;
}

function getTimeslotTimeRange($product_id,$timeslot)
{
    if(!$product_id || !$timeslot)
    {
        return false;
    }
    $day = date('Y-m-d',$timeslot);
    $day = strtotime($day);
    $interval = get_post_meta($product_id,'actein_duration',true);
    
    $custom_duration = get_post_meta($product_id, 'duration_' . $timeslot, true);
    if($custom_duration>0)
    {
        $interval = $custom_duration;
    }
    
    /*maybe some penalty ? get ALL timeszlots from this day untill this one and calculate the penalty */
    
    $time_f = get_post_meta($product_id, 'from_' . $day, true);
    $time_u = get_post_meta($product_id, 'until_' . $day, true);
    $int = get_post_meta($product_id, 'actein_duration', true) * 60;
    $time_first = strtotime(date('Y-m-d', $day) . ' ' . $time_f);
    $time_last = strtotime(date('Y-m-d', $day) . ' ' . $time_u);
    $diff = 0;
    
    for ($a = $time_first; $a <= $time_last - $int; $a+=$int) {
        if($a>=$timeslot)
        {
            break;
        }
        
        $cd = get_post_meta($product_id, 'duration_' . $a, true);
        if($cd>0)
        {
            $diff += ($cd - $int/60);
            
        }
        
        
    }
 
    $time_from = $timeslot+($diff*60);
    $time_until = $time_from+($interval*60);
  
    return date('H:i', $time_from).'-'.date('H:i', $time_until);
    
    /*<?php echo date('H:i', $_GET['timeslot']) ?> - <?php echo date('H:i', $_GET['timeslot']+$interval) ?></div>*/
}
