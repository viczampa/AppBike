$(document).ready(function()
{
	$('#exibir').click(function()
	{
		var lat,longi;
		navigator.geolocation.getCurrentPosition(function(dados)
		{
			lat   = dados.coords.latitude;
			longi = dados.coords.longitude;

			var localizador    = new google.maps.Geocoder();
			var casaDoHenrique = new google.maps.LatLng(-23.640577699999998,-46.5326357);
			var local          = new google.maps.LatLng(lat,longi);

			localizador.geocode({"latLng":local},function(registro,status)
			{
				if(status === google.maps.GeocoderStatus.OK)
				{
					$("#endereco").val(registro[0].formatted_address);
				}
			});

			var directionsService = new google.maps.DirectionsService();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var map               = new google.maps.Map(document.getElementById('map'),
			{
				zoom: 7,
				center: local
			});

			directionsDisplay.setMap(map);
			calculateAndDisplayRoute(directionsService, directionsDisplay);

			function calculateAndDisplayRoute()
			{
				directionsService.route(
				{
					origin: local,
					destination: casaDoHenrique,
					travelMode: google.maps.TravelMode.DRIVING
				},
				function(response, status)
				{
					if (status === google.maps.DirectionsStatus.OK)
					{
						console.log(response);
						directionsDisplay.setDirections(response);
					}
					else
					{
						window.alert('Directions request failed due to ' + status);
					}
				});
			}
		});
	});
});