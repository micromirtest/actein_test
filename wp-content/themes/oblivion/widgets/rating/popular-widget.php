<?php
/**
 * Widget Name: Popular Posts with a Thumbnail
 * Description: A Popular Posts widget that displays a thumbnail from your blog.
 * Version: 1.0
 */

class PopularWidget extends WP_Widget {

    function PopularWidget() {
        parent::WP_Widget(false, $name = 'Popular Posts');
    }

    function widget($args, $instance) {
        extract( $args );
        $title = apply_filters('widget_title', $instance['title']);
        $nopost=$instance['nopost'];


        switch ( $instance['param'] ) {

            // Order by most recent replies
            case 'comments' :
                $pc = new WP_Query('orderby=comment_count&cat='.$instance['cat'].'&posts_per_page='.$nopost);
                break;

            // Order by total number of replies
            case 'ratings' :
                 $args = array(
                        'cat' => $instance['cat'],
                        'posts_per_page' => $nopost,
                        'meta_key' => 'overall_rating',
                        'orderby' => 'meta_value',
                        'order' => "DESC",
                    );

                 $pc = new WP_Query($args);
                break;


        }
        ?>

	<?php echo $before_widget; ?>

    <h3> <?php echo  $instance['title'] ; ?></h3>
    <ul class="review">

<?php
if( !empty( $pc ) ) :
if ( $pc->have_posts() ) : ?>
<?php while ($pc->have_posts()) : $pc->the_post(); ?>


      <li>		<div class="img">
		  		 <a rel="bookmark" href="<?php the_permalink(); ?>">
					<?php if(has_post_thumbnail()){

							$thumb = get_post_thumbnail_id();
							$img_url = wp_get_attachment_url( $thumb,'full'); //get img URL
							$image = aq_resize( $img_url, 57, 57, true, '', true ); //resize & crop img
							?>
							<img src="<?php echo $image[0]; ?>" />

					<?php } else{ ?>
						<img src="<?php echo get_template_directory_uri().'/img/defaults/57x57.jpg'?> "/>
					<?php } ?>
					<span class="overlay-link"></span>
				</a>
				</div>
        <div class="info"> <a href="<?php the_permalink(); ?>">
          <?php the_title(); ?>
          </a><br/>
          <small>
          <i class="icon-calendar"></i> <?php the_time('F j, Y'); ?> - <i class="icon-comment"></i> <?php echo comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion')); ?></small><br/>
		<?php
		// overall stars
		$postid=$pc->post->ID;
		$overall_rating_1 = get_post_meta($postid, 'overall_rating', true);

		if($overall_rating_1!="0" && $overall_rating_1=="0.5"){ ?>
		<div class="overall-score"><div class="rating r-05"></div></div>
		<?php } ?>

		<?php $overall_rating_2 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_2!="0" && $overall_rating_2=="1"){ ?>
		<div class="overall-score"><div class="rating r-1"></div></div>
		<?php } ?>

		<?php $overall_rating_3 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_3!="0" && $overall_rating_3=="1.5"){ ?>
		<div class="overall-score"><div class="rating r-15"></div></div>
		<?php } ?>

		<?php $overall_rating_4 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_4!="0" && $overall_rating_4=="2"){ ?>
		<div class="overall-score"><div class="rating r-2"></div></div>
		<?php } ?>

		<?php $overall_rating_5 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_5!="0" && $overall_rating_5=="2.5"){ ?>
		<div class="overall-score"><div class="rating r-25"></div></div>
		<?php } ?>

		<?php $overall_rating_6 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_6!="0" && $overall_rating_6=="3"){ ?>
		<div class="overall-score"><div class="rating r-3"></div></div>
		<?php } ?>

		<?php $overall_rating_7 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_7!="0" && $overall_rating_7=="3.5"){ ?>
		<div class="overall-score"><div class="rating r-35"></div></div>
		<?php } ?>

		<?php $overall_rating_8 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_8!="0" && $overall_rating_8=="4"){ ?>
		<div class="overall-score"><div class="rating r-4"></div></div>
		<?php } ?>

		<?php $overall_rating_9 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_9!="0" && $overall_rating_9=="4.5"){ ?>
		<div class="overall-score"><div class="rating r-45"></div></div>
		<?php } ?>

		<?php $overall_rating_10 = get_post_meta($postid, 'overall_rating', true);
		if($overall_rating_10!="0" && $overall_rating_10=="5"){ ?>
		<div class="overall-score"><div class="rating r-5"></div></div>

		<?php } ?>

		</div>
		<div class="clear"></div>
      </li>
      <?php endwhile;  ?>
      <?php else : ?>
      <div><?php _e("NO Popular Post", 'oblivion'); ?></div>
      <?php endif; ?> <?php endif; ?>

    </ul>


              <?php echo $after_widget; ?>
        <?php
    }

/** @see WP_Widget::update */
    function update($new_instance, $old_instance) {
	$instance = $old_instance;

	$instance['title'] = strip_tags($new_instance['title']);
	$instance['cat'] = strip_tags($_POST['cat']);
	$instance['nopost'] = strip_tags($new_instance['nopost']);
    $instance['param'] = strip_tags($new_instance['param']);


        return $instance;
    }

/** @see WP_Widget::form */
    function form($instance) {
        $title = esc_attr($instance['title']);
        $category = esc_attr($instance['cat']);
        $nopost = esc_attr($instance['nopost']);
        $param = esc_attr($instance['param']);
        ?>
         <p>
          <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'oblivion'); ?></label>
          <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
         <p>
          <label for="<?php echo $this->get_field_id('cat'); ?>"><?php _e('Category:', 'oblivion'); ?></label>
         <?php $args = array(
                'show_option_all'    => __('All', 'oblivion'),
                'selected'           => $category
               );
         wp_dropdown_categories($args); ?>
        </p>
        <p>
          <label for="<?php echo $this->get_field_id('param'); ?>"><?php _e('By:', 'oblivion'); ?></label>
          <select name="<?php echo $this->get_field_name( 'param' ); ?>" id="<?php echo $this->get_field_name( 'param' ); ?>" class="postform">
              <option <?php selected( $instance['param'], 'comments' );   ?> value="comments"><?php _e('Comments', 'oblivion') ?></option>
              <option <?php selected( $instance['param'], 'ratings' );   ?> value="ratings"><?php _e('Ratings', 'oblivion') ?></option>
          </select>
        </p>
         <p>
          <label for="<?php echo $this->get_field_id('nopost'); ?>"><?php _e('No. of Posts:', 'oblivion'); ?></label>
          <input class="widefat" id="<?php echo $this->get_field_id('nopost'); ?>" name="<?php echo $this->get_field_name('nopost'); ?>" type="text" value="<?php echo $nopost; ?>" />
        </p>
        <?php
    }

}

// register widget
add_action('widgets_init', create_function('', 'return register_widget("PopularWidget");'));
?>