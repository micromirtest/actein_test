<?php
/*
Name: heartLove
Description: Adds a "Love It" link to posts
Author: Phil Martinez | Themeheart
Author URI: http://themeheart.com
*/
class heartLove {
	 function __construct()   {
        add_action('wp_enqueue_scripts', array(&$this, 'enqueue_scripts'));
        add_action('wp_ajax_heart-love', array(&$this, 'ajax'));
		add_action('wp_ajax_nopriv_heart-love', array(&$this, 'ajax'));
	}
	function enqueue_scripts() {
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'heart-love', get_template_directory_uri() . '/heart/love/js/heart-love.js', 'jquery', '1.0', TRUE );
		wp_localize_script( 'heart-love', 'heartLove', array(
			'ajaxurl' => admin_url('admin-ajax.php')
		));
	}
	function ajax($post_id) {
		//update
		if( isset($_POST['loves_id']) ) {
			$post_id = str_replace('heart-love-', '', $_POST['loves_id']);
			echo $this->love_post($post_id, 'update');
		}
		//get
		else {
			$post_id = str_replace('heart-love-', '', $_POST['loves_id']);
			echo $this->love_post($post_id, 'get');
		}
		exit;
	}
	function love_post($post_id, $action = 'get')
	{
		if(!is_numeric($post_id)) return;
		switch($action) {
			case 'get':
				$love_count = get_post_meta($post_id, '_heart_love', true);
				if( !$love_count ){
					$love_count = 0;
					add_post_meta($post_id, '_heart_love', $love_count, true);
				}
				return '<span class="heart-love-count"><span class="icon-heart"></span>'. $love_count .'</span>';
				break;
			case 'update':
				$love_count = get_post_meta($post_id, '_heart_love', true);
				if( isset($_COOKIE['heart_love_'. $post_id]) ) return $love_count;
				$love_count++;
				update_post_meta($post_id, '_heart_love', $love_count);
				setcookie('heart_love_'. $post_id, $post_id, time()*20, '/');
				return '<span class="heart-love-count"><span class="icon-heart"></span>'. $love_count .'</span>';
				break;
		}
	}
	function add_love() {
		global $post;
		$output = $this->love_post($post->ID);
  		$class = 'heart-love';
  		$title = __('Love this', "oblivion");
		if( isset($_COOKIE['heart_love_'. $post->ID]) ){
			$class = 'heart-love loved';
			$title = __('You already love this!', "oblivion");
		}
		return '<a href="#" class="'. $class .'" id="heart-love-'. $post->ID .'" title="'. $title .'">'. $output .'</a>';
	}
}
global $heart_love;
$heart_love = new heartLove();
// get the ball rollin'
function heart_love() {
	global $heart_love;
	echo $heart_love->add_love();
}
?>