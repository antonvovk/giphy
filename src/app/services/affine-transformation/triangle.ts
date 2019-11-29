import {Point} from './point';

export class Triangle {

  public a: Point;
  public b: Point;
  public c: Point;

  constructor(a: Point, b: Point, c: Point) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
