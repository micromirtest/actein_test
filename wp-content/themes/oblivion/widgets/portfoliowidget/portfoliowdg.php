<?php
/*
Plugin Name: Portoflio Widget
Plugin URI: http://www.skywarriorthemes.com/
Description: Display portfolio items
Author: Vojimir Vukojevic
Version: 0.1
Author URI: http://www.skywarriorthemes.com/
*/
class PortfolioItemsWidget extends WP_Widget
{
  function PortfolioItemsWidget()
  {
    $widget_ops = array('classname' => 'PortfolioItemsWidget', 'description' => 'Displays portfolio items with thumbnail' );
    $this->WP_Widget('PortfolioItemsWidget', 'Portfolio Items and Thumbnail', $widget_ops);
  }
  function form($instance)
  {
    $instance = wp_parse_args( (array) $instance, array( 'title' => '', 'itemsnumber' => '', 'category' => '' ) );
    $title = $instance['title'];
    $itemsnumber = $instance['itemsnumber'];
    $category = $instance['category'];
?>
  <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e("Title:", 'oblivion'); ?> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></label></p>
  <p><label for="<?php echo $this->get_field_id('itemsnumber'); ?>"><?php _e("Number of portfolio items to display:", 'oblivion'); ?> <input class="widefat" id="<?php echo $this->get_field_id('itemsnumber'); ?>" name="<?php echo $this->get_field_name('itemsnumber'); ?>" type="text" value="<?php echo esc_attr($itemsnumber); ?>" /></label></p>
  <p><label for="<?php echo $this->get_field_id('category'); ?>"> <?php _e("Enter portfolio categories you want to exclude(comma separated) - Leave blank to show all. Ex: 47,32:", 'oblivion'); ?> <input class="widefat" id="<?php echo $this->get_field_id('category'); ?>" name="<?php echo $this->get_field_name('category'); ?>" type="text" value="<?php echo esc_attr($category); ?>" /></label></p>
<?php
  }
  function update($new_instance, $old_instance)
  {
    $instance = $old_instance;
    $instance['title'] = $new_instance['title'];
    $instance['itemsnumber'] = $new_instance['itemsnumber'];
    $instance['category'] = $new_instance['category'];
    return $instance;
  }
  function widget($args, $instance)
  {
    extract($args, EXTR_SKIP);
    echo $before_widget;
    $title = empty($instance['title']) ? ' ' : apply_filters('widget_title', $instance['title']);
    if (!empty($title))
      echo $before_title . $title . $after_title;;
    // WIDGET CODE GOES HERE
    echo '<div class="wcontent wprojects">';
               if($instance['itemsnumber'] == ''){$instance['itemsnumber'] = -1;};
               $myArray = explode(',',  $instance['category']);
               $args = array( 'taxonomy' => 'portfolio',    'exclude'  => $myArray,  'hide_empty'    => true  );
               $terms = get_terms('portfolio-category', $args);
               foreach ($terms as $term) {
					$termsarray[]= $term->term_id;
				}
                $post_ids = get_objects_in_term( $termsarray, 'portfolio-category' ) ;
				query_posts(array( 'post_type' => 'portfolio' , 'posts_per_page' => $instance['itemsnumber'], 'post__in' => $post_ids ));
                 if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                 <a href="<?php the_permalink() ?>" data-toggle="tooltip" data-original-title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail(); ?></a>
                 <?php endwhile;endif;
                 wp_reset_query();
    echo '</div>';
    echo $after_widget;
  }
}
add_action( 'widgets_init', create_function('', 'return register_widget("PortfolioItemsWidget");') );?>