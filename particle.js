class Particle{
  constructor(x, y, type){
    this.d = 8;
    this.pos = createVector(x, y);
    this.type = type;
    this.vel = createVector();
    this.acc = createVector();
  }

  show(){
    noStroke();
    switch (this.type) {
      case 0:
        fill(215,20,20);
        break;
      case 1:
        fill(20,215,20);
        break;
      case 2:
        fill(20,20,215);
        break;
      case 3:
        fill(215,20,215);
        break;
      case 4:
        fill(215,215,20);
        break;
    }

    circle(this.pos.x, this.pos.y, this.d);
  }

  update(){
    this.vel.mult(friction);

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.hitTheWall();
    this.mouse();

    this.acc = createVector();
  }

  mouse(){
    let mousePos = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(mousePos, this.pos);
    let dsquared = force.magSq();
    // dsquared = constrain(dsquared, 25, 1000);
    let strength = 100 / dsquared;
    force.setMag(strength);
    // force.mult(-1);
    this.acc.add(force);
  }

  hitTheWall(){
    if(this.pos.x > width || this.pos.x < 0){
      this.vel.x *= -1;
    }else if(this.pos.y > height || this.pos.y < 0){
      this.vel.y *= -1;
    }
  }

  attract(target){
    let force = p5.Vector.sub(target, this.pos);
    let dsquared = force.magSq();
    dsquared = constrain(dsquared, 25, 1000);
    let strength = 10 / dsquared;
    force.setMag(strength);
    if(this.pos.dist(target) > this.d*2){
      this.acc.add(force);
    }else{
      force.mult(-1);
      this.acc.add(force);
    }

  }
}
