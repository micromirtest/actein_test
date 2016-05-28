<?php
/* Media Uploader Block */
if(!class_exists('Upload_Block')) {
    class Upload_Block {
        function __construct() {
            $block_options = array(
                'name' => __('Media', 'oblivion'),
                'size' => 'span6',
            );
            //create the block
            parent::__construct('upload_block', $block_options);
        }
        function form($instance) {
            $defaults = array(
                'media' => '',
            );
            $instance = wp_parse_args($instance, $defaults);
            extract($instance);
        }
        function pbblock($instance) {
            if($title) echo '<h4 class="block-title">'.strip_tags($title).'</h4>';
        }
    }
}
