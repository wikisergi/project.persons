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

function configuraDrag()
{
  jQuery("#draggable").draggable({
  	containment: "#container",		// ??
  	addClasses: 
      false,
      start: 
  		  function(e, ui) 
        {
          //$( "#draggable" ).css( "cursor", 'url(grabbing.cur),none' );
          document.getElementById("draggable").style.cursor='url(grabbing.cur),none'; 
            
      		Temp2=null;		// Destruimos el timer de redibujar a los 1000 msgs. de haber acabado el drag. Esto se hace para no hacer redibuja inutilmente, cuando lo haremos por fuerza, ya que estamos empezando un drag en este punto y seguro que redibujaremos!!















    			e=null;
    			ui=null;
  		
        },
      stop: 
  		  function(e, ui) 
        {
        //	$( "#draggable" ).css( "cursor", 'default' );  
          document.getElementById("draggable").style.cursor='default'; 
          
  		    setTimeout("predibuja();",PAINTING_DELAY_TIME/2);	// Redibuja al cabo de 1000 msgs por si se ha quedado alguna parcela sin dibujar (pasaba a veces!!) WoW! Y va GENIAL !!
 setTimeout("dibuja();",PAINTING_DELAY_TIME*2);	// Redibuja al cabo de 1000 msgs por si se ha quedado alguna parcela sin dibujar (pasaba a veces!!) WoW! Y va GENIAL !!



            },
  
            drag: 
              function(event) 
              {

	$("#draggable").css("cursor", "all-scroll");

		// WOW! AQUÍ HE VISTO LA LUZ...: PONIENDO ESTO, YA NO SE RELENTIZA HACIENDO DRAGGING !!!!!!  12.08.2014
		// PERO CUIDADO, SI ESTÁ PUESTO, NO VA TAN FINO CON EL TEMA DE CARGAR LO QUE YA SE HABÍA CARGADO...
		setTimeout("eliminaNoLoadables();",PAINTING_DELAY_TIME*5);

                predibuja();

 //setTimeout("dibuja();",PAINTING_DELAY_TIME);	// Redibuja al cabo de 1000 msgs por si se ha quedado alguna parcela sin dibujar (pasaba a veces!!) WoW! Y va GENIAL !!
  
                //		setTimeout("dibuja();",500);	// Redibuja al cabo de 1000 msgs por si se ha quedado alguna parcela sin dibujar (pasaba a veces!!) WoW! Y va GENIAL !!
                
                // *****************************************************************************************************************************************
                // *****************************************************************************************************************************************
                // *****************************************************************************************************************************************
                // dibuja CRITICO!  ESTE ES EL QUE HAY QUE TRABAJAR PARA QUE TODO EL SISTEMA VAYA RÁPIDO!!! ESTE ES EL KIT DE LA CUESTIÓN!!!
                //		dibuja();
                // *****************************************************************************************************************************************
                // *****************************************************************************************************************************************
                // *****************************************************************************************************************************************
                	actualizaMiniMap();

    
  	           }
  		
  }).click(function(){
		// Previene el click hasta que acabemos el drag
		// Fuente: http://forum.jquery.com/topic/can-the-same-element-have-draggable-and-click-event
		if ( $(this).is('.ui-draggable-dragging') ) 
    {
      return;
    }
    
    // click action here
		analizaClick();
  });
  
  
  
  
  

/*  
 $(document).ready(function() {
  $("#minimap").mouseup(function(){
        $("#minimap").css( "cursor","all-scroll");
      }).mousedown(function(){
        $("#minimap").css( "cursor","all-scroll");
      });
}); 
*/  
 
  
 jQuery("#minimap").draggable({
      start: 
  		  function(e, ui) 
        {
          //$( "#draggable" ).css( "cursor", 'url(grabbing.cur),none' );
//          document.getElementById("minimap").style.cursor='grab';  // style="cursor:grab;"
//          document.getElementById("minimap").style.cursor='url(grabbing.cur),none';  // style="cursor:grab;"

        },

	 drag: function(event){	

	$("#minimap").css("cursor", "all-scroll");
		
          document.getElementById("minimap").style.cursor='grabbing';  // style="cursor:grab;"
	 
		// alert("RAT");
/*
		if(zoom==0)
		{
			$("#draggable").css("top", $("#minimap").position().top*32-55*32 -MINIMAP_SIZE*35*32);
			$("#draggable").css("left", $("#minimap").position().left*32-73*32 -MINIMAP_SIZE*44*32);
		}

		if(zoom==1)
		{
			$("#draggable").css("top", $("#minimap").position().top*32-55*32*2 - MINIMAP_SIZE*35*32);
			$("#draggable").css("left", $("#minimap").position().left*32-73*32*2 - MINIMAP_SIZE*44*32);
		}
				
*/
			//Chapucilla, pero he de utilizar el MultiDraggable!!
			document.getElementById("minimapImage").style.left=document.getElementById("minimap").style.left;
			document.getElementById("minimapImage").style.top=document.getElementById("minimap").style.top;

// $("#draggable").css("top", $("#minimap").css("top")*41.6666666666666666666);
// $("#draggable").css("left", $("#minimap").css("left")*41.6666666666666666666);
 
 
predibuja();
 
	},
	
	 stop: function(event){	

	
             document.getElementById("minimap").style.cursor='default'; 



	 // Si pongo esto le sienta mal y dá un pequeño bote hacia la izquierda o derecha	
// 			$("#draggable").css("top", $("#minimap").position().top*32-55*32);
//			$("#draggable").css("left", $("#minimap").position().left*32-73*32);

// $("#draggable").css("top", $("#minimap").css("top")*41.6666666666666666666);
// $("#draggable").css("left", $("#minimap").css("left")*41.6666666666666666666);
 
 
 dibuja();
//actualizaMiniMap();  //Evitamos que el minimapa también se salga de los márgenes o se pierda
	}	
	
	 
	 });
  
  
  
  
  
  
  
  
}
