function calcula_sector(x, y)
{

	
}




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

function analiza_sectores_por_si_estan_ocupados()
{
// Se calculan los sectores afectados por el cuadro	
// ----------------------------------------------------------------------------------------------------------------------------------------


//$("#cuad"+codigo_cuadro).find("#sector").html( '' );




// Calcula cuántos sectores X estan afectados por este cuadro
for(n=0;n< (parseInt(($("#cuad"+codigo_cuadro).css("width")))+2) ;n+=200)
{

	for(m=0;m< (parseInt(($("#cuad"+codigo_cuadro).css("height")))+2) ;m+=200)
	{
//		if(n==0&&m==0) g=""; else g='-';  // Si es el primer sector, no empezamos con guión!!
		
//		$("#cuad"+codigo_cuadro).find("#sector").append(g +  ((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + ',' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200) );

// Detecta si el sector está ocupado o no
if( $('#draggable').find( '#s'+((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200)).find("#b").text() == "1" ) return 1;

	}

}

return 0;   // No se ha encontrado ningún sector ocupado entre los analizados

}








function copia_cuadros_en_sectores()
{
// Se calculan los sectores afectados por el cuadro	
// ----------------------------------------------------------------------------------------------------------------------------------------

//$("#cuad"+codigo_cuadro).find("#sector").html( '' );




// Calcula cuántos sectores X estan afectados por este cuadro
for(n=0;n< (parseInt(($("#cuad"+codigo_cuadro).css("width")))+2) ;n+=200)
{

	for(m=0;m< (parseInt(($("#cuad"+codigo_cuadro).css("height")))+2) ;m+=200)
	{
		if(n==0&&m==0) g=""; else g=',';  // Si es el primer sector, no empezamos con coma!!

		
		$("#cuad"+codigo_cuadro).find("#sector").append(g +  ((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200) );

		$("#s"+ ((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200)).html($("#cuad"+codigo_cuadro).html());
		

		

/*
// Marca dichos sectores como ocupados (uno a uno, debido a los for's)
$('#draggable').find('#s'+((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200)).find("#b").text('1');
*/


	}

}

return $("#cuad"+codigo_cuadro).find("#sector").text();

}








function marca_sectores_como_ocupados()
{
// Se calculan los sectores afectados por el cuadro	
// ----------------------------------------------------------------------------------------------------------------------------------------

$("#cuad"+codigo_cuadro).find("#sector").html( '' );




// Calcula cuántos sectores X estan afectados por este cuadro
for(n=0;n< (parseInt(($("#cuad"+codigo_cuadro).css("width")))+2) ;n+=200)
{

	for(m=0;m< (parseInt(($("#cuad"+codigo_cuadro).css("height")))+2) ;m+=200)
	{
		if(n==0&&m==0) g=""; else g=',';  // Si es el primer sector, no empezamos con coma!!
		
		$("#cuad"+codigo_cuadro).find("#sector").append(g +  ((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200) );

// Marca dichos sectores como ocupados (uno a uno, debido a los for's)
$('#draggable').find('#s'+((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200)).find("#b").text('1');

	}

}

return $("#cuad"+codigo_cuadro).find("#sector").text();

}



function calcula_sectores_afectados()
{
// Se calculan los sectores afectados por el cuadro	
// ----------------------------------------------------------------------------------------------------------------------------------------

$("#cuad"+codigo_cuadro).find("#sector").html( '' );




// Calcula cuántos sectores X estan afectados por este cuadro
for(n=0;n< (parseInt(($("#cuad"+codigo_cuadro).css("width")))+2) ;n+=200)
{

	for(m=0;m< (parseInt(($("#cuad"+codigo_cuadro).css("height")))+2) ;m+=200)
	{
		if(n==0&&m==0) g=""; else g=',';  // Si es el primer sector, no empezamos con coma!!
		
		$("#cuad"+codigo_cuadro).find("#sector").append(g +  ((parseInt(($("#cuad"+codigo_cuadro).css("left")))+10 )/200 + 2+n/200) + '-' + ((parseInt(($("#cuad"+codigo_cuadro).css("top")))+10 )/200 + 2 + m/200) );

/*
// Marca dichos sectores como ocupados (uno a uno, debido a los for's)
$('#draggable').find('#s'+codigo_cuadro).append('<div id="b" class="inv">1</div>');
*/
	}

}

return $("#cuad"+codigo_cuadro).find("#sector").text();

}



function inserta_cuadro()
{
	
 
	
	
	
	deselecciona_todo();
	
	mapa = $('.mapa').position();
	
	
	// Calculamos el punto medio del viewport:
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	x=x - x%200-10;
	y=y - y%200-10;	
	
	codigo_cuadro++;
	
	
	
	
	
	$(".mapa").append('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:198px; height:198px; padding:11px; position:absolute;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style="background-color:#FF9; position:relative; width:100%; height:100%; overflow:hidden;" onclick="selecciona(' + codigo_cuadro + ');">'+
	
	'<span id="title" style="font-family: Arial, Helvetica, sans-serif;	font-size: 11px;	font-weight:bold;	color:#F00;">TITLE</span></br>'+
	'<span id="text" style="font-family: Tahoma, Geneva, sans-serif; font-size: 10px;">TEXT</span></br></br>'+
	
	
	'In sector(s): <span id="sector"></span>' +
	'<div id="x" class="inv">'+((x+10 )/200 -2 )+'</div>' +
'<div id="y" class="inv">'+((y+10 )/200 -1)+'</div>' +
	
	'</div></div></div> ');


//	$(".mapa").append('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:201px; height:201px; padding:10px; position:absolute; -webkit-transform: rotate(-30deg); -moz-transform: skewY(-30deg) skewX(30deg); -webkit-transform: skewY(-30deg); -ms-transform: rotate(-30deg);  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style="background-color:#FF9; position:relative; width:100%; height:100%; ">Your PostIt !<img src="s.jpg"/></div></div></div> ');

//	$(".selector").css("visibility","visible"); 
//	$(".selector").css("left",x-10+"px");
//	$(".selector").css("top",y-10+"px");
	
	/*
	$(".selector").css("width", parseInt($("#cuad"+codigo_cuadro).css("width"))+16+"px");
	$(".selector").css("height", parseInt($("#cuad"+codigo_cuadro).css("height"))+16+"px");
*/
//$( "#control_interrupciones" ).append(document.getElementsByClassName("cuadrito").outerHTML + $(".cuadrito").html());
//$( ".cuadrito" ).html($(".mapa").find("#s1-1").html());//$(".mapa").find("#s1-1").html());


jQuery("#cuad"+codigo_cuadro).draggable({ grid: [ANCHO_SECTOR, ALTO_SECTOR],

   drag: function(event) {

   calcula_sectores_afectados();






// ----------------------------------------------------------------------------------------------------------------------------------------




/*
	$("#cuad"+codigo_cuadro).css("left",parseInt($("#cuad"+codigo_cuadro).css("left"))-1);
	$("#cuad"+codigo_cuadro).css("top",parseInt($("#cuad"+codigo_cuadro).css("top"))-1);
*/





   }
   
}).resizable({ handles: 'n, e, s, w, ne, se, sw, nw', autoHide: true, maxWidth: ANCHO_MAX_PARCELA, maxHeight: ALTO_MAX_PARCELA, minWidth: ANCHO_MIN_PARCELA, minHeight: ALTO_MIN_PARCELA, grid: [ANCHO_SECTOR, ALTO_SECTOR],
resize: function(event) {
	
	calcula_sectores_afectados();
//	$("#cuadrito"+codigo_cuadro).css("left",parseInt($(this).css("left"))-10);
//	$("#cuadrito"+codigo_cuadro).css("top",parseInt($(this).css("top"))-10);

   }

}).attr('contentEditable', true);

//x=parseInt($(".cuadrito").css("left"));
//y=parseInt($(".cuadrito").css("top"));

msg_terminal("Cuadro "+codigo_cuadro+" insertado en "+ x +", "+ y + ".");


	// Desplega cuadro de diálogo de Propiedades de la parcela
$("#propiedades").css("visibility","visible");
$("#propiedades").draggable();  // Permite que el cuadro de diálogo de propiedades pueda moverse





}











function insertaPeriodico()
{
	
	deselecciona_todo()
	
	mapa = $('.mapa').position();
	
	
	// Calculamos el punto medio del viewport:
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	x=x - x%10;
	y=y - y%10;	
	
	codigo_cuadro++;
	
	
	$(".mapa").append('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:169px; height:169px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style=" position:relative; width:100%; height:100%; ">' +
	'<img src="artwork/periodico1.jpg"/>'+
	'</div></div> ');

/*
alert('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:140px; height:150px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style="background-color:#FF9; position:relative; width:100%; height:100%; ">' +
	'sssss<script type="text/javascript"	src="http://www.oil-price.net/widgets/brent_crude_price_tiny/gen.php?lang=es"></script><noscript> To get the BRENT <a href="http://www.oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny">oil price</a>, please enable Javascript.</noscript>');
	
	*/
//	$(".selector").css("visibility","visible"); 
//	$(".selector").css("left",x-10+"px");
//	$(".selector").css("top",y-10+"px");
	
	/*
	$(".selector").css("width", parseInt($("#cuad"+codigo_cuadro).css("width"))+16+"px");
	$(".selector").css("height", parseInt($("#cuad"+codigo_cuadro).css("height"))+16+"px");
*/
//$( "#control_interrupciones" ).append(document.getElementsByClassName("cuadrito").outerHTML + $(".cuadrito").html());
//$( ".cuadrito" ).html($(".mapa").find("#s1-1").html());//$(".mapa").find("#s1-1").html());


jQuery("#cuad"+codigo_cuadro).draggable({ grid: [10, 10],

   drag: function(event) {
	   /*
	$(this).css("left",parseInt($(this).css("left"))-10);
	$(this).css("top",parseInt($(this).css("top"))-10);
*/
   }
   

});

//x=parseInt($(".cuadrito").css("left"));
//y=parseInt($(".cuadrito").css("top"));

msg_terminal("Recorde de periódico "+codigo_cuadro+" insertado en "+ x +", "+ y + ".");


	// Desplega cuadro de diálogo de Propiedades de la parcela
$("#propiedades").css("visibility","visible");
$("#propiedades").draggable();  // Permite que el cuadro de diálogo de propiedades pueda moverse


   dibuja();	
	
}













function insertaChincheta()
{

	deselecciona_todo()
	
	mapa = $('.mapa').position();
	
	
	// Calculamos el punto medio del viewport:
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	x=x - x%10;
	y=y - y%10;	
	
	codigo_cuadro++;
	
//	alert(codigo_cuadro);	
	$(".mapa").append('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:45px; height:45px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style=" position:relative; width:100%; height:100%; ">' +
	'<img src="artwork/chincheta2.png" width="50" height="50"/>'+
	'</div></div> ');

/*
alert('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:140px; height:150px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style="background-color:#FF9; position:relative; width:100%; height:100%; ">' +
	'sssss<script type="text/javascript"	src="http://www.oil-price.net/widgets/brent_crude_price_tiny/gen.php?lang=es"></script><noscript> To get the BRENT <a href="http://www.oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny">oil price</a>, please enable Javascript.</noscript>');
	
	*/
//	$(".selector").css("visibility","visible"); 
//	$(".selector").css("left",x-10+"px");
//	$(".selector").css("top",y-10+"px");
	
	/*
	$(".selector").css("width", parseInt($("#cuad"+codigo_cuadro).css("width"))+16+"px");
	$(".selector").css("height", parseInt($("#cuad"+codigo_cuadro).css("height"))+16+"px");
*/
//$( "#control_interrupciones" ).append(document.getElementsByClassName("cuadrito").outerHTML + $(".cuadrito").html());
//$( ".cuadrito" ).html($(".mapa").find("#s1-1").html());//$(".mapa").find("#s1-1").html());


jQuery("#cuad"+codigo_cuadro).draggable({ grid: [10, 10],

   drag: function(event) {
	   /*
	$(this).css("left",parseInt($(this).css("left"))-10);
	$(this).css("top",parseInt($(this).css("top"))-10);
*/
   }
   

});

//x=parseInt($(".cuadrito").css("left"));
//y=parseInt($(".cuadrito").css("top"));

msg_terminal("Chincheta "+codigo_cuadro+" insertada en "+ x +", "+ y + ".");


	// Desplega cuadro de diálogo de Propiedades de la parcela
$("#propiedades").css("visibility","visible");
$("#propiedades").draggable();  // Permite que el cuadro de diálogo de propiedades pueda moverse


   dibuja();	
	
}

function insertaPrecioBrent()

{

	deselecciona_todo()
	
	mapa = $('.mapa').position();
	
	
	// Calculamos el punto medio del viewport:
	x=(-1)*mapa.left + parseInt($(document).find('#viewport').css('width'))/2;
	y=(-1)*mapa.top + parseInt($(document).find('#viewport').css('height'))/2;

	// Ajustamos dicho punto a la cuadrícula:
	x=x - x%10;
	y=y - y%10;	
	
	codigo_cuadro++;
	
	
	$(".mapa").append('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:169px; height:169px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style=" position:relative; width:100%; height:100%; ">' +
	
	'<table summary=\"Crude oil and commodity prices (c) http://oil-price.net\" style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; background-color:#efefef; border-collapse: collapse; text-align: left; border: 1px solid #000000; padding:0px; border-spacing:0px;\"><tbody style=\"padding:0px;\"><tr><td><table style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; background-color:#efefef; text-align: left; border: 0px; padding:0px; \" width=\"100%\"><tr><td style=\"background-color:#cecfce; font-size: 16px; font-weight: bold; color: #000000; white-space: nowrap\" colspan=4 align=\"center\"><span style=\"color: #000000\">Brent Petroleo crudo<\/span><\/td><\/tr><tr><td style=\"font-size: 18px; font-weight: bold; color: #000000 text-align: left; white-space: nowrap\" ><span style=\"color: #000000\">$111.36<\/span><\/td><td style=\"font-size: 12px; font-weight: bold; color: green; text-align: left; white-space: nowrap\">&#9650; 0.67%<\/td><td>&nbsp; <\/td><td style=\"font-size: 12px; font-weight: bold; color: green; text-align: left; white-space: nowrap\"><\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td><table style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; background-color:#efefef; border-collapse: collapse; text-align: left; border: 0px; padding:0px\"><tbody style=\"padding:0px;\"><tr style=\"padding:0px;\" valign=center><td style=\"padding:0px;\" align=center ><a target=\"_blank\" href=\"http://oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny\"><img style=\"border:0px;\" src=\"http://oil-price.net/BRENT/1m_tiny.gif\" id=\"tiny_brent_graph\" ><\/a><\/td><\/tr><tr><td><table style=\"font-family: Arial, Helvetica, sans-serif; font-size: 12px; background-color:#efefef; border-collapse: collapse; text-align: left; border: 0px; padding:0px\" width=100% ><tbody style=\"padding:0px;\"><tr><td><a target=\"_blank\" href=\"http://oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny\" onMouseOver=\"tiny_brent_showGraph(0);\"><img style=\"border:0px;\" src=\"http://www.oil-price.net/TINY_CHART/static/hover_1m.png\" id=\"tiny_brent_button_0\"><\/a><\/td><td><a target=\"_blank\" href=\"http://oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny\" onMouseOver=\"tiny_brent_showGraph(1);\"><img style=\"border:0px;\" src=\"http://www.oil-price.net/TINY_CHART/static/button_1q.png\" id=\"tiny_brent_button_1\"><\/a><\/td><td><a target=\"_blank\" href=\"http://oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny\" onMouseOver=\"tiny_brent_showGraph(2);\"><img style=\"border:0px;\" src=\"http://www.oil-price.net/TINY_CHART/static/button_1y.png\" id=\"tiny_brent_button_2\"><\/a><\/td><td><a target=\"_blank\" href=\"http://oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny\" onMouseOver=\"tiny_brent_showGraph(3);\"><img style=\"border:0px;\" src=\"http://www.oil-price.net/TINY_CHART/static/button_5y.png\" id=\"tiny_brent_button_3\"><\/a><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table>'+ 	
	'</div></div></div> ');

/*
alert('<div class="selector" id="cuad'+codigo_cuadro+'" style="top:'+y+'px; left:'+x+'px; width:140px; height:150px; padding:10px; position:absolute;  z-index:3000;"><div  style="position:relative; width:100%; height:100%;"><div id="cuadrito'+codigo_cuadro+ '" style="background-color:#FF9; position:relative; width:100%; height:100%; ">' +
	'sssss<script type="text/javascript"	src="http://www.oil-price.net/widgets/brent_crude_price_tiny/gen.php?lang=es"></script><noscript> To get the BRENT <a href="http://www.oil-price.net/dashboard.php?lang=es#brent_crude_price_tiny">oil price</a>, please enable Javascript.</noscript>');
	
	*/
//	$(".selector").css("visibility","visible"); 
//	$(".selector").css("left",x-10+"px");
//	$(".selector").css("top",y-10+"px");
	
	/*
	$(".selector").css("width", parseInt($("#cuad"+codigo_cuadro).css("width"))+16+"px");
	$(".selector").css("height", parseInt($("#cuad"+codigo_cuadro).css("height"))+16+"px");
*/
//$( "#control_interrupciones" ).append(document.getElementsByClassName("cuadrito").outerHTML + $(".cuadrito").html());
//$( ".cuadrito" ).html($(".mapa").find("#s1-1").html());//$(".mapa").find("#s1-1").html());


jQuery("#cuad"+codigo_cuadro).draggable({ grid: [10, 10],

   drag: function(event) {
	   /*
	$(this).css("left",parseInt($(this).css("left"))-10);
	$(this).css("top",parseInt($(this).css("top"))-10);
*/
   }
   

});

//x=parseInt($(".cuadrito").css("left"));
//y=parseInt($(".cuadrito").css("top"));

msg_terminal("Precio Brent "+codigo_cuadro+" insertado en "+ x +", "+ y + ".");


	// Desplega cuadro de diálogo de Propiedades de la parcela
$("#propiedades").css("visibility","visible");
$("#propiedades").draggable();  // Permite que el cuadro de diálogo de propiedades pueda moverse


   dibuja();
}






function selecciona(codigo_cuadro)
{
	deselecciona_todo();
	$('#cuad' + codigo_cuadro).css("border","1px dotted white");
}

