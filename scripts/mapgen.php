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


<!-- http://127.0.1.1/serGIS1/scripts/mapgen.php?plantilla=Artwork_SectoresVacios/queen.jpg&nombre=pepito&num=64&num2=64&doGenerate=Generate -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en-us" />
	<title>generaSector !</title>

<body>

<center>

<?php



//Esta es la función chmod_r, Eva :
function chmod_r($path) {
    $dir = new DirectoryIterator($path);
    foreach ($dir as $item) {
        chmod($item->getPathname(), 0777);
        if ($item->isDir() && !$item->isDot()) {
            chmod_r($item->getPathname());
        }
    }
}





set_time_limit(0);



if($_GET['doGenerate'] == 'Generate') 
{ 
$numx=$_GET["num"];
$numy=$_GET["num2"];
$nombre=$_GET["nombre"];
$plantilla=$_GET["plantilla"];

$MAX_ZOOM=$_GET["MAX_ZOOM"];



$numx2=$numx; //chapuzilla por culpa de generar la miniatura aqui tambien. En un futuro he de separar los dos scripts!
$numy2=$numy; //chapuzilla por culpa de generar la miniatura aqui tambien. En un futuro he de separar los dos scripts!

if(!strcmp($_GET["parcela_descripcion"],"true"))
	$parcela_descripcion=1;// Escribe texto identificativo para cada parcela (si está a 1)
else
	$parcela_descripcion=0;

if(!strcmp($_GET["parcela_borde"],"true"))
	$parcela_borde=1;// Escribe texto identificativo para cada parcela (si está a 1)
else
	$parcela_borde=0;

if(!strcmp($_GET["background_resize"],"true"))
	$background_resize=1;// Escribe texto identificativo para cada parcela (si está a 1)
else
	$background_resize=0;	
	
if(!strcmp($_GET["plantilla"],""))  // if plantilla isn't specified, one is by default
	$plantilla="artwork/parcels/evo-background.jpg";

$nombre_sector=$nombre;
$nombre="../../maps/".$nombre;

$oldumask = umask(0);  // Permisos totales
mkdir($nombre, 0777);
umask($oldumask);


$oldumask = umask(0);  // Permisos totales, extraído del php manual
mkdir($nombre."/0", 0777);  // Sin Zoom
mkdir($nombre."/1", 0777);  // Sin Zoom
mkdir($nombre."/2", 0777);  // Sin Zoom
mkdir($nombre."/3", 0777);  // Sin Zoom
mkdir($nombre."/4", 0777);  // Sin Zoom
mkdir($nombre."/5", 0777);  // Sin Zoom
mkdir($nombre."/6", 0777);  // Sin Zoom
mkdir($nombre."/data", 0777);  // Directorio datos del mapa
mkdir($nombre."/data/previews", 0777);  // Directorio de imágenes preliminares de los objetos inteligentes, como pueden ser vídeos, juegos, etc...
mkdir($nombre."/data/originals", 0777);  // Directorio fotos originales incrustadas en el mapa
umask($oldumask);
//mkdir($nombre."/t");  // QuickInfo Tip

	
	$im = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");

echo "creado directorio 0";


$x=1;
$y=1;

$sx=0;
$sy=0;

//	$fuente = imageloadfont('arial.gdf');
	$color_texto = imagecolorallocate($im, 0, 0, 91);

	
	
for ($x=1;$x<=$numx;$x++)
{
	

for ($y=1;$y<=$numy;$y++)
{
	
/*
$datos='<img src="'.$x.'-'.$y.'" />';

$f=fopen($x.'-'.$y.'.htm',"w+");
fputs($f,$datos); 
fclose($f); 	

echo $datos;
*/

	$resultado=0;

/*
if($x==1&&$y==1)   // Esquina superior izquierda
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else
if($x==$numx&&$y==1)   // Esquina superior derecha
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else
if($x==1&&$y==$numy)   // Esquina inferior izquierda
{
	$im2 = "Artwork_Bordes/gris.jpg";  // carga la foto de ejemplo a la futura parcela

}
else
if($x==$numx&&$y==$numy)   // Esquina inferior derecha
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else

if($x>1&&$x<$numx&&$y==1)    // Horizontal superior
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else

if($x>1&&$x<$numx&&$y==$numy)    // Horizontal inferior
{
	$im2 = "Artwork_Bordes/gris.jpg";  // carga la foto de ejemplo a la futura parcela

}
else

if($y>1&&$y<$numy&&$x==1)    // Vertical izquierda
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else

if($y>1&&$y<$numy&&$x==$numx)    // Vertical derecha
{
	$im2 = "Artwork_Bordes/gris.jpg";   // carga la foto de ejemplo a la futura parcela

}
else
*/
{


//	$im2 = @imagecreatefromjpeg("../Artwork_SectoresVacios/queen.jpg")   // carga la foto de un sector vacío
	$im2 = @imagecreatefromjpeg("../".$plantilla)   // carga la foto de un sector vacío
//	$im2 = @imagecreatefromjpeg("Mapas/Rags/originals/fondo2.jpg")   // carga la foto de un sector vacío
	    or die("Cannot Initialize new GD image stream");












// Crea la miniatura para el MapList:
	$miniatura = ImageCreateTrueColor(32, 32)
	   	or die("Cannot Initialize new GD image stream");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 32, 32, 256, 256);
	imagejpeg($miniatura, $nombre.'/data/mini.jpg');    // Salva el Zoom de los 4 sectores reunidos



	$color_texto = imagecolorallocate($im, 0, 0, 91);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);



if($parcela_descripcion) imagestring($im2, 5, 70, 110,  'Sector '.$nombre_sector, $color_texto);
if($parcela_descripcion) imagestring($im2, 5, 70, 130,  'Parcela '.$x.':'.$y, $color_texto);



if($parcela_borde)
{
$bordercolors = imagecolorallocate($im2, 0, 0, 20); //Define border color 

$xxx = 0;

$yyy = 0;

$www = imagesx($im2) - 1;

$hhh = imagesy($im2) - 1;

imageline($im2, $xxx,$yyy,$xxx,$yyy+$hhh,$bordercolors);

imageline($im2, $xxx,$yyy,$xxx+$www,$yyy,$bordercolors);

imageline($im2, $xxx+$www,$yyy,$xxx+$www,$yyy+$hhh,$bordercolors);

imageline($im2, $xxx,$yyy+$hhh,$xxx+$www,$yyy+$hhh,$bordercolors);
}











/*
	// Genera fichero de QuickInfo
	$datos='Parcela '.$x.'-'.$y.' libre!';
	$f=fopen($nombre.'/t/'.$x.'-'.$y,"w+");
	fputs($f,$datos); 
	fclose($f); 	
*/

	$resultado=1;	
}

	if($resultado)
	{

		imagecopy($im, $im2, 0, 0, 0, 0, 256, 256);
		imagejpeg($im, $nombre.'/0/'.$x.'-'.$y.".jpg");

		if(!$background_resize)	// Si no queremos que el fondo se redimensione en cada zoom...
		{
			if($x<=$numx/2&&$y<=$numy/2) imagejpeg($im, $nombre.'/1/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/4&&$y<=$numy/4) imagejpeg($im, $nombre.'/2/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/8&&$y<=$numy/8) imagejpeg($im, $nombre.'/3/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/16&&$y<=$numy/16) imagejpeg($im, $nombre.'/4/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/32&&$y<=$numy/32) imagejpeg($im, $nombre.'/5/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/64&&$y<=$numy/64) imagejpeg($im, $nombre.'/6/'.$x.'-'.$y.".jpg");	
		}	
	}
	else 
	{
		copy($im2, $nombre.'/0/'.$x.'-'.$y.".jpg");
// dudoso... llega alguna vez aqui...?
/*	
		if(!$background_resize)	// Si no queremos que el fondo se redimensione en cada zoom...
		{
			if($x<=$numx/2&&$y<=$numy/2) copy($im, $nombre.'/1/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/4&&$y<=$numy/4) copy($im, $nombre.'/2/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/8&&$y<=$numy/8) copy($im, $nombre.'/3/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/16&&$y<=$numy/16) copy($im, $nombre.'/4/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/32&&$y<=$numy/32) copy($im, $nombre.'/5/'.$x.'-'.$y.".jpg");	
			if($x<=$numx/64&&$y<=$numy/64) copy($im, $nombre.'/6/'.$x.'-'.$y.".jpg");	
		}*/
	}





	
}
echo "</br>Fila ".$x." generada!";
}



















echo "Generando miniatura... ";


//GENERA LA MINIATURA (Cogido de generaMiniatura.php, en un futuro, coordinar los 2 bien por separado!):
$lupa=8;	// A qué tamaño redimensionamos las parcelas, que originalmente son de 256.

	$miniatura = ImageCreateTrueColor($numx2*$lupa, $numy2*$lupa)
    	or die("Cannot Initialize new GD image stream");
	
for ($x=1;$x<=$numx2;$x++)
{
	

for ($y=1;$y<=$numy2;$y++)
{
	

	$im2 = @imagecreatefromjpeg($nombre."/0/".$x."-".$y.".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream $x-$y!!");
		
		
	
	imagecopyresampled($miniatura, $im2, $x*$lupa-$lupa, $y*$lupa-$lupa, 0, 0, $lupa, $lupa, 256, 256);
	
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, 'sector'.$x.'-'.$y.'a.jpg');
*/




	
}

}

echo "Miniatura generada";
imagejpeg($miniatura, $nombre."/miniatura.jpg");

imagedestroy($miniatura);
imagedestroy($im2);
















if(!$MAX_ZOOM) exit(0); // Si sólo hay 1 zoom, no se generan más zooms!







		if(!$background_resize) 
		{
			echo "Detecto !$background_resize y salgo!";
			exit();
		}






echo "Generando Zoom 1<br>";
	
for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/0/".$x."-".$y.".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".($x+1)."-".$y.".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".$x."-".($y+1).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".($x+1)."-".($y+1).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/1/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}





echo "Generando Zoom 2<br>";
$numx=$numx/2;
$numy=$numy/2;


for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/1/".$x."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/1/".($x+1)."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/1/".$x."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/1/".($x+1)."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/2/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}















echo "Generando Zoom 3<br>";

$numx=$numx/2;
$numy=$numy/2;


for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/2/".$x."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/2/".($x+1)."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/2/".$x."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/2/".($x+1)."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/3/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}






















echo "Generando Zoom 4<br>";
$numx=$numx/2;
$numy=$numy/2;


for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/3/".$x."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/3/".($x+1)."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/3/".$x."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/3/".($x+1)."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/4/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}






// Generacion ZOOM 5
echo "Generando Zoom 5<br>";

$numx=$numx/2;
$numy=$numy/2;


for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/4/".$x."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/4/".($x+1)."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/4/".$x."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/4/".($x+1)."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/5/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}

















// Generación ZOOM 6
echo "Generando Zoom 6<br>";

$numx=$numx/2;
$numy=$numy/2;


for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/5/".$x."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/5/".($x+1)."-".$y.".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/5/".$x."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/5/".($x+1)."-".($y+1).".jpg");   // carga la foto del sector actual
//	    or die("Cannot Initialize new GD image stream !!");
	imagecopyresampled($miniatura, $im2, 128, 128, 0, 0, 128, 128, 256, 256);
	
	imagejpeg($miniatura, $nombre.'/6/'.$xx.'-'.$yy.".jpg");    // Salva el Zoom de los 4 sectores reunidos
/*
	imagecopy($im, $im2, 0, 0, 0, 0, 180, 180);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  $x.'-'.$y.'a', $color_texto);
	imagejpeg($im, ''.$x.'-'.$y);
*/




	
}

}







imagedestroy($im);

//imagedestroy($im2);


//echo "Generando niveles de Zoom";
//header('Location: generaMiniaturasZoom2.php?'.'doGenerate=Generate&&num='.$numx.'&&num2='.$numy.'&&nombre='.$nombre);






















}






chmod_r($nombre,0777);







?>



<form action="mapgen.php" method="get" name="generatorForm" id="generatorForm" >
  <table width="95%" border="0" cellpadding="3" cellspacing="3" class="forms">
    <tr>
      <td>Nombre del mapa:</td>
      <td><input name="nombre" type="text" id="nombre" /></td>
    </tr>
    <tr>
      <td>X sectores:</td>
      <td><input name="num" type="text" id="num" /></td>
    </tr>
    <tr>
      <td width="27%">Y sectores:</td>
      <td width="73%"><input name="num2" type="text" id="num2" /> </td>
    </tr>
  </table>
  <p align="center">
    <input name="doGenerate" type="submit" id="doGenerate" value="Generate" />
  </p>
</form>
</body>

</html>


