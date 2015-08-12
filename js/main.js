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



// FUNCIONES PRINCIPALES
function destruye(el) // destruye elemento del DOM
{
	el=document.getElementById(el);	// Convierto la cadena que contiene el nombre del objeto, en el OBJETO en SI !
	padre = el.parentNode; 
	padre.removeChild(el); 
	el=null; 
	padre=null;
}









function update_social(elemento)
{


	$("#social_plugins").html('<div class="fb-like" data-href="http://www.mapemio.com/maps/'+mapName+'/data/previews/'+ elemento +'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div><div class="fb-comments" data-href="http://www.mapemio.com/maps/'+mapName+'/data/previews/'+ elemento +'" data-width="350" data-numposts="5" data-colorscheme="light"></div>');


// extraido de: http://stackoverflow.com/questions/2764129/update-fblike-url-dynamically-using-javascript :
// Facebook like (actualiza botón Facebook!)
if(typeof(FB) !== 'undefined')
     FB.XFBML.parse(document.getElementById('fblike'));


}





function generaMinimapa()
{

	datos="nombre="+mapName+"&num="+MAX_X+"&num2="+MAX_Y+"&doGenerate=Generate";

	
		carga=$.ajax({
			async: true,
//			crossDomain: true,
			cache: false,
			url: "scripts/generaMiniatura.php",
			type: "GET",
			data: datos,
			dataType: "HTML",
			success: function(data)
			{ 



			alert("Minimapa generado correctamente");

//		destruye('#cuadrito1');

		dibuja();

		// Con esto, actualizo la capa objetLayer, para mostrar la información nueva de la imagen incrustada en el mapa
		loadObjects(); //Loads all objects information of the map in the objects Layer	
		loadMiniMapObjects();



				},
			error: function(data)
			{
				alert("ERROR!");
  			}
		 });



}



function generaZooms()
{


	datos="nombre="+mapName+"&num="+MAX_X+"&num2="+MAX_Y+"&doGenerate=Generate";


	
		carga=$.ajax({
			async: true,
//			crossDomain: true,
			cache: false,
			url: "scripts/generaMiniaturasZoom2.php",
			type: "GET",
			data: datos,
			dataType: "HTML",
			success: function(data)
			{ 



			alert("Zooms generados correctamente");

//		destruye('#cuadrito1');

		dibuja();

		// Con esto, actualizo la capa objetLayer, para mostrar la información nueva de la imagen incrustada en el mapa
		loadObjects(); //Loads all objects information of the map in the objects Layer	
		loadMiniMapObjects();


				},
			error: function(data)
			{
				alert("ERROR!");
  			}
		 });



}


















function fecha() // Get today's current date.
{
	var now = new Date();
	// Array list of days.
	var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
	// Array list of months.
	var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	// Calculate the number of the current day in the week.
	var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
	// Calculate four digit year.
	function fourdigits(number)	
	{
		return (number < 1000) ? number + 1900 : number;
	}

	dayTwo = new Date();

	horas=dayTwo.getHours();
	if(horas<10) horas="0"+horas;
	minutos=dayTwo.getMinutes();
	if(minutos<10) minutos="0"+minutos;
	segundos=dayTwo.getSeconds();
	if(segundos<10) segundos="0"+segundos;
	// Join it all together
	today =  date + "." +
   (now.getMonth()+1) + "." +
   (fourdigits(now.getYear())) ;
	today = today + " - " + dayTwo.getHours() + ":"+minutos+":"+segundos;
	// Print out the data.
	return today;	
}

function msg_terminal(mensaje)
{
	$("#terminal_info").html(fecha()+" - "+ mensaje + "</br>" + $("#terminal_info").html());	
}

// OJO!  AUN NO VA EN INTERNET EXPLORER NI EN CHROME NI EN SAFARI !!!
// Inicializa eventos del teclado. Extraido del genial http://unixpapa.com/js/testkey.html !
function init()
{
 /*
	 document.testform.t.value+= '';
	 lines= 0;
*/
	document.getElementById('coordenadasAsaltar').value="";	//Reseteamos cualquier contenido que pueda quedar en el area de introduccion de coordenadas
	document.getElementById('coordenadasAsaltar').focus();	//Al iniciar la página, posiciona cursor en la introducción de coordenadas.

	iniciaTelcado();

	// Inicializa la captura de las coordenadas del ratón en todo momento (http://dev-notes.com/code.php?q=33)
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;

	setMapURLforUploadImages();
}


function isLoadable(puntox, puntoy)     //Indica si en el punto indicado, un sector estaría dentro de la Load Area
{
//	return 1;
	
	mapa = $('.mapa').position();
	
	if ( (mapa.left + puntox > -ANCHO_SECTOR-LOAD_MARGINX) && 
	     (mapa.left + puntox < ANCHO_VIEWPORT+LOAD_MARGINX+ANCHO_SECTOR) &&
		 (mapa.top + puntoy > -ALTO_SECTOR-LOAD_MARGINY) && 
	     (mapa.top + puntoy < ALTO_VIEWPORT+LOAD_MARGINY+ALTO_SECTOR)
		) return 1; else return 0;
}

function esVisible(puntox, puntoy)     //Indica si sería visible un sector en el punto indicado
{
	mapa = $('.mapa').position();
	
	if ( (mapa.left + puntox > -ANCHO_SECTOR) && 
	     (mapa.left + puntox < ANCHO_VIEWPORT) &&
		 (mapa.top + puntoy > -ALTO_SECTOR) && 
	     (mapa.top + puntoy < ALTO_VIEWPORT)
		) return 1; else return 0;
}

function configura()   // aplica al sistema la configuración deseada
{
	if (!TIPO_VIEWPORT)     // Por defecto el tamaño del ViewPort es de 100%x100%, pero si no, se le aplica un tamaño fijo.
	{
		$('#viewport').css('width', ANCHO_VIEWPORT);
		$('#viewport').css('height', ALTO_VIEWPORT);
	}

	if (!TOOLBAR) $('#toolbar').css('visibility', 'hidden');

	if (MOSTRAR_TODO) $('#viewport').css('overflow', 'visible');
	
	$('#control_interrupciones').css('left',INFOX);
	$('#control_interrupciones').css('top',INFOY);
	
	$('#draggable').css('top', -(STARTY-2)*ANCHO_SECTOR);
	$('#draggable').css('left', -(STARTX-2)*ALTO_SECTOR);

	if (MOSTRAR_BORDE) $("#draggable").find("sector").css({'border': '1px solid gray'});
}


function muestra_datos()
{
/* ANULO LA FUNCION ENTERA POR DESUSO Y PORQUE PARECE SER QUE ERA EL PRINCIPAL PROBLEMA CON EL INTERNET EXPLORER!!
	
	
	
	
	
	mapa = $('.mapa').position();



	marcos = document.getElementById('draggable').getElementsByClassName('sector');
	
	var info="";

	if( $('.cuadrito').length ) info=$('.cuadrito').css('left');
	
	$( "#control_interrupciones" ).html(
		'zoom = '+zoom+'</br>'+
		'cuadrito.left='+info+'</br>'+
		'X del primer sector a dibujar: ' +  (parseInt(-mapa.left/ANCHO_SECTOR) +1)
		 + '</br>' +
		'Numero de sectores en Load Area: ' + marcos.length + '</br>' +
		'mapa.left='+$('#draggable').css('left')+'</br>'+
		'mapa.top='+mapa.top+'</br>'+
//			'viewport.width='+$('#viewport').css('width')+'</br>'+
//			'viewport.height='+$('#viewport').css('height')+'</br>'+
		'PrimerSectorX='+PrimerSectorX+'</br>'+
		'UltimoSectorX='+UltimoSectorX+'</br>'+
		'PrimerSectorY='+PrimerSectorY+'</br>'+
		'UltimoSectorY='+UltimoSectorY+'</br>'+
		'Primerox='+Primerox+'</br>'+
		'Ultimox='+Ultimox+'</br>'+
		'Primeroy='+Primeroy+'</br>'+
		'Ultimoy='+$(".cuadrito").css("left")+", "+$(".cuadrito").css("top")+'</br>');//+
//			'7-3 position=' + (mapa.left + $('#draggable').find('#s' + 7 + '-' + 3).position().left) +', '+(mapa.top + $('#draggable').find('#s' + 7 + '-' + 3).position().top)+'</br>'+
//			'Es visible el Sector 7-3? ' + isLoadable($('#draggable').find('#s' + 7 + '-' + 3).position().left,$('#draggable').find('#s' + 7 + '-' + 3).position().top) + '</br>'+
//			x+','+y);

*/
}

function orient()
{
	switch(window.orientation)
	{
			case 0: $(document).find("#viewport").css("width",ALTO_VIEWPORT+"px"); $("#viewport").css("height",ANCHO_VIEWPORT+"px");
	        break;

			case -90:  $(document).find("#viewport").css("width",ANCHO_VIEWPORT+"px"); $("#viewport").css("height", ALTO_VIEWPORT,+"px");
		    break;

			case 90:  $(document).find("#viewport").css("width",ANCHO_VIEWPORT+"px"); $("#viewport").css("height", ALTO_VIEWPORT,+"px");
			break;

	}
}	

// inhabilita/controla los clicks con el botón derecho del ratón
function inhabilitar()
{
//    alert ("Esta función está inhabilitada.\n\nPerdonen las molestias.")



parcelaX=parseInt(x/256)+2;
parcelaY=parseInt(y/256)+2;

//alert("Restaurando parcela " + sectorActualX + "-" + sectorActualY);






datos="map="+ URL1 +"&parcel="+sectorActualX + "-" + sectorActualY;

carga=$.ajax({
	async: true,
	cache: false,
	url: "defaultparcel.php",
	type: "GET",
	data: datos,
	dataType: "HTML",
	success: function(data)
	{ 
	
	//	alert(1);
/*				
el=document.getElementById('s' + sectorActualX + '-' + sectorActualY); 
padre = el.parentNode; 
padre.removeChild(el); 
el=null; padre=null;
*/			
//	destruye('#s' + sectorActualX + '-' + sectorActualY);
//alert(2);

//document.getElementById('#s' + sectorActualX + '-' + sectorActualY).setAttribute("src", URL1 + zoom + '/' + x + '-' + y + ".jpg" + (new Date()).getTime());

		document.getElementById('s' + sectorActualX + '-' + sectorActualY).src = URL1 + zoom + '/' + sectorActualX + '-' + sectorActualY + ".jpg?" + (new Date()).getTime();
//				dibuja();
		dibuja_sincache();
	},
	error: function(data)
	{
		alert("ERROR!");
	}
});	

 return false
}


// Esto, recuerdo que si le ponía comillas al final, no funcionaba!
// Deshabilita inhabilita botón izquierdo del ratón
//document.oncontextmenu=inhabilitar



function borraTips(tip)
{
//	alert(tip);
	document.getElementById("s"+tip).setAttribute("onMouseOut", "borraTips();Temp1=0;");
	document.getElementById("s"+tip).setAttribute("onMouseOver", "Temp1=1");

	if(!Temp1)
	{
		el= document.getElementById('css-admin-dialog');
		document.getElementById('draggable').removeChild(el);
		el = null;

		//	$("#draggable").find("#css-admin-dialog").css("visibility","hidden");
		// ------------------------------------------------------------------------------
		// Restauro el CSS de todo sector, por si ya se había hecho algun enmarcado antes
		$("#draggable").find(".sector").css({'padding': '0px'});
		$("#draggable").find(".sector").css({'margin': '0px'});
		$("#draggable").find(".sector").css({'border': '0px solid red'});
		// ------------------------------------------------------------------------------
	}
}


function cargaAdminDialog(tip)
{
	tip=tip.slice(0, -1);

	document.getElementById("s"+tip).setAttribute("onMouseOut", "borraTips('"+tip+"');Temp1=0;");
	document.getElementById("s"+tip).setAttribute("onMouseOver", "Temp1=1");

//	$("#draggable").html("");predibuja(); dibuja(); 
	
//alert(      parseInt( $("#draggable").find("#s"+tip).css("top").slice(0, -2) ) +256        );

	//Dibuja la Tip
	$("#draggable").append('<div id="css-admin-dialog">ADMIN</br></br></div>');
	$("#draggable").find("#css-admin-dialog").css("left", mouseX - $("#draggable").css("left").slice(0, -2) );
//	$("#draggable").find("#css-admin-dialog").css("left", parseInt($("#draggable").find("#s"+tip).css("left").slice(0, -2)) +250)+"px" ;
	$("#draggable").find("#css-admin-dialog").css("top", mouseY-200 - $("#draggable").css("top").slice(0, -2));
//	$("#draggable").find("#css-admin-dialog").css("top", parseInt($("#draggable").find("#s"+tip).css("top").slice(0, -2)) -100) + "px";

	// Temp1 - Variable que usamos para "apuntarnos" que el ratón está sobre el Tip y por tanto, si se detecta
	// un onMouseOut encima de su parcela, que no elimine el tip!

	document.getElementById("css-admin-dialog").setAttribute("onMouseOver", "Temp1=1");
	document.getElementById("css-admin-dialog").setAttribute("onMouseOut", "borraTips('"+tip+"')");
	
	// ------------------------------------------------------------------------------
	// Restauro el CSS de todo sector, por si ya se había hecho algun enmarcado antes
	$("#draggable").find(".sector").css({'padding': '0px'});
	$("#draggable").find(".sector").css({'margin': '0px'});
	$("#draggable").find(".sector").css({'border': '0px solid red'});
	// ------------------------------------------------------------------------------

	// ------------------------------------------------------------------------------
	// Resalto el sector selecionado aplicándole un marco
	$("#draggable").find("#s"+tip).css({'padding': '-2px'});
	$("#draggable").find("#s"+tip).css({'margin': '-2px'});
	$("#draggable").find("#s"+tip).css({'border': '1px solid red'});
	// ------------------------------------------------------------------------------
	
	//$("#minimap").html(URL1+tip+"t");
	
	carga=$.ajax({
		async: true,
//			crossDomain: true,
		cache: false,
		url: URL1+"t/"+tip+"t",
		type: "GET",
		dataType: "HTML",
		success: function(data)
		{ 
//				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data+'<div style="position:absolute; top:0px; left:0px; z-index:20; color:#3454; ">Sector '+ $(data).filter('#x').text() + '-' + $(data).filter('#y').text() + '</div>');
			$("#draggable").find("#css-admin-dialog").append(data);			
//				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data);
			
	//		$(carga).remove();			// realmente hace algo esto?
			
		},
		error: function(data)
		{
			alert(URL1+tip+"t");
/*
			if(SECTOR_ERROR_COLOR)
   				$('#draggable').find('#s'+x + "-" + y).css('background-color',SECTOR_ERROR_COLOR);
   			$('#draggable').find('#s'+x + "-" + y).html('ERROR en el Sector: Fichero de sector no encontrado (' +x+'-'+y+') !');
			
			
			
			// DE MOMENTO LOS MARCO COMO LIBRES...  ESTO SE HA DE QUITAR!!!
			$('#draggable').find('#s'+x + "-" + y).append('<div id="b" class="inv">0</div>');
*/			
//			$(carga).remove();			// realmente hace algo esto?
		}
	 });	
}


function cargaTip(tip)
{
	tip=tip.slice(0, -1);
//	$("#draggable").html("");dibuja(); 
	
//alert(      parseInt( $("#draggable").find("#s"+tip).css("top").slice(0, -2) ) +256        );
	//Dibuja la Tip
	
	$("#draggable").append('<div id="css-tip-dialog"></div>');
	$("#draggable").find("#css-tip-dialog").css("left", mouseX - $("#draggable").css("left").slice(0, -2) );
//	$("#draggable").find("#tip").css("left", parseInt($("#draggable").find("#s1-1").css("left").slice(0, -2)) +250)+"px" ;
	$("#draggable").find("#css-tip-dialog").css("top", mouseY-200 - $("#draggable").css("top").slice(0, -2));
//	$("#draggable").find("#tip").css("top", parseInt($("#draggable").find("#s1-1").css("top").slice(0, -2)) -100) + "px";
	
	// ------------------------------------------------------------------------------
	// Restauro el CSS de todo sector, por si ya se había hecho algun enmarcado antes
	$("#draggable").find(".sector").css({'padding': '0px'});
	$("#draggable").find(".sector").css({'margin': '0px'});
	$("#draggable").find(".sector").css({'border': '0px solid yellow'});
	// ------------------------------------------------------------------------------


	// ------------------------------------------------------------------------------
	// Resalto el sector selecionado aplicándole un marco
	$("#draggable").find("#s"+tip).css({'padding': '-2px'});
	$("#draggable").find("#s"+tip).css({'margin': '-2px'});
	$("#draggable").find("#s"+tip).css({'border': '1px solid yellow'});
	// ------------------------------------------------------------------------------
	
	
	//$("#minimap").html(URL1+tip+"t");
	
	carga=$.ajax({
		async: true,
//			crossDomain: true,
		cache: false,
		url: URL1+"t/"+tip+"t",
		type: "GET",
		dataType: "HTML",
		success: function(data)
		{ 
//				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data+'<div style="position:absolute; top:0px; left:0px; z-index:20; color:#3454; ">Sector '+ $(data).filter('#x').text() + '-' + $(data).filter('#y').text() + '</div>');
			$("#draggable").find("#css-tip-dialog").html(data);			
//				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data);
			
	//		$(carga).remove();			// realmente hace algo esto?
			
			},
		error: function(data)
		{
			alert(URL1+"t/1-1t");
/*
			if(SECTOR_ERROR_COLOR)
   				$('#draggable').find('#s'+x + "-" + y).css('background-color',SECTOR_ERROR_COLOR);
   			$('#draggable').find('#s'+x + "-" + y).html('ERROR en el Sector: Fichero de sector no encontrado (' +x+'-'+y+') !');
			
			
			
			// DE MOMENTO LOS MARCO COMO LIBRES...  ESTO SE HA DE QUITAR!!!
			$('#draggable').find('#s'+x + "-" + y).append('<div id="b" class="inv">0</div>');
*/			
			
			
			
//			$(carga).remove();			// realmente hace algo esto?
		}
	 });	
}


// DESACTIVA SELECCION DE TEXTO - OJO, ESTO LO TENDREMOS QUE TRABAJAR... ¡EL USUARIO HA DE PODER SELECCIONAR TEXTO!
document.onselectstart = function() {return false;}		
//window.onmousemove = function(event){ dibuja(); };


function cargaDimensionesMinimap()
{
// Calculamos el tamaño del minimapa para redimensionar la capa draggable minimap y que quede afectada por el drag pese a estar el indicador de mini-viewpot
	document.getElementById("minimap").style.width=document.getElementById("minimapImageIMG").width + "px";
	document.getElementById("minimap").style.height=document.getElementById("minimapImageIMG").height + "px";	
}


function uploadpic()
{
	carga=$.ajax({
		async: true,
//			cache: false,
		url: URL + "uploadpic.php",
		type: "POST",
		dataType: "html",
//			data: "datos="+$("#s"+sector).html()+"&sector="+sector_a_guardar+"&x="+x+"&y="+y,
		data: "archivo="+document.getElementById("propiedades_foto").value,
//			data: "datos="+data,
		success: function(data)
		{ 
			msg_terminal("GUARDADO! " + document.getElementById("propiedades_foto").value);
		},
		error: function(data)
		{
			msg_terminal("ERROR GUARDANDO!");
		}
	 });	
}



// Pedazo de chapuza, pero que funciona, para poder pasarle el parámetro URL al script ajaximage.php cuando se le llama a la hora de subir una imagen para incrustarla.
function setMapURLforUploadImages()	
{
	document.getElementById('mapurl').value = URL1;
	document.getElementById('zoom').value = zoom;
}
function setMapURLforUploadImages2()	
{
	document.getElementById('mapurl2').value = URL1;
	document.getElementById('zoom2').value = zoom;
}


function iniciaMiniMap()
{
	$("#minimap").css("top", mapa.top/32+55);
	$("#minimap").css("left", mapa.left/32+73);	

	$("#minimapImage").css("top", mapa.top/32+55);
	$("#minimapImage").css("left", mapa.left/32+73);	
	
	
		// REVISAR!!!!
	document.getElementById("minimapImageIMG").src=URL1+"miniatura.jpg";		// El OnLoad declarado en el DIV donde está minimapIMG ya se encarga de redimensionar minimap!

	
	loadMiniMapObjects();

	// REVISAR!!!!
//	document.getElementById("minimapImageIMG").src=URL1+"miniatura.jpg";		// El OnLoad declarado en el DIV donde está minimapIMG ya se encarga de redimensionar minimap!
}


  


function gotoInit()
{
	STARTX=1;
	STARTY=1;
	configura();
	dibuja();	
}

function gotoCenter()
{
	STARTX=MAX_X/2;
	STARTY=MAX_Y/2;
	configura();
	dibuja();
  actualizaMiniMap();	
}


function jumpTo(x, y)
{
	STARTX=x;
	STARTY=y;
	configura();
	dibuja();	
  actualizaMiniMap();
}


//Centra un punto x,y a nivel de pixeles(no de parcela), en el centro del viewport
function gotopoint(x, y)
{
//	$('#draggable').css('top', -y + $('#viewport').height()/2);
//	$('#draggable').css('left', -x + $('#viewport').width()/2);
//	$('#draggable').animate({top: -y + $('#viewport').height()/2 + "px"}, 500);
//	$('#draggable').animate({left: -x + $('#viewport').width()/2 + "px"}, 500);

//	$('#draggable').animate({top: -y + $('#viewport').height()/2 + "px"}, {duration: 500, step: dibuja();});
//	$('#draggable').animate({left: -x + $('#viewport').width()/2 + "px"}, {duration: 500, step: dibuja();});

// Le agrego un Delta para que se quede centrado en Firefox, para poder grabar demos:
x-=200; y+=18;



  $( "#draggable" ).animate({
    top: -y + $('#viewport').height()/2,
    left: -x + $('#viewport').width()/2
  }, {
    duration: 500,
    step: function( now, fx ){
     // $( ".block:gt(0)" ).css( "left", now );
	predibuja();
    },
    complete: function(){
     // $( ".block:gt(0)" ).css( "left", now );
	dibuja(); //actualizaMiniMap();
    }

  });

/*
  $( "#draggable" ).animate({
  }, {
    duration: 500,
    step: function( now, fx ){
     // $( ".block:gt(0)" ).css( "left", now );
	predibuja();
    },
    complete: function(){
     // $( ".block:gt(0)" ).css( "left", now );
	dibuja();
    }

  });
*/

//.animate({height: "20px"}, 500)

//"$('#draggable').animate({'left': '-=300px'}, 'fast'); dibuja(); actualizaMiniMap();
}




//function modificarLink(id, url, texto, destino)
function modificarLink(id, url, texto, destino)
{
	document.getElementById(id).innerHTML = texto;
	document.getElementById(id).href = url;
//	document.getElementById(id).target = destino;
}



function hideInfo()
{
	MOSTRAR_INFO=0;
	$('#control_interrupciones').css('visibility','hidden');
	modificarLink("showInfoMenu", "javascript:showInfo()" , "Mostrar datos internos");
}

function showInfo()
{
	MOSTRAR_INFO=1;
	$('#control_interrupciones').css('visibility','visible');
	modificarLink("showInfoMenu", "javascript:hideInfo()" , "Ocultar datos internos");
}

function hideMiniMap()
{
	MOSTRAR_MINIMAPA=1;
	$('#minimap').css('visibility','hidden');
	$('#minimap_container').css('visibility','hidden');
	modificarLink("showMiniMapMenu", "javascript:showMiniMap()" , "Mostrar MiniMapa");
}

function toggleSizeMiniMap()
{
	    // </div> icons from: http://www.iconfinder.com/icondetails/53007/16/minimize_square_icon -->  
	if(MINIMAP_SIZE)
  {
	document.getElementById('minMaxIcon').src='icons2/1361402303_MaximizeSquare.png'

	 $('#minimap_container').animate({
    width: '201',
    height: '150'
  }, 200, function() {
    // Animation complete.
  });
  	
	/*
    document.getElementById('minimap_container').style.width='201px';
    document.getElementById('minimap_container').style.height='150px'; 
	*/
    MINIMAP_SIZE=0; 
  }
  else
  {
	document.getElementById('minMaxIcon').src='icons2/1361402296_MinimizeSquare.png'
	//$('#minimap_container').css('width','300px');
	 $('#minimap_container').animate({
    width: '300',
    height: '220'
  }, 200, function() {
    // Animation complete.
  });
	
	/*
    document.getElementById('minimap_container').style.width='300px';
    document.getElementById('minimap_container').style.height='220px';
	*/
    MINIMAP_SIZE=1; 
  }
  
  
  //Corrects minimap position to fit the miniMap view-marker new position
  //document.getElementById('minimap').style.left='300px';
  //document.getElementById('minimap').style.top='220px';  
  
//	$('#minimap_container').css('visibility','hidden');
//	modificarLink("showMiniMapMenu", "javascript:showMiniMap()" , "Mostrar MiniMapa");
}



function showMiniMap()
{
	MOSTRAR_MINIMAPA=0;
	$('#minimap').css('visibility','visible');
	$('#minimap_container').css('visibility','visible');
	modificarLink("showMiniMapMenu", "javascript:hideMiniMap()" , "Ocultar MiniMapa");
}



function about()
{
	alert("©Sergio Guillén 2015");
}



			//Separa coordenadas introducidas con la coma en medio
function Textarea_Sin_Enter($char, $mozChar, $id)
{
	
alert(1);
   //alert ($char+" "+$mozChar);

//   $textarea = document.getElementById($id).value;
   $textarea = $id;
   niveles = -1;
   
alert("x="+coordenadas[0]+", y="+coordenadas[1]);
      
   if($mozChar != null) { // Navegadores compatibles con Mozilla
       if($mozChar == 13){
           if(navigator.appName == "Opera") niveles = -2;
           $textarea.value = $textarea.value.slice(0, niveles);  //Eliminamos el "/n" del final !
		   var coordenadas=$textarea.value.split(',');
		   jumpTo(coordenadas[0],coordenadas[1]);
		   document.getElementById('coordenadasAsaltar').value=""; //Borramos el contenido del área de texto
       }
   // navegadores compatibles con IE
   } else if($char == 13)
     {
     	$textarea.value = $textarea.value.slice(0,-2);
        var coordenadas=$textarea.value.split(',');
		jumpTo(coordenadas[0],coordenadas[1]);
		document.getElementById('coordenadasAsaltar').value=""; //Borramos el contenido del área de texto
	 }
	


}












// Instrucciones que se ejecutan cuando la página acaba de cargarse por primera vez y el DOM está listo
$(document).ready(function()
{

		
// Esta es la puñetera función que estaba buscando y no encontraba, que realiza la inserción de la imagen una vez la hemos subido !
	$('#photoimg').live('change', function()			
	{ 
		pulsaAbrirFoto();
	    $("#cuadrito1").append('<img src="loader.gif" alt="Uploading...."/>');
		$("#imageform").ajaxForm({ target: '#cuadrito1'}).submit();
	});



// Y esta es una réplica para hacer las mini imagenes de los objetos
	$('#photoimg2').live('change', function()			
	{ 
		pulsaAbrirFoto();
	   // $("#cuadrito1").append('<img src="loader.gif" alt="Uploading...."/>');
		$("#imageform2").ajaxForm({ target: '#preview'}).submit();
	});



/*
$('#imgSelectMini').click(function() 
{
//   $("body").append($(this).attr("href"));
	alert("SI");
   return false;
});
*/
 	

	configura();
	orient();
	
$('.editable').each(function(){
    this.contentEditable = true;
});

	init(); 	

	//predibuja(); 
	
	dibuja();

	iniciaMiniMap();



	configuraRuedaRaton();

	//cargaOperaciones();	// Carga HTML de la pagina

  
  //loadObjects(URL1);
	
   document.getElementById('loading_message').style.visibility='hidden';
  
   showObjectsInfoPanel();  // Arrancamos mostrando el panel de información de Objectos

//	showMainMenu(); // Mostramos Menú Principal al arrancar


//Lee desde la BDD mapemioconfig, el mapa inicial a cargar y lo carga:
//setTimeout("startup_map();",3000);
//alert(startup_map());
nombreMapa=startup_map();
mapLoad(nombreMapa);





});
  
  


  
  
$(window).load(function()	//Se ejecuta cuando el DOM está listo y las imágenes del documento están cargadas (Fuente: http://www.masquewordpress.com/diferencia-entre-document-ready-y-window-load-en-jquery/)
{

	
	if(MOSTRAR_INFO) $('#control_interrupciones').css('visibility','visible');    // Muestra información si la opción está habilitada
		else  $('#control_interrupciones').css('visibility','hidden');

	if(MOSTRAR_COORDENADAS) $('#infoCoordenadasRaton').css('visibility','visible');    // Muestra información si la opción está habilitada
		else  $('#infoCoordenadasRaton').css('visibility','hidden');


	if(MOSTRAR_SALTAR_COORDENADAS) $('#coordenadasAsaltar').css('visibility','visible');    // Muestra información si la opción está habilitada
		else  $('#coordenadasAsaltar').css('visibility','hidden');	
	
	
	

	if(MOSTRAR_MINIMAPA)
	{
	 $('#minimap').css('visibility','visible');    // Muestra información si la opción está habilitada
	 $('#minimap_container').css('visibility','visible');    // Muestra información si la opción está habilitada
	}
		else  
	{
		$('#minimap').css('visibility','hidden');
		$('#minimap_container').css('visibility','hidden');
	}
	if(MOSTRAR_CONTROLES) $('#controlscontainer').css('visibility','visible');    // Muestra información si la opción está habilitada
		else  $('#controlscontainer').css('visibility','hidden');

	if(MOSTRAR_TERMINAL) $('#terminal_info').css('visibility','visible');    // Muestra información si la opción está habilitada
		else  $('#terminal_info').css('visibility','hidden');
	
		muestra_datos();    // muestra los datos, que en este punto, serán los iniciales.

 configuraDrag();
 
});




    function updateCoordinate(newCoordinate) {
        jQuery(".count").text(newCoordinate);
    }










function actualiza_mapa()
{
	
	
	
            o = $('.mapa').offset();
            mapa = $('.mapa').position();






muestra_datos();

				
				predibuja(); dibuja();

}






	 







