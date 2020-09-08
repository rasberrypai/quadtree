class Rect{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  intersects(r){
    let x = r.x;
    let y = r.y;
    //// TODO
  }
  contains(x,y){
    if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h) return true;
    return false;
  }
}

class Circle{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
  intersects(r){
    let x = r.x;
    let y = r.y;
    let dx = this.x - Math.max(x, Math.min(this.x, x + r.w));
    let dy = this.y - Math.max(y, Math.min(this.y, y + r.h));
    return (dx * dx + dy * dy) < (this.r * this.r);
  }
  contains(x,y){
    let nx = x - this.x;
    let ny = y - this.y;
    if((nx*nx + ny*ny) <= (this.r*this.r)) return true;
    return false;
  }
}
