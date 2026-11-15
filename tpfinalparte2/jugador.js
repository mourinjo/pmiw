//clase jugador
class Jugador {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.tamano = 80;
    this.velocidad = 4;
    this.direccion = 1;
    this.frameActual = 0;
    this.tiempoUltimoFrame = 0;
    this.tiempoEntreFrames = 150;
    this.enMovimiento = false;
  }

  dibujar() {
    this.mover();
    imageMode(CENTER);
    image(imagenesJugador[this.direccion][this.frameActual], this.posX, this.posY, this.tamano, this.tamano);
    imageMode(CORNER);
  }

  mover() {
    this.enMovimiento = false;

    if (keyIsDown(87)) { this.posY -= this.velocidad; this.direccion = 0; this.enMovimiento = true; }
    if (keyIsDown(83)) { this.posY += this.velocidad; this.direccion = 1; this.enMovimiento = true; }
    if (keyIsDown(65)) { this.posX -= this.velocidad; this.direccion = 2; this.enMovimiento = true; }
    if (keyIsDown(68)) { this.posX += this.velocidad; this.direccion = 3; this.enMovimiento = true; }

    this.posX = constrain(this.posX, this.tamano / 2, 800 - this.tamano / 2);
    this.posY = constrain(this.posY, this.tamano / 2, 400 - this.tamano / 2);

    if (this.enMovimiento) {
      if (millis() - this.tiempoUltimoFrame > this.tiempoEntreFrames) {
        this.frameActual = (this.frameActual + 1) % 3;
        this.tiempoUltimoFrame = millis();
      }
    } else {
      this.frameActual = 0;
    }
  }
}
