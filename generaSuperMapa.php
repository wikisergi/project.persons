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





//if($_GET['doGenerate'] == 'Generate') 
{ 

//$nombre=$_GET["nombre"];
//$numx=$_GET["num"];
//$numy=$_GET["num2"];


$numx=256;
$numy=256;
$nombre="superMapa";




$mapa='Mapas/'.$nombre.'/';


echo "Generando Parcelas del mapa";


mkdir($mapa);







for($sector=1;$sector<=64;$sector++)
{


mkdir($mapa."sector".$sector);

echo "<br/>Generando Parcelas del sector ".$sector;

echo "<br/>Generando directorio ".$mapa."sector".$sector."/0/";

mkdir($mapa."sector".$sector."/0");  // Sin Zoom

	
	$im = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream");

	$im2 = @imagecreatefromjpeg("Artwork_SectoresVacios/fondo_nubes.jpg")   // carga la foto de ejemplo a la futura parcela
	    or die("Cannot Initialize new GD image stream");

$x=1;
$y=1;

$sx=0;
$sy=0;

//	$fuente = imageloadfont('arial.gdf');
	$color_texto1 = imagecolorallocate($im, 0, 0, 91);
	$color_texto2 = imagecolorallocate($im, 255, 0, 0);
	
	
	
	
//	mkdir("t");    // Genera direciontio para las QuickTips
	
for ($x=1;$x<=$numx;$x++)
{
	

for ($y=1;$y<=$numy;$y++)
{
	





	imagecopy($im, $im2, 0, 0, 0, 0, 256, 256);
//	imagestring($im, $fuente, 12, 10,  $x.'-'.$y.'a', $color_texto);
	imagestring($im, 5, 7, 10,  'Sector '.$sector, $color_texto1);
	imagestring($im, 5, 7, 25,  'Parcela '.$x.'-'.$y, $color_texto2);
echo "intenta crear imagen ".$mapa."sector".$sector.'/0/'.$x.'-'.$y.'.jpg';
	imagejpeg($im, $mapa."sector".$sector.'/0/'.$x.'-'.$y.'.jpg');





	
}

}





}



imagedestroy($im);
imagedestroy($im2);

/*
echo "Generando niveles de Zoom";
header('Location: generaMiniaturasZoom2.php?'.'doGenerate=Generate&&num='.$numx.'&&num2='.$numy);
*/
}

?>



<form action="generaSectores.php" method="get" name="generatorForm" id="generatorForm" >
  <table width="95%" border="0" cellpadding="3" cellspacing="3" class="forms">
    <tr>
      <td>Nombre del Mapa a generar:</td>
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


