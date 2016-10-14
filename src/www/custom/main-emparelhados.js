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
           if(obj.aceito == 0){
             $('#lista').append("<li class='table-view-cell' data-id='"+ obj.id +"'>"+
                      "<span class='email'>" + obj.email + "</span>" +
                      "<div>" +
                        "<button class='btn btn-positive'>Aceitar</button>" +
                        "<button class='btn btn-negative'>Recusar</button>" +
                      "</div>" +
                    "</li>");
           }else{
             $('#lista').append(Constr_Li_Aceito(obj.id,obj.email));
           }
        });
      }
      else{

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

function Constr_Li_Aceito(id, email)
{
  var str = "<li class='table-view-cell' data-id='"+ id +"'>"+
           "<span class='email'>" + email + "</span>" +
           "<div>" +
             "<div class='toggle active toggleHabilitado'>" +
 						      "<div class='toggle-handle'></div>" +
 						"</div>"+
           "</div>" +
         "</li>";
  return str;
}

$(document).ready(function()
{
  $('#lista').on('click','.btn-positive',function(event){
      aceitaRecusa($(this).closest('li'), true);
  });
  $('#lista').on('click','.btn-negative',function(event)
  {
      aceitaRecusa($(this).closest('li'), false);
  });

  function aceitaRecusa(li, resp)
  {
    var id = li.data('id');
    var email = li.find('.email').text();
    $.ajax(
    {
      url: basePepUrl + "resp_pareamento.php",
      data:
      {
        id: id,
        resp: resp
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
