(function()
{
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
		switch(positionErrorObj.code)
		{
			// PERMISSION_DENIED
			case 1:
			{
				console.log("PositionError PERMISSION_DENIED");
				break;
			}
			// POSITION_UNAVAILABLE
			case 2:
			{
				console.log("PositionError POSITION_UNAVAILABLE");
				break;
			}
			// TIMEOUT
			case 3:
			{
				console.log("PositionError TIMEOUT");
				break;
			}
			default:
			{
				console.log('Erro no bagulho ???');
				break;
			}
		}
		console.log(positionErrorObj.message);
	}

	function OnPositionChange(positionObj)
	{
		OnPositionChange = _OnPositionChange;
		_OnPositionChange(positionObj);
	}

	function _OnPositionChange(positionObj)
	{
		lat = positionObj.coords.latitude;
		lng = positionObj.coords.longitude;

		$.ajax(
		{
			url: basePepUrl + "ajax_geoloc.php",
			data:
			{
				lat: lat,
				lng: lng
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				console.log(data, textStatus, jqXHR);
				if(data.result === true)
				{
					alert('localização enviada com sucesso');
				}
			},
			error: function OnAjaxError(jqXHR, textStatus, errorThrown)
			{
				console.log(jqXHR, textStatus, errorThrown);
			},
			complete: function OnAjaxComplete(jqXHR, textStatus)
			{
				// console.log(jqXHR, textStatus);
			}
		});
	}
})();