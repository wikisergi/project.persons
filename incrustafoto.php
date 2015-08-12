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


$mapa=$_GET["mapa"];
$nombre_foto=$_GET["foto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];



// Calculamos el primer sector afectado por la incrustación de la fotografía
$parcelaX=intval((int)($x)/256)+2;
$parcelaY=intval((int)($y)/256)+2;


$safectadosX=intval((int)($width)/256)+1;		// Calcula los sectores horizontales que se verán afectados por la inserción de la imagen
$safectadosY=intval((int)($height)/256)+1;	// Calcula los sectores verticales que se verán afectados por la inserción de la imagen




$f=fopen('log0.txt',"w+");
fputs($f,"En coordenadas del mapa ".$x.",".$y." se intentará incrustar la foto ".$nombre_foto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height); 
fclose($f); 



$tam=getimagesize($nombre_foto);	// Calculamos las dimensiones de la foto a incrustar en el mapa
$foto2 = @imagecreatefromjpeg($nombre_foto)   // Carga la foto a incrustar en el mapa
	    or die("Cannot Initialize new GD image stream !!");

$foto = ImageCreateTrueColor($width, $height)		// Puntero a imagen para procesar la imagen redimensionada respecto la original del usuario
    	or die("Cannot Initialize new GD image stream");

imagecopyresized($foto, $foto2, 0, 0, 0, 0, $width, $height, $tam[0], $tam[1]);		// Redimensiona la imagen a como el usuario haya elegido

echo "X empieza en: ".(($x)%256);

for($px=0;$px<=$safectadosX;$px=$px+1)
{

for($py=0;$py<=$safectadosY;$py=$py+1)
{
// USAR imagecreatetruecolor(). !!!!!!!!!!!!!!!!!!!!!!!!!!!
$actual = @imagecreatefromjpeg($mapa."0/".($parcelaX+$px)."-".($parcelaY+$py))   // carga la foto del sector a actualizar
//$actual = @imagecreatefromjpeg("Artwork_SectoresVacios/fondo_nubes.jpg")
	    or die("Cannot Initialize new GD image stream !!");

$origenEnS1 = $x % 256;
echo "<br>".$x."/".(256)."=".$origenEnS1;


//                 DESTINO,Origen,X DESTINO                , Y1 DESTINO               , X origen                    , Y origen                   , AnchoDESTINO                                                                           , AltoDESTINO      , AnchoOrigen                              , AltoOrigen
imagecopyresampled($actual,$foto ,($x % 256)*(!((bool)$px)), ($y % 256)*(!((bool)$py)), ((bool)$px)*($px*256-$x%256), ((bool)$py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px==$safectadosX),       256-($y%256)*(!((bool)$py)) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py==$safectadosY)        , 256-($x%256)*(!( (bool)$px ) ) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px===$safectadosX) , 256-($y%256)*(!( (bool)$py ) ) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py===$safectadosY));


//imagecopyresampled($actual,$foto ,($x % 256)*(!((bool)$px)), ($y % 256)*(!((bool)$py)), ((bool)$px)*($px*256-$x%256), ((bool)$py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)) - (256-$x%256 + ($safectadosX*256 - $width +1) )*($px==$safectadosX),       256        , 256-($x%256)*(!( (bool)$px ) ) - (256-$x%256 + ($safectadosX*256 - $width +1) )*($px===$safectadosX) , 256);


//imagecopyresampled($actual,$foto ,($x % 256)*(!((bool)$px)), ($y % 256)*!$py, ((bool)$px)*($px*256-$x%256), ($py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)) - (256-$x%256 + ($safectadosX*256 - $width +1) )*($px==$safectadosX),       256        , 256-($x%256)*(!( (bool)$px ) ) - (256-$x%256 + ($safectadosX*256 - $width +1) )*($px===$safectadosX) , 256);


//imagecopyresampled($actual,$foto ,($x % 256)*(!((bool)$px)), ($y % 256)*!$py, ((bool)$px)*($px*256-$x%256), ($py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px&&$px!=$safectadosX)),       256        , 256-($x%256)*(!( (bool)$px && $px!=$safectadosX) ) , 256);


//imagecopyresampled($actual,$foto ,($x % 256)*(!((bool)$px)), ($y % 256)*!$py, ((bool)$px)*($px*256-$x%256), ($py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)), 256, 256-($x%256)*(!((bool)$px)) , 256);



echo "<br>(bool)$px=".($x%256)*(!(bool)$px)."<br>";

imagejpeg($actual, $mapa."0/".($parcelaX+$px)."-".($parcelaY+$py),100);    // Salva la parcela actualizada


}
}


/*
$actual = @imagecreatefromjpeg($mapa."0/".($parcelaX+1)."-".$parcelaY)   // carga la foto del sector a actualizar
	    or die("Cannot Initialize new GD image stream !!");


//imagecopyresampled($actual, $foto, 0, 0, 257, 0, 512, 256, 256, 256);   Sale, pero la parte derecha sobre-dimensionada
imagecopyresampled($actual, $foto, 0, 0, 256, 0, $width, 256,  $width-26, 256);
//imagecopyresampled($actual, $foto, 0, 0, 0, 0, 256, 256, $width, $height);

imagejpeg($actual, $mapa."0/".($parcelaX+1)."-".$parcelaY);    // Salva la parcela actualizada
*/



imagedestroy($actual);
imagedestroy($foto);

$f=fopen('log2.txt',"w+");
fputs($f,"En coordenadas del mapa ".$x.",".$y." se ha guardado la parcela ".$parcelaX."-".$parcelaY); 
fclose($f); 


echo("ok!");

?>





