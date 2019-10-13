import {Point} from './point';

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

  protected initCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected drawLine(from: Point, to: Point): void {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.stroke();
  }

  protected abstract draw(iterations: number): void;
}
