<?php
$search_refer = $_GET["post_type"];
if ($search_refer == 'post') { load_template(TEMPLATEPATH . '/search-post.php'); }else{
load_template(TEMPLATEPATH . '/search-portfolio.php'); }
?>
