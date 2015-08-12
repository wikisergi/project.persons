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
// incrustafoto.php?mapa=&&foto=FotoPrueba/rags.jpg&&x=&&y=&&width=&&height=
// 127.0.0.1:8887/DEF/31/incrustafoto.php?mapa=Mapas/Sergi3/&&foto=FotoPrueba/doggy.jpg&&x=1274&&y=1&&width=500&&height=579


// Relief_World_Map_by_maps-for-free.jpg
// http://127.0.1.1/serGIS1/incrustafotoBigSize.php?mapa=../maps/pepito/&&foto=Relief_World_Map_by_maps-for-free.jpg&&x=10&&y=10&&width=16384&&height=12544
// Relief_World_Map_by_maps-for-free.jpg
// http://127.0.1.1/serGIS1/incrustafotoBigSize.php?mapa=../maps/pepito/&&foto=ParkingMapMar11.jpg&&x=10&&y=10&&width=3200&&height=1800
// http://192.168.0.200/serGIS1/incrustafotoBigSize.php?mapa=../maps/pepito/&&foto=Relief_World_Map_by_maps-for-free.jpg&&x=2&&y=27&&width=16384&&height=12544
// http://192.168.0.200/serGIS1/incrustafotoBigSize.php?mapa=../maps/pepito/&&foto=japan_world_map_1914.jpg&&x=2&&y=27&&width=6293&&height=6582
// http://192.168.0.200/serGIS1/incrustafotoBigSize.php?mapa=../maps/map4/&&foto=Relief_World_Map_by_maps-for-free.jpg&&x=6670&&y=9700&&width=16384&&height=12544
function escribeLog($f, $text)
{
	$hora = getdate(time());
	$hora=$hora["hours"] . ":" . $hora["minutes"] . ":" . $hora["seconds"]; 
	fputs($f,date ( "j-n-Y" )." ".$hora." - ".$text."\r\n"); 

}


function writeObject($objects, $text)
{
	fputs($objects,$text."\r\n"); 

}


$mapa=$_GET["mapa"];
$mapName=$_GET["mapName"];  // Capturamos el nombre del mapa a secas (sin la ruta ni nada!
$nombre_foto=$_GET["foto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];
$video_url = $_REQUEST['video_url'];

//$object_id=$_GET["object_id"];


















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




$object_name="Foto";
$object_description="Foto Description";


// La ID del objeto se genera aquí! (lo ha generado el script que ha subido la imagen a la carpeta temporal !
$object_id=substr($nombre_foto, 0, strlen($nombre_foto)-4);  // Eliminates the extension
$object_id=basename($object_id);  // Eliminates the path text


$result = mysql_query("INSERT INTO `objects` (`id`, `top`, `left`, `width`, `height`, `name`, `description`) VALUES
('".$object_id."', '".$y."', '".$x."', '".$width."', '".$height."', '".$object_name."', '".$object_description."');",$link);




mysql_close();






























// Calculamos el primer sector afectado por la incrustación de la fotografía
$parcelaX=intval((int)($x)/256)+2;
$parcelaY=intval((int)($y)/256)+2;


$safectadosX=intval((int)($width+$x%256)/256);		// Calcula los sectores horizontales que se verán afectados por la inserción de la imagen
$safectadosY=intval((int)($height+$y%256)/256);	// Calcula los sectores verticales que se verán afectados por la inserción de la imagen
// +$x%256 y +$y%256 son el offset de la imagen con respecto al borde X e Y de la primera parcela, así pues, dependiendo del offset, puede ocupar 1 parcela más o no.



$f=fopen('log.txt',"a+");
//$objects=fopen('objectsLayer.html',"a+");
$objects=fopen($mapa.'data/objectsLayer.html',"a+");


//fseek($fp, 0);

escribeLog($f, "En coordenadas del mapa ".$x.",".$y." se intentará incrustar la foto ".$nombre_foto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height); 


$txt=substr($nombre_foto, 0, strlen($nombre_foto)-4);  // Eliminates the extension
$txt=basename($txt);  // Eliminates the path text





// Adapta la URL del video de Yputube a la url del embeded:
//var yturl= "/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g";
//var $ytplayer= '<iframe width="640" height="360" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
/*
var $ytplayer= '<iframe width="480" height="360" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
str.replace($video_url, $ytplayer);
*/

//$video_url ="//www.youtube.com/embed/06krAab7RlE";

writeObject($objects, '<div id="'.$txt.'" class="youtubeVideo" style="position:absolute; left:'.$x.'px; top:'.$y.'px; width:'.($width-8).'px; height:'.($height-8).'px;"> <iframe width="480" height="360" src="//www.youtube.com/embed/'.$video_url.'" frameborder="0" allowfullscreen></iframe> </div>');


$tam=getimagesize($nombre_foto);	// Calculamos las dimensiones de la foto a incrustar en el mapa
$foto2 = @imagecreatefromjpeg($nombre_foto)   // Carga la foto a incrustar en el mapa
	    or die("Cannot Initialize new GD image stream !!");

//$foto = ImageCreateTrueColor($width, $height)		// Puntero a imagen para procesar la imagen redimensionada respecto la original del usuario
//    	or die("Cannot Initialize new GD image stream");

//imagecopyresized($foto, $foto2, 0, 0, 0, 0, $width, $height, $tam[0], $tam[1]);		// Redimensiona la imagen a como el usuario haya elegido

echo "X empieza en: ".(($x)%256);

for($px=0;$px<=$safectadosX;$px=$px+1)
{

for($py=0;$py<=$safectadosY;$py=$py+1)
{
// USAR imagecreatetruecolor(). !!!!!!!!!!!!!!!!!!!!!!!!!!!
$actual = @imagecreatefromjpeg($mapa."0/".($parcelaX+$px)."-".($parcelaY+$py).".jpg")   // carga la foto del sector a actualizar
//$actual = @imagecreatefromjpeg("Artwork_SectoresVacios/fondo_nubes.jpg")
	    or die("Cannot Initialize new GD image stream !!");

$origenEnS1 = $x % 256;
echo "<br>".$x."/".(256)."=".$origenEnS1;


//                 DESTINO,Origen,X DESTINO                , Y1 DESTINO               , X origen                    , Y origen                   , AnchoDESTINO                                                                           , AltoDESTINO      , AnchoOrigen                              , AltoOrigen
imagecopyresampled($actual,$foto2 ,($x % 256)*(!((bool)$px)), ($y % 256)*(!((bool)$py)), ((bool)$px)*($px*256-$x%256), ((bool)$py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px==$safectadosX),       256-($y%256)*(!((bool)$py)) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py==$safectadosY)        , 256-($x%256)*(!( (bool)$px ) ) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px===$safectadosX) , 256-($y%256)*(!( (bool)$py ) ) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py===$safectadosY));





echo "<br>(bool)$px=".($x%256)*(!(bool)$px)."<br>";

imagejpeg($actual, $mapa."0/".($parcelaX+$px)."-".($parcelaY+$py).".jpg",100);    // Salva la parcela actualizada


}
}




imagedestroy($actual);
imagedestroy($foto2);




for($z=1;$z<=6;$z++)
{
	


escribeLog($f, "Creando zoom ".$z); 
 


$z1pX = intval((int)$parcelaX/pow(2,$z))+$parcelaX%pow(2,$z);	// Calculamos primera parcela afectada en Zoom1
$z1pY = intval((int)$parcelaY/pow(2,$z))+$parcelaY%pow(2,$z);

$ultimaX = $parcelaX + $safectadosX;	// Calculamos ultima parcela afectada en Zoom0
$ultimaY = $parcelaY + $safectadosY;

$afz1X = intval((int)$ultimaX/pow(2,$z))+$ultimaX%pow(2,$z);	// Calculamos última parcela afectada en Zoom1
$afz1Y = intval((int)$ultimaY/pow(2,$z))+$ultimaY%pow(2,$z);




//Ahora generamos el Zoom 1 para las parcelas afectadas
escribeLog($f, "Primera parcela afectada para Zoom".($z-1)." = $parcelaX-$parcelaY"); 
escribeLog($f, "Última parcela afectada para Zoom".($z-1)." = $ultimaX-$ultimaY"); 
escribeLog($f, "------------------------------------------------------"); 
escribeLog($f, "Primera parcela afectada para Zoom".$z." = $z1pX - $z1pY"); 
escribeLog($f, "Última parcela afectada para Zoom".$z." = $afz1X - $afz1Y"); 

for ($x=$z1pX; $x<=$afz1X; $x++)
{
	for ($y=$z1pY; $y<=$afz1Y; $y++)
	{

	escribeLog($f, "Entra en los for"); 

	$frase= "Generando parcela de Zoom".$z." = $x-$y en ".$mapa.$z."/$x-$y con las siguientes parcelas de Zoom0:";

	escribeLog($f, $frase); 

 

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
	
if($x%2) $xx=+1; else $xx=1;
if($y%2) $yy=+1; else $yy=1;

	$im2 = @imagecreatefromjpeg($mapa.($z-1)."/".($x*2-$xx)."-".($y*2-$yy).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx)."-".($y*2-$yy)); 
	
	$im2 = @imagecreatefromjpeg($mapa.($z-1)."/".($x*2-$xx+1)."-".($y*2-$yy).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".($x+1)."-".$y)   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx+1)."-".($y*2-$yy));

	$im2 = @imagecreatefromjpeg($mapa.($z-1)."/".($x*2-$xx)."-".($y*2-$yy+1).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".$x."-".($y+1))   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx)."-".($y*2-$yy+1));

	$im2 = @imagecreatefromjpeg($mapa.($z-1)."/".($x*2-$xx+1)."-".($y*2-$yy+1).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".($x+1)."-".($y+1))   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx+1)."-".($y*2-$yy+1));


	escribeLog($f, "Intenta salvar como: ".$mapa.$z.'/'.$x.'-'.$y.".jpg"); 
 	imagejpeg($miniatura, $mapa.$z.'/'.$x.'-'.$y.".jpg");    // Salva el Zoom de los 4 sectores reunidos
	
	

	}
}


}

exit(0);













// OJO ATENCION ATENCION ATENCIOOOOOOOONN:
// A partir de ahora, todas estas generaciones hay que revisarlas, porque me parece que  hago muchas operaciones extras, ya que habrá sectores de zooms que no se tendrán que rehacer... hay que REVISAR TODO a partir de AQUI:


for($z=1;$z<=6;$z++)
{
//Ahora generamos el Zoom 2 para las parcelas afectadas
escribeLog($f, "Primera parcela afectada para Zoom0 = $parcelaX-$parcelaY"); 
escribeLog($f, "Última parcela afectada para Zoom0 = $ultimaX-$ultimaY"); 
escribeLog($f, "------------------------------------------------------"); 
escribeLog($f, "Primera parcela afectada para Zoom1 = $z1pX - $z1pY"); 
escribeLog($f, "Última parcela afectada para Zoom1 = $afz1X - $afz1Y"); 

for ($x=$z1pX/$z; $x<=$afz1X; $x++)
{
	for ($y=$z1pY/$z; $y<=$afz1Y; $y++)
	{

	escribeLog($f, "Entra en los for"); 

	$frase= "Generando parcela de Zoom2 = $x-$y en ".$mapa.($z+1)."/$x-$y con las siguientes parcelas de Zoom".$z.":";

	escribeLog($f, $frase); 

 

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
	
if($x%2) $xx=+1; else $xx=1;
if($y%2) $yy=+1; else $yy=1;

	$im2 = @imagecreatefromjpeg($mapa.$z."/".($x*2-$xx)."-".($y*2-$yy).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx)."-".($y*2-$yy)); 
	
	$im2 = @imagecreatefromjpeg($mapa.$z."/".($x*2-$xx+1)."-".($y*2-$yy).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".($x+1)."-".$y)   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx+1)."-".($y*2-$yy));

	$im2 = @imagecreatefromjpeg($mapa.$z."/".($x*2-$xx)."-".($y*2-$yy+1).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".$x."-".($y+1))   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx)."-".($y*2-$yy+1));

	$im2 = @imagecreatefromjpeg($mapa.$z."/".($x*2-$xx+1)."-".($y*2-$yy+1).".jpg")   // carga la foto del sector actual
//	$im2 = @imagecreatefromjpeg($mapa."/0/".($x+1)."-".($y+1))   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	escribeLog($f, ($x*2-$xx+1)."-".($y*2-$yy+1));


	escribeLog($f, "Intenta salvar como: ".$mapa.($z+1).'/'.$x.'-'.$y.".jpg"); 
 	imagejpeg($miniatura, $mapa.($z+1).'/'.$x.'-'.$y.".jpg");    // Salva el Zoom de los 4 sectores reunidos
	
	

	}
}


}














escribeLog($f, "Todo correcto!"); 

escribeLog($f, "5%2=".(5%2)." y 4%2=".(4%2));

escribeLog($f, "!(0)=".(!(0)));

fclose($f); 
fclose($objects); 

echo("ok!");
 

?>





