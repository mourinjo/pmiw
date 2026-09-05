//sonic
let SonicQuieto = [];
let SonicCaminar = [];

//enemigo
let framesEnemigoCaminar = [];
let framesEnemigoQuieto = [];

// variables
let estadoActual = "ENTRADA"; 
let posX_sonic = -50;       
let posX_enemigo = -150;   
let tiempoEnojo = 0;        
let imagenFondo;

// logo
let imagenLogo;
let posY_logo = -200;

function preload() {
  imagenFondo = loadImage("fondo.png");
  imagenLogo = loadImage("logo.png"); 
  

  for (let a = 0; a < 1; a++) {
    let imagen = loadImage("quieto" + a + ".png");
    SonicQuieto.push(imagen);
  }
  

  for (let a = 0; a < 6; a++) {
    let imagen = loadImage("caminar" + a + ".png");
    SonicCaminar.push(imagen);
  }


  for (let a = 0; a < 1; a++) {
    let imagen = loadImage("caminarenemigo" + a + ".png");
    framesEnemigoCaminar.push(imagen);
  }
  

  for (let a = 0; a < 4; a++) {
    let imagen = loadImage("quietoenemigo" + a + ".png");
    framesEnemigoQuieto.push(imagen);
  }
}

function setup() {
  createCanvas(800, 600);
  noSmooth(); 
}

function draw() {
  dibujarFoto(imagenFondo, 0, 0, 800, 600);
  
  if (estadoActual === "ENTRADA") {
    accion_entrada();
  } else if (estadoActual === "APARICION") {
    accion_aparicion();
  } else if (estadoActual === "PAUSA") {
    accion_pausa();
  } else if (estadoActual === "ESCAPE") {
    accion_huida();
  } else if (estadoActual === "FIN") {
    accion_fin(); 
  }
}

//1
function accion_entrada() {
  let frameSonic = elegirFrame(SonicCaminar, 6);
  dibujarFoto(frameSonic, posX_sonic, 350, 100, 100);
  
  posX_sonic += 3; 
  
  if (posX_sonic >= 400) {
    estadoActual = "APARICION"; 
  }
}

//2
function accion_aparicion() {
  let frameSonic = elegirFrame(SonicQuieto, 10);
  dibujarFoto(frameSonic, posX_sonic, 350, 100, 100);
  
  let frameEnemigo = elegirFrame(framesEnemigoCaminar, 15);
  dibujarFoto(frameEnemigo, posX_enemigo, 230, 120, 120); 
  
  posX_enemigo += 3; 
  
  if (posX_enemigo >= 20) {
    estadoActual = "PAUSA"; 
    tiempoEnojo = frameCount; 
  }
}

// 3
function accion_pausa() {
  let frameSonic = elegirFrame(SonicQuieto, 10);
  dibujarFoto(frameSonic, posX_sonic, 350, 100, 100);
  
  let tiempoPasado = frameCount - tiempoEnojo;
  
  let indiceEnemigo = floor(tiempoPasado / 10);
  if (indiceEnemigo > 3) {
    indiceEnemigo = 3; 
  }
  
  let frameEnemigo = framesEnemigoQuieto[indiceEnemigo];
  dibujarFoto(frameEnemigo, posX_enemigo, 230, 120, 120); 
  
  if (tiempoPasado >= 100) {
    estadoActual = "ESCAPE";
  }
}

//4
function accion_huida() {
  let frameSonic = elegirFrame(SonicCaminar, 6);
  dibujarFoto(frameSonic, posX_sonic, 350, 100, 100);
  
  let frameEnemigo = elegirFrame(framesEnemigoCaminar, 15);
  dibujarFoto(frameEnemigo, posX_enemigo, 230, 120, 120);
  
  posX_sonic += 3;     
  posX_enemigo += 3;  
  
  if (posX_enemigo > 800) {
    estadoActual = "FIN";
  }
}

//5
function accion_fin() {
  dibujarFoto(imagenLogo, 250, posY_logo, 300, 150);
  
  if (posY_logo < 200) {
    posY_logo += 5;
  }
}


function elegirFrame(frames, velocidadAnimacion) {
  let indice = floor(frameCount / velocidadAnimacion) % frames.length;
  return frames[indice];
}

function dibujarFoto(img, x, y, ancho, alto) {
  image(img, x, y, ancho, alto);
}



function keyPressed() {
  if (keyCode === 32) { 
    posX_sonic = -50; 
    posX_enemigo = -150;
    posY_logo = -200;
    estadoActual = "ENTRADA"; 
  }
}
