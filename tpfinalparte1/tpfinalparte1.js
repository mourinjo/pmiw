
//Marcial Mouriño
// https://youtu.be/9hve7oock60
// comision 5
let estado = 0;
let imagenes = [];
let botonD1;
let botonD2;
let botonContinuarImg; 
let imagenTitulo;

let cred1;
let cred2;
let cred3;

let tiempoInicioCreditos = 0;
let subEstadoCreditos = 0;

let textos = [
  "", 
  "Vas a visitar a tu vecino, el profesor Zinka, un científico medio loco. Te cuenta que inventó una máquina para viajar al hiperespacio, un lugar donde el tiempo y el espacio funcionan de forma extraña.",
  "Zinka prende la maquina que hace un ruido molesto. El aire se empieza a ver borroso, como cuando hace mucho calor en la ruta. De la nada Zinka da un paso hacia esa cosa borrosa y desaparece. La máquina queda prendida y esa especie de portal empieza a crecer.",
  "El portal ya se está tragando los muebles del laboratorio. Tenés que decidir rápido antes de que la casa entera desaparezca o la máquina se apague y pierdas a Zinka para siempre.",
  "Sentís que caés durante semanas, aunque solo pasaron dos segundos. Los colores suenan y los ruidos se ven. Finalmente, llegás a un lugar completamente blanco y brillante.",
  "Unos seres de luz te hablan por telepatía y te advierten que no podés sobrevivir mucho tiempo ahí. Te ofrecen dos formas de escapar.",
  "Intentás volver a tu realidad con tanta fuerza que rompés la cuarta pared. El cielo se convierte en letras gigantes y caés dentro de una computadora, sobre un documento abierto que contiene tu propia historia.",
  "Frente a la pantalla aparece Edward Packard, el autor de este cuento. Te pide perdón por meterte en este quilombo de decisiones y te explica que, hagas lo que hagas, siempre terminás dentro de su historia. Después, cierra el documento y te borra de la existencia. FIN.",
  "Llegás a una Tierra alternativa que parece normal, pero descubrís que el agua cae para arriba y tu perro tiene tres ojos. Abrís un poco la puerta y ves a Zinka, junto a una máquina idéntica a la que había desaparecido en tu realidad.",
  "Zafaste de morir en el hiperespacio, pero quedaste varado en esta dimensión rarísima para siempre. Ahora vas a tener que acostumbrarte a vivir el resto de tu vida en un mundo donde absolutamente nada tiene sentido. FIN",
  "Desenchufás la máquina y el portal desaparece. Sin embargo, tu reflejo empieza a moverse un segundo después que vos, como si la realidad tuviera delay.",
  "Encontrás una nota que dice: «No salgas de la habitacion. La paradoja te va a atrapar». En ese momento, escuchás a Zinka pidiendo ayuda. No sabés quién escribió la nota ni cómo llegó hasta ahí.",
  "Salís de la habitacion, pero Zinka no está. En su lugar, el cielo empieza a llenarse de letras gigantes y el suelo desaparece abajo de tus pies. Sentís que la realidad se está convirtiendo en una historia escrita.",
  "Te quedás encerrado, pero la realidad ya está rota desde que desenchufaste la máquina. Todo se pixela y te convertís en un punto matemático que queda flotando en el vacío para siempre. FIN."
];

function preload() {
  imagenes[0] = loadImage('data/p0.jpg');
  imagenes[1] = loadImage('data/p1.jpg');
  imagenes[2] = loadImage('data/p2.jpg');
  imagenes[3] = loadImage('data/p3.jpg');
  imagenes[4] = loadImage('data/p4.jpg');
  imagenes[5] = loadImage('data/p5.jpg');
  imagenes[6] = loadImage('data/p6.jpg');
  imagenes[7] = loadImage('data/p7.jpg');
  imagenes[8] = loadImage('data/p8.jpg');
  imagenes[9] = loadImage('data/p9.jpg');
  imagenes[10] = loadImage('data/p10.jpg');
  imagenes[11] = loadImage('data/p11.jpg');
  imagenes[12] = loadImage('data/p12.jpg');
  imagenes[13] = loadImage('data/p13.jpg');

  cred1 = loadImage('data/credito1.png');
  cred2 = loadImage('data/credito2.png');
  cred3 = loadImage('data/credito3.png');

  botonD1 = loadImage('data/botonD1.png');
  botonD2 = loadImage('data/botonD2.png');
  botonContinuarImg = loadImage('data/botonInicialContinuar.png');
  
  imagenTitulo = loadImage('data/titulo.png');
}

function setup() {
  createCanvas(800, 450); 
}

function draw() {
  background(30);

  if (estado === 0) {
    if (imagenes[0]) {
      image(imagenes[0], 0, 0, 800, 450);
    } else {
      fill(20, 20, 40);
      rect(0, 0, 800, 450);
    }
    
    if (imagenTitulo) {
      image(imagenTitulo, 200, 90, 400, 160);
    }
    botonSimple("INICIAR JUEGO", 300, 330);
  } 
  else if (estado === 14) {
    let tiempoTranscurrido = millis() - tiempoInicioCreditos;
    
    if (tiempoTranscurrido < 3000) {
      subEstadoCreditos = 1;
    } else if (tiempoTranscurrido < 6000) {
      subEstadoCreditos = 2;
    } else {
      subEstadoCreditos = 3;
    }

    if (subEstadoCreditos === 1 && cred1) {
      image(cred1, 0, 0, 800, 450);
    } else if (subEstadoCreditos === 2 && cred2) {
      image(cred2, 0, 0, 800, 450);
    } else if (subEstadoCreditos === 3 && cred3) {
      image(cred3, 0, 0, 800, 450);
      botonSimple("REINICIAR", 300, 370);
    }
  }
  else if (estado === 1 || estado === 2 || estado === 4 || estado === 6 || estado === 7 || estado === 9 || estado === 10 || estado === 12 || estado === 13) {
    pantallaContinuar(); 
  } 
  else if (estado === 3) {
    pantallaDecision("Tirarse al portal", "Desenchufar máquina");
  } 
  else if (estado === 5) {
    pantallaDecision("Usar energía", "Universo paralelo");
  }
  else if (estado === 8) {
    pantallaDecision("Aceptar encierro", "Buscar a Zinka");
  }
  else if (estado === 11) {
    pantallaDecision("Salir a ayudar", "Quedarse encerrado");
  }
}

function pantallaContinuar() {
  fondoTexto();
  botonSimple("CONTINUAR", 300, 350);
}

function botonSimple(textoBoton, posX, posY) {
  let tamX = 200; 
  let tamY = 45;
  
  push();
  if (overMouse(posX, posY, tamX, tamY)) tint(220, 240, 255); 
  else noTint();
  
  if (botonContinuarImg) image(botonContinuarImg, posX, posY, tamX, tamY);
  else { fill(50, 120, 50); rect(posX, posY, tamX, tamY, 8); }
  noTint();
  
  fill(255); textAlign(CENTER, CENTER); textSize(16);
  text(textoBoton, posX + tamX / 2, posY + tamY / 2);
  pop();
}

function pantallaDecision(txtIzq, txtDer) {
  fondoTexto();
  boton(100, 340, 280, 60, txtIzq, botonD1, botonD2);
  boton(420, 340, 280, 60, txtDer, botonD1, botonD2);
}

function fondoTexto() {
  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, 800, 450);
  } else {
    fill(40); rect(0, 0, 800, 450); 
    fill(255); textSize(20); textAlign(CENTER, CENTER);
    text("(Imagen p" + estado + ".jpg pendiente de carga)", width / 2, 225);
  }
  
  fill(0, 0, 0, 210);
  rect(50, 30, 700, 130, 10);
  
  push();
  fill(255); textSize(16); textAlign(LEFT, TOP);
  text(textos[estado], 75, 45, 650, 100);
  pop();
}

function boton(posX, posY, tamX, tamY, texto, bot1, bot2) {
  push();
  if (overMouse(posX, posY, tamX, tamY)) {
    image(bot1, posX, posY, tamX, tamY);
    fill(255);
  } else {
    image(bot2, posX, posY, tamX, tamY);
    fill(230);
  }
  textSize(14); textAlign(CENTER, CENTER);
  text(texto, posX + tamX / 2, posY + tamY / 2);
  pop();
}

function overMouse(posX, posY, tamX, tamY) {
  return mouseX > posX && mouseX < posX + tamX && mouseY > posY && mouseY < posY + tamY;
}

function mousePressed() {
  if (estado === 0) {
    if (overMouse(300, 330, 200, 45)) { 
      estado = 1; 
    }
  } 
  else if (estado === 14) {
    if (subEstadoCreditos === 3 && overMouse(300, 370, 200, 45)) { 
      estado = 0; 
    }
  }
  else if (estado === 1) { 
    if (overMouse(300, 350, 200, 45)) { estado = 2; }
  } 
  else if (estado === 2) { 
    if (overMouse(300, 350, 200, 45)) { estado = 3; }
  } 
  else if (estado === 3) { 
    if (overMouse(100, 340, 280, 60)) { estado = 4; }  
    if (overMouse(420, 340, 280, 60)) { estado = 10; }  
  }
  else if (estado === 4) { 
    if (overMouse(300, 350, 200, 45)) { estado = 5; }
  }
  else if (estado === 5) {
    if (overMouse(100, 340, 280, 60)) { estado = 6; }
    if (overMouse(420, 340, 280, 60)) { estado = 8; }
  }
  else if (estado === 6) { 
    if (overMouse(300, 350, 200, 45)) { estado = 7; }
  }
  else if (estado === 7) {
    if (overMouse(300, 350, 200, 45)) { 
      estado = 14; 
      tiempoInicioCreditos = millis(); 
    }
  }
  else if (estado === 8) {
    if (overMouse(100, 340, 280, 60)) { estado = 9; }
    if (overMouse(420, 340, 280, 60)) { estado = 11; }
  }
  else if (estado === 9) {
    if (overMouse(300, 350, 200, 45)) { 
      estado = 14; 
      tiempoInicioCreditos = millis(); 
    }
  }
  else if (estado === 10) { 
    if (overMouse(300, 350, 200, 45)) { estado = 11; }
  }
  else if (estado === 11) {
    if (overMouse(100, 340, 280, 60)) { estado = 12; }
    if (overMouse(420, 340, 280, 60)) { estado = 13; }
  }
  else if (estado === 12) { 
    if (overMouse(300, 350, 200, 45)) { estado = 7; }
  }
  else if (estado === 13) {
    if (overMouse(300, 350, 200, 45)) { 
      estado = 14; 
      tiempoInicioCreditos = millis(); 
    }
  }
}
