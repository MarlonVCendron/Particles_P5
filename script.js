const numParticles = 250;
const friction = 0.001;

let particles = [];

function setup(){
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numParticles; i++) {
    rX = random(width);
    rY = random(height);
    rType = floor(random(5));

    particles.push(new Particle(rX, rY, rType));
  }
}

function draw(){
  background(0);

  for(let p1 of particles){
    p1.show();
    p1.update();
    for(let p2 of particles){
      if(p1 != p2){
        p1.interact(p2.pos, p2.type);
      }
    }
  }

  // console.log(frameRate());
}
