<?php
/** A simple text block **/
class Skills_Block extends Block {
   function __construct() {
            $block_options = array(
                'name' => __('Skills', 'oblivion'),
                'size' => 'span8',
            );
            //create the widget
            parent::__construct('Skills_Block', $block_options);
            //add ajax functions
            add_action('wp_ajax_block_skill_add_new', array($this, 'add_skill'));
        }
        function form($instance) {
            $defaults = array(
                'textskill' => '',
                'skills' => array(
                    1 => array(
                        'title' => __('My New Skill', 'oblivion'),
                        'content' => '100',
                    )
                ),
                'type'  => 'skill',
            );
            $instance = wp_parse_args($instance, $defaults);
            extract($instance);
            $skill_types = array(
                'skill' => __('Skills', 'oblivion'),
        );
            ?>
            <div class="description cf">
             <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                <?php _e("Title (optional)", 'oblivion') ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('textskill') ?>">
                <?php _e("Content", 'oblivion') ?>
                <?php echo field_textarea('textskill', $block_id, $textskill, $size = 'full',  $number == '__i__' ? false : true) ?>
            </label>
        </p>
                <ul id="sortable-list-<?php echo $block_id ?>" class="sortable-list" rel="<?php echo $block_id ?>">
                    <?php
                    $skills = is_array($skills) ? $skills : $defaults['skills'];
                    $count = 1;
                    foreach($skills as $skill) {
                        $this->skill($skill, $count);
                        $count++;
                    }
                    ?>
                </ul>
                <p></p>
                <a href="#" rel="skill" class="sortable-add-new button"><?php _e("Add New", 'oblivion') ?></a>
                <p></p>
            </div>
            <?php
        }
        function skill($skill = array(), $count = 0) {
    ?>
            <li id="<?php echo $this->get_field_id('skills') ?>-sortable-item-<?php echo $count ?>" class="sortable-item" rel="<?php echo $count ?>">
                <div class="sortable-head cf">
                    <div class="sortable-title">
                        <strong><?php echo $skill['title'] ?></strong>
                    </div>
                    <div class="sortable-handle">
                        <a href="#"><?php _e("Open / Close", 'oblivion') ?></a>
                    </div>
                </div>
                <div class="sortable-body">
                    <p class="skill-desc description">
                        <label for="<?php echo $this->get_field_id('skills') ?>-<?php echo $count ?>-title">
                            <?php _e("Skill", 'oblivion') ?><br/>
                            <input type="text" id="<?php echo $this->get_field_id('skills') ?>-<?php echo $count ?>-title" class="input-full" name="<?php echo $this->get_field_name('skills') ?>[<?php echo $count ?>][title]" value="<?php echo $skill['title'] ?>" />
                        </label>
                    </p>
                    <p class="skill-desc description">
                        <label for="<?php echo $this->get_field_id('skills') ?>-<?php echo $count ?>-content">
                            <?php _e("Skill percentage (0-100)", 'oblivion') ?><br/>
                            <input type="text" id="<?php echo $this->get_field_id('skills') ?>-<?php echo $count ?>-content" class="input-full" name="<?php echo $this->get_field_name('skills') ?>[<?php echo $count ?>][content]" value="<?php echo $skill['content'] ?>" />
                        </label>
                    </p>
                    <p class="skill-desc description"><a href="#" class="sortable-delete"><?php _e("Delete", 'oblivion') ?></a></p>
                </div>
            </li>
            <?php
        }
        function pbblock($instance) {
            extract($instance);
            if($title) echo '<h3 class="widget-title">'.strip_tags($title).'</h3>';
            echo '<p>'.wpautop(do_shortcode(htmlspecialchars_decode($textskill))).'</p>';
            wp_enqueue_script('jquery-ui-tabs');
            $output = '';
                    $i = 1;
                    foreach( $skills as $skill ){
                        $output .= '<h6>' . $skill['title'] . '</h6>';
                        $output .= '<div class="progress progress-striped active">  <div style="width: '. $skill["content"] .'%;" data-original-title="'. $skill["content"].'%" data-toggle="tooltip" class="bar b-with-animation" data-animation="fade-in-from-left" data-delay="500"></div></div>';
                        $i++;
                    }
            echo $output;
        }
        /* AJAX add skill */
        function add_skill() {
            $nonce = $_POST['security'];
            if (! wp_verify_nonce($nonce, 'pb-settings-page-nonce') ) die('-1');
            $count = isset($_POST['count']) ? absint($_POST['count']) : false;
            $this->block_id = isset($_POST['block_id']) ? $_POST['block_id'] : 'block-9999';
            //default key/value for the skill
            $skill = array(
                'title' => __('New Skill', 'oblivion'),
                'content' => ''
            );
            if($count) {
                $this->skill($skill, $count);
            } else {
                die(-1);
            }
            die();
        }
        function update($new_instance, $old_instance) {
            $new_instance = recursive_sanitize($new_instance);
            return $new_instance;
        }
}