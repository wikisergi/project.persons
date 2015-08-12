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

function guardaPreviewBD(nombre_preview, nombre_preview_sin_ruta)
{

// \"".$path.$actual_image_name."\"

// alert("PEPITO GRILLO! En la base de datos has de meter esto:" + nombre_preview);


infoid=$('#infoID').html();



	datos="mapName="+mapName+"&nombre_preview="+nombre_preview+"&object_id="+infoid+"&nombre_preview_sin_ruta="+nombre_preview_sin_ruta;

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/guardaPreviewBD.php",
			type: "GET",
			data: datos,
			dataType: "HTML",
			success: function(data)
			{ 



			},
			error: function(data)
			{
				alert("ERROR!");
  			}
		 });	








}
