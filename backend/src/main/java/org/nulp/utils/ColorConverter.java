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
        double r = red / 255f;
        double g = green / 255f;
        double b = blue / 255f;

        //R
        if ( r > 0.04045)
            r = (double)Math.pow(( ( r + 0.055f ) / 1.055f ), 2.4f);
        else
            r /= 12.92f;

        //G
        if ( g > 0.04045)
            g = (double)Math.pow(( ( g + 0.055f ) / 1.055f ), 2.4f);
        else
            g /= 12.92f;

        //B
        if ( b > 0.04045)
            b = (double)Math.pow(( ( b + 0.055f ) / 1.055f ), 2.4f);
        else
            b /= 12.92f;

        r *= 100;
        g *= 100;
        b *= 100;

        double x = 0.412453f * r + 0.35758f * g + 0.180423f * b;
        double y = 0.212671f * r + 0.71516f * g + 0.072169f * b;
        double z = 0.019334f * r + 0.119193f * g + 0.950227f * b;

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
