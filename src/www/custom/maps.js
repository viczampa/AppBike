
function setarMapa(rua){
    var localizador = new google.maps.Geocoder();
    localizador.geocode({"address":rua},function(registro,status){
        if(status == google.maps.GeocoderStatus.OK){
            var lat = registro[0].geometry.location.lat();
            var long = registro[0].geometry.location.lng();

            var configuracoes = {
                zoom:17,
                center: new google.maps.LatLng(lat,long),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            var mapa = new google.maps.Map($("#mapa").get(0), configuracoes);
        }
    });
    //possui animation
    new google.maps.Marker({
        map: mapa,
        position: new google.maps.LatLng(lat,long)
    });
}
