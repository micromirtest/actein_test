<?php

/*
  Plugin Name: Actein Product Type
  Description: Actein Product Type
  Author: Cezary Siwa
  Version: 1.0
  Plugin URI: http://cezary-siwa.pl
  Author URI: http://cezary-siwa.pl
 */


add_filter('product_type_selector', 'add_product_type');

function add_product_type($types) {
    $types['actein'] = __('Actein');
    return $types;
}

//add_action('plugins_loaded', 'create_custom_product_type');

function create_custom_product_type() {

    class WC_Product_Actein extends WC_Product {

        public function __construct($product) {
            $this->product_type = 'actein';
            parent::__construct($product);
        }

    }

}

add_action('woocommerce_product_options_general_product_data', 'wdm_add_custom_settings');

function wdm_add_custom_settings() {
    global $woocommerce, $post;
    echo '<div class="options_group">';

     woocommerce_wp_text_input(
            array(
                'id' => 'actein_date',
                'label' => __('Date of start', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('Enter the date of event.', 'woocommerce'),
                'type' => 'date'
    ));
     
    // Create a number field, for example for UPC
    woocommerce_wp_text_input(
            array(
                'id' => 'actein_start_at',
                'label' => __('Hour of start', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('For example 7:30PM', 'woocommerce'),
                'type' => 'text'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'actein_date_end',
                'label' => __('Date of end', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('Enter the date of event.', 'woocommerce'),
                'type' => 'date'
    ));
     
    // Create a number field, for example for UPC
    woocommerce_wp_text_input(
            array(
                'id' => 'actein_end_at',
                'label' => __('Hour of end', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('For example 7:30PM', 'woocommerce'),
                'type' => 'text'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'actein_duration',
                'label' => __('Duration (min)', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('For example 90 min', 'woocommerce'),
                'type' => 'number'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'min_players',
                'label' => __('Min. Players', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('', 'woocommerce'),
                'type' => 'number'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'max_players',
                'label' => __('Number of players per slot', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('', 'woocommerce'),
                'type' => 'number'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'telephone',
                'label' => __('Telephone', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('', 'woocommerce'),
                'type' => 'number'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'min_lockout_players',
                'label' => __('Min Lockout Players', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('', 'woocommerce'),
                'type' => 'number'
    ));
    
    woocommerce_wp_text_input(
            array(
                'id' => 'price_lockout_slot',
                'label' => __('Price per slot for lockout', 'woocommerce'),
                'placeholder' => '',
                'desc_tip' => 'true',
                'description' => __('', 'woocommerce'),
                'type' => 'number'
    ));

    // Create a checkbox for product purchase status
   

    echo '</div>';
}
add_action( 'woocommerce_process_product_meta', 'wdm_save_custom_settings' );

function wdm_save_custom_settings($post_id) {

   
    if (isset($_POST['actein_slots']))
    {
        update_post_meta($post_id, 'actein_slots', esc_attr($_POST['actein_slots']));
    }        
    if (isset($_POST['actein_date']))
    {
        update_post_meta($post_id, 'actein_date', esc_attr($_POST['actein_date']));
    }    
    if (isset($_POST['actein_start_at']))
    {
        update_post_meta($post_id, 'actein_start_at', esc_attr($_POST['actein_start_at']));
    }    
    if (isset($_POST['actein_date_end']))
    {
        update_post_meta($post_id, 'actein_date_end', esc_attr($_POST['actein_date_end']));
    }    
    if (isset($_POST['actein_end_at']))
    {
        update_post_meta($post_id, 'actein_end_at', esc_attr($_POST['actein_end_at']));
    }    
    if (isset($_POST['actein_duration']))
    {
        update_post_meta($post_id, 'actein_duration', esc_attr($_POST['actein_duration']));
    }    
    
}
