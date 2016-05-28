<?php
/*
 * Template Name: Homepage
 */
?>
<?php get_header(); ?>
<?php
if (class_exists('MultiPostThumbnails')) : $custombck = MultiPostThumbnails::get_post_thumbnail_url(get_post_type(), 'header-image', $post->ID, 'full');
endif;
?>
<?php
if (empty($custombck)) {
    
} else {
    ?>
    <style>
        body.page{
            background-image:url(<?php echo $custombck; ?>) !important;
            background-position:center top !important;
            background-repeat:  no-repeat !important;
        }
    </style>
<?php } ?>
<div id="sliderhome" class="<?php
     if (of_get_option('fullwidth')) {
         
     } else {
         ?>container<?php } ?>">
     <?php
     $pattern = get_shortcode_regex();
     preg_match('/' . $pattern . '/s', $post->post_content, $matches);
     if (is_array($matches) && $matches[2] == 'layerslider') {
         $shortcode = $matches[0];
         echo do_shortcode($shortcode);
     }
     the_post();
     $top_picture = get_field('top_picture');
     $top_picture_url = get_field('top_picture_url');
     
     ?>
</div>
<?php
if ($top_picture) {
    ?>
    <div class="container mobile-remove-it">
        <?php if($top_picture_url):?><a href="<?php echo $bottom_picture_url ?>"><?php endif ?>
        <img src="<?php echo $top_picture['url'] ?>" class="img-responsive" alt="" />
        <?php if($top_picture_url):?></a><?php endif ?>
    </div>
    <?php
}
?>
<div class="container normal-page sliderhome">
    <div class="row">
        <div class="span12">
<?php
add_shortcode('layerslider', '__return_false');
the_content();
?>
            <div class="clear"></div>
        </div>
    </div>
<?php if (of_get_option('fullwidth')) { ?> </div> <?php } ?>
</div> <!-- /container -->
<?php get_footer(); ?>