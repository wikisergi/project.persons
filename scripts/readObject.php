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

function escribeLog($f, $text)
{
	$hora = getdate(time());
	$hora=$hora["hours"] . ":" . $hora["minutes"] . ":" . $hora["seconds"]; 
	fputs($f,date ( "j-n-Y" )." ".$hora." - ".$text."\r\n"); 

}


$f=fopen('log.txt',"a+");





/*
$mapDescription=$_GET['mapDescription'];
$STARTX=$_GET['STARTX'];
$STARTY=$_GET['STARTY'];
$URL1=$_GET['URL1'];
$URL2=$_GET['URL2'];
$URL3=$_GET['URL3'];
$URL4=$_GET['URL4'];
$MAX_X=$_GET['MAX_X'];
$MAX_Y=$_GET['MAX_Y'];
$START_ZOOM=$_GET['START_ZOOM'];
$MAX_ZOOM=$_GET['MAX_ZOOM'];
*/

$object_id=$_GET['object_id'];
//$object_name=$_GET['object_name'];
//$object_description=$_GET['object_description'];

$mapName=$_GET["mapName"];  // Capturamos el nombre del mapa a secas (sin la ruta ni nada!


$username="mapemio";
$password="M4p3m1078";


/*
$mapDescription=$_GET['mapDescription'];
$STARTX=$_GET['STARTX'];
$STARTY=$_GET['STARTY'];
$URL1=$_GET['URL1'];
$URL2=$_GET['URL2'];
$URL3=$_GET['URL3'];
$URL4=$_GET['URL4'];
$MAX_X=$_GET['MAX_X'];
$MAX_Y=$_GET['MAX_Y'];
$START_ZOOM=$_GET['START_ZOOM'];
$MAX_ZOOM=$_GET['MAX_ZOOM'];
*/


//echo "mapa=".$mapName;



$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");


//echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
//$result = mysql_query("SELECT * FROM info WHERE mapName = '".$mapName."'",$link);
//$result = mysql_query("SELECT * FROM info",$link);


mysql_select_db($mapName) or die( "Unable to select database");



//UPDATE  `PruebaBD1`.`objects` SET  `description` =  'Fue muy bonito ito ito!' WHERE  `objects`.`id` =  '140658686705302tomando_el_sol' LIMIT 1

// SELECT description FROM objects WHERE id =  '140658686705302tomando_el_sol'

// SELECT  `description` FROM  `Infancia`.`objects` WHERE  `id` =  '1372159271s_retoc_result'LIMIT 1



//$result = mysql_query("SELECT `description` FROM = `".$mapName."`.`objects` WHERE `id` = '".$object_id."' LIMIT 1",$link);

//ESTA CONSULTA FUNCIONA: 
$result = mysql_query("SELECT  `description` FROM  `".$mapName."`.`objects` WHERE  `id` =  '".$object_id."' LIMIT 1",$link);

//$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `name` = '".$object_name."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);

//$result = mysql_query("UPDATE  `PruebaBD1`.`objects` SET  `description` =  'A ver si ahora funciona!' WHERE  `objects`.`id` =  '140658686705302tomando_el_sol' LIMIT 1",$link);



$row = mysql_fetch_row($result);

$result = $row[0];

//$result = gettype($result['description']);


mysql_close();




echo($result);

//escribeLog($f, $mapName." - ".$object_id." - ".$result); 


?>





