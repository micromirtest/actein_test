<?php
/** A simple text block **/
class News_Block_Tabbed extends Block {
    //set and create block
    function __construct() {
        $block_options = array(
            'name' => __('News block - Tabbed', 'oblivion'),
            'size' => 'span3',
        );
        //create the block
        parent::__construct('news_block_tabbed', $block_options);
    }
    function form($instance) {
        $defaults = array(
           'title' => '',
           'newscats' => '',
           'projnumber'=> ''
        );
        $instance = wp_parse_args($instance, $defaults);
        extract($instance);
          $args = array(
            'type'                     => 'post',
            'child_of'                 => 0,
            'parent'                   => '',
            'orderby'                  => 'name',
            'order'                    => 'ASC',
            'hide_empty'               => 1,
            'hierarchical'             => 1,
            'exclude'                  => '',
            'include'                  => '',
            'number'                   => '',
            'taxonomy'                 => 'category',
            'pad_counts'               => false

        );

         $categories = get_categories( $args );
        foreach ($categories as $cat) {
            $cats[$cat->cat_ID] = $cat->cat_name;
        }
        ?>
          <p class="description">
            <label for="<?php echo $this->get_field_id('title') ?>">
                <?php _e("Title (optional)", 'oblivion'); ?>
                <?php echo field_input('title', $block_id, $title, $size = 'full') ?>
            </label>
        </p>
         <p class="description">
            <label for="<?php echo $this->get_field_id('newscats') ?>">
                <?php _e("Check categories you want to include", 'oblivion'); ?><br />
                <?php echo field_checkboxfromarray('newscats', $block_id, $cats, $instance['newscats']) ?>
            </label>
        </p>
        <p class="description">
            <label for="<?php echo $this->get_field_id('projnumber') ?>">
            <?php _e("Number of posts to show", 'oblivion'); ?>
                <?php echo field_input('projnumber', $block_id, $projnumber, $size = 'full') ?>
            </label>
        </p>

        <?php
    }
    function pbblock($instance) {
        extract($instance);
       ?>
    <?php if($projnumber == ''){$projnumber = 5;} ?>
    <?php if($title) echo '<h3 class="widget-title">'.$title.'</h3>';?>
    <div class="news_tabbed">
        <div id="block_tabs_<?php echo  rand(1, 100); ?>" class="block_tabs">
            <div class="tab-inner">
                <ul class="nav cf nav-tabs">

                 <?php
                    wp_enqueue_script('jquery-ui-tabs');
                      if (is_array($newscats)) {
                        $myArray = $newscats;
                        foreach ($myArray as &$value)$value;
                        $value = implode(',',  $myArray);;
                    } else {
                        $value="";
                    }

                    $post_ids = get_objects_in_term( $value, 'category' ) ;
                    $args = array( 'taxonomy' => 'category',    'include'  => $value,  'hide_empty'    => true, 'post__in' => $post_ids  );
                    $terms = get_terms('category', $args);
                    $count = count($terms); $i=0;
                    if ($count > 0) {
                    foreach ($terms as $term) {
                    $i++;
                    $tab_selected = $i == 1 ? 'ui-tabs-active' : '';
                    $active = $i == 1 ? 'true' : 'false';
                    $tabindex = $i == 1 ? 0 : -1;

                    echo '<li class="'.$tab_selected.'">
                            <a href="#tab-' . $term->id. ''.$i.'">' . $term->name . '</a>
                        </li>';
                                                }
                                    }  ?>
                </ul>
                <div class="wcontainer">
                <?php
                $j=0;
                foreach ($terms as $term) {
                $j++;
                $termsarray=array();
                $termsarray[]= $term->term_id; ?>
                    <div class="tab tab-content" id="tab-<?php echo $term->id ;echo $j; ?>" >
                        <ul class="newsbv">
                        <?php $post_ids = get_objects_in_term( $termsarray, 'category' ); ?>

                            <?php query_posts(array(  'posts_per_page' => $projnumber, 'post__in' => $post_ids )); ?>
                            <?php $i = 0; ?>
                            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                                <li class="<?php if( $i == 0 ) { ?>newsbv-item-first<?php }else{ echo 'newsbv-item'; }?>">
                                    <div class="newsb-thumbnail">
                                        <a rel="bookmark" href="<?php the_permalink(); ?>">

                                            <?php if(strlen( $img = get_the_post_thumbnail( get_the_ID(), array( 150, 150 ) ) ) ){

                                                    $thumb = get_post_thumbnail_id();
                                                    $img_url = wp_get_attachment_url( $thumb,'full'); //get img URL

                                                    if($i == 0){
                                                    $image = aq_resize( $img_url, 305, 305, true, '', true ); //resize & crop img

                                                        }else{
                                                    $image = aq_resize( $img_url, 75, 75, true, '', true ); //resize & crop img
                                                        }
                                                    ?>
                                                    <img src="<?php echo $image[0]; ?>" />

                                            <?php } else{
                                                        if($i == 0){ ?>
                                                        <img src="<?php echo get_template_directory_uri().'/img/defaults/305x305.jpg'?> "/>
                                                    <?php }else{  ?>
                                                        <img src="<?php echo get_template_directory_uri().'/img/defaults/75x75.jpg'?> "/>
                                            <?php   }

                                                }?>
                                            <span class="overlay-link"></span>
                                        </a>
                                    </div><!--newsb-thumbnail -->

                                        <h4 class="newsbv-title"><a rel="bookmark"href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                        <p class="post-meta">
                                        <i class="icon-calendar"></i> <?php the_time('F j, Y'); ?> - <i class="icon-comment"></i>   <?php if ( is_plugin_active( 'disqus-comment-system/disqus.php' )){ ?>
                        <a  href="<?php echo the_permalink(); ?>#comments" >
                        <?php comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion') ) ?></a> &nbsp;
                       <?php }else{ ?>
                        <a data-original-title="<?php comments_number( __('No comments in this post', 'oblivion'), __('One comment in this post', 'oblivion'), __('% comments in this post', 'oblivion')); ?>" href="<?php echo the_permalink(); ?>#comments" data-toggle="tooltip">
                        <?php comments_number( __('No comments', 'oblivion'), __('One comment', 'oblivion'), __('% comments', 'oblivion') ); ?></a> &nbsp;

                       <?php } ?>
                                        </p>
                                        <?php if( $i == 0 ) : ?>
                                        <?php global $more; $more = 1; echo substr(get_the_excerpt(), 0,198);echo '[...]' ?>
                                        <?php endif; ?>

                                </li>
                        <?php $i++; endwhile;endif; ?>

                    <?php wp_reset_query(); ?>
                        </ul>
                        <div class="clear"></div>
                    </div><!--tab-content -->
                 <?php } ?>
            </div>
        </div>
    </div>
</div>
<div class="clear"></div>
<?php
  }
}
?>