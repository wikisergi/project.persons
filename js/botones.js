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


function youtube_insert_button()
{

	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","visible");
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");

	$("#objectsInfoPanel").css("visibility","hidden");
}








function regeneraZooms()
{
  datos="nombre=" + mapName + "&num=" + MAX_X + "&num2=" + MAX_Y + "&doGenerate=Generate";

	carga=$.ajax
  ({
		async: true,
		cache: false,
		url: "scripts/generaMiniaturasZoom2.php",
		type: "GET",
		data: datos,
		dataType: "HTML",
		success: function(data)
		{ 

			alert("Mapa regenerado correctamente!");

			},
		error: function(data)
		{
			alert("ERROR!");
			}
  });	
}

function generaMiniMap()
{
	datos="nombre=" + mapName + "&num=" + MAX_X + "&num2=" + MAX_Y + "&doGenerate=Generate";

	carga=$.ajax({
		async: true,
		cache: false,
		url: "scripts/generaMiniatura.php",
		type: "GET",
		data: datos,
		dataType: "HTML",
		success: function(data)
		{ 
			add_to_log("Minimapa de " + mapName + " generado correctamente.");

			},
		error: function(data)
		{
			alert("ERROR!");
			}
	});	

}

$('#guardar').click(function()
{
  jQuery(".cuadrito").draggable("destroy").resizable("destroy").attr('contentEditable', false);
});

$('#vaciar').click(function()
{
	mapa = $('#draggable').position();

	$("#minimap").css("top", mapa.top/41.6666666666666666666-10);
	$("#minimap").css("left", mapa.left/41.6666666666666666666);	
	
	 //Calcula número X del primer de sector a dibujar  (no la coordenada, si no su posición X en sectores
	PrX=parseInt(-mapa.left/ANCHO_SECTOR)+1;	
	PrY=parseInt(-mapa.top/ANCHO_SECTOR)+1;	

	x=PrX;
	y=PrY;
  dibuja();

	// Dibujamos los 3 primeros sectores: Primero - medios - Ultimo
	for(x=PrX;x<=PrX+9&&x<=MAX_X;x++)
	{
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY;y<=PrY+7&&y<=MAX_Y;y++)
		{
			if(CARGA_DATOS)     // Carga los datos en los sectores si así se configura.
			{
				el= document.getElementById('s'+x+"-"+y);
				document.getElementById('draggable').removeChild(el);
				el = null;

				imagen = document.createElement("img");

				if(CODIFICA_NOMBRE_PARCELAS)
          imagen.setAttribute("src", URL1 + zoom + '/' + md5(x + '-' + y));
				else 
          imagen.setAttribute("src", URL1 + zoom + '/' + x + '-' + y + '?' + (new Date()).getTime());

				imagen.width = ANCHO_SECTOR;
				imagen.height = ALTO_SECTOR;
				imagen.setAttribute("id", "s" + x + "-" + y);
				imagen.setAttribute("class", "sector");

				tip= x + "-" + y;
				//imagen.setAttribute("onLoad", "this.style.visibility='visible'");

				if(MUESTRA_TIPS)
				{
					tip= x + "-" + y + "t";
					imagen.setAttribute("onClick", "cargaTip('" + tip + "')");
					imagen.setAttribute("onContextMenu", "cargaAdminDialog('" + tip + "')");
				}

				imagen.style.top =  (y-2)*ALTO_SECTOR + "px";
				imagen.style.left =  (x-2)*ANCHO_SECTOR + "px";
				imagen.style.position =  "absolute";						
				document.getElementById('draggable').appendChild(imagen);

				imagen=null;
		  }
    }
  }
	
  dibuja();

});


$('#seleccionar').click(function()
{
  document.onselectstart = function() {return true;}	

  jQuery("#draggable").draggable("destroy");

  $('#draggable').mouseup(function()
  {
    $( "#draggable" ).css( "cursor", 'url(grab.cur),none' );  
    document.onselectstart = function() {return false;}	
    jQuery("#draggable").draggable();
  });
});

// OJO, este boton aun no existe. Incrusta texto como imagen!
$('#botonIncrustaTexto').click(function()
{
	texto = prompt("Texto a incrustar?", "");

	mapa = $('.mapa').position();
	
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2-200;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2-200;

	$("#operaciones").append('<div class="CursiveSansOblique cuadrito" id="cuadrito1" style="font-size:145px; border:1px dashed yellow; position:absolute; width:300px; height:200px; top:'+y+'px; left:'+x+'px; z-index:500;">'+texto+'<div style="position:absolute; right:-45px; bottom:25px; "><input type="button" id="boton_incrustar_texto" value="OK" onClick="incrustar_texto(\''+texto+'\', document.getElementById(\'cuadrito1\').style.left,document.getElementById(\'cuadrito1\').style.top, document.getElementById(\'cuadrito1\').style.width,document.getElementById(\'cuadrito1\').style.height)"/></br><input type="button" id="boton_cancel_incrustar_texto" value="X" onClick="el=document.getElementById(\'cuadrito1\'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;"></div></div>');

  $(".cuadrito").draggable();  //.attr('contentEditable', true);

  $("#cuadrito1").resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: 1000, maxHeight: 1000  }).attr('contentEditable', true);
});

$('#zoomIn').click(function()
{
	
	
  if(zoom>0)
  {
  	MAX_X=MAX_X*2;
  	MAX_Y=MAX_Y*2;
  
    zoom = zoom-1;
    dibuja();
  }
});

$('#zoomOut').click(function()
{
  if(zoom<6)
  {
  	MAX_X=MAX_X/2;
  	MAX_Y=MAX_Y/2;
    zoom = zoom+1;
    dibuja();
  }
});

$('#select_tool').click(function()
{
  seleccion=!seleccion;
});

$('#loadImageDirectory').click(function()
{
  $("#imageDirectory").css("visibility","visible");
  $('#imageDirectory').animate({right: '+=202'}, 200); 
});

$('#deleteParcelButton').click(function()
{
	alert(1);
  $("#imageDirectory").css("visibility","visible");
});

$('#right').click(function()
{
  $("#draggable").animate({"left": "-=1000px"}, "fast");
  examina();
});

$('#left').click(function()
{
  $("#draggable").animate({"left": "+=1000px"}, "fast");
  examina();
});

$('#ocultarControles').click(function()
{
	$("#mostrarControles").show(1);
  $("#controls").animate({"left": "+=120px"}, "fast");
  //  $("#controls").html('<input type="button" id="mostrarControles" value="<<"/>');
});

$('#mostrarControles').click(function()
{
	$("#mostrarControles").hide(1);
  $("#controls").animate({"left": "-=120px"}, "fast");
  //  $("#controls").html('<center><input type="button" id="left" value="<-"/><input type="button" id="right" value="->"/></br></br><input type="button" id="ocultarControles" value="Ocultar->"/></center>');
});

$('#ocultarMiniMap').click(function()
{
	$("#mostrarMiniMap").show(1);
  $("#minimap").animate({"left": "-=200px"}, "fast");
  //  $("#controls").html('<input type="button" id="mostrarControles" value="<<"/>');
});

$('#mostrarMiniMap').click(function()
{
	$("#mostrarMiniMap").hide(1);
  $("#minimap").animate({"left": "+=200px"}, "fast");
  //  $("#controls").html('<center><input type="button" id="left" value="<-"/><input type="button" id="right" value="->"/></br></br><input type="button" id="ocultarControles" value="Ocultar->"/></center>');
});

// Revisa todas las checkbox de las opciones marcadas y asigna las variables a los valores que toque
function revisaOpciones()
{
	if(document.formOptions.elements[2].checked)
		modoSuperAdmin=1;
  else 
    modoSuperAdmin=0;
}

function botonOpciones()
{
  $("#panel_contenido").html('<div class="menuVideo" id="menuOpciones" style="height:270px;"><div style="width:400px;"><center><h3>OPTIONS</h3></center><form action="" method="get"  name="formOptions"><br /><input name="" type="checkbox" value="" /><span onClick="document.formOptions.elements[0].checked=(! document.formOptions.elements[0].checked);" onMouseOver="document.body.style.cursor=\'pointer\'" onMouseOut="document.body.style.cursor=\'normal\'"> Snap parcels to parcel grid</span><br /><input name="" type="checkbox" value="1" /> Repetir<br /><br /><input name="" type="checkbox" value="" /> <b>Modo SuperAdmin</b><br /><br /><input name="" type="checkbox" value="" /> Controles<br /><br />Tamaño:<select name="tamanyo" >  <option>560 x 315</option>  <option>640 x 360</option>  <option>853 x 480</option>  <option>1280 x 720</option></select><br /><br /><br /><center><input name="" type="button" value="OK" onClick="revisaOpciones(); destruye(\'menuOpciones\')"/></center></form></div></div>');

  // <span onClick="document.formOptions.elements[0].checked=(! document.formOptions.elements[0].checked);">Snap parcels to parcel grid</span>
  // Esto permite que al pulsar sobre el texto, también se marque la checkbox!!
  
  //document.getElementById('nombreVideo').focus();	// Focaliza el cursor en la inserción de la URL del vídeo a insertar
  
  if(modoSuperAdmin) 
  	document.formOptions.elements[2].checked=true;
  else
  	document.formOptions.elements[2].checked=false;
}

function botonInsertarVideo()
{
	//$("#operaciones").html("");
	if(document.getElementById('cuadrito1')!=undefined)
	{
    alert("ya");
    el=document.getElementById('cuadrito1'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;
	}
	
  //	texto = prompt("URL del vídeo de YouTube a insertar (sólo el código!!)?", "");

  $("body").append('<div class="menuVideo" id="menuVideo"><div style="width:400px;"><center><h3>Insertar vídeo de YouTube</h3></center><form action="" method="get"  name="formVideo">URL: <input name="nombre" id="nombreVideo" type="text" size="45"/><br /><br /><input name="" type="checkbox" value="" /> Iniciar cuando se haga visible<br /><input name="" type="checkbox" value="1" /> Repetir<br /><input name="" type="checkbox" value="" /> Controles<br /><br />Tamaño:<select name="tamanyo" >  <option>560 x 315</option>  <option>640 x 360</option>  <option>853 x 480</option>  <option>1280 x 720</option></select><br /><br /><br /><center><input name="" type="button" value="OK" onClick="javascript:botonOKInsertarVideo(document.formVideo)"/><input name="" type="button" value="Cancelar" onClick="destruye(\'menuVideo\')"/></center></form></div></div>');
  document.getElementById('nombreVideo').focus();	// Focaliza el cursor en la inserción de la URL del vídeo a insertar
}

function botonMapGen()
{
  // ESTO ES CUANDO SALÍA UNA VENTANA EN MEDIO A MODO DE CUADRO DE DIÁLOGO PARA LA GENERACIÓN DE MAPAS. DESPUÉS LO PASÉ AL PANEL IZQUIERDO
  /*
  $("body").append('<div class="menuVideo" id="menuMapGen" style="height:200px;"><div style="width:400px;"><center><h3>MAP GENERATION</h3></center><form action="" method="get"  name="formOptions"><br /><center>Name: <input name="mapName" type="text" id="mapName" /><br /><br />Tamaño:<select id="mapw" >  <option>256</option>  <option>64</option>  </select>x<select id="maph" >  <option>256</option>  <option>64</option>  </select></center><br /><br /><br /><center><input name="" type="button" value="OK" onClick="generaMapa(document.getElementById(\'mapName\').value,document.getElementById(\'mapw\').value,document.getElementById(\'maph\').value); destruye(\'menuMapGen\')"/><input name="" type="button" value="Cancel" onClick="destruye(\'menuMapGen\')"/></center></form></div></div>');
  */

	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","visible");
	$("#panel_control_panel").css("visibility","hidden");

	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

	//$("#panel_lista_mapas").css("height","0");
	//$("#panel_contenido").css("height","0");
	//$("#panel_map_generation").css("height","inherit");

  // <span onClick="document.formOptions.elements[0].checked=(! document.formOptions.elements[0].checked);">Snap parcels to parcel grid</span>
  // Esto permite que al pulsar sobre el texto, también se marque la checkbox!!
  
  //document.getElementById('nombreVideo').focus();	// Focaliza el cursor en la inserción de la URL del vídeo a insertar
}

function sampleParcelsList()
{
  datos="";
	carga=$.ajax({
		async: true,
		cache: false,
		url: "scripts/parcelSamplesList.php",
		type: "GET",
		data: datos,
		dataType: "HTML",
		success: function(data)
		{ 
      /*
			$("#panel_lista_mapas").css("visibility","visible");
			$("#panel_contenido").css("visibility","hidden");
			$("#panel_map_generation").css("visibility","hidden");
			$("#panel_lista_mapas").css("height","inherit");
			$("#panel_contenido").css("height","0");
			$("#panel_map_generation").css("height","0");
      */

			$("#parcelSamplesList").html(data);
		  //	alert("Mapa generado correctamente!");

		},
		error: function(data)
		{
			$("#parcelSamplesList").html("ERROR");
		}
  });	
}

function botonMapList(target_div)
{
  datos="";
	carga=$.ajax({
		async: true,
		cache: false,
		url: "scripts/ListaMapas.php",
		type: "GET",
		data: datos,
		dataType: "HTML",
		success: function(data)
		{ 
			$("#search_panel").css("visibility","hidden");
			$("#youtube_insert_panel").css("visibility","hidden");
			$("#panel_log").css("visibility","hidden");
			$("#panel_control_panel").css("visibility","hidden");
			$("#panel_lista_mapas").css("visibility","visible");
			$("#panel_contenido").css("visibility","hidden");
			$("#panel_map_generation").css("visibility","hidden");
			$("#objectsInfoPanel").css("visibility","hidden");
			$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

		  //	$("#panel_lista_mapas").css("height","100%");
			//$("#panel_contenido").css("height","0");
			//$("#panel_map_generation").css("height","0");
			$(target_div).html(data);
		  //	alert("Mapa generado correctamente!");
			},
		error: function(data)
		{
			alert("ERROR!");
		}
	});	
  
  /*
  
  		carga=$.ajax({
  			async: true,
  			cache: false,
  			url: "ListaMapas.php",
  			type: "GET",
  			dataType: "HTML",
  			success: function(data)
  			{ 
  
  				alert("Mapa generado correctamente!");
  
  
  $("body").append('<div class="menuVideo" id="menuMapGen" style="height:200px;"><div style="width:400px;"><center><h3>MAP LIST</h3></center><form action="" method="get"  name="formOptions"><br /><center>Name: <input name="mapName" type="text" id="mapName" /><br /><br />Tamaño:<select id="mapw" >  <option>256</option>  <option>64</option>  </select>x<select id="maph" >  <option>256</option>  <option>64</option>  </select></center><br /><br /><br /><center><input name="" type="button" value="OK" onClick="generaMapa(document.getElementById(\'mapName\').value,document.getElementById(\'mapw\').value,document.getElementById(\'maph\').value); destruye(\'menuMapGen\')"/><input name="" type="button" value="Cancel" onClick="destruye(\'menuMapGen\')"/></center></form></div></div>');
  
  				},
  			error: function(data)
  			{
  				alert("ERROR!");
    			}
  		 });	
  
  
  */
  
  
  
  
  // <span onClick="document.formOptions.elements[0].checked=(! document.formOptions.elements[0].checked);">Snap parcels to parcel grid</span>
  // Esto permite que al pulsar sobre el texto, también se marque la checkbox!!
  
  //document.getElementById('nombreVideo').focus();	// Focaliza el cursor en la inserción de la URL del vídeo a insertar
}


function show_panel_supermap_controls()
{
	
	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_supermap_controls").css("visibility","visible");
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

  //	$("#panel_lista_mapas").css("height","100%");
	//$("#panel_contenido").css("height","0");
	//$("#panel_map_generation").css("height","0");

  //	alert("Mapa generado correctamente!");

	
	
	
	
}










function show_search_panel()
{
	
	$("#search_panel").css("visibility","visible");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_supermap_controls").css("visibility","hidden");
	$("#panel_log").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

  //	$("#panel_lista_mapas").css("height","100%");
	//$("#panel_contenido").css("height","0");
	//$("#panel_map_generation").css("height","0");

  //	alert("Mapa generado correctamente!");

	
	
	
	
}







function show_control_panel()
{
	
	
	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_control_panel").css("visibility","visible");
	$("#panel_log").css("visibility","hidden");
	$("#panel_supermap_controls").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

  //	$("#panel_lista_mapas").css("height","100%");
	//$("#panel_contenido").css("height","0");
	//$("#panel_map_generation").css("height","0");

  //	alert("Mapa generado correctamente!");

}






function show_log_panel()
{
	
	
	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_log").css("visibility","visible");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_supermap_controls").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","hidden");
	$("#panel_map_generation").css("visibility","hidden");
	$("#objectsInfoPanel").css("visibility","hidden");
	$("#social_plugins").html(""); //Mata el contenido de social_pluggins, para evitar problemas con el z-index y para evitar sobre-carga inecesaria

  //	$("#panel_lista_mapas").css("height","100%");
	//$("#panel_contenido").css("height","0");
	//$("#panel_map_generation").css("height","0");

  //	alert("Mapa generado correctamente!");

}



function generaMapa(mapName, w, h, parcela_descripcion,parcela_borde,background_resize, plantilla)
{

 add_to_log("Generando mapa '" + mapName + "'");
 //	alert(mapName + " " + w + ", " + h);
  
  /*
  $numx=$_GET["num"];
  $numy=$_GET["num2"];
  $nombre=$_GET["nombre"];
  */
 // alert("Nombre del mapa a generarse="+ mapName + " y parcela_descripcion=" + parcela_descripcion);
	datos="nombre=" + mapName + "&num=" + w + "&num2=" + h + "&doGenerate=Generate" + "&parcela_descripcion=" + parcela_descripcion + "&parcela_borde=" + parcela_borde + "&background_resize=" + background_resize + "&plantilla=" + plantilla+ "&MAX_ZOOM=" + MAX_ZOOM;

	carga=$.ajax({
		async: true,
		cache: false,
		url: "scripts/mapgen.php",
		type: "GET",
		data: datos,
		dataType: "HTML",
		success: function(data)
		{ 

			add_to_log(data);
			//alert("Mapa generado correctamente! " + getHours() + ":" + getMinutes() + ":" + getSeconds());

			},
		error: function(data)
		{
			alert("ERROR!");
			}
  });	
}

function botonLockPanel()
{
	botonMenuLocked= !botonMenuLocked;

	if(botonMenuLocked==true)
	{
		$('.botonMenu').mouseover(function() 
		{
	//		if($(document).find('#panel').css('left')=='-400px')
		//		$('#panel').animate({'left': '0px'}, 'fast');
		});	
	}
	else
	{
		$('botonMenu').mouseover(function() 
		{
		});
		
		$('#draggable').mouseover(function() 
		{
		});
	}
}

function botonMenu()
{
	//Si el panel está visible, lo oculta y si está oculto, lo muestra:
	if($(document).find('#panel').css('left')=='0px') 
	{
		$("#panel").animate({"left": "-=400px"}, "fast");
		document.getElementById('panelIconContainer').style.left="402px";
		document.getElementById('leftRightIcon').src='icons2/1361402296_RightArrow.png'

    //		$(document).find('#panel').css('visibility', 'hidden');
	}
	else
	{
		$("#panel").animate({"left": "+=400px"}, "fast");
		document.getElementById('leftRightIcon').src='icons2/1361402303_LeftArrow.png'
		document.getElementById('panelIconContainer').style.left="384px";
    //	$(document).find('#panel').css('visibility', 'visible');
	}
}

function botonVolver()
{
  // MUESTRA MENÚ PRINCIPAL
	$("#search_panel").css("visibility","hidden");
	$("#youtube_insert_panel").css("visibility","hidden");
	$("#panel_lista_mapas").css("visibility","hidden");
	$("#panel_contenido").css("visibility","visible");
	$("#panel_control_panel").css("visibility","hidden");
	$("#panel_log").css("visibility","hidden");
	
	$("#panel_map_generation").css("visibility","hidden");
	//$("#panel_lista_mapas").css("height","0");
	$("#panel_contenido").css("height","inherit");
	//$("#panel_map_generation").css("height","0");
}

function botonSeleccionarMapa()
{
  $("#panel_contenido").html('<div class="menuVideo" id="menuSeleccionMapa"><div style="width:400px;"><center>  <h3>Elegir Mapa:</h3></center><a href="#" onClick="mapaSergi(); destruye(\'menuSeleccionMapa\')">Sergi</a><br/><a href="#" onClick="mapaCorsetsYmas(); destruye(\'menuSeleccionMapa\')">Corsets y Más</a><br /><a href="#" onClick="mapaRags(); destruye(\'menuSeleccionMapa\')">Rags</a><br /><a href="#" onClick="mapaCircuit(); destruye(\'menuSeleccionMapa\')">Circuit</a><br /><a href="#" onClick="mapaNetwork(); destruye(\'menuSeleccionMapa\')">Networking Stuff</a><br /><a href="#" onClick="mapaPrueba8(); destruye(\'menuSeleccionMapa\')">Prueba8</a><br /><a href="#" onClick="mapaCorcho(); destruye(\'menuSeleccionMapa\')">Corcho</a><br/><a href="#" onClick="mapaQueen(); destruye(\'menuSeleccionMapa\')">Queen Robots</a><br/><br/><center><input name="" type="button" value="Cancelar" onClick="destruye(\'menuSeleccionMapa\')"/></center></div></div>');

  //alert("Preparado...?");
  /*
  datos="";
  		carga=$.ajax({
  			async: true,
  			cache: false,
  			url: "scripts/ListaMapas.php",
  			type: "GET",
  			data: datos,
  			dataType: "HTML",
  			success: function(data)
  			{ 
  				$("#panel_contenido").html(data);
  			//	alert("Mapa generado correctamente!");
  
  				},
  			error: function(data)
  			{
  				alert("ERROR!");
    			}
  		 });	
  */
}

function botonOKInsertarVideo(datos)
{
	texto = datos.elements[0].value;	// El elemento 0 del formulario de menuVideo, es la URL del vídeo!

	if(datos.elements[1].checked) // Si la opción de "Iniciar cuando se haga visible" está marcada...
		ap="1";	// Con autoplay
	else
		ap="0";	// Sin autoplay

	if(datos.elements[2].checked) // Si la opción de "Repetir" está marcada...
		loop="1";	// Con Loop
	else
		loop="0";	// Sin Loop

	mapa = $('.mapa').position();
	
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2-200;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2-200;

	destruye('menuVideo');	// Ya hemos capturado los datos introducidos por el usuario y destruimos el menú

	$("#operaciones").append('<div class="CursiveSansOblique cuadrito" id="cuadrito1" style="font-size:15px; border:1px dashed yellow; position:absolute; width:300px; height:200px; top:'+y+'px; left:'+x+'px; z-index:500;">'+texto+'<div style="position:absolute; right:-45px; bottom:25px; "><input type="button" id="boton_incrustar_texto" value="OK" onClick="insertar_video(\''+texto+'\', document.getElementById(\'cuadrito1\').style.left,document.getElementById(\'cuadrito1\').style.top, document.getElementById(\'cuadrito1\').style.width,document.getElementById(\'cuadrito1\').style.height, ap, loop); "/></br><input type="button" id="boton_cancel_incrustar_texto" value="X" onClick="el=document.getElementById(\'cuadrito1\'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;"></div></div>');

  $(".cuadrito").draggable();  //.attr('contentEditable', true);

  $("#cuadrito1").resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: 1000, maxHeight: 1000  }).attr('contentEditable', true);
}

$('#zoomIn').click(function()
{
  if(zoom>0)
  {
    zoomInOp();
  }
});


$('#zoomOut').click(function()
{
  if(zoom<6)
  {
    zoomOutOp();	//Revisar esta función (librería zoomOperations.js
  }
});



$('#right').click(function()
{
  $("#draggable").animate({"left": "-=300px"}, "fast");
  dibuja(); actualizaMiniMap();
});

$('#left').click(function()
{
  $("#draggable").animate({"left": "+=300px"}, "fast");
  dibuja(); actualizaMiniMap();
});

$('#ocultarControles').click(function()
{
	$("#mostrarControles").show(1);
  $("#controls").animate({"left": "+=120px"}, "fast");
  //  $("#controls").html('<input type="button" id="mostrarControles" value="<<"/>');
});

$('#mostrarControles').click(function()
{
	$("#mostrarControles").hide(1);
  $("#controls").animate({"left": "-=120px"}, "fast");
  //  $("#controls").html('<center><input type="button" id="left" value="<-"/><input type="button" id="right" value="->"/></br></br><input type="button" id="ocultarControles" value="Ocultar->"/></center>');
});


$('#ocultarMiniMap').click(function()
{
	$("#mostrarMiniMap").show(1);
  $("#minimap").animate({"left": "-=200px"}, "fast");
  //  $("#controls").html('<input type="button" id="mostrarControles" value="<<"/>');
});

$('#mostrarMiniMap').click(function()
{
	$("#mostrarMiniMap").hide(1);
  $("#minimap").animate({"left": "+=200px"}, "fast");
  //  $("#controls").html('<center><input type="button" id="left" value="<-"/><input type="button" id="right" value="->"/></br></br><input type="button" id="ocultarControles" value="Ocultar->"/></center>');
});

function borraoperaciones()
{
	 $("#operaciones").html("");
}

$('#botonInsertaTexto').click(function()
{
	//$("#operaciones").html("");
	if(document.getElementById('cuadrito1')!=undefined)
	{
    //	alert("ya");
    // el=document.getElementById('cuadrito1'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;
	}
	
	texto = prompt("Texto a incrustar?", "");
	if(texto==null) 
    return;  // Si le hemos dado a Cancelar, finaliza!
    
	mapa = $('.mapa').position();
	
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2-200;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2-200;

	$("#operaciones").append('<div class="cuadrito textoInsertado" id="cuadrito1" style="font-size:16px; font-family: Arial; border:1px dashed yellow; position:absolute; width:300px; height:200px; top:'+y+'px; left:'+x+'px; z-index:500; color:black;">'+texto+'<div style="position:absolute; right:-45px; bottom:25px; "><input type="button" id="boton_incrustar_texto" value="OK" onClick="incrustar_texto(\''+texto+'\', document.getElementById(\'cuadrito1\').style.left,document.getElementById(\'cuadrito1\').style.top, document.getElementById(\'cuadrito1\').style.width,document.getElementById(\'cuadrito1\').style.height); "/></br><input type="button" id="boton_cancel_incrustar_texto" value="X" onClick="el=document.getElementById(\'cuadrito1\'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;"></div></div>');

  $(".cuadrito").draggable();  //.attr('contentEditable', true);

  $("#cuadrito1").resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: 1000, maxHeight: 1000  }).attr('contentEditable', true);
});



//Aqui calculamos la posicion de la foto que vamos a insertar (la posici9on en pantalla, no en el mapa!
function pulsaAbrirFoto()
{
  //	alert("pulsaAbrirFoto()");
	foto="";	// inicializamos variable foto
	mapa = $('.mapa').position();
	
	// Calculamos el punto medio del viewport:
	xx=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	yy=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	xx=xx - xx%256;
	yy=yy - yy%256;		
	
  //	x=10;
  //	y=10;
	
  //	$("#operaciones").append('<div class="cuadrito" id="cuadrito1" style="border:none; position:absolute; top:'+10+'px; left:'+10+'px; width:100px; height:100px;z-index:0;"><div style="position:absolute; right:-45px; bottom:25px; "><input type="button" id="boton_incrustar_foto" value="OK" onClick="incrustar_foto(\''+foto+'\', document.getElementById(\'cuadrito1\').style.left,document.getElementById(\'cuadrito1\').style.top, document.getElementById(\'fotoRags\').style.width,document.getElementById(\'fotoRags\').style.height)"/></br><input type="button" id="boton_cancel_incrustar_foto" value="X" onClick="el=document.getElementById(\'cuadrito1\'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;"></div></div>');

	if(document.getElementById("cuadrito1")!=null)
	{
		document.getElementById('cuadrito1').style.left=xx+'px';
		document.getElementById('cuadrito1').style.top=yy+'px';
	} 
	else 
		$("#operaciones").append('<div class="cuadrito" id="cuadrito1" style="border:none; position:absolute; top:'+yy+'px; left:'+xx+'px; width:100px; height:100px;z-index:0;"></div>');

  // Hace draggable la foto que insertamos!
  if(AJUSTAR_GRID)
  	$(".cuadrito").draggable({ grid: [GRID_SIZE, GRID_SIZE]   } );  //.attr('contentEditable', true);
  else
  	$(".cuadrito").draggable({ grid: [1, 1]   } );  //.attr('contentEditable', true);
  
  $("#fotoRags").resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: 1000, maxHeight: 1000  }).attr('contentEditable', true);
}














function pulsaAbrirFoto2()
{
  //	alert("pulsaAbrirFoto()");


/*
	foto="";	// inicializamos variable foto
	mapa = $('.mapa').position();
	
	// Calculamos el punto medio del viewport:
	xx=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	yy=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	xx=xx - xx%256;
	yy=yy - yy%256;		
	
  //	x=10;
  //	y=10;
	
  //	$("#operaciones").append('<div class="cuadrito" id="cuadrito1" style="border:none; position:absolute; top:'+10+'px; left:'+10+'px; width:100px; height:100px;z-index:0;"><div style="position:absolute; right:-45px; bottom:25px; "><input type="button" id="boton_incrustar_foto" value="OK" onClick="incrustar_foto(\''+foto+'\', document.getElementById(\'cuadrito1\').style.left,document.getElementById(\'cuadrito1\').style.top, document.getElementById(\'fotoRags\').style.width,document.getElementById(\'fotoRags\').style.height)"/></br><input type="button" id="boton_cancel_incrustar_foto" value="X" onClick="el=document.getElementById(\'cuadrito1\'); padre = el.parentNode; padre.removeChild(el); el=null; padre=null;"></div></div>');

	if(document.getElementById("cuadrito1")!=null)
	{
		document.getElementById('cuadrito1').style.left=xx+'px';
		document.getElementById('cuadrito1').style.top=yy+'px';
	} 
	else 
		$("#operaciones").append('<div class="cuadrito" id="cuadrito1" style="border:none; position:absolute; top:'+yy+'px; left:'+xx+'px; width:100px; height:100px;z-index:0;"></div>');

  // Hace draggable la foto que insertamos!
  if(AJUSTAR_GRID)
  	$(".cuadrito").draggable({ grid: [GRID_SIZE, GRID_SIZE]   } );  //.attr('contentEditable', true);
  else
  	$(".cuadrito").draggable({ grid: [1, 1]   } );  //.attr('contentEditable', true);
  
  $("#fotoRags").resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: 1000, maxHeight: 1000  }).attr('contentEditable', true);

*/
}





















$('#vaciar').click(function()
{
  /*
  	// Obtenemos el elemento
   var el = document.getElementById("draggable");
   // Obtenemos el padre de dicho elemento
   // con la propiedad “parentNode”
  var padre = el.parentNode;
   // Eliminamos el hijo (el) del elemento padre
   padre.removeChild(el);
  
  		marcos = document.getElementById('draggable').getElementsByClassName('sector');
  	
  		
  		for(a=0;a<marcos.length;a++)
  		{
  
  			{
  				el= document.getElementById('draggable').getElementsByClassName('sector').item(a)
  				document.getElementById('draggable').removeChild(el);
  			}
  
  		}
  */
  dibuja();

});


$('#seleccionar').click(function()
{
  document.onselectstart = function() {return true;}	

  jQuery("#draggable").draggable("destroy");

  $('#draggable').mouseup(function()
  {
    $( "#draggable" ).css( "cursor", 'url(grab.cur),none' );  
    document.onselectstart = function() {return false;}	

    jQuery("#draggable").draggable();
  });

  $('#draggable').mousedown(function()
  {
  	$( "#draggable" ).css( "cursor", 'normal' ); 
  });
});
