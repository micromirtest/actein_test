<?php

class WpWallRecentCommentsWidget {
  /**
   * Default values
   */

  var $title = '';
  var $count = '0';
  var $hierarchical = '0';
  var $dropdown = '0';

  // static init callback
  public static function init() {
	// Check for the required plugin functions. This will prevent fatal
	// errors occurring when you deactivate the dynamic-sidebar plugin.
	if ( !function_exists('register_sidebar_widget') )
		return;

	$widget = new WpWallRecentCommentsWidget();

	// This registers our widget so it appears with the other available
	// widgets and can be dragged and dropped into any active sidebars.
	wp_register_sidebar_widget('Wp-Wall Recent Comments','Wp-Wall Recent Comments','Wp-Wall Recent Comments', array($widget,'display'));

	// This registers our optional widget control form.
	wp_register_widget_control('Wp-Wall Recent Comments', array($widget,'control'), 280, 300);
  }




  function control() {

	// Get our options and see if we're handling a form submission.
	$options = get_option('wpwall_widget_recent_comments');

	if ( !is_array($options) )
		$options = array('title'=>'',
			       'count' => $this->count,
			       'hierarchical' => $this->hierarchical,
			       'dropdown' => $this->dropdown );


	if ( !empty($_POST['wpwall-recent-comments-submit']) ) {
		$options['title'] = trim(strip_tags(stripslashes($_POST['wpwall-recent-comments-title'])));
		$options['number'] = (int) $_POST['wpwall-recent-comments-number'];
		if ($options['number'] > 15) $options['number'] = 15; //The limit
		update_option('wpwall_widget_recent_comments', $options);
	}

	$title = esc_attr( $options['title'] );
	$number = (int) $options['number'];


?>
			<p>
				<label for="recent-comments-title">
					<?php _e( 'Title:', 'oblivion' ); ?>
					<input class="widefat" id="recent-comments-title" name="wpwall-recent-comments-title" type="text" value="<?php echo $title; ?>" />
				</label>
			</p>

			<p>
				<label for="recent-comments-number"><?php _e('Number of comments to show:','oblivion'); ?> <input style="width: 25px; text-align: center;" id="recent-comments-number" name="wpwall-recent-comments-number" type="text" value="<?php echo $number; ?>" />
				</label>
				<br />
				<small><?php _e('(at most 15)', 'oblivion'); ?></small>
			</p>

			<input type="hidden" name="wpwall-recent-comments-submit" value="1" />
<?php
  }




  function display($args) {

  	global $wpdb, $comments, $comment;
	extract($args, EXTR_SKIP);
	$options = get_option('wpwall_widget_recent_comments');
	$title = empty($options['title']) ? __('Recent Comments', 'oblivion') : apply_filters('widget_title', $options['title']);
	if ( !$number = (int) $options['number'] )
		$number = 5;
	else if ( $number < 1 )
		$number = 1;
	else if ( $number > 15 )
		$number = 15;

	// get our page id
	$options = WPWall_GetOptions();
	$pageId=$options['pageId'];

	if ( !$comments = wp_cache_get( 'recent_comments', 'widget' ) ) {
		$comments = $wpdb->get_results("SELECT * FROM $wpdb->comments WHERE comment_approved = '1' AND comment_post_ID != '$pageId' ORDER BY comment_date_gmt DESC LIMIT $number");
		wp_cache_add( 'recent_comments', $comments, 'widget' );
	}
?>

		<?php echo $before_widget; ?>
			<?php echo $before_title . $title . $after_title; ?>
			<ul id="recentcomments"><?php
			if ( $comments ) : foreach ( (array) $comments as $comment) :
			echo  '<li class="recentcomments">' . sprintf(__('%1$s on %2$s', 'oblivion'), get_comment_author_link(), '<a href="' . esc_url( get_comment_link($comment->comment_ID) ) . '">' . get_the_title($comment->comment_post_ID) . '</a>') . '</li>';
			endforeach; endif;?></ul>
		<?php echo $after_widget; ?>
<?php
  }




}

add_action('widgets_init', array('WpWallRecentCommentsWidget','init'));

?>