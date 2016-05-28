<?php
/** A simple text block **/
class Animated_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('Animated block', 'oblivion'),
            'size' => 'span3',
        );
        //create the block
        parent::__construct('animated_block', $block_options);
    }
    function form($instance) {
        $defaults = array(
            'title' => '',
            'delay' => '',
            'animated_image' => '',
            'type' => '',
            'marg' => ''

        );
         $type_options = array(
                'fade-in-from-left' => __('Fade in from left', 'oblivion'),
                'fade-in-from-right' => __('Fade in from right', 'oblivion'),
                'fade-in-from-bottom' => __('Fade in from bottom', 'oblivion'),
                'fade-in' => __('Fade in', 'oblivion'),
                'grow-in' => __('Grow in', 'oblivion')
            );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);
        ?>
        <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
               <?php _e("Title (optional)", 'oblivion'); ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
         <p class="description">
            <label for="<?php echo $this->get_field_id('image') ?>">
                <?php _e("Upload image", 'oblivion') ?>
                <?php echo field_upload("animated_image",$block_id,$animated_image,'image');?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('delay') ?>">
               <?php _e("Data delay: (1-1000)", 'oblivion'); ?>
               <?php echo field_input('delay', $block_id, $delay, $size = 'full') ?>
            </label>
        </p>
        <p class="description half">
                <label for="<?php echo $this->get_field_id('type') ?>">
                    <?php _e("Animation type", 'oblivion') ?><br/>
                    <?php echo field_select('type', $block_id, $type_options, $type) ?>
                </label>
            </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('marg') ?>">
             <?php _e("Remove bottom spacing &nbsp;&nbsp;", 'oblivion'); ?>
                <?php echo field_checkbox('marg', $block_id, $marg, $check = 'true') ?>
            </label>
        </p>
        <?php
    }
    function pbblock($instance) {
        extract($instance);
        if($title) echo '<h3 class="widget-title">'.strip_tags($title).'</h3>';
        if($marg){
            echo '<div class="animated-no-margin">';
            echo '<img alt="" src="'.$animated_image.'" data-animation="'.$type.'" data-delay="'.$delay.'" class="img-with-animation" >';
            echo '</div>';
        }else{
            echo '<img alt="" src="'.$animated_image.'" data-animation="'.$type.'" data-delay="'.$delay.'" class="img-with-animation" >';
        }
     }
}