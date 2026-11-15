//clase orbe oscuro
class OrbeOscuro {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.tamano = 38;
    this.velocidad = 2;
    this.tiempoUltimoChoque = 0;

    if (random() > 0.5) {
      this.direccionX = 1;
    } else {
      this.direccionX = -1;
    }
    if (random() > 0.5) {
      this.direccionY = 1;
    } else {
      this.direccionY = -1;
    }
  }

  dibujar() {
    this.mover();
    imageMode(CENTER);
    image(imgOrbeOscuro, this.posX, this.posY, this.tamano, this.tamano);
    imageMode(CORNER);
  }

  mover() {
    this.posX += this.direccionX * this.velocidad;
    this.posY += this.direccionY * this.velocidad;
    if (this.posX < this.tamano / 2 || this.posX > 800 - this.tamano / 2) {
      this.direccionX *= -1;
    }
    if (this.posY < this.tamano / 2 || this.posY > 400 - this.tamano / 2) {
      this.direccionY *= -1;
    }
  }

  ajustarVelocidad(factor) {
    this.velocidad = 1.6 * factor;
  }

  chocar() {
    if (millis() - this.tiempoUltimoChoque > 1000) {
      this.tiempoUltimoChoque = millis();
      return true;
    }
    return false;
  }
}
