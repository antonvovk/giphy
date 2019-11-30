export class Matrix {

  constructor(values: number[][]) {
    this._coordinates = values;
    this._length = values.length;
  }

  private _coordinates: number[][];

  get coordinates(): number[][] {
    return this._coordinates;
  }

  set coordinates(value: number[][]) {
    this._coordinates = value;
  }

  private _length: number;

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }

  public multiply(matrix: Matrix): Matrix {
    const result = new Array(matrix.length);
    for (let i = 0; i < matrix.length; ++i) {
      result[i] = new Array<number>(matrix.length);
    }

    for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix.length; ++j) {
        let elem = 0.0;
        for (let k = 0; k < matrix.length; ++k) {
          elem += this._coordinates[i][k] * matrix._coordinates[k][j];
        }
        result[i][j] = elem;
      }
    }

    return new Matrix(result);
  }
}
