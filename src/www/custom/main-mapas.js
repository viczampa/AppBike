(function()
{
	showMask();

	$(document).ready(function()
	{
		var lat, lng, address;
		var lat_alvo, lng_alvo, address_alvo;
		var latLng;
		var latLng_alvo;
		var lat_velha, lng_velha;
		var lat_alvo_velha, lng_alvo_velha;

		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var geocoder = new google.maps.Geocoder();
		var map;

		$('#alvo-nome').text(window.USUARIO_RASTREIO);

		var positionWatcher = null;

		var positionSettings =
		{
			enableHighAccuracy: true,
			timeout: 10 * 1000,
			maximumAge: 7.5 * 1000
		};

		positionWatcher = navigator.geolocation.watchPosition(OnPositionChange, OnPositionError, positionSettings);

		function OnPositionError(positionErrorObj)
    {
			switch(positionErrorObj.code){
				// PERMISSION_DENIED
				case 1:{
					console.log("PositionError PERMISSION_DENIED");
				}
				// POSITION_UNAVAILABLE
				case 2:{
					console.log("PositionError POSITION_UNAVAILABLE");
				}
				// TIMEOUT
				case 3:{
					console.log("PositionError TIMEOUT");
				}
				default:{
					console.log('Erro no bagulho');
				}
			}
			// console.log(positionErrorObj.message);
      navigator.geolocation.clearWatch(positionWatcher);
      positionWatcher = navigator.geolocation.watchPosition(OnPositionChange, OnPositionError, positionSettings);
		}

		function OnPositionChange(positionObj)
		{
			hideMask();

			OnPositionChange = _OnPositionChange;

			_OnPositionChange(positionObj);
		}

		function _OnPositionChange(positionObj)
		{
			lat = positionObj.coords.latitude;
			lng = positionObj.coords.longitude;

			latLng = new google.maps.LatLng(lat,lng);

			// Checar se a distância dá mais de 2 metros de diferença
			// Se não, RETURN agora e parar o bagulho
			if(getDistanceFromLatLonInM(lat, lng, lat_velha, lng_velha) < 2)
      {
				console.log('Distancia ignorada, diferença mto pequena -- 2');
				return;
			}

			lat_velha = lat;
			lng_velha = lng;

			geocoder.geocode({'latLng': latLng}, function(geo_result, status)
			{
				if(status === google.maps.GeocoderStatus.OK)
				{
					address = geo_result[0];
				}
			});

      calculateAndDisplayRoute();
		}

		var ajax_server_interval = setInterval(RetrieveTrackedLocation, 15 * 1000);
		RetrieveTrackedLocation();

		function RetrieveTrackedLocation()
		{
			$.ajax(
			{
				url: basePepUrl + "data-maps.php",
				data:
				{
					id: window.ID_RASTREIO
				},
				success: function OnAjaxSuccess(data, textStatus, jqXHR)
				{
					console.log(data, textStatus, jqXHR);
					if(data.result === true)
					{
            hideMask();

						lat_alvo = data.data.lat;
						lng_alvo = data.data.lng;
						latLng_alvo = new google.maps.LatLng(lat_alvo, lng_alvo);

						// Checar se a distância dá mais de 2 metros de diferença
						// Se não, RETURN agora e parar o bagulho
						if(getDistanceFromLatLonInM(lat_alvo, lng_alvo, lat_alvo_velha, lng_alvo_velha) < 2)
						{
							console.log('Distancia ignorada, diferença mto pequena -- 1');
							return;
						}

						lat_alvo_velha = lat_alvo;
						lng_alvo_velha = lng_alvo;

            if(!map)
            {
              navigator.notification.alert('Construindo mapa');

              map = new google.maps.Map($('#map').get(0),
              {
                zoom               : 13,
                center             : {lat: lat_alvo, lng: lng_alvo},
                panControl         : false,
                zoomControl        : false,
                draggable          : false,
                scrollwheel        : false,
                mapTypeControl     : false,
                scaleControl       : false,
                streetViewControl  : false,
                overviewMapControl : false
              });

              directionsDisplay.setMap(map);
            }

						geocoder.geocode({'latLng': latLng_alvo}, function(geo_result, status)
						{
							if(status === google.maps.GeocoderStatus.OK)
							{
								address_alvo = geo_result[0];
								$("#alvo-endereco").text(address_alvo.formatted_address);
							}
						});

						$("#alvo-data").text(data.data.date);

            calculateAndDisplayRoute();
					}
					else
					{
            if(data.special == "")
            {
              // TODO: Exibir que o rastreamento foi desligado para vc por esse alvo, e voltar pra pagina pareamentos
            }
					}
				},
				error: function OnAjaxError(jqXHR, textStatus, errorThrown)
				{
					console.log(jqXHR, textStatus, errorThrown);
				},
				complete: function OnAjaxComplete(jqXHR, textStatus)
				{
					console.log(jqXHR, textStatus);
				}
			});
		}

  	function calculateAndDisplayRoute()
  	{
  		if(latLng instanceof google.maps.LatLng === false || latLng_alvo instanceof google.maps.LatLng === false)
      {
  			return false;
  		}

  		directionsService.route(
      {
  			origin: latLng,
  			destination: latLng_alvo,
  			travelMode: google.maps.TravelMode.DRIVING
  		},
  		function(response, status)
  		{
  			if (status === google.maps.DirectionsStatus.OK){
  				// console.log(response);
  				directionsDisplay.setDirections(response);
  				$('#alvo-distancia').text(response.routes[0].legs[0].distance.text);
  			}
  			else{
  				console.log('Directions request failed due to ' + status);
  			}
  		});
  	}


		window.INTERVAL_CLEANUP = function()
		{
			// console.log('Cleanup mapas');
			window.USUARIO_RASTREIO = null;
			window.ID_RASTREIO = null;
			clearInterval(ajax_server_interval);
      ajax_server_interval = null;
			if(positionWatcher !== null)
      {
				navigator.geolocation.clearWatch(positionWatcher);
				positionWatcher = null;
			}
			return window.INTERVAL_CLEANUP = function(){};
		};
	});

})();
