<?php
if(!defined('PB_PATH')) define( 'PB_PATH', get_template_directory()  );
if(!defined('PB_DIR')) define( 'PB_DIR', get_template_directory()  );
//required functions & classes
require_once(PB_PATH . '/pagebuilder/functions/pb_config.php');
require_once(PB_PATH . '/pagebuilder/functions/pb_blocks.php');
require_once(PB_PATH . '/pagebuilder/classes/class-page-builder.php');
require_once(PB_PATH . '/pagebuilder/classes/class-block.php');
require_once(PB_PATH . '/pagebuilder/functions/pb_functions.php');
//some default blocks
require_once(PB_PATH . '/pagebuilder/blocks/textcolumn-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/page-header-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/highlight-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/team-member-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/column-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/clear-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/widgets-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/alert-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/tabs-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/four-blocks.php');
require_once(PB_PATH . '/pagebuilder/blocks/skills-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/portfolio-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/news-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/newsh-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/news-blog-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/newst-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/carousel-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/parallax-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/shortcode-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/animated-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/contactform-block.php');
require_once(PB_PATH . '/pagebuilder/blocks/social-block.php');
//register default blocks
register_block('Alert_Block');
register_block('Animated_Block');
register_block('Carousel_Block');
register_block('Clear_Block');
register_block('Column_Block');
register_block('Contactform_Block');
register_block('Four_Block');
register_block('Highlight_Block');
register_block('News_Block');
register_block('News_Block_Horizontal');
register_block('News_Block_Tabbed');
register_block('News_Blog_Style_Block');
register_block('Page_Header_Block');
register_block('Parallax_Block');
register_block('Portfolio_Block');
register_block('Shortcode_Block');
register_block('Skills_Block');
register_block('Social_Block');
register_block('Tabs_Block');
register_block('Team_Member_Block');
register_block('Text_Block');
register_block('Widgets_Block');
//fire up page builder
$pb_config = page_builder_config();
$page_builder = new Page_Builder($pb_config);
if(!is_network_admin()) $page_builder->init();
