$(document).ready(function()
{
	$('#action-parear').on('click', function(event)
	{
		toggleMask();
		$.ajax(
		{
			url: basePepUrl + "pareamento.php",
			data:
			{
				email_destino: $('#email_destino').val(),
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				if(data.result === true)
				{
					alert(data.message);
				}
				else
				{
					alert(data.message);
				}
			},
			error: function OnAjaxError(jqXHR, textStatus, errorThrown)
			{
				console.log(jqXHR, textStatus, errorThrown);
			},
			complete: function OnAjaxComplete(jqXHR, textStatus)
			{
				toggleMask();
			}
		});
	});
});