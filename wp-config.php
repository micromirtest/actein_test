<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache


/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
/** Define Base URL */

define('WP_SITEURL', 'http://localhost/actein/');

define('WP_HOME', 'http://localhost/actein/');


define('DB_NAME', 'actein');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '6Fi2b#S:sP<N7DEQy3qLo6T524Cw-G5fD}.e7scb6{s{!8[q|-hPuSK(wWYb>qVQ');
define('SECURE_AUTH_KEY',  'X|!73&~vAL27+pQM!a!8i73&F7f3Zfc3o!0AS+c`)+*+^-(g!@mP4{1,F]>%RKa*');
define('LOGGED_IN_KEY',    '|dTP,M_[*;IkCZ?!=-Gw=|]z+fo~um&gNZ+[I6H{2)+.)$xm-awv^k/`nE4II4}.');
define('NONCE_KEY',        '=@Sh2v&x{sMhn5-bH 5ts-$fS+Jut/@dfU?a&cVCleFf3a3Z#En-Y[WHd-fbd5X4');
define('AUTH_SALT',        'Zx roA{]n}m-eP7+$5:-W1V|Iy-a~^Q5%Hb|;0H>yy+V~lZw]M??wXok9hdE|~|x');
define('SECURE_AUTH_SALT', 'DKs!.Z$Y--73T><yKe]>-Y68aaI.#0f+.2MRK=6$2HW0-v1[#Mbm|*|F- {>^`=+');
define('LOGGED_IN_SALT',   '7WQ!;D<t6R[1_%HP{e(faN<+#g4D( lpJhoalEHNrZ-0K+69+[FI*G0aI4hJ;eZX');
define('NONCE_SALT',       'JEQ|q+%`7OVxJ{bNe|c5J/&?.!t%;g@tfpbmFD<NBv[8.T;Z<-SmA;+?~&OmA2gL');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
