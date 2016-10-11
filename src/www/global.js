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
})(jQuery);

$.ajaxSetup(
{
	cache: false,
	dataType: "json",
	type: "POST",
	async: true,
	timeout: 10000
});

window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';