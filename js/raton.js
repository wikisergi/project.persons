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

function timeMsg()
{
  var t=setTimeout("alertMsg()",3000);
}

function alertMsg()
{
  alert("Hello");
}

function destroyZoomAnimation()
{
	var t=setTimeout("eliminateZoomAnimation()",300);
}

function eliminateZoomAnimation()
{
	el= document.getElementById('mouseZoom');
	if(el)
	{

		padre= el.parentNode;
		padre.removeChild(el);
		el = null; 
	} 	
}



function zoomIn()
{
 	MAX_X=MAX_X*2;
  	MAX_Y=MAX_Y*2;
  
    zoom = zoom-1;
  
  
    el= document.getElementById('mouseZoom');
    if(el)
    {
      padre= el.parentNode;
      padre.removeChild(el);
      el = null; 
    } 
    
    
      
    imagen = document.createElement("img");
    imagen.setAttribute("src", "Zout.gif");
    //imagen.top = 300;
    //imagen.left = 500;
    //imagen.style.zIndex= "1000";  
    imagen.setAttribute("id","mouseZoom");
    imagen.style.top =  (mouseY-40) + "px";
    imagen.style.left =  (mouseX-58) + "px";
    
    
    //imagen.style.margin =  "0px";
    imagen.style.position =  "absolute";
    imagen.style.zIndex=50000;
    document.body.appendChild(imagen);
    
    imagen=null;  
    
    //setTimeout(destruye("mouseZoom"),400);
    //var ttt=setTimeout(alert("mouseZoom"),2400);
    //timeMsg();
    destroyZoomAnimation();
    
    //  $("#draggable").html("");	// Chapuza!    Si está, si has hecho zoom, no puedes volver a insertar una foto | Si no está, se le va la olla a la hora de hacer el zoom-in zoom-out, creo que porque no elimina los elementos antiguos...
    $("#draggable").html('<div id="operaciones" style="z-index:1; top:0px; left:0px; position:absolute;" ></div>'); // Solución temporal... una chapuza como una casa !
    
  
    predibuja();
  
  
  // >oom central global
    mapa = $('.mapa').position();
   // alert(mapa.left);
  
  // Aun no va
    document.getElementById("draggable").style.top=document.getElementById("draggable").style.top.slice(0, -2)*(2)   - mouseY - 256 + "px";
  
  // Perfecta!
    document.getElementById("draggable").style.left=parseInt(document.getElementById("draggable").style.left.slice(0, -2))*(2)  - mouseX -  256 +"px";
  
  	dibuja();
}


function configuraRuedaRaton()
{ 
	if(!MAX_ZOOM) return;	// Sólo permitimos zoom si MAX_ZOOM es > 0 !
  
  // using the event helper
  $('#draggable').wheel(function(event, delta) {
  
  // Aquí hay que ampliar o reducir, según toque, el contenido del viewport
  
  if(delta==1&&zoom>0)
  {
    zoomIn();

  }
  else if(delta==-1&&zoom<MAX_ZOOM)
  {
  	// Zoom Out
  	MAX_X=MAX_X/2;
  	MAX_Y=MAX_Y/2;
  
    zoom = zoom+1;
  
    el= document.getElementById('mouseZoom');
    if(el)
    {
      padre= el.parentNode;
      padre.removeChild(el);
      el = null; 
    }
  
    imagen = document.createElement("img");
    imagen.setAttribute("src", "Zin.gif");
    //imagen.top = 300;
    //imagen.left = 500;
    //imagen.style.zIndex= "1000";  
    imagen.setAttribute("id","mouseZoom");
    imagen.style.top =  (mouseY-40) + "px";
    imagen.style.left =  (mouseX-58) + "px";
    
    
    //imagen.style.margin =  "0px";
    imagen.style.position =  "absolute";
    imagen.style.zIndex=50000;
    document.body.appendChild(imagen);
    
    imagen=null;  
    
    //setTimeout(document.getElementById("mouseZoom").style.visibility='hidden',400);
    destroyZoomAnimation();
    
    //  $("#draggable").html("");	// Chapuza!    Si está, si has hecho zoom, no puedes volver a insertar una foto | Si no está, se le va la olla a la hora de hacer el zoom-in zoom-out, creo que porque no elimina los elementos antiguos...
    $("#draggable").html('<div id="operaciones" style="z-index:1; top:0px; left:0px; position:absolute;" ></div>'); // Solución temporal... una chapuza como una casa !
    predibuja();
  
  
    // zoom central global
    mapa = $('.mapa').position();
    // alert(mapa.left);
  
  
    // Este ya es PERFECTO!
    document.getElementById("draggable").style.top=parseInt(document.getElementById("draggable").style.top.slice(0, -2) + document.getElementById("draggable").style.top.slice(0, -2))*0.5  +256/2 + mouseY/2 + "px";
  
    // Este ya es PERFECTO!
    document.getElementById("draggable").style.left=document.getElementById("draggable").style.left.slice(0, -2) - document.getElementById("draggable").style.left.slice(0, -2)*0.5 + mouseX/2 +  256/2 +"px";
  
    
    //( parseInt(document.getElementById("draggable").style.left.slice(0, -2)) + (mouseX*1.5)-180 )+"px"; 
    // document.getElementById("draggable").style.left=+mouseY+"px"; //"-200px";
    
    //alert(mouseX+"-"+mouseY);
    dibuja();  
  
  }
});
// --------------------------------------------------------------------------------------------------------------------------
}



// Función para capturar las coordenadas del ratón (http://dev-notes.com/code.php?q=33)
function getCursorXY(e) 
{
	mouseX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	mouseY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);


	sobraX=((-1)*(parseInt(( parseInt(document.getElementById("draggable").style.left) + (-1)*(mouseX+256/(zoom+1)))/(ANCHO_SECTOR/(zoom+1)) ))+1)%(parseInt(zoom)+1);
	sobraY=((-1)*(parseInt(( parseInt(document.getElementById("draggable").style.top) + (-1)*(mouseY+256/(zoom+1)))/(ALTO_SECTOR/(zoom+1)) ))+1)%(parseInt(zoom)+1);

	sectorActualX=	((-1)*(parseInt(( parseInt(document.getElementById("draggable").style.left) + (-1)*(mouseX+256/(zoom+1)))/(ANCHO_SECTOR/(zoom+1)) ))+1)/(parseInt(zoom)+1);
	
	sectorActualY=	((-1)*(parseInt(( parseInt(document.getElementById("draggable").style.top) + (-1)*(mouseY+256/(zoom+1)))/(ALTO_SECTOR/(zoom+1)) ))+1)/(parseInt(zoom)+1);


	if(sobraX) sectorActualX=sectorActualX+.5;	//Chapucilla para hacer el redondeo de la identificacion de sectores cuando zoom>0.
	if(sobraY) sectorActualY=sectorActualY+.5;
	
	$("#infoCoordenadasRaton").html(mouseX + ((-1)*parseInt(document.getElementById("draggable").style.left)) + ", " + ((-1)*(parseInt(document.getElementById("draggable").style.top)) + mouseY) + " | " + sectorActualX + "-" + sectorActualY + " - Z" + zoom );
	
	muestra_datos();	// Actualizo los datos en el panel de datos internos
}
