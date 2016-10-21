(function()
{
	$(document).one('deviceready', function()
	{
		window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';
		// window.basePepUrl = 'http://localhost:80/AppBikeServer/src/public_html/';
		window.artificialHistory = [];
		window.INTERVAL_CLEANUP = function(){};
		window.custom_back_key = function(){};
		window.navFromBack = false;

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

		window.getDistanceFromLatLonInKm = function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)
		{
			// Filter
			if(typeof lat1 === 'undefined' || typeof lon1 === 'undefined' || typeof lat2 === 'undefined' || typeof lon2 === 'undefined')
			{
				return Infinity;
			}

			var R = 6371; // Radius of the earth in km
			var dLat = deg2rad(lat2-lat1);  // deg2rad below
			var dLon = deg2rad(lon2-lon1);

			var a =
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon/2) * Math.sin(dLon/2)
			;

			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c; // Distance in km

			return d;
		}

		function deg2rad(deg)
		{
			return deg * (Math.PI/180);
		}

		window.getDistanceFromLatLonInM = function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2)
		{
			return getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) * 1000.0;
		}

		window.IniciarTransmissao = function IniciarTransmissao()
		{
			$.getScript('custom/transmitir.js', function(data, textStatus, jqxhr)
			{
				// Success, pegou o script e está rodando/rodou
			});
		};

		if(typeof PushNotification !== 'undefined')
		{
			// alert("Push disponível!")
			$(window).one('appb_login', function()
			{
				// alert("Login feito, bindando push!");
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
			});
		}
		else
		{
			alert('Push indisponivel');
		}

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


		window.TogglarBotaoRatchet = function TogglarBotaoRatchet(botao)
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




		window.smallTimeout = function smallTimeout(func)
		{
			window.setTimeout(func, 10);
		}


		window.PUSHMASK = function PUSHMASK(push_opt)
		{
			showMask();
			$(window).one('push', function(event){ hideMask(); });
			PUSH(push_opt);
		}



		window.instantTimeout = function instantTimeout(func)
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
			item.css('opacity', '0.75');
			item.css('position', 'relative');
			item.animate({ 'background-color': 'transparent', 'padding-top': '0', 'padding-bottom': '0', 'opacity': '0', 'height': '0'/*, 'top': '-' + parseFloat(item.innerHeight()) + "px"*/ }, { duration: time, queue: false, always: function(){ item.remove(); } } );
		}




		document.addEventListener("backbutton", onBackKeyDown, false);
		function onBackKeyDown(event)
		{
			var gh = window.custom_back_key();
			if(gh !== true)
			{
				history.back();
			}
		}


		window.addEventListener('popstate', function(event)
		{
			// console.log(event);
			// Window.History.Back
			// if(!event.state)
			{
				window.artificialHistory.pop();
				PUSHMASK({url: window.artificialHistory.pop(), transition: 'slide-out'});
				window.navFromBack = true;
			}
		});



		// Evento de navegação pela PUSH
		function checkPage()
		{
			console.log('checkPage chamado');
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
				console.log('carregando script ' + orig_src);
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
	});
})();