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
$texto=$_GET["texto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];



// Calculamos el primer sector afectado por la incrustación de la fotografía
$parcelaX=intval((int)($x)/256)+2;
$parcelaY=intval((int)($y)/256)+2;


$safectadosX=intval((int)( $width + (int)($x%256) )/256+1);		// Calcula los sectores horizontales que se verán afectados por la inserción de la imagen
$safectadosY=intval((int)($height + (int)($y%256) )/256+1);	// Calcula los sectores verticales que se verán afectados por la inserción de la imagen




$f=fopen('logT.txt',"w+");
fputs($f,$safectadosX."x y ".$safectadosY."y estan afectados. En coordenadas del mapa ".$x.",".$y." se intentará incrustar el texto ".$texto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height."Creada ".($parcelaX*256)."x".($parcelaY*256));  
fclose($f); 





// Primero generamos una imagen que una todos los sectores afectados por el texto introducido

// Create the image

$global = imagecreatetruecolor($safectadosX*256, $safectadosY*256);

$f=fopen('logT2.txt',"w+");
fputs($f,$safectadosX."x y ".$safectadosY."y esdtan afectados. En coordenadas del mapa ".$x.",".$y." se intentará incrustar el texto ".$texto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height."Creada ".($parcelaX*256)."x".($parcelaY*256)); 
fclose($f); 

for($px=0;$px<$safectadosX;$px=$px+1)
{

for($py=0;$py<$safectadosY;$py=$py+1)
{
$im2 = @imagecreatefromjpeg($mapa."0/".($parcelaX)."-".($parcelaY));   // carga la foto del sector a actualizar
//$actual = @imagecreatefromjpeg("Artwork_SectoresVacios/fondo_nubes.jpg")
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($global, $im2, $px*256, $py*256, 0, 0, 256, 256, 256, 256);
	
}
}


$f=fopen('logT3.txt',"w+");
fputs($f,$safectadosX."x y ".$safectadosY."y estan afectados. En coordenadas del mapa ".$x.",".$y." se intentará incrustar el texto ".$texto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height."Creada ".($parcelaX*256)."x".($parcelaY*256)); 
fclose($f); 


// Crear algunos colores
$blanco = imagecolorallocate($im, 255, 255, 255);
$gris = imagecolorallocate($im, 128, 128, 128);
$negro = imagecolorallocate($im, 0, 0, 0);
//imagefilledrectangle($im, 0, 0, 399, 29, $blanco);


// Reemplace la ruta por la de su propia fuente
$fuente = 'Fonts/CursiveSans.ttf';

// Añadir algo de sombra al texto
//imagettftext($actual, 20, 0, 11, 21, $gris, $fuente, $texto);

// Añadir el texto
imagettftext($global, 11, 0, ($x % 256), ($y % 256+14.5), $negro, $fuente, $texto);	//+11 DEBIDO A LA ALTURA DE LA FUENTE!



//imagestring($actual, $fuente, ($x % 256), ($y % 256),  $texto, $color_texto);

imagejpeg($global, "TEMP/hadeserunica.jpg");    // Salva el grupo de sectores con el texto incrustado

$f=fopen('logT4.txt',"w+");
fputs($f,$safectadosX."x y ".$safectadosY."y estan afectados. En coordenadas del mapa ".$x.",".$y." se intentará incrustar el texto ".$texto." la parcela ".$parcelaX."-".$parcelaY." con unas dimensiones de ".$width."x".$height."Creada x=".(intval((int)($x)/256)+2)."&&y=".(intval((int)($Y)/256)+2)); 
fclose($f); 

header("location: incrustafoto.php?mapa=".$mapa."&&foto=TEMP/hadeserunica.jpg&&x=".($x - (int)(($x)%256) +1 )."&&y=".( $y - (int)(($y)%256) +1 )."&&width=".($safectadosX*256-1)."&&height=".($safectadosY*256-1));

exit(0);








$tam=getimagesize($nombre_foto);	// Calculamos las dimensiones de la foto a incrustar en el mapa


//imagedestroy($actual);
imagedestroy($foto);




echo("ok!");

?>





