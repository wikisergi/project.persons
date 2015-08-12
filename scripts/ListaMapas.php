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

function ls()
{

	$path="../../maps"; //directorio a listar
	$directorio=dir($path);

	$pn= array();//pila de nombres
	$pf= array();//pila de fechas
	$pt= array();//pila de tamaNos

	//bucle para llenar las pilas :P
	while ($archivo = $directorio->read())
	{
		//no mostrar ni "." ni ".." ni el propio "index.php"
		if(($archivo!="index.php")&&($archivo!=".")&&($archivo!="..")){
		array_push($pn, $archivo);
		//array_push($pf, date("d F Y H:i", filemtime($archivo)));
		//array_push($pt, filesize($archivo));
	}


	}


	$directorio->close();

	//ordenar las 3 pilas segun la pila de nombres
	//array_multisort($pn,$pf,$pt);
	array_multisort($pn);


	echo '<input type="submit" name="botonVolver" id="botonVolver" value="<- Volver" onClick="botonVolver()"></br>';

	//mostrar los datos
	for($i=0; $i<count($pn); $i++)
	{
//		echo '<a href="#">'.$pn[$i]."</a> - ";
		
		$f=fopen($path.$pn[$i],"r");

		$dato=fgets($f);
		$inicio = substr($dato, strlen("NAME="), strlen($dato)-strlen("NAME=")-3);
		echo $inicio;

		$dato=fgets($f);
		$inicio = substr($dato, strlen("OWNER="), strlen($dato)-strlen("OWNER=")-3);
		echo $inicio;
		
		$dato=fgets($f);
		$inicio = substr($dato, strlen("URL="), strlen($dato)-strlen("URL=")-3);

//		echo " - ".$inicio;

//		echo '<a href="#" onclick="mapaQueen();">.- GO ->.</a>';		
		echo '<a href="#" class="noBlueLinks" onclick="mapLoad(\''.$pn[$i].'\'); "><img src="'.'../maps/'.$pn[$i].'/data/mini.jpg"/> '.$pn[$i].'</a><a href="#" class="noBlueLinks" style="color:red; font-size:250%;" onClick="delete_map('.$pn[$i].');">·</a>';		
//		echo '<a href="#" onclick="alert(\'ya!\');">.- GO ->.</a>';		
		
		echo "<br>";


		//switch(str)
		
	}
}


ls();


?>
