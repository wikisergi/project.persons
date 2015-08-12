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

//$path = "uploads/";

//$path = $_REQUEST['mapurl2'];
$path = '../maps/worldsbiggestprofile/'; //Hasta que no ponga una URL_BASE (URL del servidor Base, el de Dinahosting!)

$zoom = $_REQUEST['zoom2'];
//$path = $_GET["map"];

$path = $path."data/previews/";


	$valid_formats = array("jpg", "png", "gif", "bmp", "jpeg", "JPG");
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
		{
			$name = $_FILES['photoimg2']['name'];
			$size = $_FILES['photoimg2']['size'];
			
			if(strlen($name))
				{
					//list($txt, $ext) = explode(".", $name);
					$ext=substr($name, -3);
					$txt=substr($name, 0, strlen($name)-4);

					if(in_array($ext,$valid_formats))
					{
					if($size<(120048*120048))
//					if(1)
						{
							
							$actual_image_name = time().substr(str_replace(" ", "_", $txt), 5).".".$ext;
							$tmp = $_FILES['photoimg2']['tmp_name'];
							if(move_uploaded_file($tmp, $path.$actual_image_name))
								{			

								
								
							// Calculo el tamaño específico de la imagen para así ajustar el tamaño según como esté el zoom actualmente
							list($width, $height, $type, $attr) = getimagesize($path.$actual_image_name);
							
								$width=intval((int)$width)/pow($zoom,2);
								$height=intval((int)$height)/pow($zoom,2);

/*

							if($zoom==1)
							{
								$width=$width/2;
								$height/=2;
							}
							if(!strcmp($zoom,"2"))
							{
								$width/=4;
								$height/=4;
							}
							if(!strcmp($zoom,"3"))
							{
								$width/=8;
								$height/=8;
							}
							if(!strcmp($zoom,"4"))
							{
								$width/=16;
								$height/=16;
							}								
*/								
													


//echo $path.$actual_image_name;

echo "<div id='imagen_preview'><img src='".$path.$actual_image_name."'/>
<br>
<div id='botones_preview'>
<input type='button' id='boton_accept_preview'  value='OK' onClick='guardaPreviewBD(\"".$path.$actual_image_name."\",\"".$actual_image_name."\"); el=document.getElementById(\"botones_preview\"); padre = el.parentNode; padre.removeChild(el); el=null; padre=null; '/>
<input type='button' id='boton_cancel_preview' value='X' onClick='el=document.getElementById(\"imagen_preview\"); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;'>
</div>
</>";



/*
$mapName=$_GET["mapName"];  // Capturamos el nombre del mapa a secas (sin la ruta ni nada!


$username="mapemio";
$password="12345";



$link = mysql_connect("localhost:3306",$username,$password) or die("No database access");


//echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
//$result = mysql_query("SELECT * FROM info WHERE mapName = '".$mapName."'",$link);
//$result = mysql_query("SELECT * FROM info",$link);


mysql_select_db($mapName) or die( "Unable to select database");



//UPDATE  `PruebaBD1`.`objects` SET  `description` =  'Fue muy bonito ito ito!' WHERE  `objects`.`id` =  '140658686705302tomando_el_sol' LIMIT 1

$result = mysql_query("UPDATE `".$mapName."`.`objects` SET `preview` = '".$path.$actual_image_name."' WHERE   `objects`.`id` =  '".$object_id."' LIMIT 1",$link);


mysql_close();
*/





// Esto es lo que en incrustar imagen se mostraba en la pantalla, para incrustarlo o no. Ahora habrá que hacer lo mismo (con OK o cancelar), en el Preview.
// Pero de momento no lo hago, para ir más rápido. Más adelante, tendré que solicitar la confirmación, pero por ahora, incrustamos ya la imagen en el
// preview y también metemos el dato en la bas de datos. Has visto Eva, mira si escribo cosas, jejejeje!
/*
									echo "<img src='".$path.$actual_image_name."' width='".$width."' height='".$height."' class='cuadrito' id='fotoRags' style='width:".$width."px; height=".$height."px;'>
									<div style='position:absolute; right:-45px; bottom:25px; '>
									<input type='button' id='boton_incrustar_foto' value='OK' onClick='incrustar_foto(\"".$path.$actual_image_name."\", document.getElementById(\"cuadrito1\").style.left,document.getElementById(\"cuadrito1\").style.top, document.getElementById(\"fotoRags\").width,document.getElementById(\"fotoRags\").height)'/>
									</br>
									<input type='button' id='boton_cancel_incrustar_foto' value='X zoom=".$zoom."' onClick='el=document.getElementById(\"cuadrito1\"); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;'>
									</div>";


*/
								}
							else
								echo "failed!! | path=".$path;
						}
						else
						echo "Image file size max 1 MB";					
						}
						else
						echo "Invalid file format..!!!";	
				}
				
			else
				echo "Please select image titi..!";
				
			exit;
		}
?>
