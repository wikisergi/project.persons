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

/*
$datos=$_POST["datos"];

$decodificados=json_decode($datos);
//if($f=fopen("locomia.htm","w+")) fputs($f, $_POST); 
if($f=fopen("locomia.htm","w+")) fputs($f, $decodificados); 

if (isset($_POST['datos']))  fputs($f, "datos hay");
*/


$datos = ($_POST['datos']);
$sector = ($_POST['sector']);


$coordenadas = explode("-",$sector);

$x=$coordenadas[0];
$y=$coordenadas[1];



$f=fopen($sector.".htm","w");








$datos='<style type="text/css">
.PieNotaFotos{font-size:10px;font-family:Arial,Helvetica,sans-serif;text-align:center}.TextoDerecha{position:relative;margin-left:5px;font-family:Arial,Helvetica,sans-serif;font-size:12px;left:5px}.SubtituloPrincipal{font-family:"Comic Sans MS",cursive;font-size:14px;font-style:italic;color:#006}.TituloDerecha{font-weight:bold;text-decoration:underline}.TituloPrincipal{font-weight:bold;font-family:"Lucida Sans Unicode","Lucida Grande",sans-serif;font-size:36px;color:#03F}.PieNotaFotos{text-align:center}




.derecha {
	font-family: "Comic Sans MS", cursive;
	text-align: right;
}
.titulo1 {
	font-family: Tahoma, Geneva, sans-serif;
	font-size: 16px;
	font-style: normal;
	text-transform: capitalize;
	text-decoration: underline;
	font-weight: bold;
}
.Gracias {
	font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
	font-size: 36px;
	color: #F09;
	font-style: italic;
	text-align: center;
	font-weight: bold;
}
.centrado {
	text-align: center;
}
.inv{visibility:hidden;}

</style>'.$datos.'

<!-- CODIGOS DE IDENTIFICACION DEL SECTOR -->
<div id="x" class="inv">'.$x.'</div>
<div id="y" class="inv">'.$y.'</div>
<div id="b" class="inv">1</div>  <!-- b=busy, indica si el sector está libre u ocupado -->
<!------------------------------------------>';






	   fputs($f, $datos);



fclose($f); 
?>

