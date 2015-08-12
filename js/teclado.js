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

function iniciaTelcado()
{
	// OJO!  AUN NO VA EN INTERNET EXPLORER NI EN CHROME NI EN SAFARI !!!
	// Inicializa eventos del teclado. Extraido del genial http://unixpapa.com/js/testkey.html !
    if (document.addEventListener)
    {
       document.addEventListener("keydown",keydown,false);
       document.addEventListener("keypress",keypress,false);
       document.addEventListener("keyup",keyup,false);
       document.addEventListener("textInput",textinput,false);
    }
    else if (document.attachEvent)
    {
       document.attachEvent("onkeydown", keydown);
       document.attachEvent("onkeypress", keypress);
       document.attachEvent("onkeyup", keyup);
       document.attachEvent("ontextInput", textinput);
    }
    else
    {
       document.onkeydown= keydown;
       document.onkeypress= keypress;
       document.onkeyup= keyup;
       document.ontextinput= textinput;   // probably doesn't work
    }
}

function suppressdefault(e,flag)
{
   if (flag)
   {
       if (e.preventDefault) e.preventDefault();
       if (e.stopPropagation) e.stopPropagation();
   }
   return !flag;
}


function keydown(e)
{
  keypress(e);	
  if (!e) e= event;
  keymesg('keydown ',e);
  return suppressdefault(e,document.testform.keydown.checked);
}


function keyup(e)
{
   if (!e) e= event;
   
   Temp2=0;
   // Realmente funciona...?
   $('#draggable').stop();
   return suppressdefault(e,document.testform.keyup.checked);
}



function keypress(e)
{
   if (!e) e= event;
   
   if(Temp2){	  return;}	// Si está desplazándose y mantienes pulsada la tecla, no hagas nada aún !!


 //  e.charCode  Nos dá el código si hemos pulsado un carácter
 //  e.keyCode   Nos dá el código si hemos pulsado una tecla de control (flechas, etc...)   
 //  alert("keypress "+ e.keyCode+" "+e.charCode);
    tecla_derecha=0;
    tecla_izquierda=0;
    tecla_arriba=0;
    tecla_abajo=0;
	
   switch(e.keyCode)
   {
		case 80: publish(); break;
		
		case 39: tecla_derecha=1;

				 break;

		case 37:  tecla_izquierda=1;

				 break;

		case 40:   tecla_abajo=1;

		// Flecha hacia abajo

				 break;

		case 38:  tecla_arriba=1;

		// Flecha hacia arriba
/*		
		case 70: 	// Se inserta una foto con la F

				
				$("#boton_incrustar_foto").click();
				$("#photoimg").click();
				 break;
*/				 
   }
 
	// no funciona
	if(tecla_derecha&&tecla_izquierda) return;
	if(tecla_arriba&&tecla_abajo) return;

	if(tecla_derecha&&!tecla_izquierda)
	{
		Temp2=1;
		$("#draggable").animate({left:"-=745"}, 50, function(){eliminaNoLoadables(); dibuja(); Temp2=0;} );
		
		 return;
	}
	
	if(!tecla_derecha&&tecla_izquierda)
	{
		Temp2=1;
		$("#draggable").animate({left:"+=745"}, 50, function(){ dibuja(); Temp2=0;} );
		 return;
	}

	if(tecla_abajo&&!tecla_arriba)
	{
		
		Temp2=1;
		$("#draggable").animate({top:"-=745"}, 50, function(){ dibuja(); Temp2=0;} );
		 return;
	}
	
	if(!tecla_abajo&&tecla_arriba)
	{
		Temp2=1;
		$("#draggable").animate({top:"+=745"}, 50, function(){ dibuja(); Temp2=0;} );
		 return;
	}

	if(tecla_derecha&&tecla_arriba)
	{
		$('#draggable').animate({top: '+=200', left: '+=200'},30,function() {
				    dibuja();   });
		 return;
	}


}

function textinput(e)
{
   if (!e) e= event;
   //showmesg('textInput  data=' + e.data);
   showmesg('textInput data='+e.data);
   return suppressdefault(e,document.testform.textinput.checked);
}