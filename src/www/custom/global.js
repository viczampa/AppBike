window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';
window.basePepUrl = 'http://localhost:80/AppBikeServer/src/public_html/';
window.artificialHistory = [];
window.INTERVAL_CLEANUP = function(){};

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
					// console.log(jqXHR, textStatus);
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
		showMask();
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
					PUSHMASK({url: 'index.html', transition: 'slide-out'});
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
				hideMask();
			}
		});
	});
});


function TogglarBotaoRatchet(botao)
{
	var ativo = $(botao).hasClass('active');
	if(ativo)
	{
		$(botao).removeClass('active');
		$(botao).children().css('transform', '');
	}
	else
	{
		$(botao).addClass('active');
	}
}




function smallTimeout(func)
{
	window.setTimeout(func, 10);
}


function PUSHMASK(push_opt)
{
	showMask();
	$(window).one('push', function(event){ hideMask(); })
	PUSH(push_opt);
}



function instantTimeout(func)
{
	window.setTimeout(func, 0);
}



$.fn.prettyDel = function prettyDel(color, time)
{
	color = color || 'red';
	time = time || 400;
	var item = $(this);
	item.css('background-color', color);
	item.css('overflow', 'hidden');
	item.animate({ 'background-color': 'transparent', 'opacity': '0', 'height': '0' }, { duration: time, queue: false, always: function(){ item.remove(); } } );
}




document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(event)
{
    history.back();
}



window.addEventListener('popstate', function(event)
{
	// console.log(event);
	// Window.History.Back
	// if(!event.state)
	{
		window.artificialHistory.pop();
		PUSHMASK({url: window.artificialHistory.pop(), transition: 'slide-out'});
	}
});



// Evento de navegação pela PUSH
function checkPage()
{
	// Histórico artificial
	window.artificialHistory.push(window.location.href);
	
	// Se estiver transmitindo algo ou recebendo algo, limpar essas porras AGORA
	window.INTERVAL_CLEANUP();
	
	// Achar os js da página que foi carregada aqui, e rodá-los
	var scripts = $('.content').find('script');
	scripts.each(function(index, script)
	{
		script = $(script);
		var orig_src = script.attr('src');
		$.getScript( orig_src, function(data, textStatus, jqxhr)
		{
			// Success, pegou o script e está rodando/rodou
		});
	});
	
	
	// Attach novamente
	$(window).one('push', checkPage);
}

// Manualmente chamar evento PUSH inicial
checkPage();