<?php
/**
 * Single Product Price, including microdata for SEO
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}



global $product;
$user = wp_get_current_user();
if ($user->ID == 0) {
    ?>
    <script>
        window.location = '<?php echo get_permalink(1201) ?>';
    </script>
    <?php
    die();
}

if(isset($_GET['timeslot']))
{
    $d = strtotime($_GET['date']);
    $stock = get_post_meta($product->id,'timeslot_'.$_GET['timeslot'],true);
    
    if($stock<=0)
    {
        ?>
        <script>
            window.location = '<?php echo get_home_url() ?>';
        </script>
    <?php
        die();
    }
}
?>
        <p class="p-type"><?php echo getProductType(get_the_ID()) ?></p>
<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" style="display:none;">

    <p class="price"><?php echo $product->get_price_html(); ?></p>

    <meta itemprop="price" content="<?php echo $product->get_price(); ?>" />
    <meta itemprop="priceCurrency" content="<?php echo get_woocommerce_currency(); ?>" />
    <link itemprop="availability" href="http://schema.org/<?php echo $product->is_in_stock() ? 'InStock' : 'OutOfStock'; ?>" />

</div>
<?php /* var_dump($product) */ 
$interval = get_post_meta($product->id,'actein_duration',true)*60;
?>
<div id="other-info">
    <?php if(isset($_GET['timeslot'])):?>
    <div class="orange"><?php echo date('d-m-Y', $_GET['timeslot']) ?> 
        <?php echo getTimeslotTimeRange(get_the_ID(),$_GET['timeslot']); ?>
    </div>
    <?php endif ?>
    <div class="bottom-line">
<?php
$duration = get_post_meta(get_the_ID(), 'actein_duration', true);
                    $custom_duration = get_post_meta(get_the_ID(), 'duration_' . $_GET['timeslot'], true);
                    if($custom_duration>0)
                    {
                        $duration = $custom_duration;
                    }
?>

        <span class="orange"><?php echo $duration ?></span> Minutes


    </div>
    <?php if(isset($stock)):?>
    <div class="lowest-line text-left">
        <span class="orange"><?php if(isset($stock)){echo $stock;}else{echo $product->get_stock_quantity();} ?></span> Available Slots
    </div>
    <?php endif ?>
    <div class="the-description">
        <?php echo $product->post->post_content ?>
    </div>
    <div class="the-price-here">
        <?php
        $price = get_post_meta($product->id, '_price', true);
        $custom_price = get_post_meta($product->id, 'price_' . $_GET['timeslot'], true);
        if($custom_price>0)
        {
            $price = $custom_price;
        }
        ?>
        <span class="orange"> <?php echo $price?>,- NOK        </span>
    </div>
    <?php if(!isset($_GET['timeslot'])):?>    
    <p>Please select the timeslot</p>
    <?php
    $i = strtotime($_GET['date']);
    $time_from = get_post_meta($product->id,'from_'.$i,true);
    $time_until = get_post_meta($product->id,'until_'.$i,true);
    
    $time_first = strtotime(date('Y-m-d',$i).' '.$time_from);
    $time_last = strtotime(date('Y-m-d',$i).' '.$time_until);
    for($a=$time_first;$a<=$time_last;$a+=$interval)
    {
        $current = get_post_meta($product->id,'timeslot_'.$a,true);
        if($current<=0)
        {
            continue;
        }
        ?>
        <p class="gutter-front">
            <a href="<?php echo get_permalink()?>?date=<?php echo $_GET['date']?>&timeslot=<?php echo $a ?>"><?php echo getTimeslotTimeRange($product->id,$a); ?>: <b><?php echo $current ?> players left</b></a>
        </p>
        <?php
    }
    ?>
    <style>
    .cart
    {
        display:none;
    }
    </style>
    <?php endif ?>
</div>
<div id="on-the-right">
    <?php
    $position = get_field('position_on_map', get_the_ID());
    ?>
    <?php if (isset($position) && isset($position['lat'])) : ?>
        <p class="location-name"><?php echo get_field('place_name') ?></p>
        <div id="search-map">

        </div>

        <input id="lat" value="<?php echo $position['lat'] ?>" type="hidden" />
        <input id="lng" value="<?php echo $position['lng'] ?>" type="hidden" />
    <?php endif ?>
</div>
<div class="clear-fix"></div>