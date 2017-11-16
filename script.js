var map = null
var marker = null
var autocomplete = null;

$(document).ready(function() {
    $("#boton-geo").click(function(geoLoc){
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
    });  
})



function initMap() {
    $.get('./mapstyle.json', function( styles ){
        var uluru = {lat: -34.6327549, lng: -58.4429133};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru,
            styles: styles
        });

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-34.729028, -58.668477),
            new google.maps.LatLng(-34.521096, -58.203274));
        var options = {
            bounds: defaultBounds,
            types: ['geocode']
        };
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('direccion'), options);
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();
            var coord = new google.maps.LatLng(lat,lng);
            marker = new google.maps.Marker({
                position: coord,
                map: map
            })
            map.setZoom(16);
            map.panTo(coord);
            updateMap()
        });
        map.setOptions({minZoom: 12})
    })
}
 
function updateMap() {
    $.get('./sitios-de-wifi.csv', function( csvString ){
        var data = $.csv.toObjects(csvString)
        data.forEach(function(item) {
            var lat = Number(item.LAT)
            var lng = Number(item.LNG)
            map.setOptions({minZoom: 15})
            var latLng = new google.maps.LatLng(lat,lng);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "yellow",
                    fillOpacity: 0.7,
                    strokeWeight: 0.7
                },
            });
        })
    });
}