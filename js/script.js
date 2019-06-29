
function iniciarMap()
{
    
}
function iniciarMap1()
{
    //Ejemplo - Localizacion de Hospital Regional
    var coordStr = "20° 15' 21.990\" S 58° 10' 38.006\" W";    
    var coordTmp = parse_gps(coordStr);    
    var coord = {lat: coordTmp[0], lng: coordTmp[1]};

    var map = new google.maps.Map(document.getElementById('map'),{zoom: 5, center: coord});
    var marker = new google.maps.Marker({position: coord, map: map, title: 'Hospital Regional', url: 'recursos.html' });
    
    //Escuchador: Evento Click
    google.maps.event.addListener(marker, 'click', function () { window.location = marker.url; });    
    alert("alerrta!");
    //Consultando y ubicando Marcadores de establecimientos
    getEstablecimientos(map);        
}

$('#filtro').keydown(function(){   
    
                          
});

function getJSON(){

    var xhttp= new XMLHttpRequest();
    //var parametros ='?aldebaran-s-a-1';    
    xhttp.open('GET', 'json/establecimientos.json', false);
    xhttp.send();
    if(xhttp.status === 200){        
        lista = JSON.parse( xhttp.response);   
        
        return lista;
    }else{
        alert("error!!");
    }
}

function getEstablecimientos(map)
    {        
        //JSON data
        var data = getJSON();                                
        // Obteniendo todas las claves del JSON
        // Controlando que json realmente tenga esa propiedad
        var marcadores = "[";     
        for (i=0;i < data.length ;i++)
        {   
            var coord = {lat: data[i].latitud, lng: data[i].longitud};
            
            if (data.hasOwnProperty(i)) {
                marcadores += "{position: "+coord+",map: "+map+", title: "+data[i].nombre_departamento+",url: 'recursos.html'}";

            }
        }
        var marcadores = "]";
        
        alert(marcadores[0]);
        
        var markers = new google.maps.Marker(marcadores);
        //Escuchador: Evento Click
        google.maps.event.addListener(markers, 'click', function () { window.location = markers.url; });    
    }

function cargaProductos()
{
    jQuery.post("http://datos.mspbs.gov.py/data/disponibilidad.json",{},
        function(data, textStatus){
            var productos = JSON.parse(data);

            for(i=0 ; i < productos.length; i++) 
            {
                $("#idProductos").append(productos[i]['codigo_producto']+'   ');
                $("#idProductos").append(productos[i]['nombre_producto']+'<br>');
            }
        }
    );
}

//CONVERSOR DE CORRDENADAS EN GRADOS
function parse_gps( input ) 
{ 
    if( input.indexOf( 'N' ) == -1 && input.indexOf( 'S' ) == -1 && input.indexOf( 'W' ) == -1 && input.indexOf( 'E' ) == -1 ) 
    { 
        return input.split(',');
    } 
    var parts = input.split(/[°'"]+/).join(' ').split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
    var directions = []; 
    var coords = [];
    var dd = 0; 
    var pow = 0; 
    for( i in parts ) 
    { 
        // we end on a direction 
        if( isNaN( parts[i] ) )
         { 
             var _float = parseFloat( parts[i] ); 
             var direction = parts[i];
             if( !isNaN(_float ) ) 
             { 
                 dd += ( _float / Math.pow( 60, pow++ ) );
                 direction = parts[i].replace( _float, '' ); 
            } direction = direction[0];
            if( direction == 'S' || direction == 'W' ) dd *= -1;
            directions[ directions.length ] = direction;
            coords[ coords.length ] = dd; dd = pow = 0; 
        } 
        else
        { 
            dd += ( parseFloat(parts[i]) / Math.pow( 60, pow++ ) );
        } 
    } 
    if( directions[0] == 'W' || directions[0] == 'E' ) 
    { 
        var tmp = coords[0];
        coords[0] = coords[1];
        coords[1] = tmp;
    } 
    return coords; 
}