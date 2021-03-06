            <div class="comment-form">
<?php /* Run some checks for bots and password protected posts */ ?>
<?php
    $req = get_option('require_name_email'); // Checks if fields are required.
    if ( 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']) )
        die ( 'Please do not load this page directly. Thanks!' );
    if ( ! empty($post->post_password) ) :
        if ( $_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password ) :
?>
                <div class="nopassword"><?php _e('This post is password protected. Enter the password to view any comments.', 'oblivion') ?></div>
            </div><!-- .comments -->
<?php
        return;
    endif;
endif;
?>
<?php /* See IF there are comments and do the comments stuff! */ ?>
<?php if ( have_comments() ) : ?>
  <h2><?php comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion') ); ?></h2>
<?php /* An ordered list of our custom comments callback, custom_comments(), in functions.php   */ ?>
   <ul  class="comment-list">
           <?php wp_list_comments('type=comment&callback=custom_comments'); ?>
   </ul>
 <div class="navigation">
        <div class="alignleft"><?php previous_comments_link() ?></div>
        <div class="alignright"><?php next_comments_link() ?></div>
 </div>
<?php endif /* if ( $comments ) */ ?>
<?php /* If comments are open, build the respond form */ ?>
<?php if ( 'open' == $post->comment_status ) : ?>
                <div id="respond">
                    <h2><?php comment_form_title( __('Leave a comment', 'oblivion'), __('Post a Reply to %s', 'oblivion') ); ?></h2>
                    <div id="cancel-comment-reply"><?php cancel_comment_reply_link() ?></div>
<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
                    <p id="login-req"><?php printf(__('You must be <a href="%s" title="Log in">logged in</a> to post a comment.', 'oblivion'),
                    get_option('siteurl') . '/wp-login.php?redirect_to=' . get_permalink() ) ?></p>
<?php else : ?>
                    <div class="formcontainer">
                        <form id="commentform" action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" class="contact comment-form">
<?php if ( $user_ID ) : ?>
<?php else : ?>
              <div id="form-section-author" class="form-section input-prepend">
                  <span class="add-on"><i class="icon-user"></i></span>
                 <input id="author" name="author" placeholder="Name*" type="text" value="<?php echo $comment_author ?>" size="30" maxlength="20" tabindex="3" />
              </div><!-- #form-section-author .form-section -->
              <div id="form-section-email" class="form-section input-prepend">
                  <span class="add-on"><i class="icon-envelope"></i></span>
                 <input placeholder="Email*" id="email" name="email" type="text" value="<?php echo $comment_author_email ?>" size="30" maxlength="50" tabindex="4" />
              </div><!-- #form-section-email .form-section -->
              <div id="form-section-url" class="form-section input-prepend">
                    <span class="add-on"><i class="icon-globe"></i></span>
                   <input id="url" placeholder="Website" name="url" type="text" value="<?php echo $comment_author_url ?>" size="30" maxlength="50" tabindex="5" />
              </div><!-- #form-section-url .form-section -->
<?php endif /* if ( $user_ID ) */ ?>
              <div id="form-section-comment" class="form-section input-prepend">
                  <span class="add-on"><i class="icon-comment"></i></span>
                  <textarea placeholder="<?php _e('Your message*','oblivion');?>" id="comment" name="comment" cols="45" rows="8" tabindex="6"></textarea>
              </div><!-- #form-section-comment .form-section -->
<?php do_action('comment_form', $post->ID); ?>
      <div class="form-submit"><input id="submit" name="submit"  class="button-small button-green" type="submit" value="<?php _e('Submit comment', 'oblivion') ?>" tabindex="7" /><input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" /></div>
<?php comment_id_fields(); ?>
<?php /* Just … end everything. We're done here. Close it up. */ ?>
                        </form><!-- #commentform -->
                    </div><!-- .formcontainer -->
<?php endif /* if ( get_option('comment_registration') && !$user_ID ) */ ?>
                </div><!-- #respond -->
<?php endif /* if ( 'open' == $post->comment_status ) */ ?>
            </div><!-- #comments -->