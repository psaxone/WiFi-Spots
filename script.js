var map = null
var marker = null

$(document).ready(function() {
    $("#boton-geo").click(function(){
        geoLoc();
    });
    $("#boton-buscar").click(function() {
        // var direccion = $("#direccion").val();
    })
    
})



function initMap() {
    var uluru = {lat: -34.6327549, lng: -58.4429133};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru
    });
}

function geoLoc() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
        if (marker === null){
            marker = new google.maps.Marker({
                 position: uluru,
                 map: map,
            })
         } else {
             marker.setPosition(uluru)
         }
        
        map.setZoom(16);
        map.panTo(uluru);
        updateMap()
    })
}
 
function updateMap() {
    $.get('./sitios-de-wifi.csv', function( csvString ){
        var data = $.csv.toObjects(csvString)
        console.log(data)
        data.forEach(function(item) {
            var lat = Number(item.LAT)
            var lng = Number(item.LNG)
            var latLng = new google.maps.LatLng(lat,lng);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8.5,
                    fillColor: "#F00",
                    fillOpacity: 0.4,
                    strokeWeight: 0.4
                }    
            });
        })
    });
}


//  var defaultBounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(-33.8902, 151.1759),
//     new google.maps.LatLng(-33.8474, 151.2631));
  
//   var input = document.getElementById('searchTextField');
//   var options = {
//     bounds: defaultBounds,
//     types: ['geocode']
//   };
  
//   autocomplete = new google.maps.places.Autocomplete(input, options);