export abstract class FractalDrawer {

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;

  protected constructor(canvas: HTMLCanvasElement, lineColor: string, lineThickness: number, backgroundColor: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = lineThickness;
    this.ctx.fillStyle = backgroundColor;
  }

  abstract draw(iterations: number): void;
}
