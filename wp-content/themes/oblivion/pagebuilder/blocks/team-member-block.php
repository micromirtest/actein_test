<?php
/** A simple text block **/
class Team_Member_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('Team member', 'oblivion'),
            'size' => 'span3',
            'position' => '',
            'text' => '',
            'image' => '',
            'facebook' => '',
            'twitter' => '',
            'linkedin' => '',
        );
        //create the block
        parent::__construct('team_member_block', $block_options);
    }
    function form($instance) {
        $defaults = array(
            'text' => '',
        );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);
        ?>
        <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                <?php _e("Member name", 'oblivion') ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('position') ?>">
                <?php _e("Member position", 'oblivion') ?>
                <?php echo field_input('position', $block_id, $position, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('text') ?>">
                <?php _e("About member", 'oblivion') ?>
                <?php echo field_textarea('text', $block_id, $text, $size = 'full',  $number == '__i__' ? false : true) ?>
            </label>
        </p>

         <p class="description">
            <label for="<?php echo $this->get_field_id('image') ?>">
                <?php _e("Enter link to memeber picture", 'oblivion') ?>
                <?php echo field_upload("image",$block_id,$image,'image');?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('facebook') ?>">
                Facebook
                <?php echo field_input('facebook', $block_id, $facebook, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('twitter') ?>">
                Twitter
                <?php echo field_input('twitter', $block_id, $twitter, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('linkedin') ?>">
                LinkedIn
                <?php echo field_input('linkedin', $block_id, $linkedin, $size = 'full') ?>
            </label>
        </p>
		<p class="description">
            <label for="<?php echo $this->get_field_id('youtube') ?>">
                Youtube
                <?php echo field_input('youtube', $block_id, $youtube, $size = 'full') ?>
            </label>
        </p>
        <?php
    }
    function pbblock($instance) {
         extract($instance);
        echo '<div class="member"><div class="member-social">';
        if(empty($facebook)){}else{
            echo '<a data-original-title="Facebook" data-toggle="tooltip" href="'.strip_tags($facebook).'" class="icon-facebook-sign"></a>';
        }
        if(empty($twitter)){}else{
            echo '<a data-original-title="Twitter" data-toggle="tooltip" href="'.strip_tags($twitter).'" class="icon-twitter-sign"></a>';
        }
        if(empty($linkedin)){}else{
            echo ' <a data-original-title="Linkedin" data-toggle="tooltip" href="'.strip_tags($linkedin).'" class="icon-linkedin-sign"></a>';
        }
		if(empty($youtube)){}else{
            echo ' <a data-original-title="Youtube" data-toggle="tooltip" href="'.strip_tags($youtube).'" class="icon-youtube"></a>';
        }
       echo '</div>
                <img src="'.strip_tags($image).'" alt="'.get_the_title().'">
                <h3>'.strip_tags($title).'</h3>
                <span>'.strip_tags($position).'</span>
                <div class="content">'.wpautop(do_shortcode(htmlspecialchars_decode($text))).'</div>
                <div class="bline"></div>
             </div>';
    }
}