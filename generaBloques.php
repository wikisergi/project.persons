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

mkdir("t");

for($x=1;$x<=16;$x++)
{
	for($y=1;$y<=16;$y++)
	{
		copy("1.htm", "t/".$x."-".$y);
	}
}











/*
$mapa=$_GET["mapa"];
$texto=$_GET["texto"];
$x=$_GET["x"];
$y=$_GET["y"];
$width=$_GET["width"];
$height=$_GET["height"];
*/


echo("ok!");

?>





