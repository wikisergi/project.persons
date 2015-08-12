<!-- 
/*
<Project Persons: Graphical Information System to support the Basic Income>
    Copyright (C) 2015 Sergi Guillen Alonso

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

-->


<?php

	/*
	+--------------------------------------------------------------------------
	|   Auth Manager - Content Protection & User Management (Open Source)
	+--------------------------------------------------------------------------
	|   by ScriptsApart
	|   (c) 2011 ScriptsApart
	|   http://www.scriptsapart.com/
	+--------------------------------------------------------------------------
	|   Web: http://www.scriptsapart.com/
	|   Email: support@scriptsapart.com
	|	Facebook: http://www.facebook.com/pages/Scripts-Apart/149933518360387
	|	Twitter: http://www.twitter.com/scriptsapart
	|	Blackberry PIN: 20F03848
	|	Phone Support: +91 9871084893
	+--------------------------------------------------------------------------
	|   > OPEN SOURCE(100%)
	|   > First Version: 13th September 2010
	|	> Version 2.0: 8th February 2011
	|
	|	Changelog:
	|	- Introduced option to enable or disable email verification in the
	|	  backend.
	|	- Inbuilt captcha verification support. reCAPTCHA support still there.
	|	- Simpler layout making it easy to integrate with existing website.
	|	- Analytics integration support provided.
	|	- Password encryption support in this version. Admin cannot see the 
	|	  real password.
	|	- More powerful user registration class.
	|	- Facebook connect integration. (Released as a seperate module).
	|	- Various usage statistics displayed via charts for easy understanding.
	|	- Upgraded forgot password process.
	|	- Automatic navigation links included.
	|	- Better verification of the registered users.
	|	- "Remember Me" feature for the login system. User is able to access the
	|	  website without logging in to the website again & again.
	|	- Show password feature added to make the registration process simpler.
	+--------------------------------------------------------------------------
	*/
	
	/* Error reporting for the application. Set it to error_reporting(E_ALL) for debugging. */
	error_reporting(0);
	ini_set('display_errors', '0');
	
	/* Set the default timezone for the script. */
	date_default_timezone_set('Asia/Kolkata');
	
	/* Database inclusion and initialization for the application. */
	include("user/database.php");
	$link = mysql_connect(DB_SERVER, DB_USER, DB_PASSWORD);
	if(!mysql_select_db(DB_NAME)) die("<br/><center><h1 style='font-size:20px;font-weight:100;color:#333333;font-family:arial;'><b>Auth Manager</b> does not seem to be installed. Please run the Installation wizard by clicking <a href='install.php'>over here</a> to install the product.</h1></center>");
	
	/* Configuration file which contains the application settings. */
	include("user/config.php");
/*	
	/* Start sessions for the application. User sessions are stored in database rather than 
	session files for enhanced security. */
	include(MODS_DIRECTORY."/class.dbsession.php");
	$session = new dbsession();

	/* Classes which form the base of the application. Do not remove any of these. */
	include(USER_DIRECTORY."/functions.php");
	include(USER_DIRECTORY."/session.inc.php");
	include(MODS_DIRECTORY."/count_visitors_class.php");
	include(LANG_DIRECTORY."/spanish.php");
	
	$visitor = new Count_visitors;
	$visitor->delay = 1; /* how often (in hours) a visitor is registered in the database (default = 1 hour) */
	$visitor->insert_new_visit(); /* That's all, the validation is with this method, too. */
	
	/* Do not initialize the application if the install.php is present on the server. */
	if(file_exists('install.php')) die("<br/><center><h1 style='font-size:15px;font-weight:100;font-family:arial;'>Please delete the <b>'install.php'</b> file before using this product. This is a security measure. Leaving this file on server will make your website open to web attacks.</h1></center>");
	
	/* Initialize the error engine for the login process only. Other pages use their internal
	error engine. */
	if(!isset($_SESSION['error']))
	{
		$_SESSION['error'] = NULL;
	}

?>