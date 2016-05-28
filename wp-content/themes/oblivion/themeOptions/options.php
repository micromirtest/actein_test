<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 */
function optionsframework_option_name() {
    // This gets the theme name from the stylesheet (lowercase and without spaces)
    $themename = wp_get_theme();
    $themename = $themename['Name'];
    $themename = preg_replace("/\W/", "", strtolower($themename) );
    $optionsframework_settings = get_option('optionsframework');
    $optionsframework_settings['id'] = $themename;
    update_option('optionsframework', $optionsframework_settings);
}
function optionsframework_options() {
    // Slider Options
    $slider_choice_array = array("none" => "No Showcase", "accordion" => "Accordion", "wpheader" => "WordPress Header", "image" => "Your Image", "easing" => "Easing Slider", "custom" => "Custom Slider");
    // Pull all the categories into an array
    $options_categories = array();
    $options_categories_obj = get_categories();
    foreach ($options_categories_obj as $category) {
        $options_categories[$category->cat_ID] = $category->cat_name;
    }
    // Pull all the pages into an array
    $options_pages = array();
    $options_pages_obj = get_pages('sort_column=post_parent,menu_order');
    $options_pages[''] = 'Select a page:';
    foreach ($options_pages_obj as $page) {
        $options_pages[$page->ID] = $page->post_title;
    }
    // If using image radio buttons, define a directory path
    $radioimagepath =  get_stylesheet_directory_uri() . '/themeOptions/images/';
    // define sample image directory path
    $imagepath =  get_template_directory_uri() . '/images/demo/';
    $options = array();
    $options[] = array( "name" => __("General  Settings", 'oblivion'),
                        "type" => "heading");
	$options[] = array( "name" => __("General  Settings", 'oblivion'),
                        "type" => "info");
    $options[] = array( "name" => __("Upload Your Logo", 'oblivion'),
                        "desc" => __("We recommend keeping it within reasonable size.", 'oblivion'),
                        "id" => "logo",
                        "std" => get_template_directory_uri()."/img/logo.png",
                        "type" => "upload");
    $options[] = array( "name" => __("Upload Your Favicon", 'oblivion'),
                        "desc" => __("Site tab icon", 'oblivion'),
                        "id" => "favicon",
                        "std" => get_template_directory_uri()."/img/favicon.png",
                        "type" => "upload");

	 $options[] = array( "name" => __("Jquery Scrollbar", 'oblivion'),
                        "desc" => __("Enable the option of a smooth jquery scrollbar.", 'oblivion'),
                        "id" => "scrollbar",
                        "std" => "1",
                        "type" => "jqueryselect");

	$options[] = array( "name" => __("Login button in the menu", 'oblivion'),
                        "desc" => __("Enable the login avatar in the menu", 'oblivion'),
                        "id" => "login_menu",
                        "std" => "1",
                        "type" => "jqueryselect");

	$options[] = array( "name" => __("Fullwidth", 'oblivion'),
                        "desc" => __("Change the body of the site fullwidth.", 'oblivion'),
                        "id" => "fullwidth",
                        "std" => "1",
                        "type" => "jqueryselect");

    $options[] = array( "name" => __("Author", 'oblivion'),
                        "desc" => __("Show author info in single page.", 'oblivion'),
                        "id" => "authorsingle",
                        "std" => "1",
                        "type" => "jqueryselect");


    $options[] = array( "name" => __("Blog settings", 'oblivion'),
                        "type" => "info");
    $options[] = array( "name" => __("Blog category", 'oblivion'),
                        "desc" => __("Insert ID of blog categories, comma separated.", 'oblivion'),
                        "id" => "blogcat",
                        "std" => "",
                        "type" => "text");
						
	  $options[] = array( "name" => __("BBpress", 'oblivion'),
                        "type" => "info");
    $options[] = array( "name" => __("Forums page title", 'oblivion'),
                        "desc" => __("Add forums page title", 'oblivion'),
                        "id" => "forum_title",
                        "std" => "Forums",
                        "type" => "text");					
//SEO
$options[] = array( "name" => __("SEO", 'oblivion'),
                        "type" => "heading");
	$options[] = array( "name" => __("SEO", 'oblivion'),
                        "type" => "info");
$options[] = array( "name" => __("Home title", 'oblivion'),
                        "desc" => __("Enter home title.", 'oblivion'),
                        "id" => "hometitle",
                        "std" => "",
                        "type" => "text");
$options[] = array( "name" => __("Home description", 'oblivion'),
                        "desc" => __("Enter home description.", 'oblivion'),
                        "id" => "metadesc",
                        "std" => "",
                        "type" => "textarea");
$options[] = array( "name" => __("Keywords", 'oblivion'),
                        "desc" => __("Enter keywords comma separated.", 'oblivion'),
                        "id" => "keywords",
                        "std" => "",
                        "type" => "text");
$options[] = array( "name" => __("Google analytics", 'oblivion'),
                        "desc" => __("Enter google analytics code.", 'oblivion'),
                        "id" => "googlean",
                        "std" => "",
                        "type" => "textarea");
// WooCommerce

$options[] = array( "name" => __("WooCommerce", 'oblivion'),
                        "type" => "heading");
$options[] = array( "name" => __("WooCommerce", 'oblivion'),
                        "type" => "info");
$imagepath =  get_template_directory_uri() . '/themeOptions/images/sidebar/';
    $options[] = array( "name" => __("Main shop page sidebar", 'oblivion'),
                        "desc" => __("Choose page layout that you want to use on main WooCommerce page.", 'oblivion'),
                        "id" => "mainshop",
                        "std" =>"s1",
                        "type" => "images",
                        "options" => array(
                        's1' => $imagepath . 'full.png',
                        's2' => $imagepath . 'left.png',
                        's3' => $imagepath . 'right.png',

                        ));


    $options[] = array( "name" => __("Single product page sidebar", 'oblivion'),
                        "desc" => __("Choose page layout that you want to use on single product WooCommerce page.", 'oblivion'),
                        "id" => "singleprod",
                        "std" =>"s1",
                        "type" => "images",
                        "options" => array(
                        's1' => $imagepath . 'full.png',
                        's2' => $imagepath . 'left.png',
                        's3' => $imagepath . 'right.png',

                        ));
// Colour Settings
    $options[] = array( "name" => __("Customize", 'oblivion'),
                        "type" => "heading");

// Backgrounds
    $options[] = array( "name" => __("Backgrounds", 'oblivion'),
                        "type" => "info");

    $options[] = array( "name" => __("Top background", 'oblivion'),
                        "desc" => __("Background for the header of the site.", 'oblivion'),
                        "id" => "header_bg",
                        "std" => get_template_directory_uri()."/img/header.jpg",
                        "type" => "upload");

    $options[] = array( "name" => __("Fixed background", 'oblivion'),
                        "desc" => __("Set background to fixed position.", 'oblivion'),
                        "id" => "background_fix",
                        "std" => "1",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Footer background", 'oblivion'),
                        "desc" => __("Background for the footer of the site.", 'oblivion'),
                        "id" => "footer_bg",
                        "std" => get_template_directory_uri()."/img/footer.jpg",
                        "type" => "upload");
	$imagepath =  get_template_directory_uri() . '/themeOptions/images/repeat/';
    $options[] = array( "name" => __("Footer background repeat", 'oblivion'),
                        "desc" => __("You could choose to repeat the background image if you want to use a pattern.", 'oblivion'),
                        "id" => "repeat",
                        "std" =>"b1",
                        "type" => "images",
						"options" => array(
						'b1' => $imagepath . 'b1.jpg',
						'b2' => $imagepath . 'b2.jpg',
						'b3' => $imagepath . 'b3.jpg',
						'b4' => $imagepath . 'b4.jpg',
						));

    $options[] = array( "name" => __("Background colour", 'oblivion'),
                    "desc" => __("Colour for the background.", 'oblivion'),

                    "id" => "bg_color",

                    "std" => "#1d2031",

                    "type" => "color" );

// Colours

    $options[] = array( "name" => __("Colours", 'oblivion'),
                        "type" => "info");
    $options[] = array( "name" => __("Primary Colour", 'oblivion'),
                    "desc" => __("The primary colour for the site.", 'oblivion'),

                    "id" => "primary_color",

                    "std" => "#40434e",

                    "type" => "color" );

    $options[] = array( "name" => __("Secondary Colour", 'oblivion'),
                    "desc" => __("The secondary colour for the site.", 'oblivion'),

                    "id" => "secondary_color",

                    "std" => "#32333b",

                    "type" => "color" );

	$options[] = array( "name" => __("Main body colour", 'oblivion'),
                    "desc" => __("The colour for body wrapper.", 'oblivion'),

                    "id" => "body_color",

                    "std" => "#f1f1f1",

                    "type" => "color" );

    $options[] = array( "name" => __("Header Colour", 'oblivion'),
                    "desc" => __("The colour for the headers of the site.", 'oblivion'),

                    "id" => "header_color",

                    "std" => "#ff5b5b",

                    "type" => "color" );

    $options[] = array( "name" => __("Link Colour", 'oblivion'),
                    "desc" => __("The colour for the links of the site.", 'oblivion'),

                    "id" => "link_color",

                    "std" => "#ff5b5b",

                    "type" => "color" );

	$options[] = array( "name" => __("Button colours", 'oblivion'),
	                        "type" => "info");
	$options[] = array(
				    "name" => __("Button colour", 'oblivion'),
				    "desc" => __("Button colour.", 'oblivion'),
				    "id" => "button",
				    "std" => "#37a8d2",
				    "type" => "color");

	$options[] = array(
				    "name" => __("Button hover colour", 'oblivion'),
				    "desc" => __("Button hover colour", 'oblivion'),
				    "id" => "button_hover",
				    "std" => "#1b7ea3",
				    "type" => "color");


/* Patterns
  $options[] = array( "name" => __("Patterns"),
                        "type" => "info");
    $imagepath =  get_template_directory_uri() . '/img/patterns/';


  $options[] = array(
        'name' => __("Pattern Selector"),
        'desc' => __("Choose your pattern."),
        'id' => "pattern_images",
        'std' => "1.png",
        'type' => "images",
        'options' => array(
            '1.png' => $imagepath . '/theme-barracks/1.png',
            '2.png' => $imagepath . '/theme-barracks/2.png',
            '3.png' => $imagepath . '/theme-barracks/3.png',
            '4.png' => $imagepath . '/theme-barracks/4.png',
            '5.png' => $imagepath . '/theme-barracks/5.png',
            '6.png' => $imagepath . '/theme-barracks/6.png',
            '7.png' => $imagepath . '/theme-barracks/7.png',
            '8.png' => $imagepath . '/theme-barracks/8.png',
            '9.png' => $imagepath . '/theme-barracks/9.png',
            '10.png' => $imagepath . '/theme-barracks/10.png',
            '11.png' => $imagepath . '/theme-barracks/11.png',
            '12.png' => $imagepath . '/theme-barracks/12.png',
            '13.png' => $imagepath . '/theme-barracks/13.png',
            '14.png' => $imagepath . '/theme-barracks/14.png',
            '15.png' => $imagepath . '/theme-barracks/15.png',
            '16.png' => $imagepath . '/theme-barracks/16.png',
            '17.png' => $imagepath . '/theme-barracks/17.png',
            '18.png' => $imagepath . '/theme-barracks/18.png',
            '19.png' => $imagepath . '/theme-barracks/19.png',
            '20.png' => $imagepath . '/theme-barracks/20.png'
           )
    );
 *
 * */
//Fonts
 $options[] = array( "name" => __("Fonts", 'oblivion'),
                        "type" => "info");
$typography_mixed_fonts = array_merge( options_typography_get_os_fonts() , options_typography_get_google_fonts() );
asort($typography_mixed_fonts);
$options[] = array( 'name' => __('Selected Google Fonts for Headers', 'oblivion'),
    'desc' => __('Fifteen of the top google fonts for headers.', 'oblivion'),
    'id' => 'google_font',
    'std' => array(  'size' => '', 'face' => 'Open Sans', 'style' => '', 'color' => ''),
    'type' => 'typography',
    'options' => array(
        'faces' => $typography_mixed_fonts,
        'styles' => false )
    );
$options[] = array( 'name' => __('Selected Google Fonts for Body', 'oblivion'),
    'desc' => __('Fifteen of the top google fonts for body.', 'oblivion'),
    'id' => 'google_mixed_2',
    'std' => array( 'size' => '', 'face' => 'Arial', 'style' => '', 'color' => ''),
    'type' => 'typography',
    'options' => array(
        'faces' => $typography_mixed_fonts,
        'styles' => false )
    );
// Footer section start
    $options[] = array( "name" => __("Footer", 'oblivion'), "type" => "heading");
	$options[] = array( "name" => __("Footer", 'oblivion'),
                        "type" => "info");
                $options[] = array( "name" => __("Copyright", 'oblivion'),
                        "desc" => __("You can use HTML code in here.", 'oblivion'),
                        "id" => "copyright",
                        "std" => "Made by Skywarrior Themes.",
                        "type" => "textarea");
  /*  $options[] = array( "name" => __("Upload the logo for the footer", 'oblivion'),
                        "desc" => __("We recommend keeping it within reasonable size.", 'oblivion'),
                        "id" => "logo_footer",
                        "std" => get_template_directory_uri()."/img/logo_footer.png",
                        "type" => "upload");


/*                $options[] = array( "name" => __("Copyright year", 'oblivion'),
                        "desc" => __("Enter your copyright year.", 'oblivion'),
                        "id" => "year",
                        "std" => "2012",
                        "type" => "text");
                $options[] = array( "name" => __("Privacy link name", 'oblivion'),
                        "desc" => __("Enter your privacy link name.", 'oblivion'),
                        "id" => "privacyname",
                        "std" => "Privacy",
                        "type" => "text");
                $options[] = array( "name" => __("Privacy link", 'oblivion'),
                        "desc" => __("Enter your privacy link. Please include http://", 'oblivion'),
                        "id" => "privacy",
                        "std" => "http://www.skywarriorthemes.com/",
                        "type" => "text");
                 $options[] = array( "name" => __("Terms link name", 'oblivion'),
                        "desc" => __("Enter your terms link name.", 'oblivion'),
                        "id" => "termsname",
                        "std" => "Terms",
                        "type" => "text");
                $options[] = array( "name" => __("Terms link", 'oblivion'),
                        "desc" => __("Enter your terms link. Please include http://", 'oblivion'),
                        "id" => "terms",
                        "std" => "http://www.skywarriorthemes.com/",
                        "type" => "text");*/
// contact page code
$options[] = array( "name" => __("Contact", 'oblivion'),
                        "type" => "heading");
$options[] = array( "name" => __("Contact", 'oblivion'),
                        "type" => "info");
    $options[] = array( "name" => __("Enter email address text", 'oblivion', 'oblivion'),
                        "desc" => __("Enter the email address that will be displayed on the side block.", 'oblivion'),
                        "id" => "contact_email",
                        "std" => "admin@gmail.com",
                        "type" => "text");
     $options[] = array( "name" => __("Enter title text above gmap", 'oblivion'),
                        "desc" => __("Enter title text that will be displayed above gmap.", 'oblivion'),
                        "id" => "contact_title",
                        "std" => "howdy there",
                        "type" => "text");
   $options[] = array( "name" => __("Enter subtitle text above gmap", 'oblivion'),
                        "desc" => __("Enter subtitle text that will be displayed above gmap.", 'oblivion'),
                        "id" => "contact_subtitle",
                        "std" => "Why not leave a message or give us a call?",
                        "type" => "text");
/*	    $options[] = array( "name" => __("Enter contact sidebar title", 'oblivion'),
                        "desc" => __("Enter contact sidebar title.", 'oblivion'),
                        "id" => "contact_title",
                        "std" => "How to reach us",
                        "type" => "text");
   $options[] = array( "name" => __("Enter sidebar content", 'oblivion'),
                        "desc" => __("You can use HTML code in here.", 'oblivion'),
                        "id" => "contactsidetext",
                        "std" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem quam eu lacinia ullamcorper consectetur, adipiscing condimentum tristique vel, consectetur adipiscing elit eleifend sed turpis. Pellentesque cursus arcu id magna euismod in elementum purus molestie. Curabitur pellentesque massa eu nulla consequat sed porttitor arcu porttitor. Quisque volutpat  pharetra felis, eu cursus lorem molestie vitae. Aliquam dictum pharetra pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra ligula eu metus pulvinar tristique.",
                        "type" => "textarea");
 /*   $options[] = array( "name" => __("Enter phone number", 'oblivion'),
                        "desc" => __("Enter the phone number that will be displayed on the side block.", 'oblivion'),
                        "id" => "contact_phone",
                        "std" => "123 456 7891",
                        "type" => "text");
     $options[] = array( "name" => __("Enter address", 'oblivion'),
                        "desc" => __("Enter the address that will be displayed on the side block.", 'oblivion'),
                        "id" => "contact_address",
                        "std" => "50 Street Name, London, PO12 3DE ",
                        "type" => "text");
*/
       $options[] = array( "name" => __("Gmap settings", 'oblivion'),
                        "type" => "info");
     $options[] =      array( "name" => "Turn Map on/off",
                "desc" => "Show Map on Contact us page.",
                "id" => "contact_map_enable",
                "type" => "select",
                "std" => "1",
                 "type" => "jqueryselect");
     $options[] = array( "name" => __("Upload Your Marker Logo For Map", 'oblivion'),
                        "desc" => __("We recommend keeping it within reasonable size.", 'oblivion'),
                        "id" => "contact_marker_logo",
                        "std" => get_template_directory_uri()."/img/marker.png",
                        "type" => "upload");
       $options[] = array( "name" => __("Enter location Latitude", 'oblivion'),
                        "desc" => __("Enter location Latitude.", 'oblivion'),
                        "id" => "maplat",
                        "std" => "51.508742",
                        "type" => "text");
     $options[] = array( "name" => __("Enter location Longitude", 'oblivion'),
                        "desc" => __("Enter location Longitude.", 'oblivion'),
                        "id" => "maplon",
                        "std" => "-0.125656",
                        "type" => "text");
// end contact page code
// Social Media
    $options[] = array( "name" => __("Social Media", 'oblivion'),
                        "type" => "heading");
	$options[] = array( "name" => __("Social Media", 'oblivion'),
                        "type" => "info");
// Social Network setup
    /*$options[] = array( "name" => "Facebook App ID",
                        "desc" => "Add your Facebook App ID here",
                        "id" => "facebook_app",
                        "std" => "1234567890",
                        "type" => "text");
*/
    $options[] = array( "name" => __("Enable Twitter", 'oblivion'),
                        "desc" => __("Show or hide the Twitter icon that shows on the footer section.", 'oblivion'),
                        "id" => "twitter",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Twitter Link", 'oblivion'),
                        "desc" => __("Paste your twitter link here.", 'oblivion'),
                        "id" => "twitter_link",
                        "std" => "#",
                        "type" => "text");
    $options[] = array( "name" => __("Enable Facebook", 'oblivion'),
                        "desc" => __("Show or hide the Facebook icon that shows on the footer section.", 'oblivion'),
                        "id" => "facebook",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Facebook Link", 'oblivion'),
                        "desc" => __("Paste your facebook link here.", 'oblivion'),
                        "id" => "facebook_link",
                        "std" => "#",
                        "type" => "text");
	$options[] = array( "name" => __("Enable Steam", 'oblivion'),
                        "desc" => __("Show or hide the Steam icon that shows on the footer section.", 'oblivion'),
                        "id" => "steam",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Steam Link", 'oblivion'),
                        "desc" => __("Paste your Steam link here.", 'oblivion'),
                        "id" => "steam_link",
                        "std" => "#",
                        "type" => "text");

    $options[] = array( "name" => __("Enable Pinterest", 'oblivion'),
                        "desc" => __("Show or hide the Pinterest icon that shows on the footer section.", 'oblivion'),
                        "id" => "pinterest",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Pinterest Link", 'oblivion'),
                        "desc" => __("Paste your pinterest link here.", 'oblivion'),
                        "id" => "pinterest_link",
                        "std" => "#",
                        "type" => "text");

    $options[] = array( "name" => __("Enable Google+", 'oblivion'),
                        "desc" => __("Show or hide the Google+ icon that shows on the footer section.", 'oblivion'),
                        "id" => "googleplus",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Google+ Link", 'oblivion'),
                        "desc" => __("Paste your google+ link here.", 'oblivion'),
                        "id" => "google_link",
                        "std" => "#",
                        "type" => "text");
    $options[] = array( "name" => __("Enable dribbble", 'oblivion'),
                        "desc" => __("Show or hide the dribbble icon that shows on the footer section.", 'oblivion'),
                        "id" => "dribbble",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Dribbble link", 'oblivion'),
                        "desc" => __("Paste your dribbble link here.", 'oblivion'),
                        "id" => "dribbble_link",
                        "std" => "#",
                        "type" => "text");
    $options[] = array( "name" => __("Enable vimeo", 'oblivion'),
                        "desc" => __("Show or hide the vimeo icon that shows on the footer section.", 'oblivion'),
                        "id" => "vimeo",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Vimeo link", 'oblivion'),
                        "desc" => __("Paste your vimeo link here.", 'oblivion'),
                        "id" => "vimeo_link",
                        "std" => "#",
                        "type" => "text");
      $options[] = array( "name" => __("Enable youtube", 'oblivion'),
                        "desc" => __("Show or hide the youtube icon that shows on the footer section.", 'oblivion'),
                        "id" => "youtube",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Youtube link", 'oblivion'),
                        "desc" => __("Paste your youtube link here.", 'oblivion'),
                        "id" => "youtube_link",
                        "std" => "#",
                        "type" => "text");
      $options[] = array( "name" => __("Enable twitch", 'oblivion'),
                        "desc" => __("Show or hide the twitch icon that shows on the footer section.", 'oblivion'),
                        "id" => "twitch",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Twitch link", 'oblivion'),
                        "desc" => __("Paste your twitch link here.", 'oblivion'),
                        "id" => "twitch_link",
                        "std" => "#",
                        "type" => "text");

     $options[] = array( "name" => __("Enable linkedin", 'oblivion'),
                        "desc" => __("Show or hide the linkedin icon that shows on the footer section.", 'oblivion'),
                        "id" => "linkedin",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("Linkedin link", 'oblivion'),
                        "desc" => __("Paste your linkedin link here.", 'oblivion'),
                        "id" => "linkedin_link",
                        "std" => "#",
                        "type" => "text");
    $options[] = array( "name" => __("Enable RSS", 'oblivion'),
                        "desc" => __("Show or hide the RSS icon that shows on the footer section.", 'oblivion'),
                        "id" => "rss",
                        "std" => "0",
                        "type" => "jqueryselect");
    $options[] = array( "name" => __("RSS Link", 'oblivion'),
                        "desc" => __("Paste your RSS link here.", 'oblivion'),
                        "id" => "rss_link",
                        "std" => "#",
                        "type" => "text");

		$options[] = array( "name" => __("One click install", 'oblivion'),
                        "type" => "heading");

	$options[] = array( "name" => __("demo install", 'oblivion'),
                        "desc" => __("Click to install pre-inserted demo contents.", 'oblivion'),
                        "id" => "demo_install",
                        "std" => "0",
                        "type" => "impbutton");

    return $options;
}
?>