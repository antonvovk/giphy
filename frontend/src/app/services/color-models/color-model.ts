export class ColorModel {

  public static applyBrightness(imageDataSrc: ImageData, brightness: number): ImageData {
    let imageData = imageDataSrc;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 1] <= 80 && imageData.data[i + 2] <= 80 && imageData.data[i] >= 100) {
        imageData.data[i] = Math.min(255, imageData.data[i] * (1 + (brightness / 100)));
        imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] * (1 + (brightness / 100)));
        imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] * (1 + (brightness / 100)));
      }
    }

    return imageData;
  }

  public static convertToXYZ(imageDataSrc: ImageData): ImageData {
    let imageData = imageDataSrc;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const XYZ = this.convertRGBtoXYZ(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
      const RGB = this.convertXYZtoRGB(XYZ[0], XYZ[1], XYZ[2]);
      imageData[i] = RGB[0];
      imageData[i + 1] = RGB[1];
      imageData[i + 2] = RGB[2];
    }

    return imageData;
  }

  public static convertRGBtoXYZ(R: number, G: number, B: number) {
    let varR = (R / 255.0);
    let varG = (G / 255.0);
    let varB = (B / 255.0);

    if (varR > 0.04045) {
      varR = Math.pow((varR + 0.055) / 1.055, 2.4);
    } else {
      varR = varR / 12.92;
    }
    if (varG > 0.04045) {
      varG = Math.pow((varG + 0.055) / 1.055, 2.4);
    } else {
      varG = varG / 12.92;
    }
    if (varB > 0.04045) {
      varB = Math.pow((varB + 0.055) / 1.055, 2.4);
    } else {
      varB = varB / 12.92;
    }

    varR = varR * 100;
    varG = varG * 100;
    varB = varB * 100;

    const X = varR * 0.4124 + varG * 0.3576 + varB * 0.1805;
    const Y = varR * 0.2126 + varG * 0.7152 + varB * 0.0722;
    const Z = varR * 0.0193 + varG * 0.1192 + varB * 0.9505;

    return [X, Y, Z];
  }

  public static convertXYZtoRGB(X: number, Y: number, Z: number) {
    const varX = X / 100;
    const varY = Y / 100;
    const varZ = Z / 100;

    let varR = varX * 3.2406 + varY * -1.5372 + varZ * -0.4986;
    let varG = varX * -0.9689 + varY * 1.8758 + varZ * 0.0415;
    let varB = varX * 0.0557 + varY * -0.2040 + varZ * 1.0570;

    if (varR > 0.0031308) {
      varR = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varR = 12.92 * varR;
    }
    if (varG > 0.0031308) {
      varG = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varG = 12.92 * varG;
    }
    if (varB > 0.0031308) {
      varB = 1.055 * (Math.pow(varR, 1 / 2.4)) - 0.055;
    } else {
      varB = 12.92 * varB;
    }

    const R = varR * 255;
    const G = varG * 255;
    const B = varB * 255;

    return [R, G, B];
  }

  public static truncateX(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 95.05) {
      value = 95.05;
    }

    return value;
  }

  public static truncateY(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }

    return value;
  }

  public static truncateZ(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 108.88) {
      value = 108.88;
    }
  }
}
