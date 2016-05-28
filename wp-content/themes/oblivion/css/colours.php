<style>

/* Customs colours for the site
 *
 * Include colours and backgrounds
 *
 * */


.navbar .nav li.current_page_item a:hover, .navbar .nav li.current-menu-parent a:hover, a, .dropdown-menu li > a:hover, .wallnav i,  div.rating:after, footer .copyright .social a:hover , .member:hover > .member-social a{
	color:<?php echo of_get_option('link_color'); ?>;
}
.cart-notification span.item-name, .woocommerce div.product p.price, .price span.amount, .woocommerce .widget_shopping_cart .total span{
	color:<?php echo of_get_option('link_color'); ?> !important;
}

.gallery-item a img{
	border-color:<?php echo of_get_option('link_color'); ?>;
}
.splitter li[class*="selected"] > a, .splitter li a:hover, .ls-wp-container .ls-nav-prev, .ls-wp-container .ls-nav-next, .block_tabs .nav-tabs li a, a.ui-accordion-header-active, .accordion-heading:hover, .block_accordion_wrapper .ui-state-hover, .cart-wrap, #buddypress div.item-list-tabs ul li a, .member:hover > .bline{
	background-color:<?php echo of_get_option('link_color'); ?>;
}
.portfolio .row .span8 .plove a:hover, .span3 .plove a:hover, .icons-block i:hover,
 .similar-projects ul li h3, footer ul li a:hover,
 .member h3, .member span, .main-colour,
  .dropdown-menu li > a:focus, .dropdown-submenu:hover > a,  .pagination ul > li > a:hover, .pagination ul > li > a:focus,
  .comment-body .comment-author,  .navigation a:hover, .cart-wrap a{
    color:<?php echo of_get_option('secondary_color'); ?>;
}
.block h3:first-child, .tagcloud a:hover, .progress-striped .bar ,  .bgpattern:hover > .icon, .progress-striped .bar, .blog-date span.date, .blog-date-noimg span.date,
 .pbg, .pbg:hover, .pimage:hover > .pbg, .nav-tabs > li > a:hover, .nav-tabs > li.active > a, ul.social-media li a:hover, .navbar .nav li.dropdown:hover, .navbar .nav li.current-menu-parent:hover, .block_tabs .nav-tabs li.ui-state-active a, .navigation a ,
 .nav-tabs > li > a:hover, .nav-tabs > li > a:focus , .pagination ul > .active > a, .pagination ul > .active > span, .list_carousel a.prev:hover, .list_carousel a.next:hover, .title_wrapper, .pricetable .pricetable-col.featured .pt-price, .block_toggle .open, .pricetable .pricetable-featured .pt-price, #bbpress-forums li.bbp-header, .isotopeMenu, #bbpress-forums fieldset.bbp-form legend, .bbp-topic-title h3, .modal-header, .modal-body .reg-btn, #LoginWithAjax_SubmitButton .reg-btn, h3.widget-title, .footer_widget h3, .widget h3, buddypress div.item-list-tabs ul li.selected a, #buddypress div.item-list-tabs ul li.current a, #buddypress div.item-list-tabs ul li a:hover{
    background-color:<?php echo of_get_option('secondary_color'); ?>;
}

.navbar-inverse, .bgpattern, .post-review, .widget_shopping_cart, .woocommerce .cart-notification, .cart-notification{
	background-color:<?php echo of_get_option('primary_color'); ?>;

}
.button-medium, .button-small, .button-big, button[type="submit"], input[type="submit"]{
	background-color:<?php echo of_get_option('button'); ?>;
}
.button-medium:hover, .button-small:hover, .button-big:hover, .blog-date span.date:hover, input[type="submit"]:hover ,button[type="submit"]:hover, .pricetable .pricetable-col.featured .pt-top, .pricetable .pricetable-featured .pt-top{
    background-color: <?php echo of_get_option('button_hover'); ?>;
}


.woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit, .woocommerce #content input.button, .woocommerce-page a.button, .woocommerce-page button.button, .woocommerce-page input.button, .woocommerce-page #respond input#submit, .woocommerce-page #content input.button, .woocommerce div.product .woocommerce-tabs ul.tabs li a, .woocommerce #content div.product .woocommerce-tabs ul.tabs li a, .woocommerce-page div.product .woocommerce-tabs ul.tabs li a, .woocommerce-page #content div.product .woocommerce-tabs ul.tabs li a {
	background: <?php echo of_get_option('button'); ?>  !important;
}


.woocommerce a.button:hover, .woocommerce button.button:hover, .woocommerce input.button:hover, .woocommerce #respond input#submit:hover, .woocommerce #content input.button:hover, .woocommerce-page a.button:hover, .woocommerce-page button.button:hover, .woocommerce-page input.button:hover, .woocommerce-page #respond input#submit:hover, .woocommerce-page #content input.button:hover, .woocommerce div.product .woocommerce-tabs ul.tabs li.active a, .woocommerce #content div.product .woocommerce-tabs ul.tabs li.active a, .woocommerce-page div.product .woocommerce-tabs ul.tabs li.active a, .woocommerce-page #content div.product .woocommerce-tabs ul.tabs li.active a, .woocommerce table.cart td.actions .button.checkout-button {
	background: <?php echo of_get_option('button_hover'); ?>  !important;
}

.woocommerce-page .product-wrap a.button{
	background-color:<?php echo of_get_option('button'); ?> !important;
}
.woocommerce-page .product-wrap a.button:hover{
	background-color:<?php echo of_get_option('button_hover'); ?> !important;
}
.woocommerce span.onsale, .woocommerce-page span.onsale, .woocommerce-message, .woocommerce-error, .woocommerce-info, .woocommerce .widget_price_filter .ui-slider .ui-slider-range, .woocommerce-page .widget_price_filter .ui-slider .ui-slider-range{
	background:<?php echo of_get_option('link_color'); ?> !important;
}

.woocommerce .product-wrap .add_to_cart_button.added, .woocommerce .product-wrap .add_to_cart_button.added:hover {
	border:2px solid <?php echo of_get_option('button_hover'); ?> !important;
	background-color:<?php echo of_get_option('button_hover'); ?> !important;
}


textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus,
#mainwrap, .normal-page, .portfolio, .blog, .gallery-item a img:hover{
border-color:<?php echo of_get_option('primary_color'); ?>;

}

.block h3:first-child, #bbpress-forums li.bbp-header, #bbpress-forums fieldset.bbp-form legend, .bbp-topic-title h3, .bbp-topics-front ul.super-sticky i.icon-comment,
.bbp-topics ul.super-sticky i.icon-comment,
.bbp-topics ul.sticky i.icon-comment,
.bbp-forum-content ul.sticky i.icon-comment,
.modal-header h3, h3.widget-title, .footer_widget h3, .widget h3, .header-colour{
	color:<?php echo of_get_option('header_color'); ?>;
}

body .normal-page, body .portfolio, body .blog{
	background-color:<?php echo of_get_option('body_color'); ?>
}

/* Backgrounds */

html{
<?php
if(of_get_option('background_fix') != 1){

    ?>
	background:url(<?php echo of_get_option('footer_bg'); ?>) <?php if(of_get_option('repeat') == 'b1'){echo "no-repeat";}elseif(of_get_option('repeat') == 'b2'){echo "repeat-y";}elseif(of_get_option('repeat') == 'b3'){echo "repeat-x";}else{echo "repeat";} ?> center bottom <?php echo of_get_option('bg_color'); ?>;
<?php

}
?>
}
body{
<?php
if(of_get_option('background_fix') == 1){

    ?>
        background-attachment: fixed !important;
<?php

}
?>
	background:url(<?php echo of_get_option('header_bg'); ?>) no-repeat center top;
}

@media (max-width: 979px) {
.splitter li a, .nav-tabs a{
 background-color:<?php echo of_get_option('secondary_color'); ?>;
}
}
</style>