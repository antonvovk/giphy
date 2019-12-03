export class Matrix {

  private readonly _coordinates: number[][];
  private readonly _length: number;

  constructor(values: number[][]) {
    this._coordinates = values;
    this._length = values.length;
  }

  get coordinates(): number[][] {
    return this._coordinates;
  }

  get length(): number {
    return this._length;
  }
}
