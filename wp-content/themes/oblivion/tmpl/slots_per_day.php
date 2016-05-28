<p>Remember to setup the date of start and end in the box below <b>first</b>, then save the product, to manage slots per date.</p>
<?php
$start = get_post_meta($post->ID, 'actein_date', true);
$end = get_post_meta($post->ID, 'actein_date_end', true);
if ($start && $end) {
    $s = strtotime($start);

    $e = strtotime($end);
    $day = 3600 * 24;
    $iterator = 0;
    $day_num = 0;
    for ($i = $s; $i <= $e; $i+=$day) {

        /* custom */
        ++$day_num;
//        var_dump($day_num);
        if ($day_num == 8) {
            ?>
            <input type="checkbox" id="fill">
            <label for="fill" style="color: red; margin: 0 10px 0 0;display: block;float: left;clear: both;">Fill the rest of days automatically</label>
            <hr style="clear:both">
            <?php
        }

        /* custom */

        $iterator++;
        if ($iterator > 50) {
            break;
        }
        ?>
        <div class="one-slot-setup">
            <?php
            $sum_inventory = 0;
            $time_from = get_post_meta($post->ID, 'from_' . $i, true);
            $time_until = get_post_meta($post->ID, 'until_' . $i, true);
            $bigger = get_post_meta($post->ID, 'bigger_' . $i, true);

            $interval = get_post_meta($post->ID, 'actein_duration', true) * 60;
            $time_first = strtotime(date('Y-m-d', $i) . ' ' . $time_from);

            $time_last = strtotime(date('Y-m-d', $i) . ' ' . $time_until);

            $max_players = get_post_meta($post->ID, 'max_players', true);
            ?>
            <label><?php echo date('Y-m-d', $i) ?></label>
            <input type="text" name="slot_<?php echo $i ?>" value="<?php echo get_post_meta($post->ID, 'slot_' . $i, true) ?>" />
            from <input type="text" placeholder="09:00" name="from_<?php echo $i ?>" value="<?php echo $time_from ?>" />
            until <input type="text" placeholder="21:00" name="until_<?php echo $i ?>" value="<?php echo $time_until; ?>" />
            Bigger  20<input type="checkbox" <?= ($bigger == '1') ? 'checked="checked"' : '' ?>  name="bigger_<?php echo $i ?>" value="1" />
            <?php
            /* now generate something */
            $slots_this_day = 0;
            $iterator2 = 0;
            for ($a = $time_first; $a <= $time_last; $a+=$interval) {
                if ($interval <= 0) {
                    break;
                }
                $iterator2++;
                if ($iterator2 > 50) {
                    break;
                }
                $current = get_post_meta($post->ID, 'timeslot_' . $a, true);
                if (!$current && $max_players > 0) {
                    update_post_meta($post->ID, 'timeslot_' . $a, $max_players);
                    $current = get_post_meta($post->ID, 'timeslot_' . $a, true);
                }
                if ($current > 0) {
                    $slots_this_day++;
                }
                $sum_inventory+=$current;
                ?>
                <p class="gutter">
                    <?php echo date('Y-m-d H:i:s', $a) ?>: <b><?php echo $current ?></b>

                    <?php
                    /* get orders */
                    $users = get_users_by_timeslot($a, $_GET['post']);
                    echo implode(', ', $users);
                    ?>        

                </p>
                <div class="custom-price">
                    <span>Custom Price:</span> <input type="text" value="<?php echo get_post_meta($post->ID, 'price_' . $a, true) ?>" name="price_<?php echo $a ?>" />
                </div>
                <div class="custom-price">
                    <span>Custom Duration:</span> <input type="text" value="<?php echo get_post_meta($post->ID, 'duration_' . $a, true) ?>" name="duration_<?php echo $a ?>" />
                </div>
                <!--<div class="custom-price">
                   <span>Min Players for Lockout:</span> <input type="text" value="<?php echo get_post_meta($post->ID, 'min_lockout_' . $a, true) ?>" name="duration_<?php echo $a ?>" />
               </div>
               <div class="custom-price">
                   <span>Lockout Slot Price:</span> <input type="text" value="<?php echo get_post_meta($post->ID, 'price_lockout_' . $a, true) ?>" name="duration_<?php echo $a ?>" />
               </div>-->
                <hr />
                <?php
            }
            update_post_meta($post->ID, 'slot_' . $i, $slots_this_day);
            ?>
        </div>
        <?php
    }
}
update_post_meta($post->ID, '_stock', $sum_inventory);
?>
<style>
    .gutter{
        margin-bottom: 0px;
    }
    .one-slot-setup
    {
        margin-bottom: 10px;
    }

    .one-slot-setup label
    {
        display: inline-block;
        margin-right: 10px;
    }

    .custom-price
    {
        margin-bottom: 20px;
    }

    .custom-price span
    {
        display: inline-block;
        width: 100%;
        max-width: 150px;
    }
</style>
<script>
    function magic(selector) {



        $(selector).each(function (i) {
//            console.log(i);
            var x = $(this).val(),
                    checked = $(this).is(':checked');

            $(selector).each(function (j) {
//                console.log(j);
                if ((j - i) % 7 == 0) {
                    
                    if ($(selector)['0'].type == 'checkbox') {
                         $(this).attr('checked', false);
                        if (checked) {
                            $(this).attr('checked', 'checked');
                        }

                    } else {
                        $(this).val(x);
                    }


                }
            });
            if (i == 7) {
                return false;
            }
        });
    }

    $("#fill").change(function () {
        var check = $(this).prop('checked');
        if (check === true) {
            magic("input[name^='slot_']");
            magic("input[name^='from_']");
            magic("input[name^='until_']");
            magic("input[name^='bigger_']");
        } else {

        }
    });
</script>