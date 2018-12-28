"use strict";

function save() {
  if (typeof(Storage) !== "undefined") {
    // Store
    var user = document.getElementById('entrar').elements.namedItem("username").value;
    localStorage.setItem('utilizador', user);
    var pass = document.getElementById('entrar').elements.namedItem("passwd").value;
    localStorage.setItem('password', pass);
  }
  else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}



function load() {
  load_store();
  var user_save = localStorage.getItem("utilizador");
  document.getElementById("utilizador").innerHTML = user_save;
  //document.getElementById('utilizador').innerHTML = user_save;
}

function clear_storage() {
  $('#nada_ao_pedido').empty();
  var carrinho = localStorage.getItem("compras");
  for(var i =0; i < carrinho; i++) {
    localStorage.removeItem("item" + i.toString())
  }
  localStorage.removeItem("compras")
  localStorage.removeItem("total")
  document.getElementById("total_a_pagar").innerHTML = 0
}

function exit() {
  localStorage.removeItem("utilizador")
  localStorage.removeItem("password")
  document.getElementById('entrar').elements.namedItem("username").innerHTML= "";
  document.getElementById('entrar').elements.namedItem("passwd").innerHTML = "";
}

function settings() {
  var user = document.getElementById('settings').elements.namedItem("username").value;
  var pass = document.getElementById('settings').elements.namedItem("pwd").value;
  localStorage.setItem("utilizador", user)
  localStorage.setItem("password", pass)

}



function registo() {
  var user = document.getElementById('registar').elements.namedItem("username").value;
  localStorage.setItem('utilizador', user);
  var pass = document.getElementById('registar').elements.namedItem("pwd").value;
  localStorage.setItem('password', pass);
  document.getElementById("utilizador").innerHTML = localStorage.getItem("utilizador");

  }

function recover_pass() {
  var rec = document.getElementById('recover').elements.namedItem("email").value;
  alert("O email de recuperação da password foi enviado para: " + rec);
}


function menos(id) {

  if (document.getElementById(id).innerHTML <= 1) {
    document.getElementById("button_menos").disabled = true;
  }
  else {
    document.getElementById(id).innerHTML = --document.getElementById(id).innerHTML;
  }
}

function mais(id) {
  document.getElementById(id).innerHTML = ++document.getElementById(id).innerHTML;
  if (document.getElementById(id).innerHTML > 1) {
    document.getElementById("button_menos").disabled = false;
  }
}

var items_carrinho = 0;

function preco_acumulado(preco, id_quantidade, nome_do_artigo) {


  localStorage.setItem("compras", items_carrinho);

  // o id_quantidade é na verdade no html o nome do alimento, para facilitar, onde vamos incrementar
  document.getElementById("nada_adicionado").innerHTML = "";
  //o paragrafo vai ser removido que vai ser adicionado algo ao carrinho

  var contador = parseFloat(document.getElementById('total_a_pagar').innerHTML);
  var quantidade = parseFloat(document.getElementById(id_quantidade).innerHTML);
  var preco_artigo = parseFloat(document.getElementById(preco).innerHTML);
  var total = quantidade * preco_artigo;
  contador += total;

  var node = document.createElement("LI");
  var alimento = document.getElementById(id_quantidade).innerHTML + "x " + document.getElementById(nome_do_artigo).innerHTML + " custa: " + total.toString() + "€";
  //adicionar o alimento ao localStorage
  localStorage.setItem("item" + items_carrinho.toString(), alimento);

  var textnode = document.createTextNode(alimento);
  node.appendChild(textnode);
  document.getElementById('nada_ao_pedido').appendChild(node);
  document.getElementById('total_a_pagar').innerHTML = contador;

  localStorage.setItem("total", contador);

  items_carrinho++;
  //tentar transferir o valor da variavel items_carrinho para a funcao concluir()
  localStorage.setItem("compras", items_carrinho);
}

function load_store() {
  if(localStorage.getItem("compras") === null) {
    document.getElementById('total_a_pagar').innerHTML = 0;

  }
  else {
    document.getElementById("nada_adicionado").innerHTML = " ";
    var carrinho = localStorage.getItem("compras");
    for(var i =0; i < carrinho; i++) {
      var node = document.createElement("LI");
      var texto = localStorage.getItem("item" + i.toString());
      var textnode = document.createTextNode(texto);
      node.appendChild(textnode);
      document.getElementById('nada_ao_pedido').appendChild(node);
    }
    var total = localStorage.getItem("total");
    document.getElementById('total_a_pagar').innerHTML = total;

  }

}

function concluir() {
  if(localStorage.getItem("compras") === null) {
    document.getElementById('total_a_pagar').innerHTML = 0;

  }
  else {
    var carrinho = localStorage.getItem("compras");
    for(var i =0; i < carrinho; i++) {
      var node = document.createElement("LI");
      var texto = localStorage.getItem("item" + i.toString());
      var textnode = document.createTextNode(texto);
      node.appendChild(textnode);
      document.getElementById('lista_final').appendChild(node);
    }

  var total = localStorage.getItem("total");
  document.getElementById('final_a_pagar').innerHTML = total;
  }

}


var luzes = 1;


$(document).ready(function() {
  $('.align').click(function () {
    $('.chamei').show('slow');
      $('.chamei').fadeOut(4000);
  });

  $('#finalButton').click(function () {
    $('.chamei').show('slow');
  });

  $('.chamei_empregado').click(function () {
    $('.chamei').show('slow');
      $('.chamei').fadeOut(4000);
  });

  $('.apagar_acender').click(function () {
    luzes += 1;
    if (luzes % 2 === 0) { /* se o valor das luzes for par, significa que as luzes estao acesas */
      $('.apaguei').show('slow');
        $('.apaguei').fadeOut(4000);
    }
    else {
      $('.acendi').show('slow'); /* se o valor das luzes for impar, significa que as luzes estao apagadas */
        $('.acendi').fadeOut(4000);
    }
  });


  let formEvents = {

    paypal: function() {
      console.log('redirecting');
      window.location.href='paypal.html';
      $('#pagar').hide('fast');
      $('#paypalconcluido').show('slow');
    },
    money: function() {
      $('#pagar').hide('fast')
      $('#chamei').show('slow');

    },
    mastercard: function() {
      $('#pagar').hide('fast')
      $('#chamei').show('slow');
    }
  }

  $('#cash').click(function () {

    alert("Aguarde um instante pelo empregado que irá receber o pagamento.");

  });

  $('#credit').click(function () {

    alert("Aguarde um instante pelo empregado que irá receber o pagamento.");

  });


  $('#removePagar').submit(function() {
    $('#pagar').modal('toggle');
  });

});

function reservar() {

    var data = $("#data").val()
    var hora = $("#hora").val()
    var quantidade = $("#quantidade").val()
    document.getElementById("reserva").innerHTML = "A sua reserva para " + quantidade + " pessoas, ficou marcada para as " + hora + " horas do dia " + data + "."
  }

  function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 1500);  //1200000 e o equivalente a 20 min
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
    concluir();
}
/*filtros*/

$(document).ready(function(){
  $('.category_item').click(function(){
    var category = $(this).attr('id');

    if(category == "tudo"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.filterDiv').show(1);
      },  300);
    }

    else if(category == "carne"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.carne').show(1);
      },  300);
    }

    else if(category == "fast-food"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.fast-food').show(1);
      },  300);
    }

    else if(category == "japonesa"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.japonesa').show(1);
      },  300);
    }

    else if(category == "peixe"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.peixe').show(1);
      },  300);
    }

    else if(category == "tradicional"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.tradicional').show(1);
      },  300);
    }

    else if(category == "massa"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.massa').show(1);
      },  300);
    }

    else if(category == "ovo"){
      $('.filterDiv').show(1);
      setTimeout(function(){
        $('.ovo').hide(1);
      },  300);
    }

    else if(category == "marisco"){
      $('filterDiv').show(1);
      setTimeout(function(){
        $('.marisco').hide(1);
      },  300);
    }


    else if(category == "lactose"){
      $('.filterDiv').show(1)
      setTimeout(function(){
        $('.lactose').hide(1);
      },  300);
    }

    else if(category == "nat"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.nat').show(1);
      },  300);
    }

    else if(category == "alc"){
      $('.filterDiv').hide(1);
      setTimeout(function(){
        $('.alc').show(1);
      },  300);
    }

    else {
      $('filterDiv').hide();
      setTimeout(function(){
        $('.' + category).show(1);
      }, 300);
    }
  });
});
/*filtros*/

function check_pay() {
  var final = document.getElementById("total_a_pagar").innerHTML;
  if (final == 0) {
    alert("Ainda não adicionou nada ao pedido!!!");

  }
  else {
    var result = confirm("Deseja concluir o seu pedido?");
      if (result) {
       window.location.href='espera.html';
     }

  }
}

function questionario() {
  localStorage.setItem("questionario", "sim");
}

function check_quest() {

  var check = localStorage.getItem("questionario");

  if (check == "sim") {
    $("#middle").remove();
  }

}


function pagamento_paypal() {

  alert("Pagamento efectuado com sucesso!!");

}

function check_user() {
  if (localStorage.getItem("utilizador") === null) {

    window.location.href="index.html"
  }
  else {
    window.location.href='menu_2.html'

  }
}


function main() {

}

window.onload = function() {
  main();
}
