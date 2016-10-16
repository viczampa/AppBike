$.ajax(
	{
		url: basePepUrl + "lista_pareamentos.php",
		success: function OnAjaxSuccess(data, textStatus, jqXHR)
		{
			console.log(typeof data, textStatus, jqXHR);
			if(data.result === true)
			{
				$.each(data.data,function(index,obj)
				{
					if(obj.rastreado == false)
					{
						if(obj.aceito == false)
						{
							$('#listaRastreadores').append("<li class='table-view-cell' data-id='"+ obj.id +"'>"+
																"<span class='email'>" + obj.email + "</span>" +
																"<div>" +
																	"<button class='btn btn-positive emp-aceitar'>Aceitar</button>" +
																	"<button class='btn btn-negative emp-recusar'>Recusar</button>" +
																"</div>" +
															"</li>");
						}
						else
						{
							$('#listaRastreados').append(Constr_Li_Aceito(obj.id, obj.email, false));
						}
					}
					else
					{
						$('#listaRastreadores').append(Constr_Li_Aceito(obj.id, obj.email, true));
					}
				});
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

function Constr_Li_Aceito(id, email, rastreado)
{
	var str = 	"<li class='table-view-cell' data-id='"+ id +"'>"+
					"<span class='email'>" + email + "</span>" +
					"<div>" +
						"<button class='btn btn-negative emp-remover'>Remover</button>" +
						(
							(rastreado === false) ?
							("<button class='btn btn-positive emp-rastrear'>Rastrear</button>") :
							("<div class='toggle active toggleHabilitado'>" +
								"<div class='toggle-handle'></div>" +
							"</div>")
						) +
					"</div>" +
				"</li>";
	return str;
}

$(document).ready(function()
{
	$('#listaRastreadores').on('click','.emp-aceitar',function(event)
	{
		aceitaRecusa($(this).closest('li'), true);
	});
	$('#listaRastreadores, #listaRastreados').on('click','.emp-recusar, .emp-remover',function(event)
	{
		aceitaRecusa($(this).closest('li'), false);
	});
	
	$('#listaRastreados').on('click','.emp-rastrear',function(event)
	{
		window.ID_RASTREIO = $(this).closest('li').data('id');
		PUSH({url: 'main-mapas.html', transition: 'slide-out'});
	});

	function aceitaRecusa(li, resp)
	{
		var id = li.data('id');
		var email = li.find('.email').text();
		var had = !!(li.find('.emp-remover').length === 1); // had = remover existente?
		var rastreado = !!(li.closest('#listaRastreados').length === 1); // o alvo é um rastreado?
		$.ajax(
		{
			url: basePepUrl + "resp_pareamento.php",
			data:
			{
				id: id,
				resp: resp,
				had: had, 
				rastreado: rastreado
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				console.log(data, textStatus, jqXHR);
				if(data.result === true)
				{
					alert(data.message);
					if(resp === false)
					{
						li.remove();
					}
					else
					{
						li.replaceWith(Constr_Li_Aceito(id, email));
					}
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
				console.log(jqXHR, textStatus);
			}
		});
	}

});