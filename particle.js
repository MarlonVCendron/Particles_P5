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
    this.checkWall();
    this.mouse();

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.vel.mult(friction);

    this.acc = createVector();
  }

  checkWall(){
    if(this.pos.x > width){
      this.pos.x = width;
    }else if(this.pos.x < 0){
      this.pos.x = 0;
    }
    if(this.pos.y > height){
      this.pos.y = height;
    }else if(this.pos.y < 0){
      this.pos.y = 0;
    }
  }

  // interact(target, type){
  //   let force = p5.Vector.sub(target, this.pos);
  //   let dsquared = force.magSq();
  //   dsquared = constrain(dsquared, 25, 1000);
  //   let strength = 10 / dsquared;
  //   force.setMag(strength);
  //
  //   if(this.pos.dist(target) < this.d*2){
  //     force.mult(-1);
  //   }
  //
  //   this.acc.add(force);
  // }

  interact(target, type){
    let force = p5.Vector.sub(target, this.pos);
    let dsquared = force.magSq();
    dsquared = constrain(dsquared, 25, 1000);
    let strength = 0;
    // console.log(force.mag()/1000);

    if(this.pos.dist(target) < this.d*4){
      strength = -10 / dsquared;
    }else{
      if (force.mag() < 800) {
        strength = Math.abs(-0.1 * Math.abs(force.mag()/1000));
      }
    }

    force.setMag(strength);
    this.acc.add(force);
  }

  mouse(){
    let mousePos = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(mousePos, this.pos);
    let dsquared = force.magSq();
    dsquared = constrain(dsquared, 1000, 10000);
    // let strength = 10000 / dsquared;
    let strength = 1000 / force.mag();
    strength = constrain(strength, 0, 10);
    force.setMag(strength);
    force.mult(-1);
    this.acc.add(force);
  }
}
