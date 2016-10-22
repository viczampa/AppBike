(function()
{
	window.basePepUrl = 'http://pepperdrinks.smserver.com.br/app/src/public_html/';
	// window.basePepUrl = 'http://localhost:80/AppBikeServer/src/public_html/';
	window.artificialHistory = [];
	window.INTERVAL_CLEANUP = function(){};
	window.custom_back_key = function(){};
	window.navFromBack = false;
	window.PUSH_ID = null;

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

  $(document).one('deviceready', function()
  {
    var TP_ITV = window.setInterval(function()
    {
      CheckGPS.check(function()
      {
        //GPS is enabled!
        $('#geolocMask').css("display","none");
      },
      function()
      {
        //GPS is disabled!
        $('#geolocMask').css("display","block");
        function openAdjust(){
          if(typeof cordova.plugins.settings.openSetting != undefined){
              cordova.plugins.settings.open(function(){
              },
              function(){
                console.log("failed to open settings")

        function openAdjust()
		{
          if(typeof cordova.plugins.settings.openSetting != undefined)
		  {
              cordova.plugins.settings.open(function()
			  {

        	},
              function()
			  {
                console.log("failed to open settings");
              });
          }
        }

        navigator.notification.confirm(
           'Para atualizar sua localização, o Where precisa saber onde você está',
            openAdjust,
           'Onde você está?',
          ['Abrir Ajustes','Cancelar']);
      });
    }, 2000);
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
	};

	function deg2rad(deg)
	{
		return deg * (Math.PI/180);
	}

	window.getDistanceFromLatLonInM = function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2)
	{
		return getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) * 1000.0;
	};

	// Transmissao funcs
	(function()
	{
		var positionWatcher = null;
		var positionSettings =
		{
			enableHighAccuracy: true,
			timeout: 10 * 1000,
			maximumAge: 7.5 * 1000
		};

		var lat, lng;
		var lat_velha, lng_velha;

		window.ComecarTransmissao = function ComecarTransmissao()
		{
			if(positionWatcher)
				return;
			positionWatcher = navigator.geolocation.watchPosition(OnPositionChange, OnPositionError, positionSettings);
		};

		window.PararTransmissao = function PararTransmissao()
		{
			if(positionWatcher)
			{
				navigator.geolocation.clearWatch(positionWatcher);
				positionWatcher = null;
			}
		};

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
			PararTransmissao();
			ComecarTransmissao();
		}

		function OnPositionChange(positionObj)
		{
			lat = positionObj.coords.latitude;
			lng = positionObj.coords.longitude;

			// Checar se a distância dá mais de 3 metros de diferença
			// Se não, RETURN agora e parar o bagulho
			if(getDistanceFromLatLonInM(lat, lng, lat_velha, lng_velha) < 3)
			{
				console.log('Distancia ignorada, diferença mto pequena -- transmt');
				return;
			}

			lat_velha = lat;
			lng_velha = lng;

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
						// navigator.notification.alert('Localização mandada p/ server com sucesso');
					}
					else
					{
						if(data.special == "RELOG")
						{
              //alert('RElogger!');
							window.PararTransmissao();
						}
					}
				},
				error: function OnAjaxError(jqXHR, textStatus, errorThrown)
				{
					console.log(jqXHR, textStatus, errorThrown);
				},
				complete: function OnAjaxComplete(jqXHR, textStatus)
				{

				}
			});
		}
	})();

	document.addEventListener('deviceready', function()
	{
	    if(typeof navigator.notification === 'undefined')
	    {
	      navigator.notification = {};
	      navigator.notification.alert = window.alert.bind(window);
	  	}
	    $(window).on('appb_login', function()
	    {
	      window.ComecarTransmissao();
	    });
		if(typeof PushNotification !== 'undefined')
		{
			// navigator.notification.alert("Push disponível!");
			$(window).one('appb_login', function()
			{
				// navigator.notification.alert("Login feito, bindando push!");
				if(window.PUSH_ID)
				{
					mandaPushServer();
				}
				else
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
						window.PUSH_ID = data.registrationId;
						// navigator.notification.alert("Push registrado! \n\n OBJ: " + JSON.stringify(data));
						mandaPushServer();
					});
					push.on('notification', function(data)
					{
						// data.message,
						// data.title,
						// data.count,
						// data.sound,
						// data.image,
						// data.additionalData
						// navigator.notification.alert("Push recebido! \n\n OBJ: " + JSON.stringify(data));
					});
					push.on('error', function(e)
					{
						// e.message
						// navigator.notification.alert("Push error! \n\n OBJ: " + JSON.stringify(e));
					});
				}
				function mandaPushServer()
				{
					$.ajax(
					{
						url: basePepUrl + "push_reg.php",
						data:
						{
							regid: window.PUSH_ID
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
				}
			});
		}
		else
		{
			navigator.notification.alert('Push indisponivel');
		}
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
						// navigator.notification.alert(data.message);
						localStorage.removeItem('login_pwd');
						PUSHMASK({url: 'index.html', transition: 'slide-out'});
						$.ajax(
						{
							url: basePepUrl + "push_unreg.php",
							data:
							{
								regid: window.PUSH_ID
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
})();
