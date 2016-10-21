(function()
{
	$(document).ready(function()
	{
		$('#action-parear').on('click', function(event)
		{
			showMask();
			$.ajax(
			{
				url: basePepUrl + "pareamento.php",
				data:
				{
					user_destino: $('#user_destino').val(),
				},
				success: function OnAjaxSuccess(data, textStatus, jqXHR)
				{
					if(data.result === true)
					{
						navigator.notification.alert(data.message);
					}
					else
					{
						navigator.notification.alert(data.message);
					}
				},
				error: function OnAjaxError(jqXHR, textStatus, errorThrown)
				{
					console.log(jqXHR, textStatus, errorThrown);
				},
				complete: function OnAjaxComplete(jqXHR, textStatus)
				{
					hideMask();
				}
			});
		});

		window.custom_back_key = function()
		{
			console.log('custom back key');
			navigator.app.exitApp();
			return false;
		};

		window.INTERVAL_CLEANUP = function()
		{
			window.custom_back_key = function(){};
		}
	});
})();
