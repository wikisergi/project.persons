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

$mapName=$_GET["mapName"];  // Capturamos el nombre del mapa a secas (sin la ruta ni nada!)
$nombre_preview=$_GET["nombre_preview"];
$object_id=$_GET["object_id"];
$nombre_preview_sin_ruta=$_GET["nombre_preview_sin_ruta"];


$username="mapemio";
$password="M4p3m1078";



$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");


//echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
//$result = mysql_query("SELECT * FROM info WHERE mapName = '".$mapName."'",$link);
//$result = mysql_query("SELECT * FROM info",$link);


mysql_select_db($mapName) or die( "Unable to select database");



//UPDATE  `PruebaBD1`.`objects` SET  `description` =  'Fue muy bonito ito ito!' WHERE  `objects`.`id` =  '140658686705302tomando_el_sol' LIMIT 1

$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `preview` = '".$nombre_preview."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);


//Construye todo el código para insertar en el div de social_plugins:

//Arreglo el $nombre_preview, para quitarle los dos puntos iniciales, y agregarle la ruta completa del servidor: www.mapemio.com/...
$preview_a_compartir='http://www.mapemio.com/maps/'.$mapName.'/data/previews/'.$nombre_preview_sin_ruta;


//Generamos le archivo html para compartir en Facebook:




$html_facebook='<html>
<head>
<title></title>

  <script type="text/javascript">

  function redirection(){  

  window.location ="http://www.worldsbiggestprofile.com";

  }  setTimeout ("redirection()", 10); //tiempo en milisegundos

  </script>

<head>
<meta property="og:url" content="http://www.mapemio.com/maps/'.$mapName.'/data/previews/'.$nombre_preview_sin_ruta.'.html" />
<meta property="og:title" content="Robotic design by Christian Salge" />
<meta property="og:description" content="Iron Guard design by Christian Salge. All rights reserved to Christian Salge." />
<meta property="og:image" content="'.$preview_a_compartir.'" />
<meta property="og:image" content="'.$preview_a_compartir.'" />
<meta property="og:image" content="'.$preview_a_compartir.'" />
<meta property="og:image" content="'.$preview_a_compartir.'" />
</head>



<body>
</body>
</html>';





$f=fopen($nombre_preview.".html","w+");

	fputs($f,$html_facebook); 
fclose($f);








$codigo_plugin='<div class="fb-like" data-href="'.$preview_a_compartir.'" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>

<div class="fb-comments" data-href="http://www.mapemio.com/maps/'.$mapName.'/worldsbiggestprofile/data/previews/'.$nombre_preview_sin_ruta.'.html" data-width="350" data-numposts="5" data-colorscheme="light"></div>';

$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `social_plugins` = '".$codigo_plugin."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);


mysql_close();

?>
