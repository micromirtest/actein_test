<div id="right_wrapper">

    <?php  if ( function_exists('dynamic_sidebar')){
        global $post;
        global $woocommerce;
        $posttype = get_post_type($post);


    if( ((is_archive()) || (is_author()) || (is_category()) || (is_home()) || (is_single()) || (is_tag())) && ( $posttype == 'post') ) {
    ?>
     <div id="search">
    <form method="get" id="searchform" action="<?php  echo home_url(); ?>">
      <input type="text" onblur="if(this.value =='') this.value='search'" onfocus="if (this.value == 'search') this.value=''" value="search" name="s" class="required" id="s" />
      <input type="submit" value=""/>
    </form>
    </div>
    <?php
        dynamic_sidebar('Right sidebar ');
    }
    elseif($woocommerce && is_shop() || $woocommerce && is_product_category() || $woocommerce && is_product_tag() || $woocommerce && is_product()){
        dynamic_sidebar('WooCommerce Sidebar');
    }
    else {
         ?>
     <div id="search">
    <form method="get" id="searchform" action="<?php  echo home_url(); ?>">
      <input type="text" onblur="if(this.value =='') this.value='search'" onfocus="if (this.value == 'search') this.value=''" value="search" name="s" class="required" id="s" />
      <input type="submit" value=""/>
    </form>
    </div>
    <?php
        dynamic_sidebar('Right sidebar ');
    }} ?>
  <!-- Right wrapper end -->
</div>
