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
// Connects to the database to get the map information


$username="mapemio";
$password="M4p3m1078";




$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");


//echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
//$result = mysql_query("SELECT * FROM info WHERE mapName = '".$mapName."'",$link);
//$result = mysql_query("SELECT * FROM info",$link);

$result = mysql_query("CREATE DATABASE mapemioconfig",$link);

mysql_select_db('mapemioconfig') or die( "Unable to select database");

$result = mysql_query("CREATE TABLE IF NOT EXISTS `onload` (`mapName` text NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=ascii;",$link);


$result = mysql_query("INSERT INTO `onload` (`mapName`) VALUES ('mapemio_demo_map');",$link);



mysql_close();


?>
