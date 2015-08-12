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

function loadObjects()
{

	datos='map='+URL1;

   // alert(datos);

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/loadObjects.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
//				$('#objectsLayer').html("<script>$('.imgSelect').click(function(){   $('#infoDescription').html('"+readObject(this.id)+"'); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});     $('.imgSelect').mouseover(function(){   $('#infoID').html(this.id);});   </script>" +data);


//imgSelect

// $('#preview').html("<img src='../maps/NoEstoyInspiradaSergio/data/previews/1407699735sult.jpg'/>"); Esto es lo que hacía con la Eva, que al final, acabó hasta el coño de aguantarme!

 



				$('#objectsLayer').html("<script>$('.imgSelect').click(function(){  readObjectPreview(this.id); $('#infoID').html(this.id); $('#infoDescription').html(readObject(this.id)); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});                    $('.imgSelect').mouseover(function(){   $('#infoID').html(readObjectName(this.id));});      if(MODO_EDICION) $('.imgSelect').mouseout(function(){   $('#infoID').html('');   $('#infoDescription').html('');     $('#infoName').html('');});                    </script>" +data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}







function loadObjectsZoom1()
{

	datos='map='+URL1;

   // alert(datos);

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/loadObjectsZoom1.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
//				$('#objectsLayer').html("<script>$('.imgSelect').click(function(){   $('#infoDescription').html('"+readObject(this.id)+"'); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});     $('.imgSelect').mouseover(function(){   $('#infoID').html(this.id);});   </script>" +data);


 



				$('#draggable').append("<script>$('.imgSelect').click(function(){  readObjectPreview(this.id); $('#infoID').html(this.id); $('#infoDescription').html(readObject(this.id)); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});                    $('.imgSelect').mouseover(function(){   $('#infoID').html(readObjectName(this.id));});      if(MODO_EDICION) $('.imgSelect').mouseout(function(){   $('#infoID').html('');   $('#infoDescription').html('');     $('#infoName').html('');});                    </script>" +data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}










function loadObjectsZoom2()
{

	datos='map='+URL1;

   // alert(datos);

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/loadObjectsZoom2.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
//				$('#objectsLayer').html("<script>$('.imgSelect').click(function(){   $('#infoDescription').html('"+readObject(this.id)+"'); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});     $('.imgSelect').mouseover(function(){   $('#infoID').html(this.id);});   </script>" +data);


 



				$('#draggable').append("<script>$('.imgSelect').click(function(){  readObjectPreview(this.id); $('#infoID').html(this.id); $('#infoDescription').html(readObject(this.id)); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});                    $('.imgSelect').mouseover(function(){   $('#infoID').html(readObjectName(this.id));});      if(MODO_EDICION) $('.imgSelect').mouseout(function(){   $('#infoID').html('');   $('#infoDescription').html('');     $('#infoName').html('');});                    </script>" +data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}











function loadMiniMapObjects()
{

	datos='map='+URL1;

   // alert(datos);

		carga=$.ajax({
			async: false,
			cache: false,
			url: "scripts/loadMiniMapObjects.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
//				$('#objectsLayer').html("<script>$('.imgSelect').click(function(){   $('#infoDescription').html('"+readObject(this.id)+"'); });    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id); /*alert(this.id);*/});     $('.imgSelect').mouseover(function(){   $('#infoID').html(this.id);});   </script>" +data);


//imgSelect

// $('#preview').html("<img src='../maps/NoEstoyInspiradaSergio/data/previews/1407699735sult.jpg'/>"); Esto es lo que hacía con la Eva, que al final, acabó hasta el coño de aguantarme!

 


//alert(data);
				$('#minimap').html(data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	

}
















function readObject(objeto)
{

	datos='mapName='+mapName+'&object_id=' + objeto;

//    alert(datos);
//    alert('pepito');



		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/readObject.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 

//alert(data);
$('#infoDescription').html(data);  //Según normas de programación estructurada, esto no debería estar aquí, pero de momento, dejo esta chapucilla por aquí...
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
				//$('#objectsLayer').html("<script>   $('#infoDescription').html('"+ data +"');   </script>" +data);
//alert(String(data));
				return data;

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	




}




function readObjectName(objeto)
{

	datos='mapName='+mapName+'&object_id=' + objeto;

//    alert(datos);
//    alert('pepito');



		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/readObjectName.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 

//alert(data);
$('#infoName').html(data);  //Según normas de programación estructurada, esto no debería estar aquí, pero de momento, dejo esta chapucilla por aquí...
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
				//$('#objectsLayer').html("<script>   $('#infoDescription').html('"+ data +"');   </script>" +data);
//alert(String(data));
				return data;

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	




}




function readObjectPreview(objeto)
{

	datos='mapName='+mapName+'&object_id=' + objeto;

//    alert(datos);
//    alert('pepito');



		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/readObjectPreview.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 


$('#preview').html("<img src='"+ data + "'/>");
//alert(data);
//$('#infoName').html(data);  //Según normas de programación estructurada, esto no debería estar aquí, pero de momento, dejo esta chapucilla por aquí...
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
				//$('#objectsLayer').html("<script>   $('#infoDescription').html('"+ data +"');   </script>" +data);
//alert(String(data));
				return data;

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	




}

