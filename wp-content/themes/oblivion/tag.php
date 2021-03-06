<?php get_header();?>
<!-- Page content
    ================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->
<div class="<?php if ( of_get_option('fullwidth') ) {  }else{ ?>container<?php } ?> blog">
   	<?php if ( of_get_option('fullwidth') ) { ?> <div class="container"> <?php } ?>
  <div class="row">
    <div class="span8">
        <?php $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
        $tag = get_query_var('tag' );
        $showposts = get_option( 'posts_per_page' );
        $new_query = new WP_Query();
        $new_query->query( 'tag='.$tag.'&posts_per_page='.get_option('posts_per_page').'&paged=' . $paged);
        ?>

        <?php if (  $new_query->have_posts() ) : while (  $new_query->have_posts() ) :  $new_query->the_post(); ?>
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
        </div>
         <div class="blog-content">
                    <h2><a href="<?php the_permalink(); ?>"> <?php the_title(); ?> </a></h2>
                    <?php the_excerpt(); ?>
         </div>
         <div class="blog-info">
                    <div class="post-pinfo">
                        <span class="icon-user"></span> <a data-original-title="<?php _e("View all posts by ", 'oblivion'); ?><?php echo get_the_author(); ?>" data-toggle="tooltip" href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>"><?php echo get_the_author(); ?></a> &nbsp;
                        <span class="icon-comment"></span>
                        <?php if ( is_plugin_active( 'disqus-comment-system/disqus.php' )){ ?>
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
         </div>
        </div>
        <!-- /.blog-post -->
        <div class="block-divider"></div>
        <?php endwhile; endif; ?>
        <div class="pagination">
            <ul>
              <li>
                <?php
            $tag = get_query_var('tag' );
            $additional_loop = new WP_Query( 'tag='.$tag.'&posts_per_page='.get_option('posts_per_page').'&paged=' . $paged);
            $page=$additional_loop->max_num_pages;
            echo kriesi_pagination($additional_loop->max_num_pages);
            ?>
            <?php wp_reset_query(); ?>
              </li>
            </ul>
         </div>
        <div class="clear"></div>
    </div>
    <!-- /.span8 -->
     <div class="span4 sidebar">
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Footer widgets') ) : ?>
                <?php dynamic_sidebar('three'); ?>
           <?php endif; ?>
    </div>
    <!-- /.span4 -->
  </div>
  <!-- /.row -->
  	<?php if ( of_get_option('fullwidth') ) { ?> </div> <?php } ?> <!-- /container -->
</div>
<!-- /.container -->
<?php get_footer(); ?>