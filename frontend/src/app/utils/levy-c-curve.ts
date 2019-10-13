import {FractalDrawer} from './fractal-drawer';
import {Point} from './point';

export class LevyCCurve extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const point1 = new Point(this.canvas.width / 3.0, this.canvas.height / 4.0);
    const point2 = new Point(this.canvas.width - point1.x, this.canvas.height / 4.0);
    this.cCurve(point1, point2, iterations);
  }

  private cCurve(point1: Point, point2: Point, iterations: number): void {
    if (iterations === 0) {
      this.drawLine(point1, point2);
      return;
    }

    const newPoint = new Point(
      (point1.x + point2.x) / 2.0 + (point1.y - point2.y) / 2.0,
      (point2.x - point1.x) / 2.0 + (point1.y + point2.y) / 2.0
    );

    this.cCurve(point1, newPoint, iterations - 1);
    this.cCurve(newPoint, point2, iterations - 1);
  }
}
