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

function showObjectsInfoPanel()
{

	$("#infoMapName").html(mapName);
	$("#infoMapURL1").html(URL1);
	$("#infoMapURL2").html(URL2);
	$("#infoMapURL3").html(URL3);
	$("#infoMapURL4").html(URL4);
	$("#infoMapSize").html(MAX_X + " x " + MAX_Y);
	$("#infoMapStartPoint").html(STARTX + "," + STARTY);
	$("#infoMapDescription").html(mapDescription);
	

	$("#objectsInfoPanel").css("visibility","visible");
	$("#panel_contenido").css("visibility","hidden");	

	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");
	
}

function showEditPanel()
{
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

	$("#panel_contenido").css("visibility","hidden");	
	

	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");	
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");	
}



function showMainMenu()
{
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");	
	

	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");	


	$("#panel_contenido").css("visibility","visible");	
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");	
	
	
	
}







