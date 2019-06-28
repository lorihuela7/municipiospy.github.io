
function iniciarMap()
{

    //Ejemplo - Localizacion de Hospital Regional
    var coord = {lat:-23.411764,lng:-57.437868};
    var map = new google.maps.Map(document.getElementById('map'),{zoom: 15, center: coord});
    var marker = new google.maps.Marker({position: coord, map: map, title: 'Hospital Regional', url: 'recursos.html' });

    //Escuchador: Evento Click
    google.maps.event.addListener(marker, 'click', function () { window.location = marker.url; });

    //Consultando y ubicando Marcadores de establecimientos
    getEstablecimientos(map);    
    
}

function getEstablecimientos(map)
    {
        jQuery.post("http://datos.mspbs.gov.py/data/establecimientos.json",{},
            function(data, textStatus){
                var establecimientos = JSON.parse(data);

                for(i=0 ; i < productos.length; i++) 
                {
                    var marker = new google.maps.Marker({position: establecimientos[i]['coodenadas'], map: map, title: establecimientos[i]['nombre_establecimiento'], url: 'recursos.html' });
                    //Escuchador: Evento Click
                    google.maps.event.addListener(marker, 'click', function () { 
                        window.location = marker.url; 
                    });
                }
            }
        );
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

function cargaServicios()
{
    jQuery.post("http://datos.mspbs.gov.py/data/disponibilidad-servicios.json",{},
        function(data, textStatus){
            var productos = JSON.parse(data);

            for(i=0 ; i < productos.length; i++) 
            {
                $("#idServicios").append(productos[i]['codigo_servicio']+'   ');
                $("#idServicios").append(productos[i]['nombre_servicio']+'<br>');
            }
        }
    );
}