<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 */

?>

<?php get_header();?>

<!-- Page content
    ================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->
<div class="<?php if ( of_get_option('fullwidth') ) {  }else{ ?>container<?php } ?> blog blog-ind">
   	<?php if ( of_get_option('fullwidth') ) { ?> <div class="container"> <?php } ?>
  <div class="row">

    <div class="span8">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <div class="blog-post">

        <div class="blog-image">
             <?php
                $key_1_value = get_post_meta($post->ID, '_smartmeta_my-awesome-field77', true);
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

          <div class="<?php if ( has_post_thumbnail() or  $key_1_value != '') {  }else{?> blog-content blog-content-no-img <?php } ?>">
                    <h2><?php the_title(); ?></h2>
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
                 <div class="clear"></div>
            </div> <!-- /.blog-info -->

              <!-- post ratings -->
            <?php
                $overall_rating = get_post_meta($post->ID, 'overall_rating', true);
                $rating_one = get_post_meta($post->ID, 'creteria_1', true);
                $rating_two = get_post_meta($post->ID, 'creteria_2', true);
                $rating_three = get_post_meta($post->ID, 'creteria_3', true);
                $rating_four = get_post_meta($post->ID, 'creteria_4', true);
                $rating_five = get_post_meta($post->ID, 'creteria_5', true);

                if($overall_rating== NULL or $rating_one== NULL && $rating_two== NULL && $rating_three== NULL && $rating_four== NULL && $rating_five== NULL ){}else{

                    ?>

          <?php include('post-rating.php') ?>

          <?php } ?>
            <!-- /post ratings -->

            <div class="blog-content">
                <?php the_content(); ?>
            </div> <!-- /.blog-content -->


            <div class="clear"></div>
        </div><!-- /.blog-post -->
        <?php endwhile; endif; ?>
        <div class="clear"></div>

    <?php if(of_get_option('authorsingle')){ ?>
    <div class="block-divider"></div>
    <div class="author-block wcontainer">
                <?php echo get_avatar( get_the_author_meta('ID'), 250 ); ?>
                <div class="author-content">
                    <h3><?php _e("About ", 'oblivion'); ?> <?php echo get_the_author(); ?></h3>
                   <?php the_author_meta('description'); ?>
                </div>
                <div class="clear"></div>
    </div><!-- /author-block -->
    <?php } ?>
	<?php wp_link_pages(); ?>
    <div id="comments"  class="block-divider"></div>
    <?php if(comments_open()){?>
         <?php comments_template('/short-comments-blog.php'); ?>
    <?php } ?>
    </div> <!-- /.span8 -->

    <div class="span4 ">
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Blog sidebar') ) : ?>
                <?php dynamic_sidebar('three'); ?>
           <?php endif; ?>
    </div><!-- /.span4 -->
	<?php if ( of_get_option('fullwidth') ) { ?> </div> <?php } ?> <!-- /container -->
  </div>

<?php get_footer(); ?>