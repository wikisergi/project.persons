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

<body>ç

<center>

<?php





//if($_GET['doGenerate'] == 'Generate') 
{ 
//$numx=$_GET["num"];
//$numy=$_GET["num2"];
//$nombre=$_GET["nombre"];






//$nombre="Mapas/".$nombre;

$numx=256;
$numy=256;
$mapa="superMapa";






	
//	$im = ImageCreateTrueColor(180, 180)
//    	or die("Cannot Initialize new GD image stream");



for($sector=1;$sector<=1;$sector++)
{



$nombre='Mapas/'.$mapa."/sector".$sector;	

$x=1;
$y=1;

$sx=0;
$sy=0;

//	$fuente = imageloadfont('arial.gdf');
//	$color_texto = imagecolorallocate($im, 0, 0, 91);


	
	
mkdir($nombre."/1");
	
for ($x=1,$xx=1;$x<=$numx;$x+=2,$xx++)
{
	

for ($y=1,$yy=1;$y<=$numy;$y+=2,$yy++)
{
	

	$miniatura = ImageCreateTrueColor(256, 256)
    	or die("Cannot Initialize new GD image stream 1");
		
		
	$im2 = @imagecreatefromjpeg($nombre."/0/".$x."-".$y.".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream $x - $y!!");
	imagecopyresampled($miniatura, $im2, 0, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".($x+1)."-".$y.".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream $x - $y !!");
	imagecopyresampled($miniatura, $im2, 128, 0, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".$x."-".($y+1).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream $x - $y !!");
	imagecopyresampled($miniatura, $im2, 0, 128, 0, 0, 128, 128, 256, 256);

	$im2 = @imagecreatefromjpeg($nombre."/0/".($x+1)."-".($y+1).".jpg")   // carga la foto del sector actual
	    or die("Cannot Initialize new GD image stream $x - $y !!");
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



mkdir($nombre."/2");


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














mkdir($nombre."/3");


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




















mkdir($nombre."/4");


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











mkdir($nombre."/5");


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

















mkdir($nombre."/6");


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



}

imagedestroy($miniatura);
imagedestroy($im2);



}

?>



<form action="generaMiniaturasZoom2.php" method="get" name="generatorForm" id="generatorForm" >
  <table width="95%" border="0" cellpadding="3" cellspacing="3" class="forms">
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


