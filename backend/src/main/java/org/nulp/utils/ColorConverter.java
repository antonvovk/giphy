package org.nulp.utils;

import java.awt.image.BufferedImage;

public class ColorConverter {

    public static float[] RGBtoXYZ(short[] rgb) {
        float r = rgb[0] / 255.0f;
        float g = rgb[1] / 255.0f;
        float b = rgb[2] / 255.0f;

//        if (r > 0.04045f) {
//            r = (float) Math.pow(((r + 0.055f) / 1.055f), 2.4f);
//        } else {
//            r /= 12.92f;
//        }
//
//        if (g > 0.04045f) {
//            g = (float) Math.pow(((g + 0.055f) / 1.055f), 2.4f);
//        } else {
//            g /= 12.92f;
//        }
//
//        if (b > 0.04045f) {
//            b = (float) Math.pow(((b + 0.055f) / 1.055f), 2.4f);
//        } else {
//            b /= 12.92f;
//        }

//        r *= 100.0f;
//        g *= 100.0f;
//        b *= 100.0f;

        float x = (0.4900f * r + 0.3100f * g + 0.2000f * b) * (1.0f / 0.1769f);
        float y = (0.1769f * r + 0.8124f * g + 0.0106f * b) * (1.0f / 0.1769f);
        float z = (0.0000f * r + 0.0100f * g + 0.9900f * b) * (1.0f / 0.1769f);

        return new float[]{x, y, z};
    }

    public static short[] XYZtoRGB(float[] xyz) {
        float x = xyz[0] / 100.0f;
        float y = xyz[1] / 100.0f;
        float z = xyz[2] / 100.0f;

        float r = 3.240479f * x - 1.537150f * y - 0.498535f * z;
        float g = -0.969256f * x + 1.875991f * y + 0.041556f * z;
        float b = 0.055648f * x - 0.204043f * y + 1.057311f * z;

        if (r > 0.0031308f) {
            r = (float) (1.055f * Math.pow(r, 0.4166f) - 0.055f);
        } else {
            r = 12.92f * r;
        }

        if (g > 0.0031308f) {
            g = (float) (1.055f * Math.pow(g, 0.4166f) - 0.055f);
        } else {
            g = 12.92f * g;
        }

        if (b > 0.0031308f) {
            b = (float) (1.055f * Math.pow(b, 0.4166f) - 0.055f);
        } else {
            b = 12.92f * b;
        }

        return new short[]{(short) (r * 255.0f), (short) (g * 255.0f), (short) (b * 255.0f)};
    }

    public static short[] HSLtoRGB(float[] hsl) {
        hsl[0] = hsl[0] % 360.0f;
        float h = hsl[0] / 360f;
        float s = hsl[1] / 100f;
        float l = hsl[2] / 100f;

        float q = 0;

        if (l < 0.5f) {
            q = l * (1 + s);
        } else {
            q = (l + s) - (s * l);
        }

        float p = 2 * l - q;

        float r = Math.max(0, HueToRGB(p, q, h + (1.0f / 3.0f)));
        float g = Math.max(0, HueToRGB(p, q, h));
        float b = Math.max(0, HueToRGB(p, q, h - (1.0f / 3.0f)));

        r = Math.min(r, 1.0f);
        g = Math.min(g, 1.0f);
        b = Math.min(b, 1.0f);

        return new short[]{(short) r, (short) g, (short) b};
    }

    private static float HueToRGB(float p, float q, float h) {
        if (h < 0)
            h += 1;

        if (h > 1)
            h -= 1;

        if (6 * h < 1) {
            return p + ((q - p) * 6 * h);
        }

        if (2 * h < 1) {
            return q;
        }

        if (3 * h < 2) {
            return p + ((q - p) * 6 * ((2.0f / 3.0f) - h));
        }

        return p;
    }

    public static float[] RGBtoHSL(short[] rgb) {
        float fR = rgb[0] / 255.f;
        float fG = rgb[1] / 255.f;
        float fB = rgb[2] / 255.f;

        float fCMin = Min(fR, fG, fB);
        float fCMax = Max(fR, fG, fB);


        float L = 50 * (fCMin + fCMax), S = 0, H = 0;

        if (fCMin == fCMax) {
            return new float[]{H, S, L};
        } else if (L < 50) {
            S = 100 * (fCMax - fCMin) / (fCMax + fCMin);
        }
        else {
            S = 100f * (fCMax - fCMin) / (2.0f - fCMax - fCMin);
        }

        if (fCMax == fR) {
            H = 60 * (fG - fB) / (fCMax - fCMin);
        }
        if (fCMax == fG) {
            H = 60 * (fB - fR) / (fCMax - fCMin) + 120;
        }
        if (fCMax == fB) {
            H = 60 * (fR - fG) / (fCMax - fCMin) + 240;
        }
        if (H < 0) {
            H = H + 360;
        }

        return new float[]{H, S, L};
    }

    static float Min(float fR, float fG, float fB) {
        float fMin = fR;
        if (fG < fMin) {
            fMin = fG;
        }
        if (fB < fMin) {
            fMin = fB;
        }
        return fMin;
    }


    static float Max(float fR, float fG, float fB) {
        float fMax = fR;
        if (fG > fMax) {
            fMax = fG;
        }
        if (fB > fMax) {
            fMax = fB;
        }
        return fMax;
    }

    static public int[] grabPixels(BufferedImage bufImg) {
        int w = bufImg.getWidth();
        int h = bufImg.getHeight();
        int[] rgbArray = new int[w * h];
        bufImg.getRGB(0, 0, w, h, rgbArray, 0, w);
        return rgbArray;
    }
}
