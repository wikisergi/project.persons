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



$mapa="../../maps/".$nombre."/0/";







	
//	$im = ImageCreateTrueColor(180, 180)
//    	or die("Cannot Initialize new GD image stream");




$x=1;
$y=1;

$sx=0;
$sy=0;

//	$fuente = imageloadfont('arial.gdf');
//	$color_texto = imagecolorallocate($im, 0, 0, 91);
	
	
$lupa=8;	// A qué tamaño redimensionamos las parcelas, que originalmente son de 256.

	$miniatura = ImageCreateTrueColor($numx*$lupa, $numy*$lupa)
    	or die("Cannot Initialize new GD image stream");
	
for ($x=1;$x<=$numx;$x++)
{
	

for ($y=1;$y<=$numy;$y++)
{
	

	$im2 = @imagecreatefromjpeg($mapa.$x."-".$y.".jpg")   // carga la foto del sector actual
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

imagejpeg($miniatura, "../../maps/".$nombre."/miniatura.jpg");

imagedestroy($miniatura);
imagedestroy($im2);



}

?>



<form action="generaMiniatura.php" method="get" name="generatorForm" id="generatorForm" >
  <table width="95%" border="0" cellpadding="3" cellspacing="3" class="forms">
    <tr>
      <td>Nombre mapa:</td>
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


