import {FractalDrawer} from '../fractal-drawer';
import {Point} from '../utils/point';

export class KochLine extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const a = new Point(0, 10);
    const b = new Point(this.canvas.width, 10);
    this.kochLine(a, b, 0, iterations);
  }

  private kochLine(a: Point, b: Point, fi: number, iterations: number): void {
    if (iterations <= 0) {
      this.drawLine(a, b);
      return;
    }

    const length = Math.pow(Math.pow(b.y - a.y, 2.0) + Math.pow(b.x - a.x, 2.0), 0.5) / 3.0;

    const a1 = new Point(
      a.x + Math.round((length * Math.cos(fi))),
      a.y + Math.round((length * Math.sin(fi)))
    );

    const b1 = new Point(
      a1.x + Math.round((length * Math.cos(fi))),
      a1.y + Math.round((length * Math.sin(fi)))
    );

    const c = new Point(
      a1.x + Math.round((length * Math.cos(fi + Math.PI / 3.0))),
      a1.y + Math.round((length * Math.sin(fi + Math.PI / 3.0)))
    );

    --iterations;
    this.kochLine(a1, c, fi + Math.PI / 3.0, iterations);
    this.kochLine(c, b1, fi - Math.PI / 3.0, iterations);

    this.kochLine(a, a1, fi, iterations);
    this.kochLine(b1, b, fi, iterations);
  }
}
