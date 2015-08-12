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

function objectUpdate()
{
	
	/*
	            OBJECT ID: <textarea rows="1" cols="40" id="infoID"></textarea>
            <br>
            OBJECT NAME: 
            <br>
            <textarea rows="1" cols="40" id="infoName"></textarea>
            <br>            
            OBJECT DESCRIPTION: 
            <br>
            <textarea rows="6" cols="40" id="infoDescription"></textarea>
		*/	
			
			
			
		
	


	datos='mapName=' + mapName +'&object_id=' + String(document.getElementById("infoID").value) +"&object_name=" + String(document.getElementById("infoName").value) +"&object_description="+ String(document.getElementById("infoDescription").value);
//	datos='mapName=' + mapName +'&infoID=' + $("#infoID").html() +"&infoName="+ $("#infoName").html()+"&infoDescription="+ $("#infoDescription").html();



			//return;

		carga=$.ajax({
			async: true,
			cache: false,
			url: "scripts/objectUpdate.php",
			type: "GET",
			data: datos,

			dataType: "HTML",
			success: function(data)
			{ 
				
				//alert("OK!!");
				//Inserts all elements information + behaviour scripts for the elements in the objectsLayer layer.
				//$('#objectsLayer').html("<script>    $('.imgSelect').dblclick(function(){   $('#infoID').html(this.id);  });  </script>" +data);

				},
			error: function(data)
			{
				alert("ERROR!!!!!");
  			}
		 });	




}
