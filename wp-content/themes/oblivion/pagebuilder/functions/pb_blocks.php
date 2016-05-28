<?php
/**
 * Page Builder Blocks
 * @desc Contains block elements to be inserted into custom page templates
 * @since 1.0.0
 * @todo add tooltip to explain option (hover on ? icon)
 */
// Text Block
function block_text($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_text">
			<?php _e("Content", 'oblivion'); ?>
			<textarea id="<?php echo $block_id ?>_text" class="textarea-full" name="<?php echo $block_saving_id ?>[text]" rows="5"><?php echo $text ?></textarea>
		</label>
	</p>
	<?php
}
//slogan
function block_slogan($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_text">
			<?php _e("Enter your text slogan below", 'oblivion'); ?>
			<textarea id="<?php echo $block_id ?>_text" class="textarea-full" name="<?php echo $block_saving_id ?>[text]" rows="5"><?php echo $text ?></textarea>
		</label>
	</p>
	<?php
}
// Slider
function block_slider($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_slide">
		<?php
		$args = array (
			'nopaging' => true,
			'post_type' => 'slider',
			'status' => 'publish',
		);
		$slides = get_posts($args);
		echo '<select id="'.$block_id.'" class="select" name="'.$block_saving_id.'[slide]">';
			echo '<option>Choose a slider</option>';
			foreach($slides as $slide) {
				echo '<option value="'.$slide->ID.'">'.htmlspecialchars($slide->post_title).'</option>';
			}
		echo '</select>';
		?>
		</label>
	</p>
	<p class="description description-float">
		<label for="<?php echo $block_id ?>_speed">
			<?php _e("Slider Speed", 'oblivion'); ?><br/>
			<input type="text" class="input-small" id="<?php echo $block_id ?>_speed" value="<?php echo $speed ?>" name="<?php echo $block_saving_id ?>[speed]">
		</label>
	</p>
	<p class="description description-float">
		<label for="<?php echo $block_id ?>_transition">
			<?php _e("Slider Speed", 'oblivion'); ?><br/>
			<input type="text" class="input-small" id="<?php echo $block_id ?>_speed" value="<?php echo $speed ?>" name="<?php echo $block_saving_id ?>[speed]">
		</label>
	</p>
	<?php
}
// Google Map
function block_googlemap($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	?>
	<p class="description half">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description half last">
		<label for="<?php echo $block_id ?>_address">
			<?php _e("Address", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_address" value="<?php echo $address ?>" name="<?php echo $block_saving_id ?>[address]">
		</label>
	</p>
	<p class="description two-third">
		<label for="<?php echo $block_id ?>_coordinates">
			<?php _e("Coordinates (optional) e.g. '3.82497,103.32390'", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_coordinates" value="<?php echo $coordinates ?>" name="<?php echo $block_saving_id ?>[coordinates]">
		</label>
	</p>
	<p class="description third last">
		<label for="<?php echo $block_id ?>_height">
			<?php _e("Map height, in pixels.", 'oblivion'); ?><br/>
			<input type="number" class="input-min" id="<?php echo $block_id ?>_height" value="<?php echo $height ?>" name="<?php echo $block_saving_id ?>[height]"> &nbsp; px
		</label>
	</p>
	<?php
}
// Portfolio
function block_portfolio($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks['.$block_id.']';
	$columns_options = array(
		'one' => 'Single',
		'two' => 'Two Columns',
		'three' => 'Three Columns',
		'four' => 'Four Columns',
	);
	//todo image as checkbox
	$types = ''; //get all portfolio 'type' taxonomy terms
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="">
			<?php _e("Number of Columns", 'oblivion'); ?><br/>
			<?php echo pb_select($columns_options, $columns, $block_id, 'columns'); ?>
		</label>
	</p>
	<?php
}
function block_featured_portfolio($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_items">
			<?php _e("Maximum number of items", 'oblivion'); ?><br/>
			<input type="number" class="input-min" id="<?php echo $block_id ?>_items" value="<?php echo $items ?>" name="<?php echo $block_saving_id ?>[items]">
		</label>
	</p>
	<?php
}
function block_widgets($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'block_' . $number;
	$block_saving_id = 'blocks[block_'.$number.']';
	//get all registered sidebars
	global $wp_registered_sidebars;
	$sidebar_options = array();
	foreach ($wp_registered_sidebars as $registered_sidebar) {
		$sidebar_options[$registered_sidebar['id']] = $registered_sidebar['name'];
	}
	?>
	<p class="description half">
		<label for="<?php echo $block_id ?>_title">
			<?php _e("Title (optional)", 'oblivion'); ?><br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description half last">
		<label for="">
			<?php _e("Choose sidebar/widget area", 'oblivion'); ?><br/>
			<?php echo pb_select($sidebar_options, $sidebar, $block_id, 'sidebar'); ?>
		</label>
	</p>
	<?php
}
function block_column($block) {
	echo '<p class="empty-column">',
	__('Drag block items into this box', 'oblivion'),
	'</p>';
	echo '<ul class="blocks column-blocks cf"></ul>';
}
function block_clear($block) {
	echo '<p class="description">',
	__('This block has no editable attributes. You can use it to clear the floats between two or more separate blocks vertically.', 'oblivion');
	echo '</p>';
}
/**
 * Ajax drag n drop slider handler
 *
 * This can be served as an example how you can provide custom
 * ajax handler and use in the blocks
 *
 * Also see the pb_config on adding extra js
 */
function ajax_slider_handler() {
}
function ajax_slider_display() {
}
?>