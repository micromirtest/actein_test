<?php
/** A simple text block **/
class Highlight_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('Highlight', 'oblivion'),
            'size' => 'span12',
            'htext' => '',
            'hbutton' => '',
            'hlink' => '',
            'marg' => '',
        );
        //create the block
        parent::__construct('highlight_block', $block_options);
    }
    function form($instance) {
        $defaults = array(
            'text' => '',
        );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);
        ?>
        <p class="description">
            <label for="<?php echo $this->get_field_id('htext') ?>">
               <?php _e("Highlight text", 'oblivion') ?>
                <?php echo field_input('htext', $block_id, $htext, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('hbutton') ?>">
               <?php _e("Highlight button text", 'oblivion') ?>
                <?php echo field_input('hbutton', $block_id, $hbutton, $size = 'full') ?>
            </label>
        </p>
         <p class="description">
            <label for="<?php echo $this->get_field_id('hlink') ?>">
               <?php _e("Highlight button link", 'oblivion') ?>
                <?php echo field_input('hlink', $block_id, $hlink, $size = 'full') ?>
            </label>
        </p>
           <p class="description">
            <label for="<?php echo $this->get_field_id('marg') ?>">
            <?php _e("Remove bottom spacing &nbsp;&nbsp;", 'oblivion') ?>
                <?php echo field_checkbox('marg', $block_id, $marg, $check = 'true') ?>
            </label>
        </p>
        <?php
    }
    function pbblock($instance) {
        extract($instance);
        if($marg){
         echo '<div class="highlight-no-margin highlight bgpattern span12">';
        }else{
           echo '<div class="highlight bgpattern span12">';
        }
         echo '<div class="container">
            <h2>'.strip_tags($htext).'</h2>';
         if(substr($hlink, 0, 7) != 'http://'){if(substr($hlink, 0, 8) == 'https://'){}else{$hlink = 'http://'.$hlink;}}
         echo   '<a href="'.strip_tags($hlink).'" class="button-medium pull-right">'.strip_tags($hbutton).'</a>
        </div>
        </div>
        ';
    }
}