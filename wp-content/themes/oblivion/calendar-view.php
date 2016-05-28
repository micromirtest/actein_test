<?php
/* Template Name: Calendar View */
get_header();
$user = wp_get_current_user();

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

$pre_products = get_posts(array(
    'posts_per_page' => -1,
    'post_type' => 'product',
    'orderby' => 'meta_value',
    'meta_key' => 'actein_date',
    'order' => 'asc'
        ));
$products = array();
$rows = array();
foreach ($pre_products as $product) {
    $loc = get_field('locations', $product->ID);
    if (empty($loc) || $loc[0]->ID != $_SESSION['location']) {
        continue;
    }

    $row = array();
    $add = false;
    for ($i = $monday; $i <= $sunday; $i+=86400) {
        $time_from = get_post_meta($product->ID, 'from_' . $i, true);
        $time_until = get_post_meta($product->ID, 'until_' . $i, true);
        $interval = get_post_meta($product->ID, 'actein_duration', true) * 60;
        $time_first = strtotime(date('Y-m-d', $i) . ' ' . $time_from);
        $time_last = strtotime(date('Y-m-d', $i) . ' ' . $time_until);
        $displayed = false;
        for ($a = $time_first; $a <= $time_last - $interval; $a+=$interval) {
            $p = new WC_Product($product->ID);
            $metas = get_post_meta($product->ID);
            if ($p->get_stock_quantity() <= 0) {
                continue;
            }

            $from = strtotime(get_post_meta($product->ID, 'actein_date', true) . ' 00:00:00');
            $until = strtotime(get_post_meta($product->ID, 'actein_date_end', true) . ' 23:59:59');

            if (get_post_meta($product->ID, 'slot_' . $i, true) <= 0) {
                continue;
            }

            if ($from > $i || $until < $i) {
                continue;
            }

            $current = get_post_meta($product->ID, 'timeslot_' . $a, true);
            
            if ($current <= 0) {
                 continue; 
            }

            $number = count(get_users_by_timeslot($a, $product->ID));

            $displayed = true;
        }

        $row[$i] = $displayed;

        if ($displayed) {
            $add = true;
            $row[$i] = $product;
        }
    }
    if ($add) {
        $rows[] = $row;
    }
}

?>
<div class="page normal-page container bigger-padding-top">
<?php
if ($user->ID == 0) {
    global $inserted;
    $inserted = true;
    get_template_part('account');
}
?>

    <div id="date-browser">
        <?php get_template_part('location_selector'); ?>
        <div class="row">
            <div class="span3">
                <a class="prevnext" href="<?php echo get_permalink() ?>?date=<?php echo date('d-m-Y', $monday - 86400) ?>">&laquo; PREV WEEK</a>
            </div>
            <div class="span6 text-center">
                <p class="date-current">
                    FROM <?php echo date('d-m-Y', $monday) ?> TO <?php echo date('d-m-Y', $sunday) ?>
                </p>                
            </div>
            <div class="span3 text-right">
                <a class="prevnext"  href="<?php echo get_permalink() ?>?date=<?php echo date('d-m-Y', $sunday + 86400) ?>">NEXT WEEK &raquo; </a>
            </div>
        </div>
    </div>
    <div class="table-responsive">
        <table id="the-calendar-itself" class="table">
            <tr>
<?php for ($i = $monday; $i <= $sunday; $i+=86400): ?>
                    <th>
    <?php echo date('d-m', $i) ?>
                    </th>
<?php endfor ?>
            </tr>

                <?php foreach ($rows as $row): ?>

                <tr>
                    <?php
                    $i = $monday;
                    ?>
                <?php foreach ($row as $cell): ?>
                        <td>
        <?php if (!$cell): ?>
                                ---
                        <?php else: ?>
                                <a href="<?php echo get_permalink(1422) ?>?date=<?php echo date('d-m-Y', $i) ?>&event=<?php echo $cell->ID ?>"><?php echo $cell->post_title ?> </a>
                                <p>(<?php echo getProductType($cell->ID) ?>)</p>
                        <?php endif ?>
                        </td>
                            <?php $i+=86400; ?>
                        <?php endforeach ?>
                </tr>
                    <?php endforeach ?>
        </table>
    </div>

</div>
                <?php
                get_footer();


                