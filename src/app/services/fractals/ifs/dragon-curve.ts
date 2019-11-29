import {Point} from '../utils/point';
import {FractalDrawer} from '../fractal-drawer';

export class DragonCurve extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const a = new Point(this.canvas.width / 3.0, this.canvas.height / 2.0);
    const b = new Point(this.canvas.width - a.x, this.canvas.height / 2.0);
    this.dragonCurve(a, b, iterations);
  }

  public dragonCurve(a: Point, b: Point, iterations): void {
    if (iterations == 0) {
      this.drawLine(a, b);
      return;
    }

    const newPoint = a.add(b.subtract(a).multiplyBy2DMatrix([[1 / 2, 1 / 2], [-1 / 2, 1 / 2]]));
    this.dragonCurve(newPoint, a, iterations - 1);
    this.dragonCurve(newPoint, b, iterations - 1);
  }
}
