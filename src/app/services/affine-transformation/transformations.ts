import {Point} from './point';
import {Triangle} from './triangle';
import {MatrixMultiply} from './matrix-multiply';
import {BaseTransformations} from './base-transformations';

export class Transformations {

  public static transform(triangle: Triangle, transformation: number[][]): Triangle {
    triangle.a = this.toPoint(this.Transform(triangle.a.toVector(), transformation));
    triangle.b = this.toPoint(this.Transform(triangle.b.toVector(), transformation));
    triangle.c = this.toPoint(this.Transform(triangle.c.toVector(), transformation));
    return triangle;
  }

  public static rotateTransformation(angle: number, k: number, center: Point): number[][][] {
    const transformations = [
      BaseTransformations.move(-center.x, -center.y),
      BaseTransformations.rotate(angle),
      BaseTransformations.scale(k, k),
      BaseTransformations.move(center.x, center.y),
    ];

    return transformations;
  }

  public static Transform(vector: number[], transformation: number[][]) {
    return MatrixMultiply.multiplyVectorByMatrix(vector, transformation);
  }

  private static toPoint(vector: number[]): Point {
    return new Point(vector[0], vector[1]);
  }
}
