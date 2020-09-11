let canvasSize = 750;
let quadtree;
let pointCounter = 0;

function setup(){
  createCanvas(canvasSize,canvasSize);
  background(50);

  quadtree = new QuadTree(new Rect(0,0,canvasSize,canvasSize),4);
}

function draw(){
  background(50);
  if(pointCounter < 1000)
    quadtree.insert({ position: createVector(random(canvasSize),random(canvasSize))});
  else
    console.log(quadtree);
  quadtree.show();
  pointCounter++;
}
