import {FractalDrawer} from './fractal-drawer';
import {Point} from './point';

export class MinkowskiCurve extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  private static helperFunc(p1: number, p2: number, a: Array<number>, b: Array<number>): void {
    const d = (p2 - p1) / 4.0;
    a[1] = a[2] = a[0] + d;
    a[3] = a[4] = a[5] = a[2] + d;
    a[6] = a[7] = a[3] + d;
    b[1] = b[4] = b[7] = b[0];
    b[2] = b[3] = b[0] - d;
    b[5] = b[6] = b[0] + d;
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const a = new Point(this.canvas.width / 8.0, this.canvas.height / 2.0);
    const b = new Point(this.canvas.width - a.x, this.canvas.height / 2.0);
    this.minkowskiCurve(a, b, iterations);
  }

  private minkowskiCurve(a: Point, b: Point, iterations: number): void {
    if (iterations === 0) {
      this.drawLine(a, b);
      return;
    }

    const x = new Array<number>(9);
    const y = new Array<number>(9);
    x[0] = a.x;
    y[0] = a.y;
    x[8] = b.x;
    y[8] = b.y;

    if (a.y === b.y) { // horizontal curve
      MinkowskiCurve.helperFunc(a.x, b.x, x, y);
    } else { // vertical curve
      MinkowskiCurve.helperFunc(a.y, b.y, y, x);
    }

    for (let i = 0; i < 8; i++) {
      this.minkowskiCurve(new Point(x[i], y[i]), new Point(x[i + 1], y[i + 1]), iterations - 1);
    }
  }
}
