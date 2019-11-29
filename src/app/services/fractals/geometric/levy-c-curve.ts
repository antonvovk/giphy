import {FractalDrawer} from '../fractal-drawer';
import {Point} from '../utils/point';

export class LevyCCurve extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const a = new Point(this.canvas.width / 3.0, this.canvas.height / 4.0);
    const b = new Point(this.canvas.width - a.x, this.canvas.height / 4.0);
    this.cCurve(a, b, iterations);
  }

  private cCurve(a: Point, b: Point, iterations: number): void {
    if (iterations === 0) {
      this.drawLine(a, b);
      return;
    }

    const newPoint = new Point(
      (a.x + b.x) / 2.0 + (a.y - b.y) / 2.0,
      (b.x - a.x) / 2.0 + (a.y + b.y) / 2.0
    );

    this.cCurve(a, newPoint, iterations - 1);
    this.cCurve(newPoint, b, iterations - 1);
  }
}


