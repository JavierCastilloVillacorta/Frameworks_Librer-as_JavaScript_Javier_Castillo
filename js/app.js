
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


function llenarDulces(){
  var dulceFila = 7;
  var dulceColumna = $('[class^="col-"]');
  dulceColumna.each(function(){

  for (var i = 1; i < dulceFila; i++) {

  }


  });


}


$(document).ready(function() {
  //cambioColorTitulo(".main-titulo"); // Funcion  ara cabio de color
  llenarDulces();
});
