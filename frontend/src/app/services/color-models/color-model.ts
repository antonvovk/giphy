export class ColorModel {

  public static applyBrightness(imageDataSrc: ImageData, brightness: number): ImageData {
    let imageData = imageDataSrc;

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = imageData.data[i] + (255 * (brightness / 100));
      imageData.data[i + 1] = imageData.data[i + 1] + (255 * (brightness / 100));
      imageData.data[i + 2] = imageData.data[i + 2] + (255 * (brightness / 100));
    }

    return imageData;
  }

  public static convertToXYZ(imageDataSrc: ImageData): ImageData {
    let imageData = imageDataSrc;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const xyz = this.convertRGBtoXYZ(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
      imageData.data[i] = xyz[0] * 100.0 * 2.2;
      imageData.data[i + 1] = xyz[1] * 100.0 * 2.2;
      imageData.data[i + 2] = xyz[2] * 100.0 * 2.2;
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

    let X = (varR * 0.4124564 + varG * 0.3575761 + varB * 0.1804375);
    let Y = (varR * 0.2126729 + varG * 0.7151522 + varB * 0.0721750);
    let Z = (varR * 0.0193339 + varG * 0.1191920 + varB * 0.9503041);

    return [X, Y, Z];
  }
}
