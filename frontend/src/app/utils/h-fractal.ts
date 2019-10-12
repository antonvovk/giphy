import {FractalDrawer} from './fractal-drawer';

export class HFractal extends FractalDrawer {

  private readonly sqrt2 = Math.sqrt(2);
  private readonly len: number;
  private readonly center: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    super(canvas, lineColor, lineThickness, backgroundColor);

    this.len = this.canvas.width / this.sqrt2 / this.sqrt2;
    this.center = {
      x: this.canvas.width / 2.0,
      y: this.canvas.height / 2.0
    };
  }

  draw(iterations: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.hTree(this.center, this.len, iterations);
  }

  hTree(point, len, depth) {
    if (depth === 0) {
      return;
    }

    // draw horizontal line
    const h1 = {x: point.x - len / 2.0, y: point.y};
    const h2 = {x: point.x + len / 2.0, y: point.y};
    this.drawLine(h1, h2);

    // draw vertical lines
    len = len / this.sqrt2;

    const v1 = {x: h1.x, y: h1.y - len / 2.0};
    const v2 = {x: h1.x, y: h1.y + len / 2.0};
    this.drawLine(v1, v2);

    const v3 = {x: h2.x, y: h2.y - len / 2.0};
    const v4 = {x: h2.x, y: h2.y + len / 2.0};
    this.drawLine(v3, v4);

    // compute new length, depth
    depth--;
    len /= this.sqrt2;

    // recurse recurse recurse recurse
    this.hTree(v1, len, depth);
    this.hTree(v2, len, depth);
    this.hTree(v3, len, depth);
    this.hTree(v4, len, depth);
  }

  drawLine(from: any, to: any): void {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }
}
