
function cambioColorTitulo(elemento){
  $(elemento).animate({
    opacity: '1'
  },{
    step: function(){
      $(this).css('color','#fff');
    },
    queue: true,
  }).delay(500).animate({
    opacity: '1'
  },{
    step: function(){
      $(this).css('color','#E8CA06');
      cambioColorTitulo(".main-titulo");
    },
    queue: true,
  }
  ).delay(500);
}
function dulcesArray(tipo, fila){
  var dulceColumna1 = $('.col-1').children();
  var dulceColumna2 = $('.col-2').children();
  var dulceColumna3 = $('.col-3').children();
  var dulceColumna4 = $('.col-4').children();
  var dulceColumna5 = $('.col-5').children();
  var dulceColumna6 = $('.col-6').children();
  var dulceColumna7 = $('.col-7').children();

  if (tipo == "columna") {
    var dulcesMatris = $([dulceColumna1, dulceColumna2, dulceColumna3, dulceColumna4,
                          dulceColumna5, dulceColumna6, dulceColumna7]);
  }else if (tipo == "fila"){
    var dulcesMatris = $([dulceColumna1.eq(fila), dulceColumna2.eq(fila), dulceColumna3.eq(fila), dulceColumna4.eq(fila),
                          dulceColumna5.eq(fila), dulceColumna6.eq(fila), dulceColumna7.eq(fila)])
  }

  return dulcesMatris;
}

function eliminaDulces(){
  desabilitarmovimiento()
  eliminaColumna();
  eliminaFila();
  if ($('.eliminar').length !== 0) {
     cantidad = $('.eliminar').length;
     dulcesPuntuacion(cantidad);
	   eliminaImgDulces();
	}else{
    habilitarmovimiento();
  }
}

// Eliminacion de columnas
function eliminaColumna(){
  var dulcesMatris = dulcesArray("columna",0);
  for (var i = 0; i<7; i++) {
    var comparaDulce1 = dulcesMatris[i].eq(0).attr('src');
    var posicionEliminar = [];
    var estadoDulce = 0; // 0 no elimina -- 1 elimina
    var dulcesIguales = 0;
    for (var j = 1; j <dulcesMatris.length; j++) {
      var comparaDulce2 = dulcesMatris[i].eq(j).attr('src');
      if (comparaDulce1 == comparaDulce2) {
        if (dulcesIguales == 0) {
          if (estadoDulce == 0) {
            posicionEliminar.push(j-1);
          }
        }
        if (estadoDulce == 0) {
          posicionEliminar.push(j);
        }
        dulcesIguales += 1;
      }else{
        if (posicionEliminar.length >= 3) {
          estadoDulce = 1
        }else{
          posicionEliminar = []
        }
        dulcesIguales = 0;
      }
        var comparaDulce1 = dulcesMatris[i].eq(j).attr('src');
    }
    // validamos Arrays creadoss
    if (posicionEliminar.length < 3) {
      posicionEliminar = [];
    }else{
      for (var e = 0; e < posicionEliminar.length; e++) {
        dulcesMatris[i].eq(posicionEliminar[e]).addClass('eliminar');
      }
    }
  }
}
// eliminacion de filas
function eliminaFila(){
  for (var i = 0; i<7; i++) {
    var dulcesMatris = dulcesArray("fila", i);
    var comparaDulce1 = dulcesMatris[0].attr('src');
    var posicionEliminar = [];
    var estadoDulce = 0; // 0 no elimina -- 1 elimina
    var dulcesIguales = 0;
    for (var j = 1; j < dulcesMatris.length; j++) {
      var comparaDulce2 = dulcesMatris[j].attr('src');
      if(comparaDulce1 == comparaDulce2){
        if (dulcesIguales == 0) {
          if (estadoDulce == 0) {
            posicionEliminar.push(j-1);
          }
        }
        if (estadoDulce == 0) {
          posicionEliminar.push(j);
        }
        dulcesIguales += 1;
      }else{
        if (posicionEliminar.length >= 3) {
          estadoDulce = 1
        }else{
          posicionEliminar = []
        }
        dulcesIguales = 0;
      }
      var comparaDulce1 = dulcesMatris[j].attr('src');
    }
    // validamos Arrays creados
    if (posicionEliminar.length < 3) {
      posicionEliminar = []
    }else{
      for (var e = 0; e < posicionEliminar.length; e++) {
        dulcesMatris[posicionEliminar[e]].addClass('eliminar');
      }
    }
  }
}

function eliminaImgDulces(){
  $(".eliminar").toggle("explode",1000)
  setTimeout(function () {
    $('.eliminar').remove();
    llenarDulces();
	}, 500);
}

function desabilitarmovimiento(){
	$('img').draggable('disable');
	$('img').droppable('disable');
}
function habilitarmovimiento(){
	$('img').draggable('enable');
	$('img').droppable('enable');
}


function moverDulce(){

  $("img").draggable({
    containment: ".panel-tablero",
    grid:[100,100],
    revert: true,
    zIndex:1,
    drag: function(event, ui){
      ui.position.left = Math.min(100, ui.position.left );
      ui.position.top = Math.min(100, ui.position.top );
      ui.position.right = Math.min( 100, ui.position.right );
      ui.position.bottom = Math.min( 100, ui.position.bottom );
    }
  });
  $("img").droppable({
    drop: function(event, ui){
      var self = this;
      var direccionDrag = $(ui.draggable).attr('src');
    	var direccionDrop = $(this).attr('src');
    	$(ui.draggable).attr('src', direccionDrop);
    	$(this).attr('src', direccionDrag);
      setTimeout(function(){
        llenarDulces();
        if ($('.eliminar').length === 0) {
          $(ui.draggable).attr('src', direccionDrag);
        	$(self).attr('src', direccionDrop);
    		}
        cantidadMovimientos();
      },600)
    }
  });
}

function dulcesPuntuacion(cantidad){
  puntos = parseInt($('#score-text').text());

  switch (cantidad) {
    case 3:
      puntos +=30;
      break;
    case 4:
      puntos +=40;
      break;
    case 5:
      puntos +=50;
      break;
    case 6:
      puntos +=60;
      break;
    case 7:
      puntos +=70;
      break;
    case 8:
      puntos +=80;
      break;
    default:
      puntos +=100;
      break;
  }
  $('#score-text').text(puntos);

}

function cantidadMovimientos(){
  var movimiento = parseInt($('#movimientos-text').text());
  movimiento += 1;
  $('#movimientos-text').text(movimiento);
}

function llenarDulces(){
  var dulceFila = 8;
  var dulceColumna = $("[class^='col-']");
  dulceColumna.each(function(){
    var cantidadcolumna = $(this).children().length;
    var agregarDulces = dulceFila - cantidadcolumna;
    for (var i = 1; i < agregarDulces; i++) {
      var dulceAleatorio = getRandomInt(1,5);
      if (agregarDulces == 8) {
        var dulceimg = "<img src='image/"+dulceAleatorio+".png' class='elemento'></img>";
          $(this).append(dulceimg);
      }else{
        var dulceimg = "<img src='image/"+dulceAleatorio+".png' class='elemento'></img>";
        $(this).find('img:eq(0)').before(dulceimg);
      }
    }
  });
  moverDulce();
  eliminaDulces();

}

// generacion de dulces aleatorios
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function finJuego() {
  $('div.panel-tablero, div.time').hide('explode',1000);
  $('h1.main-titulo').text('Gracias por jugar!');
  $('div.score, div.moves, div.panel-score').width('100%');

}


$(document).ready(function() {
  cambioColorTitulo(".main-titulo");
  $(".btn-reinicio").click(function(){
    if ($(this).text() === "Reiniciar") {
      location.reload(true);
    }
    dulceTiempo();
    llenarDulces();
    $(this).text("Reiniciar");

  });
});
