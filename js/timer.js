
function dulceTiempo(){
    control = setInterval(cronometro,10);
}

var centesimas = 99;
var segundos = 59;
var minutos = 1;
var horas = 0;
var contador = 0;
var control;



function inicio(){
  control = setInterval(cronometro,10);
}

function para(){
  clearInterval(control);
  finJuego();
}

function reinicio(){
  clearInterval(control);
  centesimas = 99;
  segundos = 59;
  minutos = 1;
  horas = 0;
  contador = 0;
  $('#timer').text("02:00");
}


function cronometro () {

	if (centesimas < 100) {
		centesimas--;
		if (centesimas < 10) { centesimas = "0"+centesimas }
    reloj = "0"+minutos+":"+segundos;
    $('#timer').text(reloj);

	}
	if (centesimas == 0) {
		centesimas = 99;
	}
	if (centesimas == 99) {
		segundos--;
		if (segundos < 10) { segundos = "0"+segundos }
    reloj = "0"+minutos+":"+segundos;
		$('#timer').text(reloj);
	}
	if (segundos == 0) {
		segundos = 59;
    contador++;
	}
	if ( (centesimas == 99)&&(segundos == 59) ) {
		minutos--;
    reloj = "0"+minutos+":"+segundos;
		$('#timer').text(reloj);
	}

  if (contador == 2) {
    para();
  }

}
