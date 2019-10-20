package org.nulp.controller;

import org.nulp.domain.ImageHSL;
import org.nulp.domain.ImageXYZ;
import org.nulp.storage.StorageFileNotFoundException;
import org.nulp.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping(value = "/xyz", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] convertToXYZ(@RequestParam("file") MultipartFile file) throws IOException {
        storageService.store(file);
        Resource resource = storageService.loadAsResource(file.getOriginalFilename());
        ImageXYZ imageXYZ = new ImageXYZ(ImageIO.read(resource.getFile()));

        ByteArrayOutputStream returnImage = new ByteArrayOutputStream();
        ImageIO.write(imageXYZ.getBufferedImage(), "png", returnImage);
        return returnImage.toByteArray();
    }

    @PostMapping(value = "/hsv", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] convertToHSV(@RequestParam("file") MultipartFile file) throws IOException {
        storageService.store(file);
        Resource resource = storageService.loadAsResource(file.getOriginalFilename());
        ImageHSL imageHSL = new ImageHSL(ImageIO.read(resource.getFile()));

        ByteArrayOutputStream returnImage = new ByteArrayOutputStream();
        ImageIO.write(imageHSL.getBufferedImage(), "png", returnImage);
        return returnImage.toByteArray();
    }

    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
