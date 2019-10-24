import {Point} from './point';
import {FractalDrawer} from './fractal-drawer';

export class DragonCurve extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const a = new Point(this.canvas.width / 3.0, this.canvas.height / 1.5);
    const b = new Point(this.canvas.width - a.x, this.canvas.height / 1.5);
    this.dragonCurve(a, b, iterations);
  }

  private dragonCurve(a: Point, b: Point, iterations: number): void {

    if (iterations === 0) {
      this.drawLine(a, b);
      return;
    }

    const newPoint = new Point(
      (a.x + b.x) / 2 + (b.y - a.y) / 2.0,
      (a.y + b.y) / 2 - (b.x - a.x) / 2.0
    );

    this.dragonCurve(b, newPoint, iterations - 1);
    this.dragonCurve(a, newPoint, iterations - 1);
  }
}
