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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="en-us" />
	<title>generaSector !</title>

<body>

<center>

<?php





if($_GET['doGenerate'] == 'Generate') 
{ 
$numx=$_GET["num"];
$numy=$_GET["num2"];
$nombre=$_GET["nombre"];





$nombre="../../Mapas/".$nombre;

mkdir($nombre);

mkdir($nombre."/0");  // Sin Zoom
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
{


	$im2 = @imagecreatefromjpeg("Artwork_SectoresVacios/queen.jpg")   // carga la foto de un sector vacío
//	$im2 = @imagecreatefromjpeg("Mapas/Rags/originals/fondo2.jpg")   // carga la foto de un sector vacío
	    or die("Cannot Initialize new GD image stream");

	$color_texto = imagecolorallocate($im, 0, 0, 91);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
//	imagestring($im2, 5, 7, 10,  'Parcela '.$x.'-'.$y, $color_texto);

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
	
	}
	else copy($im2, $nombre.'/0/'.$x.'-'.$y.".jpg");





	
}
echo "</br>Fila ".$x." generada!";
}


imagedestroy($im);

//imagedestroy($im2);


//echo "Generando niveles de Zoom";
//header('Location: generaMiniaturasZoom2.php?'.'doGenerate=Generate&&num='.$numx.'&&num2='.$numy.'&&nombre='.$nombre);
}

?>



<form action="generaBordes.php" method="get" name="generatorForm" id="generatorForm" >
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


