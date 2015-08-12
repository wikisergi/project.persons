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






function mapLoad(nombremapa)
{



	datos="mapName="+ nombremapa;





	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
        url : 'scripts/mapLoad.php',
        type : 'GET',
        data : datos,
        dataType : 'json',
        success : function (result) {

			STARTX=result['STARTX'];		// Indica sector STARTX-STARTY donde el mapa se inicia
			STARTY=result['STARTY'];
			MAX_X=result['MAX_X'];
			MAX_Y=result['MAX_Y'];
			zoom=result['START_ZOOM'];


			MAX_ZOOM=result['MAX_ZOOM'];
			mapDescription=result['mapDescription'];
			BASE_URL=result['BASE_URL'];
			URL1=result['URL1'];
			URL2=result['URL2'];
			URL3=result['URL3'];
			URL4=result['URL4'];
			mapName=result['mapName'];
			



//alert(STARTX);
//STARTX=13;
//STARTY=13;
//$('#draggable').html('');
	$("#draggable").html('<div id="objectsLayer" style="z-index:7000; top:0px; left:0px; position:absolute;" ></div><div id="operaciones" style="z-index:8000; top:0px; left:0px; position:absolute;" ></div>');



	loadObjects(BASE_URL); //Loads all objects information of the map in the objects Layer
	loadMiniMapObjects();
	
zoom=0;
configura();
dibuja();
iniciaMiniMap();
jumpTo(START_X, START_Y);
setMapURLforUploadImages();
//	loadObjects("pepito"); //Loads all objects information of the map in the objects Layer		



//init();
//jumpTo(1, 1); dibuja(); iniciaMiniMap();


         //  console.log(result['advert']) // The value of your php $row['adverts'] will be displayed
        },
        error : function () {
           // Salta nada más empezar, pese a estar todo bien ...
	   // alert("error");
        }
    })
	
	
	//alert("MAX_X="+MAX_X+" - "+"MAX_Y="+MAX_Y);
	
}


function mapDBgen(nombreMapa,BASE_URL,url_1,url_2,url_3,url_4,maxx,maxy,iniciox,inicioy,iniciozoom,maxzoom,descripcion)
{

	datos="mapName="+ nombreMapa + "&BASE_URL="+ BASE_URL  + "&URL1="+ url_1 + "&URL2="+ url_2 + "&URL3="+ url_3 + "&URL4="+ url_4 + "&MAX_X=" + maxx + "&MAX_Y=" + maxy + "&STARTX=" + iniciox + "&STARTY=" + inicioy + "&START_ZOOM=" + iniciozoom + "&MAX_ZOOM=" + maxzoom + "&mapDescription=" + descripcion;




	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
        url : 'scripts/mapDBgen.php',
        type : 'GET',
        data : datos,
/*        dataType : 'json',*/
        success : function (result) {

/*
			STARTX=result['STARTX'];		// Indica sector STARTX-STARTY donde el mapa se inicia
			STARTY=result['STARTY'];
			MAX_X=result['MAX_X'];
			MAX_Y=result['MAX_Y'];
			zoom=result['START_ZOOM'];


			MAX_ZOOM=result['MAX_ZOOM'];
			mapDescription=result['mapDescription'];
			URL1=result['URL1'];
			mapName=result['mapName'];
	*/	
			
//alert(STARTX);
//STARTX=13;
//STARTY=13;
zoom=0;
configura();

dibuja();

actualizaMiniMap();	
         //  console.log(result['advert']) // The value of your php $row['adverts'] will be displayed
        },
        error : function () {
           alert("error");
        }
    })
	
	

	
}




function delete_map(map)
{
datos="mapName="+map;
	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
 	async: true,
	cache: false, 
        url : 'scripts/delete_map.php',
        type : 'GET',
        data : datos,
        dataType : 'HTML',
        success : function (result) {

		  //  mapName=result;
		  //  mapLoad(mapName);
alert("Mapa "+map+" eliminado.");


        },
        error : function () {
           alert("error!");
        }
    })
}





function startup_map()
{



datos="";
	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
 	async: false,
	cache: false, 
        url : 'scripts/startup_map.php',
        type : 'GET',
        data : datos,
        dataType : 'HTML',
        success : function (result) {

		    mapName=result;
//alert(result);
		    mapLoad(mapName);
		    return(mapName); //No acaba de chutar muy bien todo esto, y tengo que hacer el mapLoad aquí, no sé por qué ...


        },
        error : function () {
           alert("error!");
        }
    })
	
	
	//alert("MAX_X="+MAX_X+" - "+"MAX_Y="+MAX_Y);
	
}



//Función utilizada al leer el mapa inicial, dentro del panel de control
function read_startup_map()
{



datos="";
	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
 	async: false,
//	cache: false, 
        url : 'scripts/startup_map.php',
        type : 'GET',
        data : datos,
        dataType : 'HTML',
        success : function (result) {
		  
		  $('#defaultMapToLoad').val(result);


        },
        error : function () {
           alert("error!");
        }
    })
	
	
	//alert("MAX_X="+MAX_X+" - "+"MAX_Y="+MAX_Y);
	
}



function changeDefaultMapToLoad(nombreNuevoMapaPorDefecto)
{



datos="mapName="+ nombreNuevoMapaPorDefecto;
	// I use JSON ajax call to get the map variables from mySQL database and load them dynamicly.
    $.ajax({
 	async: false,
//	cache: false, 
        url : 'scripts/change_startup_map.php',
        type : 'GET',
        data : datos,
        dataType : 'HTML',
        success : function (result) {
		  
//		  $('#defaultMapToLoad').val(result);

		mapLoad(nombreNuevoMapaPorDefecto);
        },
        error : function () {
           alert("error!");
        }
    })
	

}




