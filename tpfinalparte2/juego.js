//clase juego
class Juego {
  constructor() {
    this.jugador = new Jugador(400, 200);
    this.orbesClaros = [];
    this.orbesOscuros = [];
    this.energia = 0;
    this.tiempoTotal = 60000;
    this.tiempoInicio = millis();
    this.ultimoOrbe = millis();
    this.tiempoEntreOrbes = 2000;
    this.estado = "contexto";
    this.vidas = 2;
    this.motivoDerrota = "";
    this.tiempoFlash = 0;
    this.tiempoFinJuego = 0;
    this.crearOrbesOscuros();
  }

  dibujar() {
    if (this.estado === "contexto") {
      this.dibujarContexto();
      return;
    }
    if (this.estado === "instrucciones") {
      this.dibujarInstrucciones();
      return;
    }
    if (this.estado === "gana" || this.estado === "pierde") {
      this.dibujarPantallaFinal();
      return;
    }
    if (this.estado === "creditos") {
      this.dibujarCreditos();
      return;
    }

    this.agregarOrbeClaro();
    this.controlarVelocidadOscuros();
    this.controlarChoque();
    this.controlarEstado();

    for (let i = 0; i < this.orbesClaros.length; i++) {
      this.orbesClaros[i].dibujar();
    }
    for (let i = 0; i < this.orbesOscuros.length; i++) {
      this.orbesOscuros[i].dibujar();
    }
    this.jugador.dibujar();
    this.dibujarHUD();
    this.dibujarParpadeoRojo();
  }

  crearOrbesOscuros() {
    for (let i = 0; i < 3; i++) {
      let x = random(50, 750);
      let y = random(60, 350);
      this.orbesOscuros.push(new OrbeOscuro(x, y));
    }
  }

  agregarOrbeClaro() {
    if (millis() - this.ultimoOrbe > this.tiempoEntreOrbes) {
      let x = random(20, 780);
      let y = random(50, 380);
      this.orbesClaros.push(new OrbeClaro(x, y));
      this.ultimoOrbe = millis();
    }
  }

  controlarVelocidadOscuros() {
    let factorVelocidad = map(this.energia, 0, 100, 1, 2.7);
    for (let i = 0; i < this.orbesOscuros.length; i++) {
      this.orbesOscuros[i].ajustarVelocidad(factorVelocidad);
    }
  }

  controlarChoque() {
    for (let i = 0; i < this.orbesClaros.length; i++) {
      let orbe = this.orbesClaros[i];
      if (orbe.visible) {
        let d = dist(this.jugador.posX, this.jugador.posY, orbe.posX, orbe.posY);
        if (d < (this.jugador.tamano / 2 + orbe.tamano / 2)) {
          orbe.recoger();
          this.energia = min(100, this.energia + 10);
          sndRecolectar.currentTime = 0;
          sndRecolectar.play();
        }
      }
    }
    for (let i = 0; i < this.orbesOscuros.length; i++) {
      let orbe = this.orbesOscuros[i];
      let d = dist(this.jugador.posX, this.jugador.posY, orbe.posX, orbe.posY);
      if (d < (this.jugador.tamano / 2 + orbe.tamano / 2)) {
        if (millis() - this.tiempoInicio > 2000 && orbe.chocar()) {
          sndDano.currentTime = 0;
          sndDano.play();
          if (this.energia > 0) {
            this.energia = max(0, this.energia - 15);
          } else {
            this.vidas--;
            this.tiempoFlash = millis();
          }
        }
      }
    }
  }

  controlarEstado() {
    if (this.energia >= 100 && this.estado === "jugando") {
      this.estado = "gana";
      this.tiempoFinJuego = millis();
      sndJuego.pause(); sndJuego.currentTime = 0;
      sndVictoria.currentTime = 0; sndVictoria.play();
    }
    if (this.vidas <= 0 && this.estado === "jugando") {
      this.estado = "pierde";
      this.motivoDerrota = "vidas";
      this.tiempoFinJuego = millis();
      sndJuego.pause(); sndJuego.currentTime = 0;
      sndDerrota.currentTime = 0; sndDerrota.play();
    }
    let tiempoRestante = this.tiempoTotal - (millis() - this.tiempoInicio);
    if (tiempoRestante <= 0 && this.estado === "jugando") {
      this.estado = "pierde";
      this.motivoDerrota = "tiempo";
      this.tiempoFinJuego = millis();
      sndJuego.pause(); sndJuego.currentTime = 0;
      sndDerrota.currentTime = 0; sndDerrota.play();
    }
  }

  dibujarParpadeoRojo() {
    let duracionFlash = 500;
    let tiempoTranscurrido = millis() - this.tiempoFlash;
    if (this.tiempoFlash > 0 && tiempoTranscurrido < duracionFlash) {
      let alfa = map(tiempoTranscurrido, 0, duracionFlash, 150, 0);
      fill(220, 0, 0, alfa);
      noStroke();
      rect(0, 0, 800, 400);
    }
  }

  dibujarPantallaFinal() {
    if (this.estado === "pierde") {
      image(imgFondoPerdiste, 0, 0, 800, 400);
      fill(0, 0, 0, 120);
    } else {
      image(imgFondoGana, 0, 0, 800, 400);
      fill(0, 0, 0, 130);
    }
    noStroke();
    rect(0, 0, 800, 400);

    textAlign(CENTER, CENTER);

    if (this.estado === "gana") {
      fill(150, 255, 180);
      textSize(48);
      text("¡ESCAPASTE!", 400, 150);
      fill(220);
      textSize(18);
      text("Lograste romper el portal y volver a tu realidad.", 400, 215);
    } else {
      fill(220, 80, 80);
      textSize(48);
      text("PERDISTE", 400, 150);
      fill(220);
      textSize(18);
      let mensajePerder = "";
      if (this.motivoDerrota === "vidas") {
        mensajePerder = "Las orbes oscuras te consumieron por completo.";
      } else {
        mensajePerder = "El tiempo se acabó antes de cargar la energía.";
      }
      text(mensajePerder, 400, 215);
    }

    fill(255);
    textSize(16);
    text("Presioná R para reiniciar", 400, 290);
    fill(120, 120, 120);
    textSize(13);
    text("Presioná cualquier otra tecla para ver los créditos", 400, 318);
  }

  reiniciar() {
    this.jugador = new Jugador(400, 200);
    this.orbesClaros = [];
    this.orbesOscuros = [];
    this.energia = 0;
    this.vidas = 2;
    this.motivoDerrota = "";
    this.tiempoFlash = 0;
    this.tiempoFinJuego = 0;
    this.tiempoInicio = 0;
    this.ultimoOrbe = 0;
    this.estado = "contexto";
    this.crearOrbesOscuros();
  }

  iniciar() {
    this.tiempoInicio = millis();
    this.ultimoOrbe = millis();
    this.estado = "jugando";
  }

  dibujarCreditos() {
    image(imgCreditos, 0, 0, 800, 400);

    let parpadeo = sin(millis() * 0.004) > 0;
    if (parpadeo) {
      fill(255);
      noStroke();
      textSize(13);
      textAlign(CENTER, CENTER);
      text("Presioná R para reiniciar", 400, 18);
    }
  }

  dibujarContexto() {
    background(10, 5, 30);
    fill(0, 0, 0, 160);
    noStroke();
    rect(100, 60, 600, 280, 12);

    textAlign(CENTER, CENTER);

    fill(255, 220, 100);
    textSize(22);
    text("Odisea en el Hiperespacio", 400, 95);

    stroke(80, 80, 120, 150);
    strokeWeight(1);
    line(150, 135, 650, 135);
    noStroke();

    fill(210, 210, 240);
    textSize(15);
    text("Unos seres de luz te hablan por telepatía y te advierten\nque no podés sobrevivir mucho tiempo ahí.\nTe ofrecen dos formas de escapar.", 400, 185);

    fill(150, 255, 180);
    textSize(13);
    text("Elegiste: USAR ENERGÍA", 400, 265);

    let parpadeo = sin(millis() * 0.004) > 0;
    if (parpadeo) {
      fill(255);
      textSize(14);
      text("Presioná cualquier tecla para continuar", 400, 320);
    }
  }

  dibujarInstrucciones() {
    background(10, 5, 30);
    fill(0, 0, 0, 160);
    noStroke();
    rect(60, 20, 680, 360, 12);

    textAlign(CENTER, CENTER);

    fill(150, 255, 180);
    textSize(28);
    text("¿Cómo jugar?", 400, 65);

    stroke(100, 150, 255, 100);
    strokeWeight(1);
    line(100, 90, 700, 90);
    noStroke();

    fill(220);
    textSize(13);
    textAlign(LEFT, CENTER);
    text("→  Moverse:          WASD", 150, 118);
    text("→  Recolectá los orbes azules para cargar la barra de energía.", 150, 142);
    text("→  Esquivá los orbes rojos — te restan energía y vidas.", 150, 166);
    text("→  Llená la barra antes de que se acabe el tiempo.", 150, 190);
    text("→  Si perdés las 2 vidas con la barra en 0, perdés.", 150, 214);
    text("→  Reiniciar:        R", 150, 238);

    let parpadeo = sin(millis() * 0.004) > 0;
    if (parpadeo) {
      fill(255);
      textSize(14);
      text("Presioná cualquier tecla para comenzar", 400, 378);
    }
  }

  dibujarHUD() {
    let anchoMarco = 350;
    let altoMarco = 88;
    let xMarco = 220;
    let yMarco = 0;
    image(imgBarra, xMarco, yMarco, anchoMarco, altoMarco);

    let orbesActivos = floor(map(this.energia, 0, 100, 0, 10));
    let tamanoOrbeHUD = 32;
    let espacioOrbe = 22;
    let inicioX = xMarco + 57;
    let centroY = yMarco + 45;

    for (let i = 0; i < 10; i++) {
      if (i < orbesActivos) {
        tint(255);
      } else {
        tint(35, 35, 60);
      }
      imageMode(CENTER);
      image(imgOrbeClaro, inicioX + i * espacioOrbe, centroY, tamanoOrbeHUD, tamanoOrbeHUD);
      imageMode(CORNER);
    }
    noTint();

    fill(255);
    noStroke();
    textSize(13);
    textAlign(RIGHT, CENTER);
    let segundosRestantes = max(0, ceil((this.tiempoTotal - (millis() - this.tiempoInicio)) / 1000));
    text("TIEMPO: " + segundosRestantes + "s", 790, 20);

    for (let i = 0; i < 2; i++) {
      if (i < this.vidas) {
        tint(255);
      } else {
        tint(60, 60, 60);
      }
      image(imgCorazon, 10 + i * 32, 6, 26, 26);
    }
    noTint();
  }
}
