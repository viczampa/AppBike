// Limpa as listas
$('#listaRastreadores, #listaRastreados').children().remove();

$.ajax(
	{
		url: basePepUrl + "lista_pareamentos.php",
		success: function OnAjaxSuccess(data, textStatus, jqXHR)
		{
			// console.log(typeof data, textStatus, jqXHR);
			if(data.result === true)
			{
				$.each(data.data,function(index,obj)
				{
					if(obj.rastreado == false)
					{
						if(obj.aceito == false)
						{
							$('#listaRastreadores').append(
							"<li class='table-view-cell dyna' data-id='"+ obj.id +"'>"+
								"<span class='email'>" + obj.email + "</span>" +
								"<div class='dyna'>" +
									"<button class='btn btn-positive emp-aceitar'>Aceitar</button>" +
									"<button class='btn btn-negative emp-recusar'>Recusar</button>" +
								"</div>" +
							"</li>");
						}
						else
						{
							$('#listaRastreadores').append(Constr_Li_Aceito(obj.id, obj.email, obj.rastreado, obj.habilitado));
						}
					}
					else
					{
						if(obj.aceito == false)
						{
							$('#listaRastreados').append(
							"<li class='table-view-cell dyna' data-id='"+ obj.id +"'>"+
								"<span class='email'>" + obj.email + "</span>" +
								"<div>" +
									"<span class='amz-pendente'>Pedido Pendente</span>" +
								"</div>" +
							"</li>");
						}
						else
						{
							$('#listaRastreados').append(Constr_Li_Aceito(obj.id, obj.email, obj.rastreado, obj.habilitado));
						}
					}
				});
			}
			else
			{
				console.log(data, textStatus, jqXHR);
				alert(data.message);
			}
		},
		error: function OnAjaxError(jqXHR, textStatus, errorThrown)
		{
			alert('Erro ao carregar lista de pareados!');
			console.log(jqXHR, textStatus, errorThrown);
		},
		complete: function OnAjaxComplete(jqXHR, textStatus)
		{
			// console.log(jqXHR, textStatus);
		}
});

function Constr_Li_Aceito(id, email, rastreado, habilitado)
{
	var str = 	"<li class='table-view-cell dyna' data-id='"+ id +"'>"+
					"<span class='email'>" + email + "</span>" +
					"<div class='dyna'>" +
						"<button class='btn btn-negative emp-remover'>Remover</button>" +
						(
							(rastreado == true) ?
							("<button class='btn btn-positive emp-rastrear'>Rastrear</button>") :
							("<div class='toggle" + ((habilitado == true) ? " active" : "") + " toggle-rastreamento'>" +
								"<div class='toggle-handle'></div>" +
							"</div>")
						) +
					"</div>" +
				"</li>";
	return str;
}

$(document).ready(function()
{
	$('#listaRastreadores').on('toggle', '.toggle-rastreamento', function(event)
	{
		var detail = event.originalEvent.detail;
		var id = $(event.target).closest('li').data('id');
		$.ajax(
		{
			url: basePepUrl + "toggle_pareamento.php",
			data:
			{
				id: id,
				state: detail.isActive
			},
			success: function OnAjaxSuccess(data, textStatus, jqXHR)
			{
				// console.log(data, textStatus, jqXHR);
				if(data.result === true)
				{
					alert(data.message);
				}
				else
				{
					alert(data.message);
					TogglarBotaoRatchet(event.target);
				}
			},
			error: function OnAjaxError(jqXHR, textStatus, errorThrown)
			{
				alert('Erro!');
				console.log(jqXHR, textStatus, errorThrown);
				TogglarBotaoRatchet(event.target);
			},
			complete: function OnAjaxComplete(jqXHR, textStatus)
			{
				// console.log(jqXHR, textStatus);
			}
		});
	});
	
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
		PUSHMASK({url: 'main-mapas.html', transition: 'slide-out'});
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
				// console.log(data, textStatus, jqXHR);
				if(data.result === true)
				{
					// alert(data.message);
					if(resp === false)
					{
						li.prettyDel();
					}
					else
					{
						li.replaceWith(Constr_Li_Aceito(id, email, rastreado , false));
					}
				}
				else
				{
					alert(data.message);
				}
			},
			error: function OnAjaxError(jqXHR, textStatus, errorThrown)
			{
				alert('Erro!');
				console.log(jqXHR, textStatus, errorThrown);
			},
			complete: function OnAjaxComplete(jqXHR, textStatus)
			{
				// console.log(jqXHR, textStatus);
			}
		});
	}
});