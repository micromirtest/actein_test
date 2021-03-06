<?php
/*
* Template name: Woocommerce
*/
?>
<?php get_header();

?>
<?php if (class_exists('MultiPostThumbnails')) : $custombck = MultiPostThumbnails::get_post_thumbnail_url('page', 'header-image', woocommerce_get_page_id ('shop'), 'full'); endif; ?>
<?php if(empty($custombck)){}else{ ?>
<style>
    body.woocommerce{
    background-image:url(<?php echo $custombck; ?>) !important;
    background-position:center top !important;
    background-repeat:  no-repeat !important;
}
</style>
<?php } ?>
<?php
if (!function_exists('loop_columns')) {
    function loop_columns() {
        return 3; // 3 products per row
    }
}
?>
<div class="page normal-page container-wrap <?php if ( of_get_option('fullwidth') ) {  }else{ echo "container boxed"; } ?>">
      <?php if ( of_get_option('fullwidth') ) { ?><div class="container"><?php } ?>
		<div class="row">

		    <?php
            if ( of_get_option('mainshop') ) {

             $main_shop_layout = of_get_option('mainshop');

            }else{

               $main_shop_layout = 's1';
            }


            if ( of_get_option('singleprod') ) {

            $single_product_layout = of_get_option('singleprod');

            }else{

               $single_product_layout = 's1';
            }

            if(is_product()){

                if($single_product_layout == 's2' || $single_product_layout == 's3'){
                    add_filter('loop_shop_columns', 'loop_columns');
                }

                switch($single_product_layout) {
                    case 's1': ?>
                      <div class="span12">
                        <?php woocommerce_content(); ?>
                      <div class="clear"></div>
                    <?php  break;
                    case 's3':

                        echo '<div class="span8">';
                            woocommerce_content();
                        echo '</div><!--/span8-->';

                        echo '<div id="sidebar" class="span4">';
                            get_sidebar();
                        echo '</div><!--/span8-->';

                        break;

                    case 's2':
                        echo '<div class="span4">';
                            get_sidebar();
                        echo '</div><!--/span8-->';

                        echo '<div class="span8">';
                            woocommerce_content();
                        echo '</div><!--/span8-->';

                        break;
                    default:
                        woocommerce_content();
                        break;
                }

            }

            //Main Shop page layout
            elseif(is_shop() || is_product_category() || is_product_tag()) {

                if($main_shop_layout == 's3' || $main_shop_layout == 's2'){
                    add_filter('loop_shop_columns', 'loop_columns');
                }

                switch($main_shop_layout) {
                    case 's1': ?>
                    <div class="span12">
                        <?php woocommerce_content(); ?>
                    <div class="clear"></div>
                    <?php    break;
                    case 's3':

                        echo '<div class="span8">';
                            woocommerce_content();
                        echo '</div><!--/span8-->';

                        echo '<div id="sidebar" class="span4">';
                            get_sidebar();
                        echo '</div><!--/span8-->';

                        break;

                    case 's2':
                        echo '<div id="sidebar" class="span4">';
                            get_sidebar();
                        echo '</div><!--/span8-->';

                        echo '<div class="span8">';
                            woocommerce_content();
                        echo '</div><!--/span8-->';
                        break;
                    default:
                        woocommerce_content();
                        break;
                }

            }

            //regular WooCommerce page layout
            else { ?>
            <div class="span12">
                <?php woocommerce_content(); ?>
            <div class="clear"></div>
          <?php  }

             ?>

			</div>


		</div>
	 <?php if ( of_get_option('fullwidth') ) { ?></div><?php } ?>
</div>

<?php get_footer(); ?>