export class BaseTransformations {

  public static move(x: number, y: number): number[][] {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [x, y, 1]
    ];
  }

  public static rotate(angle: number): number[][] {
    const radian = angle / 180.0 * Math.PI;
    return [
      [Math.cos(radian), -Math.sin(radian), 0],
      [Math.sin(radian), Math.cos(radian), 0],
      [0, 0, 1]
    ];
  }

  public static scale(kx: number, ky: number) {
    return [
      [kx, 0, 0],
      [0, ky, 0],
      [0, 0, 1]
    ];
  }
}
