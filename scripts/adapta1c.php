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
$source_pic = 'input/f1.jpg';
$destination_pic = 'output/f1.jpg';
*/
$path='./input';


$dir = opendir($path);
while ($dir && ($file = readdir($dir)) !== false) {

$source_pic =$path."/".$file;
$destination_pic = 'output/'.$file;




$src = imagecreatefromjpeg($source_pic);
list($width,$height)=getimagesize($source_pic);

echo "width=".$width."</br>";
echo "height=".$height."</br>";
echo "width+width%256=".($width+$width%256)."</br>";
echo "height+height%256=".($height+$height%256)."</br>";


$tmp=imagecreatetruecolor($width+256-$width%256,$height+256-$height%256);
//$tmp=imagecreatetruecolor(256,256);


$grey = imagecolorallocate($tmp, 128, 128, 128);
imagefilledrectangle($tmp, 0, 0, $width+256-$width%256, $height+256-$height%256, $grey);


imagecopyresampled($tmp,$src,(256-$width%256)/2,(256-$height%256)/2,0,0,$width, $height,$width,$height);
//imagecopyresampled($tmp,$src,($width%256)/2,($height%256)/2,0,0,256, 256,$width,$height);

imagejpeg($tmp,$destination_pic,100);
imagedestroy($src);
imagedestroy($tmp);

  // do stuff
}


?>

