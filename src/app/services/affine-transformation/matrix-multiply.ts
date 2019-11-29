export class MatrixMultiply {

  public static multiplyMatrixByMatrix(vector: number[], matrix: number[][]): number[] {
    const result = new Array<number>(vector.length);

    for (let i = 0; i < result.length; ++i) {
      let elem = 0.0;

      for (let j = 0; j < matrix[i].length; ++j) {
        elem += vector[j] * matrix[j][i];
      }

      result[i] = elem;
    }

    return result;
  }

  public static multiplyVectorByMatrix(a: number[][], b: number[][]): number[][] {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; ++i) {
      result.push(new Array<number>(b[0].length));
    }

    for (let i = 0; i < a.length; ++i) {
      for (let j = 0; j < b[0].length; ++j) {
        let elem = 0.0;
        for (let k = 0; k < b.length; ++k) {
          elem += a[i][k] * b[k][j];
        }
        result[i][j] = elem;
      }
    }
    return result;
  }
}
