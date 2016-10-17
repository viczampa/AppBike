showMask();

$(document).ready(function()
{
	var lat, lng, address;
	
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var map;
	
	var positionSettings =
	{
		enableHighAccuracy: true, 
		timeout: 10 * 1000, 
		maximumAge: 7.5 * 1000
	};
	
	var positionWatcher = navigator.geolocation.watchPosition(OnPositionChange, OnPositionError, positionSettings);
	
	function OnPositionError(positionErrorObj)
	{
		switch(positionErrorObj.code)
		{
			case 1: // PERMISSION_DENIED
			{
				console.log("PositionError PERMISSION_DENIED");
			}
			case 2: // POSITION_UNAVAILABLE
			{
				console.log("PositionError POSITION_UNAVAILABLE");
			}
			case 3: // TIMEOUT
			{
				console.log("PositionError TIMEOUT");
			}
			default:
			{
				console.log('Erro no bagulho');
			}
		}
		console.log(positionErrorObj.message);
	}
	
	function OnPositionChange(positionObj)
	{
		hideMask();
		
		map = new google.maps.Map($('#map').get(0),
		{
			zoom: 13,
			center: {lat: positionObj.coords.latitude, lng: positionObj.coords.longitude},
			panControl: false, 
			zoomControl: false, 
			draggable: false, 
			scrollwheel: false, 
			mapTypeControl: false, 
			scaleControl: false, 
			streetViewControl: false, 
			overviewMapControl: false
		});
		directionsDisplay.setMap(map);

		OnPositionChange = _OnPositionChange;
		
		_OnPositionChange(positionObj);
	}
	
	function _OnPositionChange(positionObj)
	{
		lat = positionObj.coords.latitude;
		lng = positionObj.coords.longitude;

		var localizador    = new google.maps.Geocoder();
		var casaDoHenrique = new google.maps.LatLng(-23.640577699999998,-46.5326357);
		var local          = new google.maps.LatLng(lat,lng);

		localizador.geocode({'latLng': local},function(registro,status)
		{
			if(status === google.maps.GeocoderStatus.OK)
			{
				address = registro[0];
				$("#endereco").val(address.formatted_address);
			}
		});		
		
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
	}
});