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

function zoomOutOp()
{

if(zoom<MAX_ZOOM-1)
{
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
  imagen.setAttribute("src", "Zout.gif");
  imagen.setAttribute("id","mouseZoom");
  imagen.style.top =  (mouseY-40) + "px";
  imagen.style.left =  (mouseX-58) + "px";
  imagen.style.position =  "absolute";
  imagen.style.zIndex=50000;
  document.body.appendChild(imagen);
  imagen=null;  
  
  destroyZoomAnimation();
  
  $("#draggable").html('<div id="operaciones" style="z-index:1; top:0px; left:0px; position:absolute;" ></div>'); // Solución temporal... una chapuza como una casa !

  predibuja();

  mapa = $('.mapa').position();

// Este ya es PERFECTO!
  document.getElementById("draggable").style.top=parseInt(document.getElementById("draggable").style.top.slice(0, -2) + document.getElementById("draggable").style.top.slice(0, -2))*0.5 + 256  + "px";

// Este ya es PERFECTO!
  document.getElementById("draggable").style.left=document.getElementById("draggable").style.left.slice(0, -2) - document.getElementById("draggable").style.left.slice(0, -2)*0.5 +  256*2 - 256/8 +"px";

	dibuja();
}
}


function zoomInOp()
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

  imagen.setAttribute("id","mouseZoom");
  imagen.style.top =  (mouseY-40) + "px";
  imagen.style.left =  (mouseX-58) + "px";

  imagen.style.position =  "absolute";
  imagen.style.zIndex=50000;
  document.body.appendChild(imagen);
  
  imagen=null;  
  
  destroyZoomAnimation();
  
  $("#draggable").html('<div id="operaciones" style="z-index:1; top:0px; left:0px; position:absolute;" ></div>'); // Solución temporal... una chapuza como una casa !

  predibuja();

  // zoom central global
  mapa = $('.mapa').position();

  // Aun no va
  document.getElementById("draggable").style.top=document.getElementById("draggable").style.top.slice(0, -2)*(2)   - parseInt($(document).find('#viewport').css('height'))/2 - 256 + "px";

  // Perfecta!
  document.getElementById("draggable").style.left=parseInt(document.getElementById("draggable").style.left.slice(0, -2))*(2)  - parseInt($(document).find('#viewport').css('width'))/2 -  256 +"px";

	dibuja();
}

