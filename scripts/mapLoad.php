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

//$mapName='worldsbiggestprofile';

//echo "mapa=".$mapName;

//$mapName="EstoEsColonia";

$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");

mysql_select_db($mapName) or die( "Unable to select database");
//echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
//$result = mysql_query("SELECT * FROM info WHERE mapName = '".$mapName."'",$link);
$result = mysql_query("SELECT * FROM info",$link);

$row = mysql_fetch_array($result);



if($row) {
/*	
echo "mapName = ".$row["mapName"]."<BR>";
echo "Description = ".$row["Description"]."<BR>";
echo "URL1 = ".$row["URL1"]."<BR>";
echo "MAX_X = ".$row["MAX_X"]."<BR>";
echo "MAX_Y = ".$row["MAX_Y"]."<BR>";
echo "STARTX = ".$row["STARTX"]."<BR>";
echo "START_ZOOM = ".$row["START_ZOOM"]."<BR>";
echo "STARTY = ".$row["STARTY"]."<BR>";
*/	// Tenemos en $row una fila del resultado
	
    $advert = array(
        'mapName' => $row["mapName"],
        'mapDescription' => $row["mapDescription"],
        'STARTX' => $row["STARTX"],
        'STARTY' => $row["STARTY"],
        'BASE_URL' => $row["BASE_URL"],
        'URL1' => $row["URL1"],
        'URL2' => $row["URL2"],
        'URL3' => $row["URL3"],
        'URL4' => $row["URL4"],
        'MAX_X' => $row["MAX_X"],
        'MAX_Y' => $row["MAX_Y"],
        'START_ZOOM' => $row["START_ZOOM"],
        'MAX_ZOOM' => $row["MAX_ZOOM"],	
     );
    echo json_encode($advert);

} else {
echo "ERROR";
	// No se ha devuelto ningún resultado

}




mysql_close();


?>
