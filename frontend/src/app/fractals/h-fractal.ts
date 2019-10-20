import {FractalDrawer} from './fractal-drawer';
import {Point} from './point';

export class HFractal extends FractalDrawer {

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);
  }

  public draw(iterations: number): void {
    this.initCanvas();
    const point = new Point(this.canvas.width / 2.0, this.canvas.height / 2.0);
    const len = this.canvas.width / Math.sqrt(2.0) / Math.sqrt(2.0);
    this.hTree(point, len, iterations);
  }

  private hTree(point: Point, len: number, iterations: number): void {
    if (iterations === 0) {
      return;
    }

    // draw horizontal line
    const h1 = new Point(point.x - len / 2.0, point.y);
    const h2 = new Point(point.x + len / 2.0, point.y);
    this.drawLine(h1, h2);

    // draw vertical lines
    len /= Math.sqrt(2);

    const v1 = new Point(h1.x, h1.y - len / 2.0);
    const v2 = new Point(h1.x, h1.y + len / 2.0);
    this.drawLine(v1, v2);

    const v3 = new Point(h2.x, h2.y - len / 2.0);
    const v4 = new Point(h2.x, h2.y + len / 2.0);
    this.drawLine(v3, v4);

    // recurse recurse recurse recurse
    this.hTree(v1, len / Math.sqrt(2), iterations - 1);
    this.hTree(v2, len / Math.sqrt(2), iterations - 1);
    this.hTree(v3, len / Math.sqrt(2), iterations - 1);
    this.hTree(v4, len / Math.sqrt(2), iterations - 1);
  }
}
