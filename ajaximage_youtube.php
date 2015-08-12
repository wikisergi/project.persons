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

$path = $_REQUEST['mapurl'];
$zoom = $_REQUEST['zoom'];
$foto = $_REQUEST['foto'];
$video_url = $_REQUEST['video_url'];
//$path = $_GET["map"];


$path = $path."data/originals/";

$actual_image_name="pepito.jpg";

copy($foto, $path.$actual_image_name);

//echo $path.$foto_new_name;


/*
	$valid_formats = array("jpg", "png", "gif", "bmp", "jpeg", "JPG");
	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
		{
			$name = $_FILES['photoimg']['name'];
			$size = $_FILES['photoimg']['size'];
			
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
							$tmp = $_FILES['photoimg']['tmp_name'];
							if(move_uploaded_file($tmp, $path.$actual_image_name))
								{			
*/
								
								
							// Calculo el tamaño específico de la imagen para así ajustar el tamaño según como esté el zoom actualmente
							list($width, $height, $type, $attr) = getimagesize($path.$actual_image_name);
							
								$width=intval((int)$width)/pow($zoom,2);
								$height=intval((int)$height)/pow($zoom,2);

								
													
									echo "<img src='".$path.$actual_image_name."' width='".$width."' height='".$height."' class='cuadrito' id='fotoRags' style='width:".$width."px; height=".$height."px;'>
									<div style='position:absolute; right:-45px; bottom:25px; '>
									<input type='button' id='boton_incrustar_foto' value='OK' onClick='incrustar_foto_preview_youtube(\"".$path.$actual_image_name."\", document.getElementById(\"cuadrito1\").style.left,document.getElementById(\"cuadrito1\").style.top, document.getElementById(\"fotoRags\").width,document.getElementById(\"fotoRags\").height, \"".$video_url."\");'/>
									</br>
									<input type='button' id='boton_cancel_incrustar_foto' value='X zoom=".$zoom."' onClick='el=document.getElementById(\"cuadrito1\"); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;'>
									</div>";

/*
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

*/
?>
