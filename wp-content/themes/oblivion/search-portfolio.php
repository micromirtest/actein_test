<?php get_header(); ?>
<div class="<?php if ( of_get_option('fullwidth') ) {  }else{ ?>container<?php } ?> blog">
   	<?php if ( of_get_option('fullwidth') ) { ?> <div class="container"> <?php } ?>
    <div class="row">
        <div class="span8">
             <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            $showposts = get_option( 'posts_per_page' );
            $args = array(
                'post_type' => array( 'post', 'portfolio'),
                'posts_per_page' => $showposts,
                'paged' => $paged,
                 's' => get_search_query(),
            );
            $new_query = new WP_Query($args );
            ?>
            <?php if ( $new_query->have_posts() ) : ?>
                <?php /* Start the Loop */ ?>
                <?php while ( $new_query->have_posts() ) : $new_query->the_post(); ?>
         <div class="blog-content wcontainer psearch-content">
         	<?php if(has_post_thumbnail()) {?> 
				<div><a href="<?php the_permalink(); ?>"> <?php the_post_thumbnail('thumbnail'); ?></a></div>
			<?php } ?>
                    <h2><a href="<?php the_permalink(); ?>"> <?php the_title(); ?> </a></h2>
                   <?php echo get_post_type( get_the_ID() ); ?>
         </div>
        <!-- /.blog-post -->
            <?php endwhile; ?>
            <?php else : ?>
               <div class="psearch-content">
           			<h4 class="entry-title"><?php _e( 'Nothing Found', 'oblivion' ); ?></h4>
                    <p><?php _e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'oblivion' ); ?></p>
                </div><!-- .entry-content -->
            <?php endif; ?>
              <div class="pagination">
            <ul>
              <li>
                <?php
            $additional_loop = new WP_Query('showposts='.$showposts.'&paged='.$paged.'&s='.get_search_query().'&post_type=array(post,portfolio)' );
            $page=$additional_loop->max_num_pages;
            echo kriesi_pagination($additional_loop->max_num_pages);
            ?>
            <?php wp_reset_query(); ?>
              </li>
            </ul>
         </div>
          <div class="clear"></div>
           </div>
   <div class="span4 sidebar">
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Footer widgets') ) : ?>
                <?php dynamic_sidebar('three'); ?>
           <?php endif; ?>
    </div>
    <!-- /.span4 -->
   </div>
		<?php if ( of_get_option('fullwidth') ) { ?> </div> <?php } ?> <!-- /container -->
</div>
<?php get_footer(); ?>