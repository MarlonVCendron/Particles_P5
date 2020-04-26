let particles = [];
var friction = 0.8;

function setup(){
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 50; i++) {
    rX = random(width);
    rY = random(height);
    rType = floor(random(5));

    particles.push(new Particle(rX, rY, rType));
  }
}

function draw(){
  background(0);

  for(let p1 of particles){
    for(let p2 of particles){
      p1.show();
      p1.update();
      if(p1 != p2){
        p1.attract(p2.pos);
      }
    }
  }
}
