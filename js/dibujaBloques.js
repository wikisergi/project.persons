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

function dibuja()
{


	
//	$("#draggable").draggable("disable");   //   CORRECTO ??????????????????????


//muestra_datos();

mapa = $('#draggable').position();



// Pasado a configuraDrag
//			$("#minimap").css("top", mapa.top/31.5+55);
//			$("#minimap").css("left", mapa.left/30.93+73);	


// Control de que el mapa esté siempre visible y si estamos en los límites, se quede ahí, para poder seguir siendo visible y draggable.
//-------------------------------------------------------------------------------------------------------------------------------------
/*
if(LIMITES)
{
if(mapa.left>400) $('#draggable').css("left", 400);
if(mapa.top>400) $('#draggable').css("top", 400);
if(mapa.left<(ANCHO_SECTOR*MAX_X*(-1))+600) $('#draggable').css("left", (ANCHO_SECTOR*MAX_X*(-1))+600);
if(mapa.top<(ALTO_SECTOR*MAX_Y*(-1))+600) $('#draggable').css("top", (ALTO_SECTOR*MAX_Y*(-1))+600);
}
*/
//-------------------------------------------------------------------------------------------------------------------------------------



	
		PrX=parseInt(-mapa.left/ANCHO_SECTOR)+1;	
		PrY=parseInt(-mapa.top/ANCHO_SECTOR)+1;	
		 //Calcula número X del primer de sector a dibujar  (no la coordenada, si no su posición X en sectores





// CARGAMOS MINIATURAS DE PREVIEW ------------------------------------------------------------------------------------------------------
//if(zoom==0) // Antes de que el preview sólo funcionara para Zoom 0
	for(x=PrX-1;x<=PrX+9&&x<=MAX_X;x+=9)
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY-1;y<=PrY+7&&y<=MAX_Y;y+=7)
		{
		// Carga el archivo de datos correspondiente al bloque
//		if( !$("#bloque"+ (parseInt(x/16) )+1) )  

		
	// Ok, en PrX-PrY tenemos el primer sector que dibujamos en la esquina superior izquierda.
	// Calcular qué bloque le pertenece, y cargarlo! 

			bloqueX=(parseInt(x/16)+1);
			bloqueY=(parseInt(y/16)+1);
	


if ( document.getElementById("m" + bloqueX + "-" + bloqueY) == undefined)	// Carga la parcela sólo si esta no ha sido previamente cargada
{

imagen = document.createElement("img");

// Antes de que el preview sólo funcionara para Zoom 0
//imagen.setAttribute("src", URL1 + "4" + '/' + bloqueX + '-' + bloqueY + ".jpg");

imagen.setAttribute("src", URL1 + (zoom+4) + '/' + bloqueX + '-' + bloqueY + ".jpg");


imagen.width = ANCHO_SECTOR*16;
imagen.height = ALTO_SECTOR*16;
imagen.setAttribute("id", "m" + bloqueX + "-" + bloqueY);
imagen.setAttribute("class", "preview");	// Para que el eliminaNoLoadables no lo borre
//imagen.setAttribute("class", "sector");	// Para que el eliminaNoLoadables no lo borre



imagen.setAttribute("onLoad", "this.style.visibility='visible'");

//imagen.style.zIndex = "10"; 
imagen.style.top =  (bloqueY-1)*4096-256 + "px";
imagen.style.left =  (bloqueX-1)*4096-256  + "px";
//imagen.style.margin =  "0px";
imagen.style.position =  "absolute";

document.getElementById('draggable').appendChild(imagen);




imagen=null;
}
		
		
		

		
		}









//eliminaNoLoadables();
// eliminaNoLoadablas GENERA PROBLEMAS EN INTERNET EXPLORER!!!!!!! ANALIZARLO!!!!!


if(!$('#s' + PrX + '-' + PrY).length && isLoadable(  ((PrX-2)*ANCHO_SECTOR) , ((PrY-2)*ALTO_SECTOR) ) || isLoadable(  ((PrX-1)*ANCHO_SECTOR) , ((PrY-1)*ALTO_SECTOR) ) ) 

// Evita que intente cargar sectores que no existen al estar fuera de los límites del mapa
if(PrY<=0){ PrY=1; }else y=PrY;
if(PrX<=0){ PrX=1; }else x=PrX;


	// Dibujamos los 3 primeros sectores: Primero - medios - Ultimo
	for(x=PrX;x<=PrX+9&&x<=MAX_X;x++)
	{
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY;y<=PrY+7&&y<=MAX_Y;y++)
//		for(y=2;y<=2;y++)
		{

			
//				if(!$('#s' + x + '-' + y).length && isLoadable(  ((x-2)*ANCHO_SECTOR) , ((y-2)*ALTO_SECTOR) )  )   // si no existe el sector y si están ela Load Area, lo creamos
				if(!$('#s' + x + '-' + y).length   )   // si no existe el sector y si están ela Load Area, lo creamos
				{
//					$('#draggable').append('    <div  class="sector" id="s' +x + "-" + y + '" style="width: '+ANCHO_SECTOR+'px; height: '+ALTO_SECTOR+'px; border:1px solid black; position: absolute; overflow:hidden; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px; background-color: #FFC;">' + 'Sector '+x+','+y+'</br>PRELOADING ...</div>');



				if(CARGA_DATOS)     // Carga los datos en los sectores si así se configura.
				{


	//	$("#draggable").find("#s"+x+"-"+y).load( x + "-" + y + ".htm");

//Distribuye la carga de sectores según su coordenada Y sea par o impar		
//if(x%2)		
//if(1)		
//		$("#draggable").find("#s"+x+"-"+y).load( x + "-" + y + ".htm");
//{



if ( !(document.getElementById("s" + x + "-" + y)))	// Carga la parcela sólo si esta no ha sido previamente cargada
{













// Esto es para dibujar una segunda capa!!!!! SEGUNDA CAPA! Para el futuro!
// ------------------------------------------------------------------------------------------------------
/*
imagen2 = document.createElement("img");




//Así, actualiza la parcela si ha habido algún cambio, pero relentiza MUUUUUUUCHO el draggable...
//imagen.src = URL1 + zoom + '/' + x + '-' + y + ".jpg?" + (new Date()).getTime();
imagen2.setAttribute("src", URL2 + zoom + '/' + x + '-' + y + ".jpg");



imagen2.width = ANCHO_SECTOR;
imagen2.height = ALTO_SECTOR;
//imagen.width = 263;
//imagen.height = 273;
imagen2.setAttribute("id", "s" + x + "-" + y);
imagen2.setAttribute("class", "sector");

	tip= x + "-" + y;
imagen2.setAttribute("onLoad", "this.style.visibility='visible'");



if(MUESTRA_TIPS)
{
	tip= x + "-" + y + "t";
	imagen2.setAttribute("onClick", "cargaTip('" + tip + "')");
	imagen2.setAttribute("onContextMenu", "cargaAdminDialog('" + tip + "')");
}

imagen2.style.top =  (y-2)*ALTO_SECTOR + "px";
imagen2.style.left =  (x-2)*ANCHO_SECTOR + "px";

//imagen.style.margin =  "0px";
imagen2.style.position =  "absolute";

document.getElementById('draggable').appendChild(imagen2);

// Esto es para dibujar una segunda capa!!!!! SEGUNDA CAPA! Para el futuro!
// ------------------------------------------------------------------------------------------------------
*/























	
	
	
imagen = document.createElement("img");




//Así, actualiza la parcela si ha habido algún cambio, pero relentiza MUUUUUUUCHO el draggable...
if(NO_CACHE) imagen.src = URL1 + zoom + '/' + x + '-' + y + ".jpg?" + (new Date()).getTime();
if(x%2)
{
	if(y%2)
		imagen.setAttribute("src", URL1 + zoom + '/' + x + '-' + y + ".jpg");		
	else
		imagen.setAttribute("src", URL2 + zoom + '/' + x + '-' + y + ".jpg");
}
else
{
	if(y%2)
		imagen.setAttribute("src", URL3 + zoom + '/' + x + '-' + y + ".jpg");		
	else
		imagen.setAttribute("src", URL4 + zoom + '/' + x + '-' + y + ".jpg");
}





imagen.width = ANCHO_SECTOR;
imagen.height = ALTO_SECTOR;
//imagen.width = 263;
//imagen.height = 273;
imagen.setAttribute("id", "s" + x + "-" + y);
imagen.setAttribute("class", "sector");

	tip= x + "-" + y;
imagen.setAttribute("onLoad", "this.style.visibility='visible'");



if(MUESTRA_TIPS)
{
	tip= x + "-" + y + "t";
	imagen.setAttribute("onClick", "cargaTip('" + tip + "')");
	imagen.setAttribute("onContextMenu", "cargaAdminDialog('" + tip + "')");
}

imagen.style.top =  (y-2)*ALTO_SECTOR + "px";
imagen.style.left =  (x-2)*ANCHO_SECTOR + "px";

//imagen.style.margin =  "0px";
imagen.style.position =  "absolute";

document.getElementById('draggable').appendChild(imagen);




































// Inserta el código de la parcela - Anda que no relentiza, sólo poner esto !!! Se nota, se nota!!
if (modoSuperAdmin) imagen.setAttribute("onMouseOver", "this.style.opacity='0.1'");   //border: 1px dashed red;


// Inserta el código de la parcela - Anda que no relentiza, sólo poner esto !!! Se nota, se nota!!
if (MOSTRAR_NOMBRES_PARCELAS) $("#draggable").append("<div style='border: 1px solid black; position: absolute; z-index:2; color: black; font-family:Arial, Helvetica, sans-serif;  padding-right: 3px; padding-left: 3px; background-color: yellow; left:"+((x-2)*ANCHO_SECTOR+4) +"px; top:"+((y-2)*ALTO_SECTOR+2)+"px;'>"+ x +"-" + y + "</div>");

//clip:rect(0px,256px,256px,0px);



//$("#draggable").find("#s" + x + "-" + y).css("clip","rect(0px,256px,256px,0px)");
//$("#draggable").find("#s" + x + "-" + y).css("height","276px");




imagen=null;
imagen2=null;
}



//document.getElementById('draggable').removeChild(document.getElementById('draggable').child("s" + x + "-" + y));

//$("#draggable").append('<img src="'+URL1+x+'-'+y+'" width='+ANCHO_SECTOR+'; height='+ALTO_SECTOR+' id="s' +x + "-" + y + '"class="sector" style=" position: absolute; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px;  -moz-user-select: none; border:0px none; padding: 0px; margin: 0px;" />');

//}
/*
else
$("#draggable").append('<img class="css-3d-bug-fix-hack"  src="'+URL2+x+'-'+y+'" width='+ANCHO_SECTOR+'; height='+ALTO_SECTOR+' id="s' +x + "-" + y + '"class="sector" style=" position: absolute; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px;  -moz-user-select: none;  padding: 0px; margin: 0px;  transform: translate3d(0, 0, 0); " />');
/*
			
		carga=$.ajax({
			async: true,
			cache: false,
			url: URL + x + "-" + y + ".htm",
			type: "GET",
			dataType: "HTML",
			success: function(data)
			{ 
				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data+'<div style="position:absolute; top:0px; left:0px; z-index:20; color:#3454;">Sector '+ $(data).filter('#x').text() + '-' + $(data).filter('#y').text() + '</div>');
				
				$(carga).remove();			// realmente hace algo esto?
				
				},
			error: function(data)
			{
      			$('#draggable').find('#s'+x + "-" + y).css('background-color','red');
      			$('#draggable').find('#s'+x + "-" + y).html('ERROR en el Sector: Fichero de sector no encontrado (' +x+'-'+y+') !');
				
				$(carga).remove();			// realmente hace algo esto?
  			}
		 });	
*/

				}


		}

	}

	}	


//eliminaNoLoadables();
//	$("#draggable").draggable("enable");







	// Carga CAPA bloques de texto
	// -----------------------------------------------------------------------------------------------------------------------------------------

		// Comprobamos los umbrales de disparo
		// Por ahora cargo el de la derecha




		
//La solución está comprobar si hay que cargar Bloque, sólo en las 4 esquinas de la pantalla dibujada!!
		
x=PrX;
y=PrY;

if(0)
	for(x=PrX-1;x<=PrX+9&&x<=MAX_X;x+=9)
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY-1;y<=PrY+7&&y<=MAX_Y;y+=7)
		{
		// Carga el archivo de datos correspondiente al bloque
//		if( !$("#bloque"+ (parseInt(x/16) )+1) )  

		
	// Ok, en PrX-PrY tenemos el primer sector que dibujamos en la esquina superior izquierda.
	// Calcular qué bloque le pertenece, y cargarlo! 

	bloqueX=(parseInt(x/16)+1);
	bloqueY=(parseInt(y/16)+1);
	
	//alert(bloqueX);
	
//	if(document.getElementById("bloque"+bloqueX+"-"+1)!=undefined) alert("existe!");



		
		
		
//		if( !parseInt((x)%16) && (document.getElementById("bloque"+bloqueX+"-"+1)==undefined) && x>0 && y>0 )
		if((document.getElementById("bloque"+bloqueX+"-"+bloqueY)==undefined) && x>0 && y>0 && zoom==0 )
		{
		if(carga) carga.abort();	// No me convence... pero algo mejora... es para que no se quede cargando por todos los bloques que pasa si es que se pasa a saco con el teclado o muy rápido con el ratón!

		carga=$.ajax({
			async: true,
			cache: false,
			url: URL1+"t2/" + bloqueX + "-" + bloqueY +".htm",
			type: "GET",
			dataType: "HTML",
			success: function(data)
			{ 
				// ATENCION ATENCION ATENCIOOOOOOOOOOOOOOOOOOOOOOOOOON:
				// AQUI, bloqueX y bloqueY, NO VALEN lo que valían cuando dimos la órden de cargar el bloque!!
				// Valdrán, lo que valgan en ese momento dentro de los bucles!!!
				// Así pues, hay que crear un div invisible de identificación del Bloque en los archivos de Bloque!!!

				bX=$(data).filter('#x').text()
				bY=$(data).filter('#y').text()


				if(document.getElementById("bloque"+bX+"-"+bY)==undefined)
				{
					$('#draggable').append('<div id="bloque'+ bX + '-' + bY + '" style="position:absolute; left:'+(bX-1)*4096+'px; top:'+(bY-1)*4096+'px; width:4096px; height:4096px; z-index:1">'+data+'</div>');
}
					$(carga).remove();			// realmente hace algo esto?
					carga=null;
					data=null;

				},
				error: function(data)
				{

					//	alert("error " + "PruebasTexto/t2/" + parseInt(x/16) + "-" + parseInt(y/16));
	   			}
			 });	

		

		}
	}
// -----------------------------------------------------------------------------------------------------------------------------------------










//eliminaNoLoadables();
//	$("#draggable").draggable("enable");

}





			

window.onresize = function(event){

	muestra_datos();
	
}






































function actualizaMiniMap()
{
	// El miniMapa es 32 veces más pequeño en zoom=0
	// En zoom=1 el mapa es 16 veces más pequeño

if(zoom==0)
{
	// Resposiciona el MiniMapa 	//55 y 73 son el punto donde posicionamos el MiniMapa para centrar la vista!
	$("#minimap").css("top", mapa.top/32/(zoom+1)+55/(zoom+1) +35*MINIMAP_SIZE);
	$("#minimap").css("left", mapa.left/32/(zoom+1)+73/(zoom+1) +44*MINIMAP_SIZE);	

	$("#minimapImage").css("top", mapa.top/32/(zoom+1)+55/(zoom+1));
	$("#minimapImage").css("left", mapa.left/32/(zoom+1)+73/(zoom+1));	
	// joder... pedazo CHAPUZA lo del div transparente encima del minimapa para que se pueda ver el indicador mini-viewport !!!!
}
	
if(zoom==1)
{
	// Resposiciona el MiniMapa 	//55 y 73 son el punto donde posicionamos el MiniMapa para centrar la vista!
	$("#minimap").css("top", mapa.top/16/(zoom+1)+55/(zoom+1) -5*MINIMAP_SIZE*(zoom*2)-70);
	$("#minimap").css("left", mapa.left/16/(zoom+1)+73/(zoom+1) -44*MINIMAP_SIZE*(zoom*2)-100);	

//	$("#minimapImage").css("top", mapa.top/16/(zoom+1)+55/(zoom+1) +1000);
//	$("#minimapImage").css("left", mapa.left/16/(zoom+1)+73/(zoom+1) +1000);	
	// joder... pedazo CHAPUZA lo del div transparente encima del minimapa para que se pueda ver el indicador mini-viewport !!!!
}	

}

function eliminaTodasLasParcelas()	// aún no funciona bien...
{
	marcos = document.getElementById('draggable').getElementsByClassName('sector');
	
	for(a=0;a<marcos.length;a++)
	{
			//$(document.getElementById('draggable').getElementsByClassName('sector').item(a)).empty().remove();
//				document.getElementById('draggable').getElementsByClassName('sector').removechild(a)
			el= document.getElementById('draggable').getElementsByClassName('sector').item(a)
			document.getElementById('draggable').removeChild(el);
			el = null;

/*				ORIGINAL;
			el= document.getElementById('draggable').getElementsByClassName('sector').item(a)
			document.getElementById('draggable').removeChild(el);
			el = null;
*/
	}

	marcos=null ; //liberamos memoria
}

function eliminaNoLoadables()
{
	marcos = document.getElementById('draggable').getElementsByClassName('sector');
	
	for(a=0;a<marcos.length;a++)
	{
		if ( !isLoadable(
		  parseInt(   $(document.getElementById('draggable').getElementsByClassName('sector').item(a) ).css('left') ),
		  parseInt( $( document.getElementById('draggable').getElementsByClassName('sector').item(a) ).css('top') )
		  ))
		{
			//$(document.getElementById('draggable').getElementsByClassName('sector').item(a)).empty().remove();
      //				document.getElementById('draggable').getElementsByClassName('sector').removechild(a)
			el= document.getElementById('draggable').getElementsByClassName('sector').item(a)
			document.getElementById('draggable').removeChild(el);
			el = null;

      /*				ORIGINAL;
      			el= document.getElementById('draggable').getElementsByClassName('sector').item(a)
      			document.getElementById('draggable').removeChild(el);
      			el = null;
      */
    }
	}

	marcos=null ; //liberamos memoria
}

function dibuja_sincache()
{
  //	$("#draggable").draggable("disable");   //   CORRECTO ??????????????????????
  muestra_datos();
  mapa = $('#draggable').position();

  // Pasado a configuraDrag
  //			$("#minimap").css("top", mapa.top/31.5+55);
  //			$("#minimap").css("left", mapa.left/30.93+73);	
  
  
  // Control de que el mapa esté siempre visible y si estamos en los límites, se quede ahí, para poder seguir siendo visible y draggable.
  //-------------------------------------------------------------------------------------------------------------------------------------

  if(LIMITES)
  {
  	if(mapa.left>400) $('#draggable').css("left", 400);
  	if(mapa.top>400) $('#draggable').css("top", 400);
  	if(mapa.left<(ANCHO_SECTOR*MAX_X*(-1))+600) $('#draggable').css("left", (ANCHO_SECTOR*MAX_X*(-1))+600);
  	if(mapa.top<(ALTO_SECTOR*MAX_Y*(-1))+600) $('#draggable').css("top", (ALTO_SECTOR*MAX_Y*(-1))+600);
  }
  //-------------------------------------------------------------------------------------------------------------------------------------
	
	PrX=parseInt(-mapa.left/ANCHO_SECTOR)+1;	
	PrY=parseInt(-mapa.top/ANCHO_SECTOR)+1;	
	//Calcula número X del primer de sector a dibujar  (no la coordenada, si no su posición X en sectores

  // CARGAMOS MINIATURAS DE PREVIEW ------------------------------------------------------------------------------------------------------
  if(zoom==0)
  {
  	for(x=PrX-1;x<=PrX+9&&x<=MAX_X;x+=9)
    {
  		//	siguiente fila Y, tambien generamos los primeros
  		for(y=PrY-1;y<=PrY+7&&y<=MAX_Y;y+=7)
  		{
  		  // Carga el archivo de datos correspondiente al bloque
        //		if( !$("#bloque"+ (parseInt(x/16) )+1) )  
  
       	// Ok, en PrX-PrY tenemos el primer sector que dibujamos en la esquina superior izquierda.
      	// Calcular qué bloque le pertenece, y cargarlo! 
      
  			bloqueX=(parseInt(x/16)+1);
  			bloqueY=(parseInt(y/16)+1);
   
        if ( document.getElementById("m" + bloqueX + "-" + bloqueY) == undefined)	// Carga la parcela sólo si esta no ha sido previamente cargada
        {
          imagen = document.createElement("img");
          imagen.setAttribute("src", URL1 + "4" + '/' + bloqueX + '-' + bloqueY + ".jpg");
          imagen.width = ANCHO_SECTOR*16;
          imagen.height = ALTO_SECTOR*16;
          imagen.setAttribute("id", "m" + bloqueX + "-" + bloqueY);
          imagen.setAttribute("class", "preview");	// Para que el eliminaNoLoadables no lo borre
          
          imagen.setAttribute("onLoad", "this.style.visibility='visible'");
          
          imagen.style.top =  (bloqueY-1)*4096-256 + "px";
          imagen.style.left =  (bloqueX-1)*4096-256  + "px";
          //imagen.style.margin =  "0px";
          imagen.style.position =  "absolute";
          
          document.getElementById('draggable').appendChild(imagen);
          
          imagen=null;
        }
  		
  		}
    }
  }

  eliminaNoLoadables();

  if(!$('#s' + PrX + '-' + PrY).length && isLoadable(  ((PrX-2)*ANCHO_SECTOR) , ((PrY-2)*ALTO_SECTOR) ) || isLoadable(  ((PrX-1)*ANCHO_SECTOR) , ((PrY-1)*ALTO_SECTOR) ) ) 

  // Evita que intente cargar sectores que no existen al estar fuera de los límites del mapa
  if(PrY<=0){ PrY=1; }else y=PrY;
  if(PrX<=0){ PrX=1; }else x=PrX;

	// Dibujamos los 3 primeros sectores: Primero - medios - Ultimo
	for(x=PrX;x<=PrX+9&&x<=MAX_X;x++)
	{
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY;y<=PrY+7&&y<=MAX_Y;y++)
//		for(y=2;y<=2;y++)
		{

			
//				if(!$('#s' + x + '-' + y).length && isLoadable(  ((x-2)*ANCHO_SECTOR) , ((y-2)*ALTO_SECTOR) )  )   // si no existe el sector y si están ela Load Area, lo creamos
				if(!$('#s' + x + '-' + y).length   )   // si no existe el sector y si están ela Load Area, lo creamos
				{
//					$('#draggable').append('    <div  class="sector" id="s' +x + "-" + y + '" style="width: '+ANCHO_SECTOR+'px; height: '+ALTO_SECTOR+'px; border:1px solid black; position: absolute; overflow:hidden; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px; background-color: #FFC;">' + 'Sector '+x+','+y+'</br>PRELOADING ...</div>');



				if(CARGA_DATOS)     // Carga los datos en los sectores si así se configura.
				{


	//	$("#draggable").find("#s"+x+"-"+y).load( x + "-" + y + ".htm");

//Distribuye la carga de sectores según su coordenada Y sea par o impar		
//if(x%2)		
//if(1)		
//		$("#draggable").find("#s"+x+"-"+y).load( x + "-" + y + ".htm");
//{



if ( !(document.getElementById("s" + x + "-" + y)))	// Carga la parcela sólo si esta no ha sido previamente cargada
{
imagen = document.createElement("img");




//Así, actualiza la parcela si ha habido algún cambio, pero relentiza MUUUUUUUCHO el draggable...
if(NO_CACHE) imagen.src = URL1 + zoom + '/' + x + '-' + y + ".jpg?" + (new Date()).getTime();
//imagen.setAttribute("src", URL1 + zoom + '/' + x + '-' + y + ".jpg");

// setTimeout("dibuja(); imagen.src = URL1 + zoom + '/' + x + '-' + y + '.jpg?' + (new Date()).getTime();",PAINTING_DELAY_TIME);	// Redibuja al cabo de 1000 msgs por si se ha 

imagen.width = ANCHO_SECTOR;
imagen.height = ALTO_SECTOR;
//imagen.width = 263;
//imagen.height = 273;
imagen.setAttribute("id", "s" + x + "-" + y);
imagen.setAttribute("class", "sector");

	tip= x + "-" + y;
imagen.setAttribute("onLoad", "this.style.visibility='visible'");



if(MUESTRA_TIPS)
{
	tip= x + "-" + y + "t";
	imagen.setAttribute("onClick", "cargaTip('" + tip + "')");
	imagen.setAttribute("onContextMenu", "cargaAdminDialog('" + tip + "')");
}

imagen.style.top =  (y-2)*ALTO_SECTOR + "px";
imagen.style.left =  (x-2)*ANCHO_SECTOR + "px";

//imagen.style.margin =  "0px";
imagen.style.position =  "absolute";


document.getElementById('draggable').appendChild(imagen);



// Inserta el código de la parcela - Anda que no relentiza, sólo poner esto !!! Se nota, se nota!!
if (modoSuperAdmin) imagen.setAttribute("onMouseOver", "this.style.opacity='0.1'");   //border: 1px dashed red;


// Inserta el código de la parcela - Anda que no relentiza, sólo poner esto !!! Se nota, se nota!!
if (MOSTRAR_NOMBRES_PARCELAS) $("#draggable").append("<div style='border: 1px solid black; position: absolute; z-index:2; color: black; font-family:Arial, Helvetica, sans-serif;  padding-right: 3px; padding-left: 3px; background-color: yellow; left:"+((x-2)*ANCHO_SECTOR+4) +"px; top:"+((y-2)*ALTO_SECTOR+2)+"px;'>"+ x +"-" + y + "</div>");

//clip:rect(0px,256px,256px,0px);



//$("#draggable").find("#s" + x + "-" + y).css("clip","rect(0px,256px,256px,0px)");
//$("#draggable").find("#s" + x + "-" + y).css("height","276px");




imagen=null;
}



//document.getElementById('draggable').removeChild(document.getElementById('draggable').child("s" + x + "-" + y));

//$("#draggable").append('<img src="'+URL1+x+'-'+y+'" width='+ANCHO_SECTOR+'; height='+ALTO_SECTOR+' id="s' +x + "-" + y + '"class="sector" style=" position: absolute; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px;  -moz-user-select: none; border:0px none; padding: 0px; margin: 0px;" />');

//}
/*

else
$("#draggable").append('<img class="css-3d-bug-fix-hack"  src="'+URL2+x+'-'+y+'" width='+ANCHO_SECTOR+'; height='+ALTO_SECTOR+' id="s' +x + "-" + y + '"class="sector" style=" position: absolute; left:'+ ((x-2)*ANCHO_SECTOR) +'px; top:'+ ((y-2)*ALTO_SECTOR) +'px;  -moz-user-select: none;  padding: 0px; margin: 0px;  transform: translate3d(0, 0, 0); " />');

/*
			
		carga=$.ajax({

			async: true,
			cache: false,
			url: URL + x + "-" + y + ".htm",
			type: "GET",
			dataType: "HTML",

			success: function(data)
			{ 
				$('#draggable').find('#s'+ $(data).filter('#x').text() + "-" + $(data).filter('#y').text()).html(data+'<div style="position:absolute; top:0px; left:0px; z-index:20; color:#3454;">Sector '+ $(data).filter('#x').text() + '-' + $(data).filter('#y').text() + '</div>');

				
				$(carga).remove();			// realmente hace algo esto?
				
				},
			error: function(data)
			{
      			$('#draggable').find('#s'+x + "-" + y).css('background-color','red');

      			$('#draggable').find('#s'+x + "-" + y).html('ERROR en el Sector: Fichero de sector no encontrado (' +x+'-'+y+') !');
				
				$(carga).remove();			// realmente hace algo esto?
  			}
		 });	
*/

				}


		}

	}

	}	


//eliminaNoLoadables();
//	$("#draggable").draggable("enable");







	// Carga CAPA bloques de texto
	// -----------------------------------------------------------------------------------------------------------------------------------------

		// Comprobamos los umbrales de disparo
		// Por ahora cargo el de la derecha




		
//La solución está comprobar si hay que cargar Bloque, sólo en las 4 esquinas de la pantalla dibujada!!
		
x=PrX;
y=PrY;

if(0)
	for(x=PrX-1;x<=PrX+9&&x<=MAX_X;x+=9)
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY-1;y<=PrY+7&&y<=MAX_Y;y+=7)
		{
		// Carga el archivo de datos correspondiente al bloque
//		if( !$("#bloque"+ (parseInt(x/16) )+1) )  

		
	// Ok, en PrX-PrY tenemos el primer sector que dibujamos en la esquina superior izquierda.
	// Calcular qué bloque le pertenece, y cargarlo! 

	bloqueX=(parseInt(x/16)+1);
	bloqueY=(parseInt(y/16)+1);
	
	//alert(bloqueX);
	
//	if(document.getElementById("bloque"+bloqueX+"-"+1)!=undefined) alert("existe!");



		
		
		
//		if( !parseInt((x)%16) && (document.getElementById("bloque"+bloqueX+"-"+1)==undefined) && x>0 && y>0 )
		if((document.getElementById("bloque"+bloqueX+"-"+bloqueY)==undefined) && x>0 && y>0 && zoom==0 )
		{
		if(carga) carga.abort();	// No me convence... pero algo mejora... es para que no se quede cargando por todos los bloques que pasa si es que se pasa a saco con el teclado o muy rápido con el ratón!

		carga=$.ajax({
			async: true,
			cache: false,
			url: URL1+"t2/" + bloqueX + "-" + bloqueY +".htm",
			type: "GET",
			dataType: "HTML",
			success: function(data)
			{ 
				// ATENCION ATENCION ATENCIOOOOOOOOOOOOOOOOOOOOOOOOOON:
				// AQUI, bloqueX y bloqueY, NO VALEN lo que valían cuando dimos la órden de cargar el bloque!!
				// Valdrán, lo que valgan en ese momento dentro de los bucles!!!
				// Así pues, hay que crear un div invisible de identificación del Bloque en los archivos de Bloque!!!

				bX=$(data).filter('#x').text()
				bY=$(data).filter('#y').text()


				if(document.getElementById("bloque"+bX+"-"+bY)==undefined)
				{
					$('#draggable').append('<div id="bloque'+ bX + '-' + bY + '" style="position:absolute; left:'+(bX-1)*4096+'px; top:'+(bY-1)*4096+'px; width:4096px; height:4096px; z-index:1">'+data+'</div>');
}
					$(carga).remove();			// realmente hace algo esto?
					carga=null;
					data=null;

				},
				error: function(data)
				{

					//	alert("error " + "PruebasTexto/t2/" + parseInt(x/16) + "-" + parseInt(y/16));
	   			}
			 });	

		

		}
	}
// -----------------------------------------------------------------------------------------------------------------------------------------










//eliminaNoLoadables();
//	$("#draggable").draggable("enable");

}





			























function predibuja()
{
	

	
//	$("#draggable").draggable("disable");   //   CORRECTO ??????????????????????

	
muestra_datos();

mapa = $('#draggable').position();



// Pasado a configuraDrag
//			$("#minimap").css("top", mapa.top/31.5+55);
//			$("#minimap").css("left", mapa.left/30.93+73);	


// Control de que el mapa esté siempre visible y si estamos en los límites, se quede ahí, para poder seguir siendo visible y draggable.
//-------------------------------------------------------------------------------------------------------------------------------------
if(LIMITES)
{
	if(mapa.left>1200){ $('#draggable').css("left", 1200); dibuja();}
	if(mapa.top>800) { $('#draggable').css("top", 800);  dibuja();}
	if(mapa.left<(ANCHO_SECTOR*MAX_X*(-1))+1200){  $('#draggable').css("left", (ANCHO_SECTOR*MAX_X*(-1))+1200);}
	if(mapa.top<(ALTO_SECTOR*MAX_Y*(-1))+600){  $('#draggable').css("top", (ALTO_SECTOR*MAX_Y*(-1))+600);}


/*
	if(mapa.left>1200)
	{ 
		$("#draggable").draggable({ disabled: true }); 

		$("#draggable").animate({"left": "1100px"}, 550, 
		function() 
		{
			$("#draggable").draggable("enable");
			dibuja();
  		});
  	}


	if(mapa.top>800)
		$("#draggable").draggable({ disabled: true }); 

		$("#draggable").animate({"top": "800px"}, 550, 
		function() 
		{
			$("#draggable").draggable("enable");
			dibuja();
  		});
*/



}
//-------------------------------------------------------------------------------------------------------------------------------------



	
		PrX=parseInt(-mapa.left/ANCHO_SECTOR)+1;	
		PrY=parseInt(-mapa.top/ANCHO_SECTOR)+1;	
		 //Calcula número X del primer de sector a dibujar  (no la coordenada, si no su posición X en sectores






// CARGAMOS MINIATURAS DE PREVIEW ------------------------------------------------------------------------------------------------------
if(zoom==0) // Antes de que el preview sólo funcionara para Zoom 0
	for(x=PrX-1;x<=PrX+9&&x<=MAX_X;x+=9)
		//	siguiente fila Y, tambien generamos los primeros
		for(y=PrY-1;y<=PrY+7&&y<=MAX_Y;y+=7)
		{
		// Carga el archivo de datos correspondiente al bloque
//		if( !$("#bloque"+ (parseInt(x/16) )+1) )  

		
	// Ok, en PrX-PrY tenemos el primer sector que dibujamos en la esquina superior izquierda.
	// Calcular qué bloque le pertenece, y cargarlo! 

			bloqueX=(parseInt(x/16)+1);
			bloqueY=(parseInt(y/16)+1);
	


if ( document.getElementById("m" + bloqueX + "-" + bloqueY) == undefined)	// Carga la parcela sólo si esta no ha sido previamente cargada
{

imagen = document.createElement("img");

// Antes de que el preview sólo funcionara para Zoom 0
//imagen.setAttribute("src", URL1 + "4" + '/' + bloqueX + '-' + bloqueY + ".jpg");

imagen.setAttribute("src", URL1 + (zoom+4) + '/' + bloqueX + '-' + bloqueY + ".jpg");


imagen.width = ANCHO_SECTOR*16;
imagen.height = ALTO_SECTOR*16;
imagen.setAttribute("id", "m" + bloqueX + "-" + bloqueY);
imagen.setAttribute("class", "preview");	// Para que el eliminaNoLoadables no lo borre

imagen.setAttribute("onLoad", "this.style.visibility='visible'");


imagen.style.top =  (bloqueY-1)*4096-256 + "px";
imagen.style.left =  (bloqueX-1)*4096-256  + "px";
//imagen.style.margin =  "0px";
imagen.style.position =  "absolute";

document.getElementById('draggable').appendChild(imagen);




imagen=null;
}
		
		
		

		
		}


}

























