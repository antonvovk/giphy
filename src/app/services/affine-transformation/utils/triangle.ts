import {Point} from './point';
import {Matrix} from './matrix';

export class Triangle {

  constructor(a: Point, b: Point, c: Point) {
    this._a = a;
    this._b = b;
    this._c = c;
  }

  private _a: Point;

  get a(): Point {
    return this._a;
  }

  set a(value: Point) {
    this._a = value;
  }

  private _b: Point;

  get b(): Point {
    return this._b;
  }

  set b(value: Point) {
    this._b = value;
  }

  private _c: Point;

  get c(): Point {
    return this._c;
  }

  set c(value: Point) {
    this._c = value;
  }

  public valid() {
    return this.a.distance(this.c) + this.b.distance(this.c) !== this.a.distance(this.b);
  }

  public transform(transformation: Matrix): Triangle {
    const a = this.a.toVector().transform(transformation).toPoint();
    const b = this.b.toVector().transform(transformation).toPoint();
    const c = this.c.toVector().transform(transformation).toPoint();
    return new Triangle(a, b, c);
  }
}
