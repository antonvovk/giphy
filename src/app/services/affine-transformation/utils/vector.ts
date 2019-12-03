import {Point} from './point';
import {Matrix} from './matrix';

export class Vector {

  constructor(coordinates: number[]) {
    this._coordinates = coordinates;
  }

  private _coordinates: number[];

  get coordinates(): number[] {
    return this._coordinates;
  }

  set coordinates(value: number[]) {
    this._coordinates = value;
  }

  public toPoint(): Point {
    return new Point(this._coordinates[0], this._coordinates[1]);
  }

  public transform(transformation: Matrix): Vector {
    return this.multiply(transformation);
  }

  public multiply(matrix: Matrix): Vector {
    const result = new Array<number>(matrix.length);

    for (let i = 0; i < matrix.length; ++i) {
      let elem = 0.0;

      for (let j = 0; j < matrix.length; ++j) {
        elem += this.coordinates[j] * matrix.coordinates[j][i];
      }

      result[i] = elem;
    }

    return new Vector(result);
  }
}
