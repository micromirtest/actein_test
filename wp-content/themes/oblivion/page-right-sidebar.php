<?php 
/*Template Name: Page with sidebar on right*/
get_header(); ?>
<?php if (class_exists('MultiPostThumbnails')) : $custombck = MultiPostThumbnails::get_post_thumbnail_url(get_post_type(), 'header-image', $post->ID, 'full'); endif; ?>
<?php if(empty($custombck)){}else{ ?>
<style>
    body.page{
    background-image:url(<?php echo $custombck; ?>) !important;
    background-position:center top !important;
    background-repeat:  no-repeat !important;
}
</style>
<?php } ?>

<?php if ( is_plugin_active( 'buddypress/bp-loader.php' ) && !bp_is_blog_page() ){ ?>
<div class="page normal-page <?php if ( of_get_option('fullwidth') ) {  }else{ echo "container"; } ?>">
      <?php if ( of_get_option('fullwidth') ) { ?><div class="container"><?php } ?>
        <div class="row">
            <div class="span12">
                <?php while ( have_posts() ) : the_post(); ?>
                <?php  the_content(); ?>
                <?php endwhile; // end of the loop. ?>
            <div class="clear"></div>
            </div><!-- /.span12 -->


        </div>
     <?php if ( of_get_option('fullwidth') ) { ?></div><?php } ?>
</div>

<?php }else{ ?>
<div class="page normal-page <?php if ( of_get_option('fullwidth') ) {  }else{ echo "container"; } ?>">
      <?php if ( of_get_option('fullwidth') ) { ?><div class="container"><?php } ?>
        <div class="row">
            <?php if(is_active_sidebar('three')){?>
            <div class="span8">
                <?php while ( have_posts() ) : the_post(); ?>
                <?php  the_content(); ?>
                <?php endwhile; // end of the loop. ?>
            <div class="clear"></div>
            </div>
             <div class="span4 ">
            <?php if ( function_exists('dynamic_sidebar') && is_active_sidebar('pages-sidebar')) : ?>
               <?php dynamic_sidebar('pages-sidebar'); ?>
           <?php endif; ?>
             </div><!-- /.span4 -->
         <?php }else{ ?>
                 <div class="span12">
                <?php while ( have_posts() ) : the_post(); ?>
                <?php  the_content(); ?>
                <?php endwhile; // end of the loop. ?>
            <div class="clear"></div>
            </div>
         <?php } ?>
        </div>
     <?php if ( of_get_option('fullwidth') ) { ?></div><?php } ?>
</div>
<?php } ?>
<?php get_footer(); ?>