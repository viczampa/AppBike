(function($)
{
	$.getScript( "https://www.gstatic.com/firebasejs/3.4.1/firebase.js", function(data, textStatus, jqxhr)
	{
		window.setTimeout(function()
		{
			var config =
			{
				apiKey: "AIzaSyCyLB3C18FS_FSLkpoYKGp1Hig-vytaumg",
				authDomain: "appbike-146203.firebaseapp.com",
				databaseURL: "https://appbike-146203.firebaseio.com",
				storageBucket: "appbike-146203.appspot.com",
				messagingSenderId: "172245467834"
			};
			firebase.initializeApp(config);
		}, 5);
	});
	
	document.addEventListener("deviceready", function()
	{
		if(PushNotification in window)
		{
			var push = PushNotification.init(
			{
				android:
				{
					senderID: "172245467834"
				},
				browser:
				{
					// pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				ios:
				{
					alert: "true",
					badge: "true",
					sound: "true"
				},
				windows: {}
			});
			push.on('registration', function(data)
			{
				// data.registrationId
				$.ajax(
				{
					url: basePepUrl + "push_reg.php",
					data:
					{
						regid: data.registrationId
					},
					success: function OnAjaxSuccess(data, textStatus, jqXHR)
					{
						console.log(data, textStatus, jqXHR);
						if(data.result === true)
						{
							
						}
						else
						{
							
						}
					},
					error: function OnAjaxError(jqXHR, textStatus, errorThrown)
					{
						console.log(jqXHR, textStatus, errorThrown);
					},
					complete: function OnAjaxComplete(jqXHR, textStatus)
					{
						console.log(jqXHR, textStatus, errorThrown);
					}
				});
			});
			push.on('notification', function(data)
			{
				// data.message,
				// data.title,
				// data.count,
				// data.sound,
				// data.image,
				// data.additionalData
			});
			push.on('error', function(e)
			{
				// e.message
			});
		}
	});

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
						localStorage.removeItem('login_usr');
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