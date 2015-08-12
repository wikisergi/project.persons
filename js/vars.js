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

// Variable declaration file

var carga;

// Declaración variables globales	
LIMITES=1; // Control de que el mapa esté siempre visible y si estamos en los límites, se quede ahí, para poder seguir siendo visible y draggable.
//var URL1 ="../maps/j2/";  // Mapa que carga al iniciar - URL1 y URL2: indican dónde se encuentran almacenados los sectores del mapa.
var URL1;// ="../maps/Luna1/";//http://www.sergiwilliam.elementfx.com/multiurl2/";  // Mapa que carga al iniciar - URL1 y URL2: indican dónde se encuentran almacenados los sectores del mapa.
//var URL1 ="http://www.sergiwilliam.com/maps/maps/map5/";  // Mapa que carga al iniciar - URL1 y URL2: indican dónde se encuentran almacenados los sectores del mapa.
mapName = "c6";	// mapName indicates the first map the system is going to load
var mapDescription;
var URL2;// ="../maps/Tesoro1/";//http://sergiwilliam.netau.net/multiurl2/";
var URL3;// ="../maps/Tesoro1/";//http://sergiwilliam.vacau.com/multiurl2/";
var URL4;// ="../maps/Tesoro1/";//http://sergiwilliam.comuv.com/multiurl2/";

var BASE_URL;

var px = -1000;
var px2 = -1000;
var PRUEBAS=0;
var ANCHO_SECTOR=256; // ANCHO_SECTOR y ALTO_SECTOR definen el tamaño de las parcelas. Usualmente: 256px x 256px.
var ALTO_SECTOR=256;
var LOAD_MARGINX=ANCHO_SECTOR;  // zona alrededor del viewport dentro de la cual también se cargarán sectores
var LOAD_MARGINY=ALTO_SECTOR;
var Primerox=-ANCHO_SECTOR;
var Primeroy=-ALTO_SECTOR;
var Ultimox=ANCHO_SECTOR*(UltimoSectorX-PrimerSectorX);
var Ultimoy=ALTO_SECTOR*(UltimoSectorY-PrimerSectorY);
AJUSTAR_GRID = 1; // 1=Ajusta a la rejilla de sectores las fotos insertadas - 0=Libre, sin que se ajuste a la rejilla
GRID_SIZE = 10;	//Tamaño de rejilla cuando insertamos una imagen
//STARTX=31;		// Indica sector STARTX-STARTY donde el mapa se inicia
//STARTY=19;
var STARTX;
var STARTY;
MUESTRA_TIPS=0;
var MAX_X=256; // MAX_X y MAX_Y definen el tamaño del mapa (número de parcelas de ancho y número de parcelas de alto)
var MAX_Y=256;
//var MAX_X=64; // MAX_X y MAX_Y definen el tamaño del mapa (número de parcelas de ancho y número de parcelas de alto)
//var MAX_Y=64;
var ANCHO_MAPA = MAX_X*ANCHO_SECTOR;  // Se calcula el ancho y alto del mapa en píxeles
var ALTO_MAPA = MAX_Y*ALTO_SECTOR; 
MOSTRAR_COORDENADAS=1;	// Mostar Indicador de coordenada actual?
MOSTRAR_SALTAR_COORDENADAS=1;
var MOSTRAR_INFO=0;                // Visualiza o no, control_interrupciones con información interna
var MOSTRAR_MINIMAPA=1;  // Mostrar miniMapa?
var MINIMAP_SIZE=0;  // Minimap size: 0=Min 1=Max
var MOSTRAR_CONTROLES=1;  // Mostrar iconos de control del mapa?
var MOSTRAR_TERMINAL=0;  // Mostrar terminal de logs?
var TOOLBAR = 1;     // Estado inicial de la ToolBar   0=no visible, 1=visible
DIBUJA_BORDES = 0;	//Dibujar bordes de parcelas?	// Arreglarlo
MOSTRAR_NOMBRES_PARCELAS = 0;	// Mosstrar información número de parcelas
INERTIA = 1;          //Opción de Inercia al hacer dragging     1=Con inercia    0=Sin inercia
INFOX=1020;    // Coordenadas del panel informativo (control_interrupciones)
INFOY=100;
CARGA_DATOS=1;         // Carga los datos de los sectores si se indica.     0=no carga datos / 1=carga datos
var MOSTRAR_TODO=0;        // A 1, muestra los sectores que están fuera del viewport

// Esto creo que tendriamos que calcularlo en función del tamaño de la pantalla del cliente:
var ANCHO_VIEWPORT = 2620;
var ALTO_VIEWPORT = 1450;

var TIPO_VIEWPORT = 1;      // 0=fijo,  1=tamaño máximo siempre (cambiará si cambiamos tamaño de la ventana)	
MOSTRAR_BORDE = 1;
var PrimerSectorX=1;
var PrimerSectorY=1;
var UltimoSectorX=3;
var UltimoSectorY=4;
var MAX_ZOOM = 6;  //Si está a 1, permite zooms con rueda de ratón, si está a 0, no.
var zoom=0;   // Zoom inicial y variable que indica el zoom activo en todo momento.
var mouseX;
var mouseY;
var DEFAULT=1;		// Si DEFAULT==1, si no encuentra la parcela que hay que cargar, cargará la parcela por defecto (la usada para generar el mapa)
CODIFICA_NOMBRE_PARCELAS = 0;
// Temp1 - Variable que usamos para "apuntarnos" que el ratón está sobre el Tip y por tanto, si se detecta
// un onMouseOut encima de su parcela, que no elimine el tip!
var Temp1=0;
var Temp2;   // Temp2 controla el timer usado para redibujar una vez pasan 1000 msgs. Temp2=null destruye el timer si hacemos drag antes de 1000 msgs.
//	sectorActualX	// Contienen en Todo momento, el número de parcela a la que apuntamos!
//	sectorActualY
var modoSuperAdmin=0;

var NO_CACHE = 1;  // Controla si cargamos la última version de las parcelas en el servidor (1) ó si coge las parcelas que tenga en caché (0)

var MODO_EDICION=0;  //Especifica si el Modo de Edición está activado o no. Según eso, cambian características en el funcionamiento del sistema.

var botonMenuLocked=null;


var PAINTING_DELAY_TIME = 200; // Milisegundos que tarda en redibujar el mapa cuando estamos haciendo dragging o moviéndonos por el mapa.
