$(document).ready(function()
{
	var user_i = $('#user');
	var senha_i = $('#senha');
	var lembra_login = $('#lembrarLogin');

	$('#cadastrarBtn').on('click', function(event)
	{
		toggleMask();
		$.ajax(
		{
			url: basePepUrl + "cadastro.php",
			data:
			{
				email : $('#email').val(),
				senha : $('#senha').val(),
				nome : $('#nome').val()
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

	$('#loginBtn').on('click', function(event)
	{
		toggleMask();
		$.ajax(
		{
			url: basePepUrl + "login.php",
			data:
			{
				user : $('#user').val(),
				senha : $('#senha').val()
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				if(data.result === true)
				{
					if($('#lembrarLogin').hasClass('active') === true)
					{
						localStorage.setItem('login_usr', $('#user').val());
						localStorage.setItem('login_pwd', $('#senha').val());
					}
					else
					{
						localStorage.removeItem('login_usr');
						localStorage.removeItem('login_pwd');
					}
					window.location.href = 'menu-principal.html';
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

	user_i.val(localStorage.getItem('login_usr'));
	senha_i.val(localStorage.getItem('login_pwd'));

	if(user_i.val() && senha_i.val())
	{
		// Faz login automático
		$('#loginBtn').click();
	}
});