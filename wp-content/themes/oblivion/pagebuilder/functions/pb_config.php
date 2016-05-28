<?php
/**
 * Page Builder Config
 *
 * This file handles various configurations
 * of the page builder page
 *
 */
function page_builder_config() {
	$config = array(); //initialise array
	/* Page Config */
	$config['menu_title'] = __('Page Builder', 'oblivion');
	$config['page_title'] = __('Page Builder', 'oblivion');
	$config['page_slug'] = 'page_builder';
	/* This holds the contextual help text - the more info, the better.
	 * HTML is of course allowed in all of its glory! */
	$config['contextual_help'] =
		'<p>' . __('The page builder allows you to create custom page templates which you can later use for your pages.', 'oblivion') . '<p>' .
		'<p>' . __('To use the page builder, start by adding a new template. You can drag and drop the blocks on the left into the building area on the right of the screen. Each block has its own unique configuration which you can manually configure to suit your needs', 'oblivion') . '<p>' .
		'<p>' . __('Please refer to the', 'oblivion') . '<a href="" target="_blank" alt="Page Builder Documentation">'. __(' documentation page ', 'oblivion') . '</a>'. __('for more information on how to use this feature.', 'oblivion') . '<p>';
	/* Debugging */
	$config['debug'] = false;
	return $config;
}