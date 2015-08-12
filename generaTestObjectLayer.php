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
function escribeLog($f, $text)
{
	$hora = getdate(time());
	$hora=$hora["hours"] . ":" . $hora["minutes"] . ":" . $hora["seconds"]; 
	fputs($f,date ( "j-n-Y" )." ".$hora." - ".$text."\r\n"); 

}


function writeObject($objects, $text)
{
	fputs($objects,$text."\r\n"); 

}



$objects=fopen('objectsLayer.html',"w");


//	writeObject($objects, '<div id="1371184001" class="imgSelect" style="position:absolute; left:512px; top:0px; width:500px; height:750px;"></div>');

$width=2048;
$height=1024;

for($x=0;$x<65536;$x+=2048)
for($y=0;$y<65536;$y+=1024)
{
	$txt="objeto_".$x."-".$y;
	
	writeObject($objects, '<div id="'.$txt.'" class="imgSelect" style="position:absolute; left:'.$x.'px; top:'.$y.'px; width:'.($width-18).'px; height:'.($height-18).'px;"></div>');


}


fclose($objects); 

echo("ok!");
 

?>





