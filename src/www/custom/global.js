(function($)
{
	$(document).ready(function()
	{
		var mask = $('#mask');
		window.showMask = function showMask()
		{
			mask.addClass('show');
		}
		window.hideMask = function hideMask()
		{
			mask.removeClass('show');
		}
		window.toggleMask = function toggleMask()
		{
			mask.toggleClass('show');
		}
	});

	$.ajaxSetup(
	{
		cache: false,
		dataType: "json",
		type: "POST",
		async: true,
		timeout: 10000
	});

	window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';
	
	$(document).ready(function()
	{
		$('.logout-onclick').on('click', function(event)
		{
			toggleMask();
			$.ajax(
			{
				url: basePepUrl + "logout.php",
				data:
				{
					
				},
				success: function OnAjaxSuccess(data, textStatus, jqXHR)
				{
					if(data.result === true)
					{
						alert(data.message);
						window.location.href = 'index.html';
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
})(jQuery);