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

/*
$mapa=$_GET["mapa"];
$nombre_foto=$_GET["foto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];
*/

$nombre_foto = "spain.jpg";
$mapa="spain";



$tam=getimagesize($nombre_foto);	// Calculamos las dimensiones de la foto a incrustar en el mapa

$foto2 = @imagecreatefromjpeg($nombre_foto)   // Carga la foto a incrustar en el mapa
	    or die("Cannot Initialize new GD image stream !!");


//$foto = ImageCreateTrueColor($width, $height)		// Puntero a imagen para procesar la imagen redimensionada respecto la original del usuario
    //	or die("Cannot Initialize new GD image stream");

//imagecopyresized($foto, $foto2, 0, 0, 0, 0, $width, $height, $tam[0], $tam[1]);		// Redimensiona la imagen a como el usuario haya elegido




// imagecopyresampled($parcela,$foto2, 0, 0, ((bool)$px)*($px*256-$x%256), ((bool)$py)*($py*256-$y%256), 256-($x%256)*(!((bool)$px)) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px==$safectadosX),       256-($y%256)*(!((bool)$py)) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py==$safectadosY)        , 256-($x%256)*(!( (bool)$px ) ) - (256-$x%256 + ($safectadosX*256 - $width ) )*($px===$safectadosX) , 256-($y%256)*(!( (bool)$py ) ) - (256-$y%256 + ($safectadosY*256 - $height ) )*($py===$safectadosY));



$parcela = ImageCreateTrueColor(256, 256)
	or die("Cannot Initialize new GD image stream");
			
imagecopyresampled($parcela, $foto2, 0, 0, 0, 0, 256, 256, 16, 16);


//imagejpeg($actual, $mapa."0/".($parcelaX+$px)."-".($parcelaY+$py),100);    // Salva la parcela actualizada
//imagejpeg($parcela, "spain/"."-"."0.jpg",100);    // Salva la parcela actualizada

print "OK";




for($px=0;$px<=$tam[0];$px=$px+16)
{

for($py=0;$py<=$tam[1];$py=$py+16)
{

$parcela = ImageCreateTrueColor(256, 256)
	or die("Cannot Initialize new GD image stream");
			
imagecopyresampled($parcela, $foto2, 0, 0, $px, $py, 256, 256, 16, 16);

	
imagejpeg($parcela, "spain/".($px/16)."-".($py/16).".jpg",100);    // Salva la parcela actualizada


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


echo("ok!");

?>





