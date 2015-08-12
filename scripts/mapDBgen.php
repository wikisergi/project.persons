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
$mapName=$_GET['mapName'];

$mapDescription=$_GET['mapDescription'];
$STARTX=$_GET['STARTX'];
$STARTY=$_GET['STARTY'];
$BASE_URL=$_GET['URL1'];
$URL1=$_GET['URL1'];
$URL2=$_GET['URL2'];
$URL3=$_GET['URL3'];
$URL4=$_GET['URL4'];
$MAX_X=$_GET['MAX_X'];
$MAX_Y=$_GET['MAX_Y'];
$START_ZOOM=$_GET['START_ZOOM'];
$MAX_ZOOM=$_GET['MAX_ZOOM'];



//echo "mapa=".$mapName;



$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");


$result = mysql_query("CREATE DATABASE ".$mapName,$link);

mysql_select_db($mapName) or die( "Unable to select database");

$result = mysql_query("CREATE TABLE IF NOT EXISTS `info` (
  `mapName` text NOT NULL,
  `BASE_URL` mediumtext NOT NULL,
  `URL1` mediumtext NOT NULL,
  `URL2` mediumtext NOT NULL,
  `URL3` mediumtext NOT NULL,
  `URL4` mediumtext NOT NULL,
  `MAX_X` int(11) NOT NULL,
  `MAX_Y` int(11) NOT NULL,
  `STARTX` int(11) NOT NULL,
  `STARTY` int(11) NOT NULL,
  `START_ZOOM` int(11) NOT NULL,
  `MAX_ZOOM` int(11) NOT NULL,
  `mapDescription` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_general_ci;",$link);

// Pendiente arreglar BASE_URL y que nos venga como parámetro
$result = mysql_query("INSERT INTO `info` (`mapName`, `BASE_URL`, `URL1`, `URL2`, `URL3`, `URL4`, `MAX_X`, `MAX_Y`, `STARTX`, `STARTY`, `START_ZOOM`, `MAX_ZOOM`, `mapDescription`) VALUES
('".$mapName."', '".$URL1."', '".$URL1."', '".$URL2."', '".$URL3."', '".$URL4."', ".$MAX_X.", ".$MAX_Y.", ".$STARTX.", ".$STARTY.", ".$START_ZOOM.", ".$MAX_ZOOM.", '".$mapDescription."');",$link);





mysql_select_db($mapName) or die( "Unable to select database");

$result = mysql_query("CREATE TABLE IF NOT EXISTS `objects` (
  `id` text NOT NULL,
  `top` int(11) NOT NULL,
  `left` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` longtext NOT NULL,
  `preview` longtext NOT NULL,
  `social_plugins` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_general_ci;",$link);




mysql_close();


?>
