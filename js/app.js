
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

function dulcesArray(tipo, index){

}

function eliminaDulces(){
  eliminaColumna();
  eliminaFila();
}

function eliminaColumna(){
  for (var i = 1; i < 8 ; i++) {
    var contador = 0;
    var posicionDulce = [];
    var nuevaPosicionDulce = [];
    var dulceColumna = $("[class^='col-']");
    var dulceComparar = dulceColumna[0];
    for (var i = 0; i < dulceColumna.length; i++) {

      var seleccion = "form div:nth-of-type("+i+") input"


    }


  }

}

function eliminaFila(){

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
      var direccionDrag = $(ui.draggable).attr('src');
    	var direccionDrop = $(this).attr('src');
    	$(ui.draggable).attr('src', direccionDrop);
    	$(this).attr('src', direccionDrag);

      setTimeout(function(){
        alert("sss");
      },1000)

    }
  });
}




function llenarDulces(){
  var dulceFila = 8;
  var dulceColumna = $("[class^='col-']");
  dulceColumna.each(function(){
  for (var i = 1; i < dulceFila; i++) {
    var dulceAleatorio = getRandomInt(1,5);
    var dulceimg = "<img src='image/"+dulceAleatorio+".png' class='elemento' style='top:200px'></img>";
    $(this).append(dulceimg);
  }
//  $(".elemento").show("bounce",1000);
  $(".elemento").animate({
    top: "-=200px"
  },100, function(){
    $(this).animate({
      top: "0px"
    },100)}
  );

  });
  moverDulce();
}

// generacion de dulces aleatorios
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


$(document).ready(function() {
  //cambioColorTitulo(".main-titulo"); // Funcion  ara cabio de color
  dulcesArray("col" , 1)
  // boton de inicio del juego

  $(".btn-reinicio").click(function(){
    if ($(this).text() === "Reiniciar") {
      location.reload(true);
    }
    llenarDulces();
    eliminaDulces()
    $(this).text("Reiniciar");

  });

});
