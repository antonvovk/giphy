package org.nulp.domain;

import java.awt.image.BufferedImage;

abstract public class ImageAbstract<T> {

    int width;
    int height;

    ImageAbstract(int width, int height) {
        this.width = width;
        this.height = height;
    }

    abstract public int[] getPixelsRGB();

    public BufferedImage getBufferedImage() {
        BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        int[] pixelsRGB = getPixelsRGB();
        img.setRGB(0, 0, width, height, pixelsRGB, 0, width);
        return img;
    }

    int getPixelIndex(int x, int y) {
        return (width * y) + x;
    }
}
