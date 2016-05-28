<?php
/** A simple text block **/
class News_Blog_Style_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('News block - Blog Style', 'oblivion'),
            'size' => 'span3',
        );
        //create the block
        parent::__construct('News_Blog_Style_Block', $block_options);
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
	    <?php

		if($projnumber == ''){$projnumber = 3;}

		if($title) echo '<h3 class="widget-title">'.$title.'</h3>';?>


            <?php

            if (is_array($newscats)) {
                $myArray = $newscats;
                foreach ($myArray as &$value)$value;
                $value = implode(',',  $myArray);;
            } else {
                $value="";
            }

            $new_query = new WP_Query();
            $new_query->query( 'showposts='.$projnumber.'&cat='.$value);
       ?>
        <?php if ( $new_query->have_posts() ) : while ( $new_query->have_posts() ) : $new_query->the_post(); ?>
    <div class="blog-post">


        <div class="blog-image">
             <?php
                $key_1_value = get_post_meta(get_the_ID(), 'video', true);
                if($key_1_value != '') {
                echo $key_1_value;
                }elseif ( has_post_thumbnail() ) { ?>
                  <a href="<?php the_permalink(); ?>">
                   <?php
                   $thumb = get_post_thumbnail_id();
                   $img_url = wp_get_attachment_url( $thumb,'full'); //get img URL
                   $image = aq_resize( $img_url, 817, 320, true, '', true ); //resize & crop img
                   ?><img src="<?php echo $image[0]; ?>" />
                   </a>
             <?php } ?>
             <?php if ( has_post_thumbnail() or  $key_1_value != '') { ?>
             <div class="blog-date">
             <?php }else{?>
             <div class="blog-date-noimg">
             <?php } ?>
                <span class="date"><?php the_time('M'); ?><br /><?php the_time('d'); ?></span>
                <div class="plove"><?php if( function_exists('heart_love') ) heart_love(); ?></div>
             </div>

                    <div class="blog-rating">
                    <?php
                    // overall stars
                    $overall_rating_1 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_1!="0" && $overall_rating_1=="0.5"){ ?>
                    <div class="overall-score"><div class="rating r-05"></div></div>
                    <?php } ?>

                    <?php $overall_rating_2 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_2!="0" && $overall_rating_2=="1"){ ?>
                    <div class="overall-score"><div class="rating r-1"></div></div>
                    <?php } ?>

                    <?php $overall_rating_3 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_3!="0" && $overall_rating_3=="1.5"){ ?>
                    <div class="overall-score"><div class="rating r-15"></div></div>
                    <?php } ?>

                    <?php $overall_rating_4 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_4!="0" && $overall_rating_4=="2"){ ?>
                    <div class="overall-score"><div class="rating r-2"></div></div>
                    <?php } ?>

                    <?php $overall_rating_5 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_5!="0" && $overall_rating_5=="2.5"){ ?>
                    <div class="overall-score"><div class="rating r-25"></div></div>
                    <?php } ?>

                    <?php $overall_rating_6 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_6!="0" && $overall_rating_6=="3"){ ?>
                    <div class="overall-score"><div class="rating r-3"></div></div>
                    <?php } ?>

                    <?php $overall_rating_7 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_7!="0" && $overall_rating_7=="3.5"){ ?>
                    <div class="overall-score"><div class="rating r-35"></div></div>
                    <?php } ?>

                    <?php $overall_rating_8 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_8!="0" && $overall_rating_8=="4"){ ?>
                    <div class="overall-score"><div class="rating r-4"></div></div>
                    <?php } ?>

                    <?php $overall_rating_9 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_9!="0" && $overall_rating_9=="4.5"){ ?>
                    <div class="overall-score"><div class="rating r-45"></div></div>
                    <?php } ?>

                    <?php $overall_rating_10 = get_post_meta(get_the_ID(), 'overall_rating', true);
                    if($overall_rating_10!="0" && $overall_rating_10=="5"){ ?>
                    <div class="overall-score"><div class="rating r-5"></div></div>

                    <?php } ?>
                     </div><!-- blog-rating -->

        </div><!-- blog-image -->

          <div class="blog-content">
                    <h2><a href="<?php the_permalink(); ?>"> <?php the_title(); ?> </a></h2>
                    <?php the_excerpt(); ?>
          </div><!-- blog-content -->



         <div class="blog-info">


                 <div class="post-pinfo">
                        <span class="icon-user"></span> <a data-original-title="<?php _e("View all posts by ", 'oblivion'); ?><?php echo get_the_author(); ?>" data-toggle="tooltip" href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>"><?php echo get_the_author(); ?></a> &nbsp;
                        <span class="icon-comment"></span> <?php if ( is_plugin_active( 'disqus-comment-system/disqus.php' )){ ?>
                        <a  href="<?php echo the_permalink(); ?>#comments" >
                        <?php comments_number( __('No comments','oblivion'), __('One comment','oblivion'), __('% comments','oblivion')); ?></a> &nbsp;
                       <?php }else{ ?>
                        <a data-original-title="<?php comments_number( __('No comments in this post','oblivion'), __('One comment in this post','oblivion'), __('% comments in this post','oblivion')); ?>" href="<?php echo the_permalink(); ?>#comments" data-toggle="tooltip">
                        <?php comments_number( __('No comments','oblivion'), __('One comment','oblivion'), __('% comments','oblivion')); ?></a> &nbsp;

                       <?php } ?>
                        <?php $posttags = get_the_tags();if ($posttags) {?>  <span class="icon-tags"></span>  <?php  $tag_count = 0; foreach($posttags as $tag) { if ( $tag_count !== 0 ) echo ', '; $tag_count++; ?><a href="<?php echo get_tag_link($tag->term_id); ?>"> <?php echo $tag->name; ?></a><?php }}?>
                 </div>

                    <a href="<?php the_permalink(); ?>" class="button-small"><?php _e("Read more", 'oblivion'); ?></a>

                    <div class="clear"></div>

         </div><!-- blog-info -->

        </div><!-- /.blog-post -->
        <div class="block-divider"></div>
        <?php endwhile; endif; ?>
        <div class="clear"></div>

<?php    }
}
?>