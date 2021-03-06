<?php
/*
* Single Post Template: Full width
*/
?>
<?php get_header(); ?>

<?php if(get_post_type(get_the_ID()) == 'portfolio'){ ?>
<?php if (class_exists('MultiPostThumbnails')) : $custombck = MultiPostThumbnails::get_post_thumbnail_url(get_post_type(), 'header-image-portfolio', $post->ID, 'full'); endif; ?>
<?php if(empty($custombck)){}else{ ?>
<style>
    body.single-portfolio{
    background:url(<?php echo $custombck; ?>) no-repeat center top !important;
}
</style>
<?php } ?>
   <div class="<?php if ( of_get_option('fullwidth') ) {  }else{ ?>container<?php } ?> portfolio">
    <?php if ( of_get_option('fullwidth') ) { ?> <div class="container"> <?php } ?>
        <div class="row">

        <div class="span12">
           <div class="plove wcontainer"><a href="#"><?php if( function_exists('heart_love') ) heart_love(); ?></a></div>
            <div id="myCarousel">
            <?php if (strpos($post->post_content,'[gallery') === false){$gallery = 0;}else{$gallery = 1;}?>
            <?php if(get_post_meta($post->ID, '_smartmeta_my-awesome-field3', true) == ""){ ?>
            <?php if($gallery == 1){ ?>
             <?php  $pattern = get_shortcode_regex();
                    preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                    if (is_array($matches) && $matches[2] == 'gallery') {
                   $shortcode = $matches[0];
                   echo do_shortcode($shortcode);
                } ?>
            <?php }elseif(!has_post_thumbnail()){ ?>
                 <img src="<?php echo get_template_directory_uri().'/img/defaults/default-image-portfolio.jpg'?>" />
            <?php }else{?>
                  <?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>  <img src="<?php echo $url; ?>" alt="Alt text">
            <?php } ?>
               <?php }else{echo get_post_meta($post->ID, '_smartmeta_my-awesome-field3', true);} ?>
            </div>
            <div class="pview">
                <?php $buttoncheck = get_post_meta($post->ID, '_smartmeta_my-awesome-field5');  ?>
                <?php if($buttoncheck[0] == 'true'){ ?>
                 <a  target="_blank" href="<?php echo get_post_meta($post->ID, '_smartmeta_my-awesome-field2', true); ?>" class="button-medium"><?php echo get_post_meta($post->ID, '_smartmeta_my-awesome-field4', true); ?></a>
                <?php } ?>
                <div class="social-share wcontainer">
                    <!-- AddThis Button BEGIN -->
                    <div class="addthis_toolbox addthis_default_style ">
                    <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>
                    <a class="addthis_button_tweet" style="width: 95px;"></a>
                    <a class="addthis_button_pinterest_pinit" style="margin-right: 15px;"></a>
                    <a class="addthis_counter addthis_pill_style"></a>
                    </div>
                    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-516c338937a718ff"></script>
                    <!-- AddThis Button END -->
                </div>
                <div class="clear"></div>
            </div>
        </div><!-- /span12 -->

      </div><!-- /row -->
              <?php
        if(have_posts()): while(have_posts()): the_post();
          echo apply_filters('the_content',get_the_content());
         endwhile; endif; ?>
    <?php if ( of_get_option('fullwidth') ) { ?> </div> <?php } ?> <!-- /container -->
    </div> <!-- /container -->


      <?php }else{ ?>
<?php if (class_exists('MultiPostThumbnails')) : $custombck = MultiPostThumbnails::get_post_thumbnail_url(get_post_type(), 'header-image-post', $post->ID, 'full'); endif; ?>
<?php if(empty($custombck)){}else{ ?>
<style>
    body.single-post{
    background:url(<?php echo $custombck; ?>) no-repeat center top !important;
}
</style>
<?php } ?>
          <!-- Page content
    ================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->
<div class="<?php if ( of_get_option('fullwidth') ) {  }else{ ?>container<?php } ?> blog blog-ind">
    <?php if ( of_get_option('fullwidth') ) { ?> <div class="container"> <?php } ?>
  <div class="row">

    <div class="span12">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <div class="blog-post">

        <div class="blog-image">
             <?php
                $key_1_value = get_post_meta($post->ID, '_smartmeta_my-awesome-field77', true);
                if($key_1_value != '') {
                echo $key_1_value;
                }elseif ( has_post_thumbnail() ) { ?>
                  <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( array(817,320));  ?></a>
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
    </div> <!-- /.span12 -->


    <?php if ( of_get_option('fullwidth') ) { ?> </div> <?php } ?> <!-- /container -->
  </div>

         <?php } ?>

<?php get_footer(); ?>