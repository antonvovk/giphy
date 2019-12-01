import {Vector} from './vector';

export class Point {

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  private _x: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _y: number;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  public toVector(): Vector {
    return new Vector([this._x, this._y, 1]);
  }

  public distance(point: Point) {
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
  }
}
