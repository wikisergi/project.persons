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

// localhost/NG26/scripts/insertatexto.php?mapa=../maps/zero1-1/&&texto=TEXTO INSERTADO&&x=100&&y=100&&width=500&&height=579

echo "OK!";




$f=fopen('log.txt',"w+");
	$hora = getdate(time());
	$hora=$hora["hours"] . ":" . $hora["minutes"] . ":" . $hora["seconds"]; 
	fputs($f,date ( "j-n-Y" )." ".$hora." - ".$bloqueX."-".$bloqueY."\r\n"); 
fclose($f);



$mapa=$_GET["mapa"];
$texto=$_GET["texto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];



// Calculamos el primer sector afectado por la incrustación de la fotografía
$parcelaX=intval((int)($x)/256)+1;
$parcelaY=intval((int)($y)/256)+1;


$safectadosX=intval((int)( $width + (int)($x%256) )/256+1);		// Calcula los sectores horizontales que se verán afectados por la inserción de la imagen
$safectadosY=intval((int)($height + (int)($y%256) )/256+1);	// Calcula los sectores verticales que se verán afectados por la inserción de la imagen

// Calcula el Bloque donde tiene que ser añadido el texto insertado
	$bloqueX=intval((int)($parcelaX/16)+1);
	$bloqueY=intval((int)($parcelaY/16)+1);




if(file_exists($mapa."/t2/".$bloqueX.'-'.$bloqueY.'.htm'))
	$f=fopen($mapa."/t2/".$bloqueX.'-'.$bloqueY.'.htm',"a");
else 
{
		 $f=fopen($mapa."/t2/".$bloqueX.'-'.$bloqueY.'.htm',"w+");
	fputs($f,'<!-- CODIGOS DE IDENTIFICACION DEL SECTOR -->
<div id="x" class="inv">'.$bloqueX.'</div>
<div id="y" class="inv">'.$bloqueY.'</div>
<!------------------------------------------>');	 
}

$texto='<div class="CursiveSansOblique" style="position:absolute; left:'.($x-4096*($bloqueX-1)).'px; top:'.($y-4096*($bloqueY-1)).'px; border: 1px double black; background-color:#FFFF99;">'.$texto.'</div>';


fputs($f, $texto);  
fclose($f); 









echo("ok!");

?>





