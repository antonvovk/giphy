export class Point {

  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public subtract(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  public add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  public multiplyBy2DMatrix(matrix: number[][]): Point {
    return new Point(matrix[0][0] * this.x + matrix[0][1] * this.y, matrix[1][0] * this.x + matrix[1][1] * this.y);
  }
}
