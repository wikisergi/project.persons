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



function salvaOperaciones()
{

	datos='data=' + $('#operaciones').html();

//alert(datos);

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/salva_operaciones.php",
			type: "GET",
			data: datos,
			dataType: "HTML",
			success: function(data)
			{ 

				alert("Operaciones salvadas correctamente!");

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}






function cargaOperaciones()
{

	datos='data=' + $('#operaciones').html();

//alert(datos);

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/carga_operaciones.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 

				$('#operaciones').html(data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}






