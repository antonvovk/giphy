package org.nulp.utils;


import org.junit.Assert;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ColorConverterTest {

    @Test
    public void RGBtoXYZ() {
    }

    @Test
    public void XYZtoRGB() {
    }

    @Test
    public void HSLtoRGB() {
    }

    @Test
    public void RGBtoHSL() {
        short[] rgb = new short[]{125, 60, 200};
        float[] hsl = ColorConverter.RGBtoHSL(rgb);
        Assert.assertEquals(267, (int) hsl[0]);
        Assert.assertEquals(55, (int) hsl[1]);
        Assert.assertEquals(50, (int) hsl[2]);
    }
}
