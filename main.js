// patron del juego
var patron = [];
// patron del jugador
var sp = [];
var nivel = 1;

const botones = ["rojo", "azul", "amarillo", "verde"];

var audios = [
  new Audio("0.wav"),
  new Audio("1.wav"),
  new Audio("2.wav"),
  new Audio("3.wav"),
  new Audio("failsound.mp3")
];

// funcion para que los botones sean activables en el turno
function activarBotones() {
  botones.forEach((valor, index) => {
    document.querySelector("." + botones[index]).onclick = function() {
      clickBoton(index);
    };
  });
}

// funcion para que los botones no sean activables fuera del turno
function desactivarBotones() {
  botones.forEach((valor, index) => {
    document.querySelector("." + botones[index]).onclick = function() {};
  });
}

// funcion para iniciar/reiniciar el juego
function iniciarJuego() {
  // reinicio variables
  patron = [];
  sp = [];
  nivel = 1;

  //   agrego el primer valor del patron
  var numeroNuevo = Math.floor(Math.random() * 4);
  patron.push(numeroNuevo);
  console.log(patron);

  //   cambio los valores del texto a los del juego ya iniciado
  document.querySelector("#nivel").innerHTML = "Nivel:" + nivel;
  document.querySelector(".header button").innerHTML = "Reiniciar juego";

  setTimeout(function() {
    // enciendo primer botón
    document.querySelector(".mensajes").innerHTML = "Sigue el patron";
    audios[numeroNuevo].play();
    document.querySelector("." + botones[numeroNuevo]).classList.add("activo");

    // espero un segundo y apago el botón, activo los botónes para que el jugador pueda usarlos.
    setTimeout(function() {
      document
        .querySelector("." + botones[numeroNuevo])
        .classList.remove("activo");
      activarBotones();
    }, 1000);
  }, 1000);
}

// funcion al clickear botones durante tu turno
function clickBoton(id) {
  // agrego el botón a la secuencia del jugador y pongo el sonido y la animacion
  audios[id].play();
  sp.push(parseInt(id));
  console.log(sp);

  document.querySelector(".mensajes").innerHTML = "Sigue el patron";
  document.querySelector("." + botones[id]).classList.add("activo");
  setTimeout(function() {
    document.querySelector("." + botones[id]).classList.remove("activo");
  }, 1000);

  // si el jugador se equivoca termino el juego y reinicio las variables
  if (comparar()) {
    patron = [];
    sp = [];
    nivel = 1;

    document.querySelector(".mensajes").innerHTML =
      "Has fallado, vuelve a intentarlo";
    desactivarBotones();
    audios[4].play();
  } else {
    // si alcancé el final del patrón sin errores avanzo al siguiente nivel
    if (patron.length == sp.length) {
      document.querySelector(".mensajes").innerHTML =
        "Has avanzado al siguiente nivel";
      desactivarBotones();

      setTimeout(function() {
        siguienteNivel();
      }, 2000);
    }
  }
}

// comparar el patrón del jugador con el patrón del juego
function comparar() {
  var error = false;

  // si el patrón del jugador es distinto al del juego doy un error
  sp.forEach((elemento, index) => {
    if (patron[index] != sp[index]) {
      error = true;
    }
  });

  return error;
}

// siguiente nivel
function siguienteNivel() {
  //   reinicio el patrón del jugador y subo el nivel
  sp = [];
  nivel = nivel + 1;
  document.getElementById("nivel").innerHTML = "Nivel:" + nivel;
  document.querySelector(".mensajes").innerHTML = "Sigue el patron";

  // agrego un valor nuevo al patrón del juego
  var numeroNuevo = Math.floor(Math.random() * 4);
  patron.push(numeroNuevo);
  console.log(patron);

  // desactivo los botones hasta que termina el patrón
  desactivarBotones();

  //   hago la animación y sonidos de la secuencia nueva
  for (let i = 0; i < patron.length; i++) {
    setTimeout(function() {
      audios[patron[i]].play();
      document.querySelector("." + botones[patron[i]]).classList.add("activo");
      setTimeout(function() {
        document
          .querySelector("." + botones[patron[i]])
          .classList.remove("activo");
      }, 900);
    }, 1200 * i + 1);
  }

  //   una vez terminada la animación activo los botones para que el jugador pueda interactuar
  setTimeout(function() {
    activarBotones();
  }, 1200 * patron.length);
}
