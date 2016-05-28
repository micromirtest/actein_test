<div id="location-selector">
    <?php
    $current_location = get_post($_SESSION['location']);
    
    $locations = get_posts(array(
       'posts_per_page'=>-1,
        'post_type'=>'locations'
    ));
    ?>
    <form action="" id="change_location_form" method="post">
        <strong>Current location:</strong> 
        <select id="change_location" name="change_location">
            <?php foreach($locations as $location):?>
            <option <?php if($current_location->ID==$location->ID):?>selected="selected"<?php endif ?> value="<?php echo $location->ID ?>"><?php echo $location->post_title ?></option>
            <?php endforeach ?>
        </select>
    </form>
</div>