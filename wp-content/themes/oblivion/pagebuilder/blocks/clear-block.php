<?php
/** "Clear" block
 *
 * Clear the floats vertically
 * Optional to use horizontal lines/images
**/
class Clear_Block extends Block {
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => __('Clear','oblivion'),
			'size' => __('span12', 'oblivion'),
			'marg' => '',
		);
		//create the block
		parent::__construct('clear_block', $block_options);
	}
	function form($instance) {
		$defaults = array(
			'horizontal_line' => 'none',
			'line_color' => '#cccccc',
			'pattern' => '1',
			'height' => '1',
			'marg' => ''
		);
		$line_options = array(
			'none' => __('None','oblivion'),
			'single' => __('Single','oblivion'),
			'double' => __('Double','oblivion'),
			//'image' => 'Use Image',
		);
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		$line_color = isset($line_color) ? $line_color : '#cccccc';
		?>
		<p class="description note">
			<?php _e('Use this block to clear the floats between two or more separate blocks vertically.', 'oblivion') ?>
		</p>
		<p class="description fourth">
			<label for="<?php echo $this->get_field_id('line_color') ?>">
				<?php _e('Pick a horizontal line', 'oblivion') ?><br/>
				<?php echo field_select('horizontal_line', $block_id, $line_options, $horizontal_line, $block_id); ?>
			</label>
		</p>
		<div class="description fourth">
			<label for="<?php echo $this->get_field_id('height') ?>">
				<?php _e('Height (optional)', 'oblivion') ?><br/>
				<?php echo field_input('height', $block_id, $height, 'min', 'number') ?> px
			</label>
		</div>
		<div class="description half last">
			<label for="<?php echo $this->get_field_id('line_color') ?>">
				<?php _e('Pick a line color', 'oblivion') ?><br/>
				<?php echo field_color_picker('line_color', $block_id, $line_color, $defaults['line_color']) ?>
			</label>
		</div>
		<p class="description">
            <label for="<?php echo $this->get_field_id('marg') ?>">
             <?php _e('Add bottom spacing &nbsp;&nbsp;', 'oblivion') ?>
                <?php echo field_checkbox('marg', $block_id, $marg, $check = 'true') ?>
            </label>
        </p>
		<?php
	}
	function pbblock($instance) {
		extract($instance);
		switch($horizontal_line) {
			case 'none':
				break;
			case 'single':
				echo '<hr class="clear block-hr-single" style="background:'.$line_color.'; height:'.$height.'px; '.($marg?'margin-bottom:50px !important;':'').'" />';
				break;
			case 'double':
				echo '<hr class="clear block-hr-double" style="background:'.$line_color.'; height:'.$height.'px;"/>';
				echo '<hr class="clear block-hr-single" style="background:'.$line_color.'; height:'.$height.'px; '.($marg?'margin-bottom:50px !important;':'').'" />';
				break;
		/*	case 'image':
				echo '<hr class="block-clear block-hr-image cf"/>';
				break;*/
		}
/*
		if($height) {
			echo '<div class="cf" style=""></div>';
		}
*/
	}
}