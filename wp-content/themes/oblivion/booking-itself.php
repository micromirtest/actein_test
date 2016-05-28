<?php
/* Template Name: Booking Itself */
/* if (isset($_POST['product_id'])) {

  global $woocommerce;

  $woocommerce->cart->empty_cart();
  $woocommerce->cart->add_to_cart($_POST['product_id']);
  header('Location: '.$woocommerce->cart->get_checkout_url());
  die();
  } */
$user = wp_get_current_user();
if ($user->ID == 0) {
    header('location: ' . get_permalink(1201));
}
$event = get_post($_GET['event']);
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
    <?php
}

if (!isset($_GET['date'])) {
    $date = date('d-m-Y');
} else {
    $date = $_GET['date'];
}

$monday = strtotime('monday this week', strtotime($date));
$sunday = strtotime('sunday this week', strtotime($date));

if (strtoupper(date('D', strtotime($date))) == 'SUN') {
    $monday = strtotime('monday last week', strtotime($date));
    $sunday = strtotime('sunday last week', strtotime($date));
}

/* if($monday>$sunday)
  {
  $monday = strtotime('monday last week',strtotime($date));
  } */
?>
<div class="page normal-page container bigger-padding-top">
    <div id="date-browser">
        <div class="row">
            <div class="span3">
                <a class="prevnext" href="<?php echo get_permalink() ?>?date=<?php echo date('d-m-Y', $monday - 86400) ?>&event=<?php echo $_GET['event'] ?>">&laquo; PREV WEEK</a>
            </div>
            <div class="span6 text-center">
                <p class="date-current">
                    DATE: <?php echo $date ?>
                </p>
                <p class="the-days">
                    <?php for ($i = $monday; $i <= $sunday; $i+=86400): ?>
                        <a <?php if ($i == strtotime($date)): ?>class="current"<?php endif ?> href="<?php echo get_permalink() ?>?date=<?php echo date('d-m-Y', $i) ?>&event=<?php echo $_GET['event'] ?>"><?php echo strtoupper(date('D', $i)) ?></a>
                    <?php endfor ?>
                </p>
            </div>
            <div class="span3 text-right">
                <a class="prevnext"  href="<?php echo get_permalink() ?>?date=<?php echo date('d-m-Y', $sunday + 86400) ?>&event=<?php echo $_GET['event'] ?>">NEXT WEEK &raquo; </a>
            </div>
        </div>
    </div>
    <p class="check-out">Select Your Mission</p>
    <p class="event-name"><?php echo $event->post_title ?> - <?php echo getProductType($event->ID) ?></p>
    <div class="row">
        <div class="span12">
            <div class="row">
                <?php
                $products = get_posts(array(
                    'posts_per_page' => -1,
                    'post_type' => 'product',
                    'post_per_page' => -1
                ));

                $product = get_post($_GET['event']);


                $displayed = false;

 
                $i = strtotime($_GET['date']);
                $time_from = get_post_meta($product->ID, 'from_' . $i, true);
                $time_until = get_post_meta($product->ID, 'until_' . $i, true);
                $bigger = get_post_meta($product->ID, 'bigger_' . $i, true);


                //IF MINIMUM 20 PLAYERS SHOW MESSAGE
                if ($bigger == '1') {
                    echo '<p class="other-day">Private Events (minimum 20 players) - call '.get_post_meta($product->ID, 'telephone', true).' to book</p>';
                } else {


                    $interval = get_post_meta($product->ID, 'actein_duration', true) * 60;
                    $time_first = strtotime(date('Y-m-d', $i) . ' ' . $time_from);
                    $time_last = strtotime(date('Y-m-d', $i) . ' ' . $time_until);
                 
                    for ($a = $time_first; $a <= $time_last - $interval; $a+=$interval):
         
                        $p = new WC_Product($product->ID);
                        $metas = get_post_meta($product->ID);

                        if ($p->get_stock_quantity() <= 0) {
                            continue;
                        }

                        $from = strtotime(get_post_meta($product->ID, 'actein_date', true) . ' 00:00:00');
                        $until = strtotime(get_post_meta($product->ID, 'actein_date_end', true) . ' 23:59:59');

                        if (get_post_meta($product->ID, 'slot_' . strtotime($date), true) <= 0) {
                            continue;
                        }

                        if ($from > strtotime($date) || $until < strtotime($date)) {
                            continue;
                        }

                        $current = get_post_meta($product->ID, 'timeslot_' . $a, true);
                        if ($current <= 0) {
                            /* continue; */
                        }

                        $number = get_users_by_timeslot($a, $product->ID, false);

                        $price = $metas['_price'][0];
                        $custom_price = get_post_meta($product->ID, 'price_' . $a, true);
                        if ($custom_price > 0) {
                            $price = $custom_price;
                        }

                        $duration = get_post_meta($product->ID, 'actein_duration', true);
                        $custom_duration = get_post_meta($product->ID, 'duration_' . $a, true);
                        if ($custom_duration > 0) {
                            $duration = $custom_duration;
                        }
                        $displayed = true;
                        ?>

                        <div class="span6">
                            <?php
                            $isLessThen24HLeft = isLessThen24HLeft($a);
                            $bg = false;
                            $rel = get_permalink($product->ID) . '?date=' . date('d-m-Y', strtotime($date)) . '&timeslot=' . $a;
                            $is_private = is_private_show($product->ID, $a);


                            $min = (int) get_post_meta($product->ID, 'min_players', true);
                            $ready = false;
                            if ($number < $min) {
                                $bg = 'red-background';
                            } else {
                                $bg = 'green-background';
                                $ready = true;
                            }



                            $buyout = get_post_meta($product->ID, 'timeslot_' . $a . '_buyout', true);

                            if ($buyout && trim($buyout) > 0) {

                                $is_private = true;
                            }

                            if ($is_private) {
                                $rel = '';
                                $bg = 'gray-background';
                            }

                            if ($current <= 0) {
                                $rel = '';
                                $bg = 'gray-background';
                            }

                            if ($isLessThen24HLeft) {
                                $rel = '';
                                $bg = 'gray-background';
                            }
                            ?>
                            <div class="one-event-showcase eh4 <?php echo $bg ?> <?php if ($current < 0): ?>no-redirect<?php endif ?>" rel="<?php echo $rel ?>">
                                <div class="top-line"><?php echo date('D', strtotime($date)) ?> <?php echo getTimeslotTimeRange($product->ID, $a); ?>
                                </div>
                                <div class="bottom-line">
                                    <div class="row"><div class="span6">
                                            <span class="white">
                                                <?php echo $price ?>,- NOK
                                            </span>
                                        </div><div class="span6 text-right">
                                            <span class="white"><?php echo $duration ?></span> Minutes
                                        </div></div>
                                </div>
                                <div class="lowest-line text-right">
                                    <?php
                                    if ($is_private) {
                                        ?>
                                        <span class="white smaller-a-bit">
                                            <?php if ($buyout && trim($buyout) > 0): ?>Lockout. Private session requires <?php echo get_post_meta($product->ID, 'min_lockout_players', true) ?> or more people to reserve. Plese call: <?php echo get_post_meta($product->ID, 'telephone', true) ?>
                                            <?php else: ?>
                                                Private Session. Please call  to reserve: <?php echo get_post_meta($product->ID, 'telephone', true) ?><?php endif ?></span>
                                        <?php
                                    }
                                    else if ($isLessThen24HLeft && $current >= 1) {
                                        ?>
                                        <span class="white smaller-a-bit">Reservable window has elapsed. Please Call: <?php echo get_post_meta($product->ID, 'telephone', true) ?></span>
                                        <?php
                                    } else if ($current >= 1):
                                        ?>
                                        <span class="white">
                                            <?php if ($number < $min): ?><div class="small-font">Session requires <?php echo $min ?> or more people to start</div><?php endif ?>
                                            <?php if ($ready): ?><div class="small-font">Session ready for action</div><?php endif ?>
                                            <?php echo $current ?></span> Players left
                                    <?php else: ?>
                                        <span class="white">All slots taken</span>
                                    <?php endif ?>
                                </div>
                            </div>
                        </div>
                        <?php
                    endfor;
                
                ?>
                <?php if (!$displayed): ?>
                    <p class="other-day">No events found, please select other day</p>
                <?php endif; } ?>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>

    </div>
</div>
                      

  

<?php get_footer(); ?>