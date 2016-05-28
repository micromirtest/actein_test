<?php
/** A simple text block **/
class News_Block_Horizontal extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('News block - Horizontal', 'oblivion'),
            'size' => 'span3',
        );
        //create the block
        parent::__construct('news_block_horizontal', $block_options);
    }
    function form($instance) {
        $defaults = array(
            'title' => '',
            'newscats' => '',
            'projnumber'=> ''
        );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);

        $args = array(
            'type'                     => 'post',
            'child_of'                 => 0,
            'parent'                   => '',
            'orderby'                  => 'name',
            'order'                    => 'ASC',
            'hide_empty'               => 1,
            'hierarchical'             => 1,
            'exclude'                  => '',
            'include'                  => '',
            'number'                   => '',
            'taxonomy'                 => 'category',
            'pad_counts'               => false

        );

         $categories = get_categories( $args );
         $counter = 0;

        foreach ($categories as $cat) {
            $cats[$cat->cat_ID] = $cat->cat_name;
        }
        ?>
        <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                <?php _e("Title (optional)", 'oblivion'); ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('newscats') ?>">
                <?php _e("Check categories you want to include", 'oblivion'); ?><br />
                <?php echo field_checkboxfromarray('newscats', $block_id, $cats, $instance['newscats']) ?>
            </label>
        </p>
           <p class="description">
            <label for="<?php echo $this->get_field_id('projnumber') ?>">
            <?php _e("Number of posts to show", 'oblivion'); ?>
                <?php echo field_input('projnumber', $block_id, $projnumber, $size = 'full') ?>
            </label>
        </p>

        <?php
    }
    function pbblock($instance) {
        extract($instance);
       ?>
	    <?php if($projnumber == ''){$projnumber = 3;}


		if($title) echo '<h3 class="widget-title">'.$title.'</h3>';?>

            <?php
           if (is_array($newscats)) {
                $myArray = $newscats;
                foreach ($myArray as &$value)$value;
                $value = implode(',',  $myArray);;
            } else {
                $value="";
            }

            $posts = new WP_Query(array(
                'showposts' => $projnumber,
                'cat' => $value
            ));
            ?>
			<div class="wcontainer">
			   <ul class="newsbv">
			   <?php while ( $posts->have_posts() ) : $posts->the_post(); ?>

				<li class="<?php if( $posts->current_post == 0 && !is_paged() ) { ?>newsbv-item-first<?php }else{ echo 'newsbv-item'; }?>">
				<div class="newsb-thumbnail">
				 <a rel="bookmark" href="<?php the_permalink(); ?>">

					<?php if(has_post_thumbnail()){

							$thumb = get_post_thumbnail_id();
							$img_url = wp_get_attachment_url( $thumb,'full'); //get img URL

							if($posts->current_post == 0){
							$image = aq_resize( $img_url, 305, 305, true, '', true ); //resize & crop img

								}else{
							$image = aq_resize( $img_url, 75, 75, true, '', true ); //resize & crop img
								}
							?>
							<img src="<?php echo $image[0]; ?>" />

					<?php } else{
								if($posts->current_post == 0){ ?>
								<img src="<?php echo get_template_directory_uri().'/img/defaults/305x305.jpg'?> "/>
							<?php }else{ ?>
								<img src="<?php echo get_template_directory_uri().'/img/defaults/75x75.jpg'?> "/>
					<?php 	}

						}?>
					<span class="overlay-link"></span>
					<div class="clear"></div>
				</a>
				</div>
				<h4 class="newsb-title"><a rel="bookmark"href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
				<p class="post-meta">
					<i class="icon-calendar"></i> <?php the_time('F j, Y'); ?> - <i class="icon-comment"></i>
					  <?php if ( is_plugin_active( 'disqus-comment-system/disqus.php' )){ ?>
                        <a  href="<?php echo the_permalink(); ?>#comments" >
                        <?php comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion') ); ?></a> &nbsp;
                       <?php }else{ ?>
                        <a data-original-title="<?php comments_number( __('No comments in this post', 'oblivion'), __('One comment in this post', 'oblivion'), __('% comments in this post', 'oblivion')); ?>" href="<?php echo the_permalink(); ?>#comments" data-toggle="tooltip">
                        <?php comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion') ) ?></a> &nbsp;

                       <?php } ?>
				</p>
				<?php	if( $posts->current_post == 0 && !is_paged() ) : ?>
				<?php global $more; $more = 1; the_excerpt(); ?>
				<?php endif; ?>
				<div class="clear"></div>
				</li>


			   <?php endwhile; ?>
				</ul>

				<?php wp_reset_query(); ?>

				<div class="clear"></div>
		</div>
<?php    }
}
?>
