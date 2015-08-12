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
$object_name=$_GET['object_name'];
$object_description=$_GET['object_description'];

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

$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `description` = '".$object_description."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);

$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `name` = '".$object_name."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);

//$result = mysql_query("UPDATE  `PruebaBD1`.`objects` SET  `description` =  'A ver si ahora funciona!' WHERE  `objects`.`id` =  '140658686705302tomando_el_sol' LIMIT 1",$link);




mysql_close();















$data='';


$f=fopen('../objectsLayer.html',"r");

while( ($lectura=fgets($f,4096)) != false )
{
	$data=$data.$lectura;
}

fclose($f);

echo($data);





















/*


// Genera HTML para compartir en Facebook:


$f_fb=fopen('../maps/'.$mapName.'/data/previews/'.$object_id.'.jpg.html',"a+");
//$f_fb=fopen('tete.jpg.html',"w+");

$fb_code='../maps/'.$mapName.'/data/previews/'.$object_id.'.jpg.html';

/*
$fb_code='<html>
<head>
<title></title>

  <script type="text/javascript">

//  function redirection(){  

  window.location ="http://www.mapemio.com/'.$mapName.'";

  }  setTimeout ("redirection()", 10); //tiempo en milisegundos

  </script>

<head>
<meta property="og:url" content="http://www.mapemio.com/'.$mapName.'/data/previews/'.$object_id.'.jpg.html" />
<meta property="og:title" content="'.$object_name.'" />
<meta property="og:description" content="'.$object_description.'." />
<meta property="og:image" content="http://www.mapemio.com/'.$mapName.'/data/previews/'$object_id.'.jpg" />
<meta property="og:image" content="http://www.mapemio.com/'.$mapName.'/data/previews/'$object_id.'.jpg" />
<meta property="og:image" content="http://www.mapemio.com/'.$mapName.'/data/previews/'$object_id.'.jpg" />
<meta property="og:image" content="http://www.mapemio.com/'.$mapName.'/data/previews/'$object_id.'.jpg" />
</head>



<body>

<!-- Facebook SDK -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));</script>

<img src="http://www.mapemio.com/maps/'.$mapName.'/data/originals/'.$object_id.'.jpg"/>

<br>
<b>'.$object_name.'</b>
<br>
'.$object_description.'

<div class="fb-like" data-href="http://www.mapemio.com/maps/'.$mapName.'/data/previews/'$object_id.'.jpg.html" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div><br><div class="fb-comments" data-href="http://www.mapemio.com/maps/'.$mapName.'/data/previews/'$object_id.'.jpg.html" data-width="350" data-numposts="5" data-colorscheme="light"></div>

</body>
</html>';

fputs($f_fb,$fb_code);
*/













?>





