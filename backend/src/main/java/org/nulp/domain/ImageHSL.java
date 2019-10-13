package org.nulp.domain;

import org.nulp.utils.ColorConverter;

import java.awt.image.BufferedImage;

public class ImageHSL extends ImageAbstract<Float> {

    private float[] pixelsH;
    private float[] pixelsS;
    private float[] pixelsL;

    private ImageHSL(int[] pixelsRGB, int width, int height) {
        super(width, height);

        int totalPixels = width * height;
        float[] py = new float[totalPixels];
        float[] pu = new float[totalPixels];
        float[] pv = new float[totalPixels];

        for (int i = 0; i < totalPixels; i++) {

            int rgb = pixelsRGB[i];
            int r = (rgb >> 16) & 0x000000ff;
            int g = (rgb >> 8) & 0x000000ff;
            int b = rgb & 0x000000ff;
            float[] retHSL = ColorConverter.RGBtoHSL(new short[]{(short) r, (short) g, (short) b});

            // set pixels
            py[i] = retHSL[0];
            pu[i] = retHSL[1];
            pv[i] = retHSL[2];

        }

        this.pixelsH = py;
        this.pixelsS = pu;
        this.pixelsL = pv;
    }

    public ImageHSL(BufferedImage img) {
        this(ColorConverter.grabPixels(img), img.getWidth(), img.getHeight());
    }

    @Override
    public int[] getPixelsRGB() {
        int totalPixels = width * height;
        int[] pixelsRGB = new int[totalPixels];
        int[] retRGB = new int[3];

        for (int i = 0; i < totalPixels; i++) {
            short[] rgb2 = ColorConverter.HSLtoRGB(new float[]{pixelsH[i], pixelsS[i], pixelsL[i]});
            int r = rgb2[0];
            int g = rgb2[1];
            int b = rgb2[2];

            int rgb = ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);

            pixelsRGB[i] = rgb;
        }

        return pixelsRGB;
    }
}
