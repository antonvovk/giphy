package org.nulp.domain;

import org.nulp.utils.ColorConverter;

import java.awt.image.BufferedImage;

public class ImageXYZ extends ImageAbstract<Double> {

    private double[] pixelsX;
    private double[] pixelsY;
    private double[] pixelsZ;

    /**
     * Initialize XYZ image with specified size and XYZ components
     * @param width image's width
     * @param height image's height
     * @param y Y component of XYZ image
     * @param u U component of XYZ image
     * @param v V component of XYZ image
     */
    private ImageXYZ(int width, int height, int y, int u, int v) {
        super(width, height) ;

        int totalPixels = width * height;
        this.pixelsX = new double[totalPixels];
        this.pixelsY = new double[totalPixels];
        this.pixelsZ = new double[totalPixels];

        ColorConverter.setArray(this.pixelsX, (short)y);
        ColorConverter.setArray(this.pixelsY, (short)u);
        ColorConverter.setArray(this.pixelsZ, (short)v);
    }

    /**
     * Initialize XYZ image with specified size and with black color
     * @param width image's width
     * @param height image's height
     */
    public ImageXYZ(int width, int height) {
        this(width, height, 0, 128, 128);
    }

    /**
     * Initialize XYZ image from an array of RGB pixels with a specific size
     * @param pixelsRGB array of RGB pixels, the position of each pixel can be defined from the width of the image
     * @param width image's width
     * @param height image's height
     */
    private ImageXYZ(int[] pixelsRGB, int width, int height) {
        super(width, height) ;

        int totalPixels = width * height;
        double[] py = new double[totalPixels];
        double[] pu = new double[totalPixels];
        double[] pv = new double[totalPixels];

        double[] retXYZ = new double[3];

        for (int i = 0; i < totalPixels; i++) {

            // convert to XYZ
            int rgb = pixelsRGB[i];
            int r = (rgb >> 16) & 0x000000ff ;
            int g = (rgb >> 8) & 0x000000ff ;
            int b = rgb & 0x000000ff ;
            ColorConverter.RGBtoXYZ(r, g, b, retXYZ);

            // set pixels
            py[i] = retXYZ[0];
            pu[i] = retXYZ[1];
            pv[i] = retXYZ[2];

        }

        this.pixelsX = py;
        this.pixelsY = pu;
        this.pixelsZ = pv;
    }

    /**
     * Initialize XYZ image from a BufferedImage
     * @param img BufferedImage image
     */
    public ImageXYZ(BufferedImage img) {
        this(ColorConverter.grabPixels(img), img.getWidth(), img.getHeight());
    }

    /**
     * Convert XYZ image to a RGB image
     * @return an array of RGB pixels
     */
    @Override
    public int[] getPixelsRGB() {
        int totalPixels = width * height;
        int[] pixelsRGB = new int[totalPixels];
        int[] retRGB = new int[3];

        for (int i = 0; i < totalPixels; i++) {
            // ColorConverter.XYZtoRGB(pixelsX[i], pixelsY[i], pixelsZ[i], retRGB);
            int r = (int)pixelsX[i] ;
            int g = (int)pixelsY[i] ;
            int b = (int)pixelsZ[i] ;

            int rgb = ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF) ;

            pixelsRGB[i] = rgb ;
        }

        return pixelsRGB ;
    }

    @Override
    public Double get(int ch, int x, int y){
        int i = getPixelIndex(x, y);
        switch(ch){
            case 1:
                return pixelsX[i];
            case 2:
                return pixelsY[i];
            case 3:
                return pixelsZ[i];
            default:
                throw new UnsupportedOperationException("Unknown channel: " + ch);
        }
    }

    @Override
    public void set(int x, int y, Double Y, Double U, Double V) {
        int i =	getPixelIndex(x, y);
        pixelsX[i] = Y;
        pixelsY[i] = U;
        pixelsZ[i] = V;
    }

    @Override
    public void set(int ch, int x, int y, Double chValue){
        int i =	getPixelIndex(x, y);
        switch(ch){
            case 1:
                pixelsX[i] = chValue;
            case 2:
                pixelsY[i] = chValue;
            case 3:
                pixelsZ[i] = chValue;
            default:
                throw new UnsupportedOperationException("Unknown channel: " + ch);
        }
    }

    @Override
    public int getRGB(int x, int y) {
        int i =	getPixelIndex(x, y);

        int[] retRGB = new int[3];
        ColorConverter.XYZtoRGB(pixelsX[i], pixelsY[i], pixelsZ[i], retRGB);
        int r = retRGB[0] ;
        int g = retRGB[1] ;
        int b = retRGB[2] ;

        return ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF) ;
    }

    @Override
    public short getRGB(int ch, int x, int y) {
        int i =	getPixelIndex(x, y);

        int[] retRGB = new int[3];
        ColorConverter.XYZtoRGB(pixelsX[i], pixelsY[i], pixelsZ[i], retRGB);
        int r = retRGB[0] ;
        int g = retRGB[1] ;
        int b = retRGB[2] ;

        switch(ch){
            case 1:
                return (short)r ;
            case 2:
                return (short)g ;
            case 3:
                return (short)b ;
            default:
                throw new UnsupportedOperationException("Unknown channel: " + ch);
        }
    }

    @Override
    public void setRGB(int ch, int x, int y, short rgbValue) {
        int i =	getPixelIndex(x, y);

        int[] retRGB = new int[3];
        ColorConverter.XYZtoRGB(pixelsX[i], pixelsY[i], pixelsZ[i], retRGB);

        switch(ch){
            case 1:
                retRGB[0] = rgbValue;
                break;
            case 2:
                retRGB[1] = rgbValue;
                break;
            case 3:
                retRGB[2] = rgbValue;
                break;
            default:
                throw new UnsupportedOperationException("Unknown channel: " + ch);
        }

        double[] retXYZ = new double[3];
        ColorConverter.RGBtoXYZ(retRGB[0],retRGB[1],retRGB[2], retXYZ);

        pixelsX[i] = (short)retXYZ[0];
        pixelsY[i] = (short)retXYZ[1];
        pixelsZ[i] = (short)retXYZ[2];
    }

    @Override
    public void setRGB(int x, int y, int rgb) {
        int i =	getPixelIndex(x, y);

        // convert to XYZ
        int r = (rgb >> 16) & 0x000000ff ;
        int g = (rgb >> 8) & 0x000000ff ;
        int b = rgb & 0x000000ff ;
        double[] retXYZ = new double[3];
        ColorConverter.RGBtoXYZ(r, g, b, retXYZ);

        // set channels
        pixelsX[i] = (short)retXYZ[0];
        pixelsY[i] = (short)retXYZ[1];
        pixelsZ[i] = (short)retXYZ[2];
    }

}
