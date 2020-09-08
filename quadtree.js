class QuadTree{
  constructor(r,cap){
    this.r = r;
    this.divided = false;
    this.cap = cap;
    this.points = [];
  }

  //split quadtree into fourths
  subdivide(){
    let x = this.r.x;
    let y = this.r.y;
    let w = this.r.w/2;
    let h = this.r.h/2;
    this.northwest = new QuadTree(new Rect(x, y, w, h), this.cap);
    this.northeast = new QuadTree(new Rect(x + w, y, w, h), this.cap);
    this.southwest = new QuadTree(new Rect(x, y + h, w, h), this.cap);
    this.southeast = new QuadTree(new Rect(x + w, y + h, w, h), this.cap);
    this.divided = true;
  }

  //add point to quadtree
  //point must have position
  insert(point){
    if(!this.r.contains(point.position.x, point.position.y)) return false;

    if(this.points.length < this.cap) { this.points.push(point); return true; }

    if(!this.divided) this.subdivide();

    return (this.northeast.insert(point) || this.northwest.insert(point) || this.southeast.insert(point) || this.southwest.insert(point))
  }

  //remove point from quadtree if point is in quadtree
  remove(point){
    if(!this.r.contains(point.position.x,point.position.y)) return;
    let index = this.points.indexOf(point);
    if(index >= 0)
      this.points.splice(index,1);
    else if(this.divided)
      return (this.northeast.remove(point) || this.northwest.remove(point) || this.southeast.remove(point) || this.southwest.remove(point))
  }

  // return an array of all points within a shape
  query(shape,arr = []){
    if(!shape.intersects(this.r)) return arr;
    for(let p of this.points)
      if(shape.contains(p.position.x,p.position.y)) arr.push(p);
    if(this.divided){
      this.northeast.query(shape,fun,arr);
      this.northwest.query(shape,fun,arr);
      this.southeast.query(shape,fun,arr);
      this.southwest.query(shape,fun,arr);
    }
    return arr;
  }

  //apply function to every point in quadtree
  //function => fun(x) where x is a point
  applyAll(fun){
    for(let p of this.points)
      fun(p);
    if(this.divided){
      this.northeast.applyAll(fun);
      this.northwest.applyAll(fun);
      this.southeast.applyAll(fun);
      this.southwest.applyAll(fun);
    }
  }

  //return a copy of this
  copy(q = new QuadTree(this.r,this.cap)){
      for(let p of this.points)
        q.insert(p);
      if(this.divided){
        this.northeast.copy(q);
        this.northwest.copy(q);
        this.southeast.copy(q);
        this.southwest.copy(q);
      }
      return q;
  }

  clear(){
    this.points = [];
    if(this.divided){
      this.northwest = null;
      this.northeast = null;
      this.southwest = null;
      this.southeast = null;
      this.divided = false;
    }
  }

  show(){
    stroke(255);
    strokeWeight(1);
    noFill()
    rect(this.r.x,this.r.y,this.r.w,this.r.h);
    if(this.divided){
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    strokeWeight(4);
    for(let p of this.points){
      point(p.x,p.y);
    }
  }
}
