//video youtube https://youtu.be/Tn4T2GSzIYM
//variables globales
let juego;
let imagenesJugador = [];
let imgCorazon;
let imgOrbeClaro;
let imgOrbeOscuro;
let imgBarra;
let imgFondoPerdiste;
let imgFondoGana;
let imgCreditos;

let sndJuego;
let sndAvanzar;
let sndVictoria;
let sndDerrota;
let sndCreditos;
let sndRecolectar;
let sndDano;

function preload() {
  imgCorazon = loadImage(IMG.corazon);
  imgOrbeClaro = loadImage(IMG.orbebuena);
  imgOrbeOscuro = loadImage(IMG.orbemala);
  imgBarra = loadImage(IMG.barraenergia);
  imgFondoPerdiste = loadImage(IMG.fondoperdiste);
  imgFondoGana = loadImage(IMG.fondogana);
  imgCreditos = loadImage(IMG.creditos);

  for (let i = 0; i < 4; i++) {
    imagenesJugador[i] = [];
  }

  imagenesJugador[0][0] = loadImage(IMG.protagonistaarriba1);
  imagenesJugador[0][1] = loadImage(IMG.protagonistaarriba2);
  imagenesJugador[0][2] = loadImage(IMG.protagonistaarriba3);

  imagenesJugador[1][0] = loadImage(IMG.protagonistaabajo1);
  imagenesJugador[1][1] = loadImage(IMG.protagonistaabajo2);
  imagenesJugador[1][2] = loadImage(IMG.protagonistaabajo3);

  imagenesJugador[2][0] = loadImage(IMG.protagonistaizquierda1);
  imagenesJugador[2][1] = loadImage(IMG.protagonistaizquierda2);
  imagenesJugador[2][2] = loadImage(IMG.protagonistaizquierda3);

  imagenesJugador[3][0] = loadImage(IMG.protagonistaderecha1);
  imagenesJugador[3][1] = loadImage(IMG.protagonistaderecha2);
  imagenesJugador[3][2] = loadImage(IMG.protagonistaderecha3);
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();

  //usamos new Audio() ya que p5.sound no funciona con archivos locales
  sndJuego = new Audio(SND.sonidojuego);
  sndAvanzar = new Audio(SND.sonidoavanzar);
  sndVictoria = new Audio(SND.victoria);
  sndDerrota = new Audio(SND.derrota);
  sndCreditos = new Audio(SND.creditos);
  sndRecolectar = new Audio(SND.recoleccionorbeazul);
  sndDano = new Audio(SND.dao);

  sndJuego.volume = 0.1;
  sndAvanzar.volume = 0.1;
  sndVictoria.volume = 0.1;
  sndDerrota.volume = 0.1;
  sndCreditos.volume = 0.1;
  sndRecolectar.volume = 0.4;
  sndDano.volume = 0.1;

  sndJuego.loop = true;
  sndCreditos.loop = true;
}

function draw() {
  background(10, 5, 30);
  juego.dibujar();
}

function keyPressed() {
  if (juego.estado === "contexto") {
    sndAvanzar.currentTime = 0;
    sndAvanzar.play();
    juego.estado = "instrucciones";
  } else if (juego.estado === "instrucciones") {
    sndAvanzar.currentTime = 0;
    sndAvanzar.play();
    juego.iniciar();
    sndJuego.play();
  } else if (juego.estado === "gana" || juego.estado === "pierde") {
    if (millis() - juego.tiempoFinJuego > 2000) {
      if (key === 'r' || key === 'R') {
        sndAvanzar.currentTime = 0;
        sndAvanzar.play();
        juego.reiniciar();
      } else {
        sndCreditos.play();
        juego.estado = "creditos";
      }
    }
  } else if (juego.estado === "creditos") {
    if (key === 'r' || key === 'R') {
      sndCreditos.pause();
      sndCreditos.currentTime = 0;
      sndAvanzar.currentTime = 0;
      sndAvanzar.play();
      juego.reiniciar();
    }
  }
}
