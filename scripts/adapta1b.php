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


echo "->".$source_pic;


$max_width = 512;
$max_height = 512;

$src = imagecreatefromjpeg($source_pic);
list($width,$height)=getimagesize($source_pic);

$x_ratio = $max_width / $width;
$y_ratio = $max_height / $height;

if( ($width <= $max_width) && ($height <= $max_height) ){
    $tn_width = $width;
    $tn_height = $height;
    }elseif (($x_ratio * $height) < $max_height){
        $tn_height = ceil($x_ratio * $height);
        $tn_width = $max_width;
    }else{
        $tn_width = ceil($y_ratio * $width);
        $tn_height = $max_height;
}

//$tmp=imagecreatetruecolor($tn_width,$tn_height);

$tmp=imagecreatetruecolor($tn_width+$tn_width%256,$tn_height+$tn_height%256);

/*
$pp=tn_width%256;
echo "tn_width%256=".($tn_width%256);
echo "</br>";

echo "tn_width=".$tn_width;
echo "</br>";
*/

//imagecopyresampled($tmp,$src,0,0,0,0,$tn_width, $tn_height,$width,$height);
imagecopyresampled($tmp,$src,0,0,($tn_width%256)/2,($tn_height%256)/2,$tn_width, $tn_height,$width,$height);

imagejpeg($tmp,$destination_pic,100);
imagedestroy($src);
imagedestroy($tmp);

  // do stuff
}


?>

