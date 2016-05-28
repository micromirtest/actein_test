<?php
/** Portfolio block **/
class Portfolio_Block extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('Portfolio', 'oblivion'),
            'size' => 'span12',
            'categories' => '',
            'alltab' => '',
            'projnum' => '',
            'tabbed' => '',
            'titleregular' =>'',
        );
        //create the block
        parent::__construct('portfolio_block', $block_options);
    }
    function form($instance) {
        $defaults = array(
            'text' => '',
        );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);

        $args = array(
            'type'                     => 'portfolio',
            'child_of'                 => 0,
            'parent'                   => '',
            'orderby'                  => 'name',
            'order'                    => 'ASC',
            'hide_empty'               => 1,
            'hierarchical'             => 1,
            'exclude'                  => '',
            'include'                  => '',
            'number'                   => '',
            'taxonomy'                 => 'portfolio-category',
            'pad_counts'               => false

        );

         $categories = get_categories( $args );
         $counter = 0;

        foreach ($categories as $cat) {
            $cats[$cat->cat_ID] = $cat->cat_name;
        }
        ?>
        <p class="description">
            <label for="<?php echo $this->get_field_id('newscats') ?>">
                <?php _e("Check categories you want to include", 'oblivion'); ?><br />
                <?php echo field_checkboxfromarray('newscats', $block_id, $cats, $instance['newscats']) ?>
            </label>
        </p>
         <p class="description">
            <label for="<?php echo $this->get_field_id('projnum') ?>">
                 <?php _e("Number of projects to show", 'oblivion'); ?>
                <?php echo field_input('projnum', $block_id, $projnum, $size = 'full') ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                 <?php _e("Title (optional)", 'oblivion'); ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
          <p class="description">
            <label for="<?php echo $this->get_field_id('alltab') ?>">
                 <?php _e("Name of first tab (optional and for tabbed display only)", 'oblivion'); ?>
                <?php echo field_input('alltab', $block_id, $alltab, $size = 'full') ?>
            </label>
        </p>
         <p class="description">
            <label for="<?php echo $this->get_field_id('tabbed') ?>">
              <?php _e("Display without tabs &nbsp;&nbsp;", 'oblivion'); ?>
                <?php echo field_checkbox('tabbed', $block_id, $tabbed, $check = 'true') ?>
            </label>
        </p>
        <?php
    }
    function pbblock($instance) {
        extract($instance);
        ?>
        <?php if($projnum == ''){$projnum = -1;} ?>
        <?php  if($tabbed){ ?>
       <div class="portfolio-block block">
       <?php if($title){ echo '<div class="title-wrapper"><h3 class="widget-title">'.strip_tags($title).'</h3><div class="clear"></div></div>'; }else{ echo '<div class="title-wrapper"><h3 class="widget-title">Portfolio</h3><div class="clear"></div></div>';  } ?>

          <ul id="list" class="iso portfolio-grid span12">
               <?php

               if (is_array($newscats)) {
                $myArray = $newscats;
                foreach ($myArray as &$value)$value;
                $value = implode(',',  $myArray);;
            } else {
                $value="";
            }

               $args = array( 'taxonomy' => 'portfolio',    'include'  => $value,  'hide_empty'    => true);
               $terms = get_terms('portfolio-category', $args);
               foreach ($terms as $term) {
                    $termsarray[]= $term->term_id;
                }
                $post_ids = get_objects_in_term( $termsarray, 'portfolio-category' ); ?>
                <?php query_posts(array( 'post_type' => 'portfolio' , 'posts_per_page' => $projnum, 'post__in' => $post_ids ));?>
                 <?php $i = 0; ?>
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                     <li data-id="id-<?php echo $i; ?>" class="span3 <?php  global $post;$terms = get_the_terms( $post->ID, 'portfolio-category' );
                      foreach ($terms as $term) {
                       echo substr($term->name, 0, 4);echo ' '; }
                      ?>">
                    <div class="pimage">
                        <div class="pbg"></div>
                        <div class="pdisplay">
                            <a href=" <?php $image_id = get_post_thumbnail_id();
                                $image_url = wp_get_attachment_image_src($image_id,'full', true);
                                echo $image_url[0];  ?>" class="vimage shadowbox"><?php _e("View image", 'oblivion'); ?></a>
                            <a class="minfo" href="<?php the_permalink() ?>"><?php _e("More info", 'oblivion'); ?></a>
                        </div>
                        <?php if(has_post_thumbnail()){

                            $thumb = get_post_thumbnail_id();
                            $img_url = wp_get_attachment_url( $thumb,'full'); //get img URL
                            $image = aq_resize( $img_url, 287, 222, true, '', true ); //resize & crop img
                            ?>
                            <img class="attachment-small wp-post-image" src="<?php echo $image[0]; ?>" />

                    <?php } else{ ?>
                        <img class="attachment-small wp-post-image" src="<?php echo get_template_directory_uri().'/img/defaults/287x222.jpg'?> "/>
                    <?php } ?>
                    </div>
                    <div class="ptitle">
                        <h4><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h4>
                        <span><?php the_time('jS F Y') ?></span>
                    </div>
                      <div class="plove"><?php if( function_exists('heart_love') ) heart_love(); ?></div>
                </li>
                 <?php $i++; endwhile;endif; ?>
                 <?php wp_reset_query(); ?>
          </ul>
          <div class="clear"></div>
        </div><!-- portfolio-block block -->
        <?php }else{ ?>
            <div class="portfolio-block block block_tabs">
               <?php if($title){ echo '<div class="title-wrapper"><h3 class="widget-title">'.strip_tags($title).'</h3><div class="clear"></div></div>'; }else{ echo '<div class="title-wrapper"><h3 class="widget-title">Portfolio</h3><div class="clear"></div></div>';  } ?>
            <ul  class="cat nav-tabs nav" >
                 <li><a href="*" ><?php if($alltab){ echo strip_tags($alltab); }else{ echo __('Everything', 'oblivion');  } ?></a></li>
                 <?php
                      if (is_array($newscats)) {
                        $myArray = $newscats;
                        foreach ($myArray as &$value)$value;
                            $value = implode(',',  $myArray);;
                            } else {
                            $value="";
                        }

                    $post_ids = get_objects_in_term( $value, 'portfolio-category' ) ;
                    $args = array( 'taxonomy' => 'portfolio',    'include'  => $value,  'hide_empty'    => true, 'post__not_in' => $post_ids  );
                    $terms = get_terms('portfolio-category', $args);
                    $count = count($terms); $i=0;
                    if ($count > 0) {
                    foreach ($terms as $term) {
                    $i++;
                    echo '<li><a href=".' . ($term->term_id) . '">' . $term->name . '</a></li>';
                }}  ?>
            </ul>

               <div class="iso span12 wcontainer"> <!-- new line -->

                <?php
                foreach ($terms as $term) {
                    $termsarray[]= $term->term_id;
                }
                $post_ids = get_objects_in_term( $termsarray, 'portfolio-category' ) ;  ?>
                <?php query_posts(array( 'post_type' => 'portfolio' , 'posts_per_page' => $projnum, 'post__in' => $post_ids )); ?>
                 <?php $i = 0; ?>
                <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

               <div class="<?php  global $post;$terms = get_the_terms( $post->ID, 'portfolio-category' );
                      foreach ($terms as $term) {
                       echo $term->term_id;echo ' '; }
                      ?>">

                <div class="img_thumb entry-thumb pimage" style="" data-overlay="<?php the_title_attribute(); ?>">
                        <div class="pbg"></div>
                        <div class="pdisplay">
                            <a href=" <?php $image_id = get_post_thumbnail_id();
                                $image_url = wp_get_attachment_image_src($image_id,'full', true);
                                echo $image_url[0];  ?>" class="vimage shadowbox"><?php _e("View image", 'oblivion'); ?></a>
                            <a class="minfo" href="<?php the_permalink() ?>"><?php _e("More info", 'oblivion'); ?></a>
                        </div>
                       <?php if(has_post_thumbnail()){

                            $thumb = get_post_thumbnail_id();
                            $img_url = wp_get_attachment_url( $thumb,'full'); //get img URL
                            $image = aq_resize( $img_url, 287, 222, true, '', true ); //resize & crop img
                            ?>
                            <img class="attachment-small wp-post-image" src="<?php echo $image[0]; ?>" />

                    <?php } else{ ?>
                        <img class="attachment-small wp-post-image" src="<?php echo get_template_directory_uri().'/img/defaults/287x222.jpg'?> "/>
                    <?php } ?>


                </div>

                 <div class="ptitle">
                        <h4><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h4>
                        <span><?php the_time('jS F Y') ?></span>
                    </div>
                 <div class="plove"><?php if( function_exists('heart_love') ) heart_love(); ?></div>
            </div>




                 <?php $i++; endwhile;endif; ?>
                 <?php wp_reset_query(); ?>
              </div>
              <div class="clear"></div>
        </div>
        <?php } ?>
        <?php
  }
}