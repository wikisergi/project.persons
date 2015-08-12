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



//echo "mapa=".$mapName;

//$mapName="EstoEsColonia";

$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");

$result = mysql_query("DROP DATABASE ".$mapName,$link);


shell_exec("rm ../../maps/".$mapName." -R");



mysql_close();


?>
