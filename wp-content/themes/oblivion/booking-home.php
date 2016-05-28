<?php
/* Template Name: Booking Home */
get_header();
$user = wp_get_current_user();
?>
<div class="page normal-page container bigger-padding-top">
    <?php
    if ($user->ID == 0) {
        global $inserted;
        $inserted = true;
        get_template_part('account');
    }
    ?>
    <div id="next-events">
        <img src="<?php echo get_stylesheet_directory_uri() ?>/img/next-events.png" alt="" class="img-responsive full-width-img" />
        <!--<img src="http://actein.com/wp-content/uploads/2015/11/Signweb.jpg" alt="" class="img-responsive full-width-img" />-->

        <?php
        /* get all events, like on home page */

        $products = get_posts(array(
            'posts_per_page' => -1,
            'post_type' => 'product',
            'orderby' => 'meta_value',
            'meta_key' => 'actein_date',
            'order' => 'asc'
        ));
        get_template_part('location_selector');
        ?>
        <table id="next-events-table">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Date/time</th>
                    <th>Place</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($products as $product): ?>
                    <?php
                    $loc = get_field('locations', $product->ID);
                    if (empty($loc) || $loc[0]->ID != $_SESSION['location']) {
                        continue;
                    }

                    $metas = get_post_meta($product->ID);
                    $p = new WC_Product($product->ID);

                    $time = strtotime(get_post_meta($product->ID, 'actein_date_end', true) . ' 23:59:59');
                    if (time() > $time) {
                        continue;
                    }

                    if ($p->get_stock_quantity() <= 0) {
                        continue;
                    }
                    $from = get_post_meta($product->ID, 'actein_date', true) . ' ' . get_post_meta($product->ID, 'actein_start_at', true);
                    $from = date('d-m-Y H:i', strtotime($from));
                    $until = get_post_meta($product->ID, 'actein_date_end', true) . ' ' . get_post_meta($product->ID, 'actein_end_at', true);

                    $until = date('d-m-Y H:i', strtotime($until));
                    $f = date('d-m-Y', strtotime($from));
                    ?>
                    <tr rel="<?php echo get_permalink(1422) ?>?date=<?php echo $f ?>&event=<?php echo $product->ID ?>">
                        <td><div><?php echo $product->post_title ?></div></td>
                        <td>
                            <?php echo getProductType($product->ID) ?>
                        </td>
                        <td>
                            <div><span>From:</span> <?php echo $from ?>
                                <br /><span>Until: </span>  <?php echo $until ?></div>
                        </td>
                        <td><div><?php echo get_post_meta($product->ID, 'place_name', true) ?></div></td>
                    </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
</div>
<?php
get_footer();


