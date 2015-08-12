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

function fecha()
	{
	// Get today's current date.
var now = new Date();

// Array list of days.
var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

// Array list of months.
var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

// Calculate the number of the current day in the week.
var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

// Calculate four digit year.
function fourdigits(number)	{
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
