package org.nulp.utils;

import java.awt.image.BufferedImage;

public class ColorConverter {
    /**
     * RGB -> XYZ
     * @param red Red coefficient. Values in the range [0..255].
     * @param green Green coefficient. Values in the range [0..255].
     * @param blue Blue coefficient. Values in the range [0..255].
     * @return XYZ color space.
     */
    public static void RGBtoXYZ(int red, int green, int blue, double[] xyz){
        double r = red / 255.0d;
        double g = green / 255.0d;
        double b = blue / 255.0d;

        //R
        if ( r > 0.04045)
            r = Math.pow((( r + 0.055d) / 1.055d ), 2.4d);
        else
            r /= 12.92d;

        //G
        if ( g > 0.04045)
            g = Math.pow((( g + 0.055d) / 1.055d ), 2.4d);
        else
            g /= 12.92d;

        //B
        if ( b > 0.04045)
            b = Math.pow((( b + 0.055d) / 1.055d ), 2.4d);
        else
            b /= 12.92d;

        r *= 100.0d;
        g *= 100.0d;
        b *= 100.0d;

        double x = 0.4124564d * r + 0.3575761d * g + 0.1804375d * b;
        double y = 0.2126729d * r + 0.7151522d * g + 0.0721750d * b;
        double z = 0.0193339d * r + 0.1191920d * g + 0.9503041d * b;

        xyz[0] = x;
        xyz[1] = y;
        xyz[2] = z;
    }

    /**
     * XYZ -> RGB
     * @param x X coefficient.
     * @param y Y coefficient.
     * @param z Z coefficient.
     * @return RGB color space.
     */
    public static void XYZtoRGB(double x, double y, double z, int[] rgb){
        x /= 100;
        y /= 100;
        z /= 100;

        double r = 3.240479f * x - 1.53715f * y - 0.498535f * z;
        double g = -0.969256f * x + 1.875991f * y + 0.041556f * z;
        double b = 0.055648f * x - 0.204043f * y + 1.057311f * z;

        if ( r > 0.0031308 )
            r = 1.055f * ( (double)Math.pow(r, 0.4166f) ) - 0.055f;
        else
            r = 12.92f * r;

        if ( g > 0.0031308 )
            g = 1.055f * ( (double)Math.pow(g, 0.4166f) ) - 0.055f;
        else
            g = 12.92f * g;

        if ( b > 0.0031308 )
            b = 1.055f * ( (double)Math.pow(b, 0.4166f) ) - 0.055f;
        else
            b = 12.92f * b;

        rgb[0] = (int)(r * 255);
        rgb[1] = (int)(g * 255);
        rgb[2] = (int)(b * 255);
    }

    /**
     * Set all elements of an array with a given value
     * @param a array that will receive new values
     * @param v new value
     */
    static public void setArray(double[] a, double v) {
        int totalPixels = a.length;
        for (int i = 0; i < totalPixels; i++) {
            a[i] = v;
        }
    }

    /**
     * Get RGB pixels of a BufferedImage
     * @param bufImg image
     * @return an array of RGB pixels
     */
    static public int[] grabPixels(BufferedImage bufImg) {
        int w = bufImg.getWidth();
        int h = bufImg.getHeight();
        int[] rgbArray = new int[w * h];
        bufImg.getRGB(0, 0, w, h, rgbArray, 0, w);
        return rgbArray;
    }
}
