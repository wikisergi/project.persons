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

//$path = $_REQUEST['mapurl'];
//$zoom = $_REQUEST['zoom'];
//$path = $_GET["map"];

//$path = $path."data/originals/";


													
echo "<img src='../artwork/bullets/redblin.gif' width='".$width."' height='".$height."' class='cuadrito' id='fotoRags' style='width:".$width."px; height=".$height."px;'>
									<div style='position:absolute; right:-45px; bottom:25px; '>
									<input type='button' id='boton_incrustar_foto' value='OK' onClick='incrustar_foto(\"".$path.$actual_image_name."\", document.getElementById(\"cuadrito1\").style.left,document.getElementById(\"cuadrito1\").style.top, document.getElementById(\"fotoRags\").width,document.getElementById(\"fotoRags\").height)'/>
									</br>
									<input type='button' id='boton_cancel_incrustar_foto' value='X zoom=".$zoom."' onClick='el=document.getElementById(\"cuadrito1\"); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;'>
									</div>";

				
			exit;

?>
