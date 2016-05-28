<?php
/* Template Name: Book Your Session */
if (isset($_POST['product_id'])) {
    
    global $woocommerce;
    /*empty the cart first!*/
    $woocommerce->cart->empty_cart();
    $woocommerce->cart->add_to_cart($_POST['product_id']);
    header('Location: '.$woocommerce->cart->get_checkout_url());
    die();
}
$user = wp_get_current_user();
if ($user->ID == 0) {
    header('location: ' . get_permalink(1201));
}

get_header();
?>
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
<div class="page normal-page container bigger-padding-top">
    <p class="check-out">Check Out Our Plans!</p>
    <div class="row">
        <div class="span12">
            <div class="row">
                <?php
                $products = get_posts(array(
                    'posts_per_page' => -1,
                    'post_type' => 'product',
                    'orderby'=>'meta_value',
                    'meta_key'=>'actein_date',
                    'order'=>'asc'
                ));
                foreach ($products as $k=>$product):

                    $p = new WC_Product($product->ID);
                    $metas = get_post_meta($product->ID);

                    if (!isset($metas['_subscription_price'])) {
                        continue;
                    }
                    
                    
                    /* var_dump($metas); */
                    ?>
                    <div class="span4">
                        <form action="" method="post">
                            <input type="hidden" name="product_id" value="<?php echo $product->ID ?>" />
                            <div class="one-booking <?php if($k==1):?>different<?php endif ?> text-center">
                                <div class="booking-top"><?php echo $product->post_title ?></div>
                                <div class="booking-price">
                                    <?php
                                    $m = $metas['_subscription_price'][0];
                                    $display = $m;
                                    if ($m > 0) {
                                        $display .= ',- NOK';
                                    }
                                    ?>
                                    <p><?php echo $display ?></p>
                                    <p>Per month</p>

                                </div>
                                <div class="booking-content"><?php echo $product->post_content ?></div>
                                <div class="booking-button"></div>
                                <!--<p><a href="<?php echo get_permalink($product->ID) ?>"><?php echo $product->post_title ?></a></p>-->
                                <div class="booking-signin">
                                    <input type="submit" class="button-submit" value="Sign Up!" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <?php
                endforeach;
                ?>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>

    </div>
    <a href="<?php echo get_permalink(1403) ?>">
        <img src="<?php echo get_stylesheet_directory_uri() ?>/img/ready-for-battle.jpg" class="img-responsive" />
    </a>
</div>



<?php get_footer(); ?>