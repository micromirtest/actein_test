<?php
/* Template Name: Profile */
wp_enqueue_media();
if (isset($_GET['logout'])) {
    wp_logout();
    header('Location: ' . get_permalink(1201));
    die();
}

$user = wp_get_current_user();

if ($user->ID == 0) {
    header('Location: ' . get_permalink(1201));
    die();
}

if (isset($_POST['save'])) {



    update_user_meta($user->ID, 'agreement', $_POST['signatureJSON']);

    /* if(isset($_FILES['agreement']) && $_FILES['agreement']['error'] == 0)
      {
      $ext = explode('.', $_FILES['agreement']['name']);
      $ext = array_pop($ext);
      if($ext=='doc')
      {
      $filename = sanitize_title($_FILES['agreement']['name']) . '_' . time() . '.' . $ext;

      if (!is_dir('./wp-content/uploads/agreements')) {
      mkdir('./wp-content/uploads/agreements');
      }

      move_uploaded_file($_FILES['agreement']['tmp_name'], './wp-content/uploads/agreements/' . $filename);
      update_user_meta($user->ID, 'agreement', $filename);
      }
      } */

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        if (strpos($_FILES['photo']['type'], 'image') !== false) {
            $ext = explode('.', $_FILES['photo']['name']);
            $ext = array_pop($ext);
            $filename = sanitize_title($_FILES['photo']['name']) . '_' . time() . '.' . $ext;

            if (!is_dir('./wp-content/uploads/photos')) {
                mkdir('./wp-content/uploads/photos');
            }

            move_uploaded_file($_FILES['photo']['tmp_name'], './wp-content/uploads/photos/' . $filename);
            update_user_meta($user->ID, 'picture', $filename);
        } else {
            $error2 = 'Wrong type of file!';
        }
    }

    if (isset($_POST['remove-it']) && $_POST['remove-it'] == 'yes') {
        update_user_meta($user->ID, 'picture', false);
    }

    if ($_POST['email'] != $user->user_email) {
        $result = wp_update_user(array(
            'user_email' => $_POST['email'],
            'ID' => $user->ID
        ));
        if (is_wp_error($result)) {
            $error2 = 'The e-mail you entered is already taken.';
        }
    }

    $user = wp_get_current_user();

    $success = true;

    foreach ($_POST as $key => $value) {

        update_user_meta($user->ID, $key, $value);
    }

    moveUserData($user->ID);



    if (trim($_POST['reg_password']) != '') {
        if (!checkPassword($_POST['reg_password'])) {
            $error2 = 'The password is too weak, need to have at least 8 characters, one capital letter and one special character.';
        } else {
            if ($_POST['reg_password_confirm'] == $_POST['reg_password']) {
                //wp_set_password($_POST['req_password'], $user->ID);
                wp_update_user(
                        array(
                            'ID' => $user->ID,
                            'user_pass' => $_POST['reg_password']
                ));
            } else {
                $error2 = 'Passwords doesn\'t match. Other changes has been saved.';
            }
        }
    }
}

$meta = get_user_meta($user->ID);


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


<div class="page normal-page container">
    <div class="row">
        <div class="span12">

            <p class="text-right">
                <a href="<?php echo get_permalink() ?>?logout=true">Logout</a>
            </p>
            <?php
            /* here will be errors */

            if (isset($error2)) {
                ?>
                <p class="message-error"><?php echo $error2 ?></p>

                <?php
            } elseif (isset($success)) {
                ?>
                <p class="message-success">All changes has been saved</p>

                <?php
            }
            ?>
            <?php
            $photo = get_user_meta($user->ID, 'picture', true);
            ?>

            <?php if (!isset($error2) && !isset($success)): ?>
                <div id="welcome-soldier">
                    <h2 id="hi">Welcome, <span><?php echo $meta['soldier_name'][0] ?></span></h2>

                    <div class="row">
                        <div class="span3">
                            <?php
                            if (trim($photo) != '') {
                                ?><img src="<?php echo get_home_url() ?>/wp-content/uploads/photos/<?php echo $photo ?>" alt="" /><?php
                            } else {
                                ?><img src="<?php echo get_stylesheet_directory_uri() ?>/img/default_photo.png" alt=""/><?php
                            }
                            ?>
                        </div>
                        <div class="span9" id="stats-column">
                            <div class="text-right">
                                <div class="row">
                                    <div class="span4">Name</div>
                                    <div class="span8"><?php echo $meta['soldier_name'][0] ?></div>
                                </div>
                                <div class="row">
                                    <div class="span4">Rank</div>
                                    <div class="span8">Private</div>
                                </div>
                                <div class="row">
                                    <div class="span4">BIRTH DATE</div>
                                    <div class="span8"><?php echo $meta['birth_date'][0] ?></div>
                                </div>
                                <div class="row">
                                    <div class="span4">HOME ADDRESS</div>
                                    <div class="span8"><?php echo $meta['street_address'][0] ?> <?php echo $meta['zip_code'][0] ?> <?php echo $meta['town'][0] ?></div>
                                </div>

                                <div class="row">
                                    <div class="span4">MOBILE</div>
                                    <div class="span8"><?php echo $meta['phone-mobile'][0] ?></div>
                                </div>
                                <p class="text-right" id="click-here">CLICK <a href="#" id="switch-it">HERE</a> TO CHANGE YOUR PROFILE</p>
                            </div>
                        </div>
                    </div>
                    <h2 id="hi">Your incoming events</h2>

                    <?php
                    $orders = get_posts(array(
                        'post_type' => 'shop_order',
                        'posts_per_page' => -1
                    ));

                    $user = wp_get_current_user();
                    /* $orders = array(); */
                    $products = array();

                    foreach ($orders as $order) {

                        $order = new WC_Order($order->ID);
                        $days = get_post_meta($order->ID, 'days', true);

                        if (!is_array($days)) {
                            $days = array();
                        }
                        foreach ($days as $day) {
                            
                        }
                        $user_id = $order->user_id;

                        if ($user_id == $user->ID) {

                            if ($order->post_status != 'wc-completed') {
                                continue;
                            }
                            $days = get_post_meta($order->id, 'days', true);
                            $date = false;

                            $items = $order->get_items();
                            $product_id = 0;
                            foreach ($items as $item) {

                                foreach ($item['item_meta_array'] as $it) {
                                    if ($it->key == '_product_id') {
                                        $product_id = $it->value;
                                        $time = strtotime(get_post_meta($product_id, 'actein_date', true) . ' 23:59:59');

                                        if (time() < $time && !in_array($product_id, $products)) {
                                            $loc = get_field('locations', $product_id);
                                            $location = false;
                                            if (!empty($loc)) {
                                                $location = $loc[0]->post_title;
                                            }
                                            
                                            if (!empty($days)) {
                                                $date = date('d-m-Y', $days[0]) . ' ' . getTimeslotTimeRange($product_id, $days[0]);
                                            }

                                            $products[] = array(
                                                'product_id' => $product_id,
                                                'date' => $date,
                                                'location' => $location,
                                                'qty' => $item['item_meta']['_qty'][0]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    /* var_dump($orders); */
                    if (empty($products)) {
                        ?>
                        <p class="no-no">You have no incoming events</p>
                        <?php
                    } else {
                        foreach ($products as $product) {
                            $p = get_post($product['product_id']);
                            $date = get_post_meta($p->ID, 'actein_date', true);
                            ?>
                            <div class="row">
                                <div class="col-xs-4">
                                    <p class="p-name"><?php echo $p->post_title ?></p>
                                </div>
                                <div class="col-xs-4 col-xs-8 text-right" style="width:62%">
                                    <p class="p-date"><?php echo $product['date'] ?>, <?php echo $product['location']?>, <?php echo $product['qty'] ?> timeslots bought.</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>
            <?php
        }
    }
    ?>

                </div>    
<?php endif ?>
            <form action="" enctype="multipart/form-data" method="post" <?php if (isset($success) || isset($error2)): ?>style="display:block;"<?php endif ?> id="register-form">

                <h3>PLAYER'S DATA</h3>
<?php echo one_field('EMAIL', 'email', true, '', $user->user_email) ?>
                <?php echo one_field('SOLDIER NAME', 'soldier_name', true, 'How would you like us to call you?', $meta['soldier_name']) ?>
                <?php echo one_field('FIRST NAME', 'first_name', true, '', $meta['first_name']) ?>
                <?php echo one_field('LAST NAME', 'last_name', true, '', $meta['last_name']) ?>

                <?php echo one_field('Street Address', 'street_address', true, '', $meta['street_address']) ?>
                <?php echo one_field('Zip Code', 'zip_code', true, '', $meta['zip_code']) ?>
                <?php echo one_field('Town', 'town', true, '', $meta['town']) ?>

                <?php echo genderField($meta['gender']) ?>
                <?php echo one_field('BIRTH DATE', 'birth_date', false, '', $meta['birth_date']) ?>
                <?php echo phone_field('MOBILE', 'mobile', true, '', $user->ID) ?>
                <div class='row one-field-row'>
                    <div class='span3'><label for="photo">PHOTO</label></div>
                    <div class='span9'>
<?php
$photo = get_user_meta($user->ID, 'picture', true);
?>
                        <div>
                        <?php
                        if (trim($photo) != '') {
                            ?>
                                <img src="<?php echo get_home_url() ?>/wp-content/uploads/photos/<?php echo $photo ?>" alt="" />
                                <p id="thep" >
                                    <input type="checkbox" name="remove-it" value="yes" /> Select this to remove the picture.
                                </p>
<?php }
?>
                        </div>
                        <input type="hidden" name="photo" id="photo-id" value="<?php echo get_user_meta($user->ID, 'photo', true) ?>" />
                        <input type="file" name="photo" />
                    </div>
                </div>
<?php
$bday = $meta['birth_date'][0];

function getAge($then) {
    $then = date('Ymd', strtotime($then));
    $diff = date('Ymd') - $then;
    return substr($diff, 0, -4);
}

$age = getAge($bday);
?>
                <?php if ($age >= 18): ?>
                    <script>
                        (function ($)
                        {
                            $(document).ready(function ()
                            {
                                $('#parent input').attr('required', false);
                            });
                        })(jQuery);
                    </script>
<?php endif ?>
                <div id="parent" <?php if (1 == 1): ?>style="display:none"<?php endif ?>>

                    <h3>PARENT OR RESPONSIBLE CONTACT</h3>
<?php echo one_field('FIRST NAME', 'parent_first_name', false, '', $meta['parent_first_name']) ?>
                    <?php echo one_field('LAST NAME', 'parent_last_name', false, '', $meta['parent_last_name']) ?>

                    <?php echo one_field('Street Address', 'parent_street_address', true, '', $meta['parent_street_address']) ?>
                    <?php echo one_field('Zip Code', 'parent_zip_code', true, '', $meta['parent_zip_code']) ?>
                    <?php echo one_field('Town', 'parent_town', true, '', $meta['parent_town']) ?>


<?php echo phone_field('MOBILE', 'parent_mobile', false, '', $user->ID) ?>
                </div>

<?php
/* calculate years */
?>
<!--                <h3>SIGNED AGREEMENT</h3>
                <p class="text-left">Please download <a href="<?php echo get_stylesheet_directory_uri() ?>/agreement.doc">this</a> document, read it<?php if ($age >= 18): ?>, and sign using the field below:
<?php else: ?>
                        and your legal guarding has to sign it using the field below:
                    <?php endif ?>
                </p>
                <div id="signature"></div>
                <br /><button type="button" id="clearButton">Clear</button>
                <textarea id="signatureJSON" name="signatureJSON" style="display:none;"><?php echo get_user_meta($user->ID, 'agreement', true) ?></textarea>
                <div class="clearfix"></div>
                <div style="margin-bottom:100px"></div>
                <script>
                    (function ($)
                    {
                        $(document).ready(function ()
                        {
                            $('#signature').signature('draw', $('#signatureJSON').val());
                        })
                    })(jQuery);
                </script>-->

                <p id="change-p">If you don't want to change the password, leave the fields below blank</p>
                <div class='row one-field-row-bigger' id="first-bigger">
                    <div class='span6 text-right'><label for="reg_password">PASSWORD</label></div>
                    <div class='span6'>
                        <input type="password" name="reg_password" id="reg_password" value="" placeholder="" />
                    </div>
                </div>
                <div class='row one-field-row-bigger'>
                    <div class='span6 text-right'><label for="reg_password_confirm">CONFIRM YOUR PASSWORD</label></div>
                    <div class='span6'>
                        <input type="password" name="reg_password_confirm" id="reg_password_confirm" value="" placeholder="" />
                    </div>
                </div>
                <div class='row' id="lower-register-form">
                    <div class="span4">
                        &nbsp;
                    </div>
                    <div class="span4">
                        &nbsp;
                    </div>
                    <div class="span4 text-right">
                        <input type="submit" id="register-button" name="save" class="save" value="CONFIRM SUBSCRIPTION" />
                    </div>
                </div>
            </form>
            <div class="clear"></div>
        </div>

    </div>
</div>

<?php get_footer(); ?>
