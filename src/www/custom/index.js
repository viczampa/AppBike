$(document).ready(function()
{
	var user_i = $('#user');
	var senha_i = $('#senha');
	var lembra_login = $('#lembrarLogin');

	$('#cadastrarBtn').on('click', function(event)
	{
		showMask();
		$.ajax(
		{
			url: basePepUrl + "cadastro.php",
			data:
			{
				email : $('#cad_email').val(),
				senha : $('#cad_senha').val(),
				nome : $('#cad_nome').val()
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
				hideMask();
			}
		});
	});

	$('#loginBtn').on('click', function(event)
	{
		showMask();
		$.ajax(
		{
			url: basePepUrl + "login.php",
			data:
			{
				user : user_i.val(),
				senha : senha_i.val()
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				if(data.result === true)
				{
					if(lembra_login.hasClass('active') === true)
					{
						localStorage.setItem('login_usr', $('#user').val());
						localStorage.setItem('login_pwd', $('#senha').val());
					}
					else
					{
						localStorage.removeItem('login_usr');
						localStorage.removeItem('login_pwd');
					}
					// Evento login
					$(window).trigger('appb_login');
					// Push troca página pelo JS
					PUSH({url: 'menu-principal.html', transition: 'slide-in'});
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

	user_i.val(localStorage.getItem('login_usr') || '');
	senha_i.val(localStorage.getItem('login_pwd') || '');

	if(user_i.val().length > 0 && senha_i.val().length > 0 && window.navFromBack !== true)
	{
		// Faz login automático
		$('#loginBtn').click();
	}

	window.navFromBack = false;

	window.custom_back_key = function()
	{
		navigator.app.exitApp();
		return false;
	};

	window.INTERVAL_CLEANUP = function()
	{
		window.custom_back_key = function(){};
	}
});