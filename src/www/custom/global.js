window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';
window.basePepUrl = 'http://localhost:80/AppBikeServer/src/public_html/';

$.ajaxSetup(
{
	cache: false,
	dataType: "json",
	method:"POST",
	jsonp: false,
	type: "POST",
	async: true,
	timeout: 10000,
	// CORS transmissao de Cookies
	xhrFields:
	{
		withCredentials: true
	}
});

window.addEventListener('push', checkPage);
function checkPage()
{
	// Achar os js da página aqui, e rodá-los
	var scripts = $('.content').find('script');
	scripts.each(function(index, script)
	{
		script = $(script);
		console.log(script);
		var orig_src = script.attr('src');
		$.getScript( orig_src, function(data, textStatus, jqxhr)
		{
			// Success
		});
	});
}

document.addEventListener("deviceready", function(event)
{
	alert("deviceready");
	if(window.PushNotification)
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
			alert("Push registrado! \n\n OBJ: " + JSON.stringify(data));
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
					console.log(jqXHR, textStatus);
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
			alert("Push recebido! \n\n OBJ: " + JSON.stringify(data));
		});
		push.on('error', function(e)
		{
			// e.message
			alert("Push error! \n\n OBJ: " + JSON.stringify(e));
		});
	}
	else
	{
		alert('Indisponivel');
	}
});


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
	

(function($)
{
	var maskstring = '<div id="mask"><div id="loader"></div></div>';
	function ChkMaskAppend()
	{
		if($('#mask').length === 0)
		{
			$('body').append(maskstring);
		}
	}
	window.showMask = function showMask()
	{
		ChkMaskAppend();
		$('#mask').addClass('show');
	}
	window.hideMask = function hideMask()
	{
		$('#mask').removeClass('show');
	}
	window.toggleMask = function toggleMask()
	{
		ChkMaskAppend();
		$('#mask').toggleClass('show');
	}
})(jQuery);


	
$(document).ready(function()
{
	$(document).on('click', '.logout-onclick', function(event)
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
					// alert(data.message);
					localStorage.removeItem('login_pwd');
					PUSH({url: 'index.html', transition: 'slide-out'});
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
