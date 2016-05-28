<?php
/** A simple text block **/
class Page_Header_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('Page Header', 'oblivion'),
            'size' => 'span12',
            'title2' => '',
        );
        //create the block
        parent::__construct('page_header_block', $block_options);
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
                <?php _e("Title", 'oblivion'); ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('title2') ?>">
                <?php _e("Subtitle", 'oblivion'); ?>
                <?php echo field_input('title2', $block_id, $title2, $size = 'full') ?>
            </label>
        </p>
        <?php
    }
    function pbblock($instance) {
        extract($instance);
		echo '<div class="span12 block-title centered">
			<h2>'.strip_tags($title).'</h2>
			<p>'.strip_tags($title2).'</p>
		</div><div class="span12 block-divider"></div>';
    }
}