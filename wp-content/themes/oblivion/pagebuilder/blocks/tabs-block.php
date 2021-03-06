<?php
/* Tabs Block */
if(!class_exists('Tabs_Block')) {
    class Tabs_Block extends Block {
        function __construct() {
            $block_options = array(
                'name' => __('Tabs &amp; Toggles', 'oblivion'),
                'size' => 'span6',
            );
            //create the widget
            parent::__construct('Tabs_Block', $block_options);
            //add ajax functions
            add_action('wp_ajax_block_tab_add_new', array($this, 'add_tab'));
        }
        function form($instance) {
            $defaults = array(
                 'content' => '',
                'tabs' => array(
                    1 => array(
                        'title' => __('My New Tab', 'oblivion'),
                        'content' => __('My tab contents', 'oblivion'),
                    )
                ),
                'type'  => 'tab',
                'position'  => 'top',
            );
            $instance = wp_parse_args($instance, $defaults);
            extract($instance);
            $tab_types = array(
                'tab' => __('Tabs', 'oblivion'),
                'toggle' => __('Toggles', 'oblivion'),
                'accordion' => __('Accordion', 'oblivion')
            );
            $tab_position = array(
                'top' => __('Top', 'oblivion'),
                'bottom' => __('Bottom', 'oblivion'),
                'left' => __('Left', 'oblivion'),
                'right' => __('Right', 'oblivion'),
            );
            ?>
            <div class="description cf">
                  <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                <?php _e("Title (optional)", 'oblivion') ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
                <ul id="sortable-list-<?php echo $block_id ?>" class="sortable-list" rel="<?php echo $block_id ?>">
                    <?php
                    $tabs = is_array($tabs) ? $tabs : $defaults['tabs'];
                    $count = 1;
                    foreach($tabs as $tab) {
                        $this->tab($tab, $count);
                        $count++;
                    }
                    ?>
                </ul>
                <p></p>
                <a href="#" rel="tab" class="sortable-add-new button"><?php _e("Add New", 'oblivion') ?></a>
                <p></p>
            </div>
            <p class="description">
                <label for="<?php echo $this->get_field_id('type') ?>">
                    <?php _e("Tabs style", 'oblivion') ?><br/>
                    <?php echo field_select('type', $block_id, $tab_types, $type) ?>
                </label>
            </p>
            <p class="description">
                <label for="<?php echo $this->get_field_id('position') ?>">
                    <?php _e("Tabs position", 'oblivion') ?><br/>
                    <?php echo field_select('position', $block_id, $tab_position, $position) ?>
                </label>
            </p>
            <?php
        }
        function tab($tab = array(), $count = 0) {
            ?>
            <li id="<?php echo $this->get_field_id('tabs') ?>-sortable-item-<?php echo $count ?>" class="sortable-item" rel="<?php echo $count ?>">
                <div class="sortable-head cf">
                    <div class="sortable-title">
                        <strong><?php echo $tab['title'] ?></strong>
                    </div>
                    <div class="sortable-handle">
                        <a href="#"><?php _e("Open / Close", 'oblivion') ?></a>
                    </div>
                </div>
                <div class="sortable-body">
                    <p class="tab-desc description">
                        <label for="<?php echo $this->get_field_id('tabs') ?>-<?php echo $count ?>-title">
                            <?php _e("Tab Title", 'oblivion') ?><br/>
                            <input type="text" id="<?php echo $this->get_field_id('tabs') ?>-<?php echo $count ?>-title" class="input-full" name="<?php echo $this->get_field_name('tabs') ?>[<?php echo $count ?>][title]" value="<?php echo $tab['title'] ?>" />
                        </label>
                    </p>
                    <p class="tab-desc description">
                        <label for="<?php echo $this->get_field_id('tabs') ?>-<?php echo $count ?>-content">
                            <?php _e("Tab Content", 'oblivion') ?><br/>
                            <textarea id="<?php echo $this->get_field_id('tabs') ?>-<?php echo $count ?>-content" class="textarea-full" name="<?php echo $this->get_field_name('tabs') ?>[<?php echo $count ?>][content]" rows="5"><?php echo $tab['content'] ?></textarea>
                        </label>
                    </p>
                    <p class="tab-desc description"><a href="#" class="sortable-delete"><?php _e("Delete", 'oblivion') ?></a></p>
                </div>
            </li>
            <?php
        }
        function pbblock($instance) {
            extract($instance);
             if($title) echo '<h3>'.strip_tags($title).'</h3>';
            wp_enqueue_script('jquery-ui-tabs');
            $output = '';
            if($type == 'tab') {
                if($position == 'bottom'){
                    $output .= '<div id="block_tabs_'. rand(1, 100) .'" class="block_tabs"><div class="tab-inner">';
                    $i = 1;
                    foreach($tabs as $tab) {
                        $output .= '<div id="tab-'. sanitize_title( $tab['title'] ) . $i .'" class="tab tab-content">'. wpautop(do_shortcode(htmlspecialchars_decode($tab['content']))) .'</div>';
                        $i++;
                    }
                        $output .= '<ul class="nav cf nav-tabs">';
                    $i = 1;
                    foreach( $tabs as $tab ){
                        $tab_selected = $i == 1 ? 'ui-tabs-active' : '';
                        $output .= '<li class="'.$tab_selected.'"><a href="#tab-'. sanitize_title( $tab['title'] ) . $i .'">' . $tab['title'] . '</a></li>';
                        $i++;
                    }
                    $output .= '</ul>';
                $output .= '</div></div>';
                }else{
                $output .= '<div id="block_tabs_'. rand(1, 100) .'" class="block_tabs">';
                if($position == 'top'){
                $output .= '<div class="tab-inner">';
                }elseif($position == 'left'){
                $output .= '<div class="tabs-left">';
                }elseif($position == 'right'){
                $output .= '<div class="tabs-right">';
                }
                    $output .= '<ul class="nav cf nav-tabs">';
                    $i = 1;
                    foreach( $tabs as $tab ){
                        $tab_selected = $i == 1 ? 'ui-tabs-active' : '';
                        $output .= '<li class="'.$tab_selected.'"><a href="#tab-'. sanitize_title( $tab['title'] ) . $i .'">' . $tab['title'] . '</a></li>';
                        $i++;
                    }
                    $output .= '</ul>';
                    $i = 1;
                    foreach($tabs as $tab) {
                        $output .= '<div id="tab-'. sanitize_title( $tab['title'] ) . $i .'" class="tab tab-content">'. wpautop(do_shortcode(htmlspecialchars_decode($tab['content']))) .'</div>';
                        $i++;
                    }
                $output .= '</div></div>';
                }
            } elseif ($type == 'toggle') {
                $output .= '<div id="block_toggles_wrapper_'.rand(1,100).'" class="block_toggles_wrapper">';
                $i = 0;
                foreach( $tabs as $tab ){
                    $output  .= '<div class="block_toggle accordion-group ">';
                        $output .= '<a class="tab-head accordion-heading closed"><i class="icon-arrow-down"></i>&nbsp;&nbsp;'. $tab['title'] .'</a>';
                        $output .= '<div class="arrow"></div>';
                        $output .= '<div id="'.$i.'" class="tab-body cf wcontainer" style="display: none;">';
                            $output .= wpautop(do_shortcode(htmlspecialchars_decode($tab['content'])));
                        $output .= '</div>';
                    $output .= '</div>';
                    $i++;
                }
                $output .= '</div>';
            } elseif ($type == 'accordion') {
                $count = count($tabs);
                $i = 1;
                $output .= '<div id="block_accordion_wrapper_'.rand(1,100).'" class="block_accordion_wrapper ">';
                foreach( $tabs as $tab ){
                    $open = $i == 1 ? 'open' : 'close';
                    $child = '';
                    if($i == 1) $child = 'first-child';
                    if($i == $count) $child = 'last-child';
                    $i++;
                        $output .= '<a class="tab-head accordion-heading"  style="-moz-user-select: none;-webkit-user-select: none;" onselectstart="return false;">&nbsp;&nbsp;'. $tab['title'] .'</a> ';
                        $output .= '<div class="tab-body cf wcontainer" >';
                            $output .= wpautop(do_shortcode(htmlspecialchars_decode($tab['content'])));
                        $output .= '</div>';
                }
                $output .= '</div>';
            }
            echo $output;
        }
        /* AJAX add tab */
        function add_tab() {
            $nonce = $_POST['security'];
            if (! wp_verify_nonce($nonce, 'pb-settings-page-nonce') ) die('-1');
            $count = isset($_POST['count']) ? absint($_POST['count']) : false;
            $this->block_id = isset($_POST['block_id']) ? $_POST['block_id'] : 'block-9999';
            //default key/value for the tab
            $tab = array(
                'title' => __('New Tab', 'oblivion'),
                'content' => ''
            );
            if($count) {
                $this->tab($tab, $count);
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
}
