<?php
global $inserted;

/* Template Name: Account */
$user = wp_get_current_user();

if ($user->ID > 0) {
    header('Location: ' . get_permalink(1383));
    die();
}
if (isset($_POST['login_password'])) {
    $creds = array();
    $creds['user_login'] = $_POST['login_email'];
    $creds['user_password'] = $_POST['login_password'];
    $creds['remember'] = true;
    $user = wp_signon($creds, false);
    if (is_wp_error($user)) {
        $error = $user->get_error_message();
    } else {
        if(!$inserted)
        {
            header('Location: ' . get_permalink(1383));
        die();
        }
        else
        {
            header('Location: ' . get_permalink());
        die();
        }
        
    }
}

/**/
if (isset($_POST['reg_password'])) {
    
    $e = new WC_Emails();
    
    
    $user_name = $_POST['user_name'];
    $user_email = $_POST['email'];
    $user_id = username_exists($user_name);
    $password = $_POST['reg_password'];
    if (checkAllFields()) {
        if (!$user_id and email_exists($user_email) == false) {
            if (!checkPassword($password)) {
                $error2 = 'The password is too weak, need to have at least 8 characters, one capital letter and one special character.';
            } else {
                if ($_POST['reg_password_confirm'] == $_POST['reg_password']) {
                    $password = $_POST['reg_password'];
                     
                    $user_id = wp_create_user($user_name, $password, $user_email);
                   
                    $w = new WC_Email_Customer_New_Account();
    $w->trigger($user_id,$password);
    
                    
                    wp_update_user(array('ID' => $user_id));
                    $success = true;
                    foreach ($_POST as $key => $value) {
                        update_user_meta($user_id, $key, $value);
                    }
                   
                    if($_POST['newsletter']=='true')
                    {
                         if (!isset($newsletter)) $newsletter = new Newsletter();
                  $subscriber['name'] = stripslashes('');
                    $subscriber['surname'] = stripslashes('');
                    $subscriber['email'] = $newsletter->normalize_email(stripslashes($user_email));
                    $subscriber['status'] = 'C';
                  NewsletterUsers::instance()->save_user($subscriber);
                    }
                   
                    
                    
                    moveUserData($user_id);
                } else {
                    $error2 = 'Passwords doesn\'t match.';
                }
            }
        } else {
            $error2 = __('User already exists.');
        }
    } else {
        $error2 = 'All fields are mandatory. Email fields has to contain proper email addresses.';
    }
}
if(!$inserted)
{
    get_header();    
}

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

<?php if(!$inserted):?>
<div class="page normal-page container">
<?php endif ?>
    <div class="row">
        <div class="span12">
<?php
/* here will be errors */
if (isset($error)) {
    ?>
                <p class="message-error"><?php echo $error ?></p>
                <?php
            }
            if (isset($error2)) {
                ?>
                <p class="message-error"><?php echo $error2 ?></p>
                <style>
                    #login-form
                    {
                        display: none;
                    }
                    #register-form
                    {
                        display: block;
                    }
                </style>
    <?php
}
if (isset($success)) {
    ?>
                <p class="message-success">The account has been created. <a href="<?php echo get_permalink() ?>">Click here</a> to login.</p>
                <style>
                    #login-form
                    {
                        display: none;
                    }
                    #register-form
                    {
                        display: none;
                    }
                </style>
    <?php
}
?>
            <form id="login-form" action="" method="post">
                <div class="row">
                    <div class="span4 text-center">
                        <h4 id="login-text">LOGIN</h4>
                    </div>
                    <div class="span4">
                        <div id="form-itself">
                            <div class="row">
                                <div class="span5">
                                    <label for="login_email">LOGIN</label>
                                </div>
                                <div class="span7">
                                    <input required type="text" id="login_email" name="login_email" value="" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="span5">
                                    <label for="login_password">PASSWORD</label>
                                </div>
                                <div class="span7">
                                    <input required type="password" id="login_password" name="login_password" value="" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="span5">
                                    &nbsp;
                                </div>
                                <div class="span7">
                                    <a class="italic" href="<?php echo get_home_url() ?>/wp-login.php?action=lostpassword" id="forgot">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span4 text-center" id="right-login">
                        <p class="italic">Don't Have a Profile Yet ?</p>
                        <a href="#" id="enlist"></a>
                    </div>
                </div>
            </form>
            <form action="" method="post" id="register-form">
                <h3>PLAYER'S DATA</h3>
                <?php echo one_field('USERNAME', 'user_name', true, '', $_POST['user_name']) ?>
                <?php echo one_field('E-MAIL', 'email', true, '', $_POST['email']) ?>
                <?php echo one_field('SOLDIER NAME', 'soldier_name', true, 'How would you like us to call you?', $_POST['soldier_name']) ?>
                <?php echo one_field('FIRST NAME', 'first_name', true, '', $_POST['first_name']) ?>
                <?php echo one_field('LAST NAME', 'last_name', true, '', $_POST['last_name']) ?>
                
                <?php echo one_field('Street Address', 'street_address', true, '', $_POST['street_address']) ?>
                <?php echo one_field('Zip Code', 'zip_code', true, '', $_POST['zip_code']) ?>
                <?php echo one_field('Town', 'town', true, '', $_POST['town']) ?>
                
                <?php echo genderField($_POST['gender']) ?>
                <?php echo one_field('BIRTH DATE', 'birth_date', true, '', $_POST['birth_date']) ?>
                <?php echo phone_field('MOBILE', 'mobile', true, '') ?>
                <div id="parent" style="display:none">
                <h3>PARENT OR RESPONSIBLE CONTACT</h3>
                <?php //echo one_field('FIRST NAME', 'parent_first_name', true, '', $_POST['parent_first_name']) ?>
                <?php// echo one_field('LAST NAME', 'parent_last_name', true, '', $_POST['parent_last_name']) ?>
                
                <?php// echo one_field('Street Address', 'parent_street_address', true, '', $_POST['parent_street_address']) ?>
                <?php// echo one_field('Zip Code', 'parent_zip_code', true, '', $_POST['parent_zip_code']) ?>
                <?php// echo one_field('Town', 'parent_town', true, '', $_POST['parent_town']) ?>
                
                <?php //echo phone_field('MOBILE', 'parent_mobile', true, '') ?>
                
                </div>
                

                <div class='row one-field-row-bigger' id="first-bigger">
                    <div class='span6 text-right'><label for="reg_password">TYPE YOUR PASSWORD</label></div>
                    <div class='span6'>
                        <input type="password" required name="reg_password" id="reg_password" value="" placeholder="" />
                    </div>
                </div>
                <div class='row one-field-row-bigger'>
                    <div class='span6 text-right'><label for="reg_password_confirm">CONFIRM YOUR PASSWORD</label></div>
                    <div class='span6'>
                        <input type="password" required name="reg_password_confirm" id="reg_password_confirm" value="" placeholder="" />
                    </div>
                </div>
                <div class='row' id="lower-register-form">
                    <div class="span4">
                    </div>
                    <div class="span4">
                        <input type="checkbox" required checked="checked" name="newsletter" value="true" />
                        Subscribe to the Newsletter
                    </div>
                    <div class="span4 text-right">
                        <input type="submit" id="register-button" value="CONFIRM SUBSCRIPTION" />
                    </div>
                </div>
            </form>
            <div class="clear"></div>
        </div>

    </div>
    <?php if(!$inserted):?>
</div>
<?php endif ?>
<?php 
if(!$inserted)
{
    get_footer(); 
}
