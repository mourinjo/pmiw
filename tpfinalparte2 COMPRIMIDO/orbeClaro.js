//clase orbe claro
class OrbeClaro {
  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.tamano = 60;
    this.visible = true;
    this.tiempoVida = 4000;
    this.tiempoCreacionOrbe = millis();
  }

  dibujar() {
    if (!this.visible) return;
    this.actualizar();
    imageMode(CENTER);
    image(imgOrbeClaro, this.posX, this.posY, this.tamano, this.tamano);
    imageMode(CORNER);
  }

  actualizar() {
    if (millis() - this.tiempoCreacionOrbe > this.tiempoVida) {
      this.visible = false;
    }
  }

  recoger() {
    this.visible = false;
  }
}
