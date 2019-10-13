package org.nulp.domain;

import org.nulp.utils.ColorConverter;

import java.awt.image.BufferedImage;

public class ImageXYZ extends ImageAbstract<Float> {

    private float[] pixelsX;
    private float[] pixelsY;
    private float[] pixelsZ;

    private ImageXYZ(int[] pixelsRGB, int width, int height) {
        super(width, height) ;

        int totalPixels = width * height;
        float[] py = new float[totalPixels];
        float[] pu = new float[totalPixels];
        float[] pv = new float[totalPixels];

        for (int i = 0; i < totalPixels; i++) {

            // convert to XYZ
            int rgb = pixelsRGB[i];
            int r = (rgb >> 16) & 0x000000ff ;
            int g = (rgb >> 8) & 0x000000ff ;
            int b = rgb & 0x000000ff ;
            float[] retXYZ = ColorConverter.RGBtoXYZ(new short[]{(short) r, (short) g, (short) b});

            // set pixels
            py[i] = retXYZ[0];
            pu[i] = retXYZ[1];
            pv[i] = retXYZ[2];

        }

        this.pixelsX = py;
        this.pixelsY = pu;
        this.pixelsZ = pv;
    }

    public ImageXYZ(BufferedImage img) {
        this(ColorConverter.grabPixels(img), img.getWidth(), img.getHeight());
    }

    @Override
    public int[] getPixelsRGB() {
        int totalPixels = width * height;
        int[] pixelsRGB = new int[totalPixels];
        int[] retRGB = new int[3];

        for (int i = 0; i < totalPixels; i++) {
            int r = (int)Math.min(pixelsX[i] * 2.9d, 255);
            int g = (int)Math.min(pixelsY[i] * 2.9d, 255);
            int b = (int)Math.min(pixelsZ[i] * 2.9d, 255);

            int rgb = ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF) ;

            pixelsRGB[i] = rgb ;
        }

        return pixelsRGB ;
    }
}
